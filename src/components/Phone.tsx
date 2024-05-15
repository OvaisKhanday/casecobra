import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, HTMLAttributes, ReactNode } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  imgSrc: string;
  dark?: string;
}

const Phone: FC<PhoneProps> = ({ imgSrc, dark = false, className, ...props }) => {
  return (
    <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)} {...props}>
      <img
        src={dark ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png"}
        alt='phone image'
        className='pointer-events-none z-50 select-none'
      />
      <div className='absolute -z-10 inset-0'>
        <img src={imgSrc} alt='overlay phone image' className='object-cover' />
      </div>
    </div>
  );
};

export default Phone;
