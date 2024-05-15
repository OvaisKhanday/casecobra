import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <MaxWidthWrapper className='flex-1 flex flex-col'>
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
};

export default layout;
