import { FC } from "react";

interface pageProps {
  searchParams: {
    [key: string]: string; // orderId
  };
}

const page: FC<pageProps> = ({ searchParams }) => {
  const { orderId } = searchParams;
  return <div>{orderId}</div>;
};

export default page;
