import { db } from "@/db";
import { notFound } from "next/navigation";
import { FC } from "react";
import DesignConfigurator from "./DesignConfigurator";

interface pageProps {
  searchParams: {
    // automatically provided
    [key: string]: string | string[] | undefined;
  };
}

const Page: FC<pageProps> = async ({ searchParams }) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) return notFound();

  const { imageUrl, width, height } = configuration;

  return <DesignConfigurator configId={configuration.id} imageUrl={imageUrl} imageDimensions={{ width, height }} />;
};

export default Page;
