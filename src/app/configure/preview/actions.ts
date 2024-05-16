"use server";

import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";
import { metadata } from "../../layout";

export const createCheckoutSession = async ({ configId }: { configId: string }) => {
  const configuration = await db.configuration.findUnique({ where: { id: configId } });
  if (!configuration) throw new Error("No such configuration found");

  const { getUser } = getKindeServerSession();
  const user = await getUser(); // read cookie and give iff a user exists

  if (!user) throw new Error("No user");

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (material === "polycarbonate") price += PRODUCTS_PRICES.materials.polycarbonate;
  if (finish === "textured") price += PRODUCTS_PRICES.finish.textured;

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: { userId: user.id, configurationId: configuration.id },
  });

  console.log(user.id, configuration.id);
  if (existingOrder) order = existingOrder;
  else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom iPhone case", // shown to the user on payment screen
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "INR",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["IN", "US"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSession.url };
};
