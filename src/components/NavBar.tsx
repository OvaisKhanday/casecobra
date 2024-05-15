import { FC } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = async ({}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-zinc-200'>
          <Link href='/' className='flex z-40 font-semibold'>
            case<span className='text-green-600'>cobra</span>
          </Link>
          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <Link href='/api/auth/logout' className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  Sign out
                </Link>
                {isAdmin ? (
                  <Link href='/api/auth/logout' className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link href='/configure/upload' className={buttonVariants({ className: "hidden sm:flex items-center gap-1", size: "sm" })}>
                  Create case <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <>
                <Link href='/api/auth/register' className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  Sign up
                </Link>
                <Link href='/api/auth/login' className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  Login
                </Link>
                <div className='h-8  hidden sm:block'>
                  <Link href='/configure/upload' className={buttonVariants({ className: "hidden sm:flex items-center gap-1", size: "sm" })}>
                    Create case <ArrowRight className='ml-1.5 h-5 w-5' />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
