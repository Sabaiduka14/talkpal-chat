import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 shadow-sm border-b-2">
        <Link className="text-4xl font-bold" href="/">
          TalkPal
        </Link>
        <Link href={"/chat"}>
          <Button>Get Started</Button>
        </Link>
      </header>
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-2xl px-4">
            <h1 className="text-5xl font-bold mb-4 ">
              Talk, Share and Send <span className="text-primary">Money</span>{" "}
              With Friend Easily
            </h1>
            <Link href={"/chat"}><Button className="w-[400px] active:scale-95 transition-all ease-in-out my-3">
              Get Started
            </Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
