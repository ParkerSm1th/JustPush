"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto pt-20 pb-32 md:py-32 md:pb-10">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2 rounded-3xl">
            <span className="mr-2 text-primary">
              <Badge className="bg-blue-400 text-white">Beta Pricing</Badge>
            </span>
            <span>Free for 100 PRs</span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              Simply
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                Just Push
              </span>
              a new branch
            </h1>
          </div>

          <p className="md:max-w-screen-sm mx-auto text-xl text-muted-foreground max-w-[70vw]">
            {`Kill the annoying task of writing & creating PRs, so you can ship faster.`}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-center justify-center">
            <SignedIn>
              <Button className="w-48 font-bold group/arrow" asChild>
                <Link href="https://github.com/apps/just-push/installations/new">
                  Install Now
                  <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-48 font-bold">
                <Link href="https://discord.gg/qfgDyTNjf8" target="_blank">
                  Discord Support
                </Link>
              </Button>
            </SignedIn>
            <SignedOut>
              <Button className="w-48 font-bold group/arrow" asChild>
                <Link href="/dashboard">
                  Install Now
                  <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-48 font-bold">
                <Link href="https://discord.gg/qfgDyTNjf8" target="_blank">
                  Discord Support
                </Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </section>
  );
};
