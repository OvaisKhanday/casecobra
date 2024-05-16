import type { Dispatch, FC, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "./ui/button";

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>; // type of setter in useState
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className='absolute z-[9999999]'>
        <DialogHeader>
          <div className='relative mx-auto w-24 h-24 mb-2'>
            <Image src='/snake-1.png' alt='snake image' className='object-contain' fill />
          </div>
          <DialogTitle className='text-3xl text-center font-bold tracking-tighter text-gray-900'>Login in to continue</DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            <span className='font-medium text-green-600'>Your configuration was saved 😊</span> Please login or create an account to complete your
            purchase.
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
          <LoginLink className={buttonVariants({ variant: "outline" })}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: "default" })}>Sign up</RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
