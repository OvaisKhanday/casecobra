import { db } from "@/db";
import { notFound } from "next/navigation";
import { FC } from "react";
import DesignPreview from "./DesignPreview";

interface pageProps {
  searchParams: {
    [key: string]: string;
    // ?id=configIdINParams
  };
}

const page: FC<pageProps> = async ({ searchParams }) => {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();

  const configuration = await db.configuration.findUnique({ where: { id } });

  if (!configuration) return notFound();

  return <DesignPreview configuration={configuration} />;
};

export default page;
