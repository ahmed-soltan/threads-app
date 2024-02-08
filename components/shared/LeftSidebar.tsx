"use client";
import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn, currentUser, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logout from "../../assets/logout.svg";
const LeftSidebar = () => {
  const {userId} = useAuth()
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="leftsidebar custom-scroller">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

            if(link.route=="/profile"){
              link.route=`${link.route}/${userId}`
            }
          return (
            <Link
              href={link.route}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
              key={link.label}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="px-6 mt-10">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4">
              <Image src={Logout} alt="logout" width={24} height={24} />
              <p className="text-light-1 max-lg:hidden ml-6">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
