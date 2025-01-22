import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Github, X } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background w-full border-t mt-0 md:mt-14">
      <div className="container mx-auto h-16 flex items-center justify-center space-x-2">
        <Link
          href="https://twitter.com/parkersm1th"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <X />
            <span className="sr-only">Twitter</span>
          </div>
        </Link>
        <Link
          href="https://github.com/parkersm1th"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={buttonVariants({
              size: "icon",
              variant: "ghost",
            })}
          >
            <Github />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
      </div>
    </footer>
  );
}
