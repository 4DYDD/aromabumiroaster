import Link from "next/link";

interface NavbarProps {
  pathname: string;
}

export default function Navbar({ pathname }: NavbarProps) {
  return (
    <nav className="fixed lg:absolute top-0 left-0 w-full transform z-50">
      <div className="flexc text-xs lg:text-base text-center w-full gap-5 h-20">
        {[
          {
            text: "Home",
            href: "/",
          },
          {
            text: "About",
            href: "/about",
          },
          {
            text: "Order",
            href: "/order",
          },
          {
            text: "Contact",
            href: "/contact",
          },
        ].map(({ text, href }) => {
          return (
            <Link
              key={text}
              className={`
              w-[3.5rem] lg:w-[5rem] h-full flexc font-bold
              ${
                pathname !== "/"
                  ? "bg-secondary text-primary/50 hover:text-primary/90"
                  : "text-secondary/50 hover:text-secondary/90"
              }
              `}
              href={href}
            >
              {text}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
