import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

// import Logo from "@/public/logo.svg";

export default function Footer() {
  return (
    <footer className="not-prose border-t pl-32 pt-8 mb-8">
      <Balancer>
        <div className="grid gap-6">
          <div className="grid gap-6">
            <Link href="/">
              <h3 className="sr-only">footer</h3>
              {/* <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={27.27}
                className="transition-all hover:opacity-75 dark:invert"
              ></Image> */}
            </Link>
            <p>
                Lighthouse is a platform that provides information about large
                language models for use by startups looking to do research in
                the AI field.
            </p>

            <div className="mb-6 flex flex-col gap-4 text-sm text-muted-foreground underline underline-offset-4 md:mb-0 md:flex-row">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
            <p className="text-muted-foreground">
              © <a href="https://github.com/brijr/components">Illumin8</a>. All
              rights reserved. 2024-present.
            </p>
          </div>
        </div>
      </Balancer>
    </footer>
  );
}
