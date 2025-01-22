"use client";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, useSignIn } from "@clerk/nextjs";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [];

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () =>
    signIn.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/dashboard",
      redirectUrlComplete: "/dashboard",
    });

  return <Button onClick={signInWithGoogle}>Sign In</Button>;
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [topOffset, setTopOffset] = useState(20);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll < 20) {
        setTopOffset(20 - scroll);
      } else {
        setTopOffset(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{ top: `${topOffset}px` }}
      className="sticky shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto border-b border-secondary z-40 flex justify-between items-center p-2 bg-card"
    >
      <Link
        href="/"
        className="font-bold text-lg flex items-center min-w-[130px]"
      >
        <Image src="/logo.png" alt="logo" width={40} height={40} />
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="logo" width={40} height={40} />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
                <SignedOut>
                  <SignInOAuthButtons />
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard" className="text-base px-2">
                    Dashboard
                  </Link>
                </SignedIn>
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[300px] gap-5 p-4">
                <ul className="flex flex-col gap-2">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="rounded-md p-3 text-sm hover:bg-muted"
                    >
                      <p className="mb-1 font-semibold leading-none text-foreground">
                        {title}
                      </p>
                      <p className="line-clamp-2 text-muted-foreground">
                        {description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link
                  href={href}
                  className="text-base px-2"
                  onClick={(e) => {
                    if (href.startsWith("#")) {
                      e.preventDefault();
                      document
                        .querySelector(href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex px-4 min-w-[130px]">
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard" className="text-base px-2">
            Dashboard
          </Link>
        </SignedIn>
      </div>
    </header>
  );
};
