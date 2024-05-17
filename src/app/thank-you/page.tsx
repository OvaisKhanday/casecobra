import { FC, Suspense } from "react";
import ThankYou from "./ThankYou";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
};

export default page;
