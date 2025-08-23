import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-6 py-4">
        <div className="flexcc lg:!flex-row w-full !items-start lg:!items-center gap-5">
          {/* FOOTAGE CREDITS */}
          <div className="lg:flex-1">
            <h1 className="font-bold">Thanks for free footage by :</h1>
            <ul className="list-disc list-inside">
              <li>
                Video by{" "}
                <a
                  className="font-bold text-accent"
                  href="https://pixabay.com/users/gziku-8033041/?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=40167"
                >
                  gziku
                </a>{" "}
                from{" "}
                <a
                  className="font-bold text-accent"
                  href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=video&utm_content=40167"
                >
                  Pixabay
                </a>
              </li>
              <li>
                Image by{" "}
                <a
                  className="font-semibold text-accent"
                  href="https://pixabay.com/users/diapicard-1729295/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1105112"
                >
                  diapicard
                </a>{" "}
                from{" "}
                <a
                  className="font-semibold text-accent"
                  href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1105112"
                >
                  Pixabay
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL MEDIA LINKS */}
          <div className="flexc lg:flex-1 space-x-4">
            <h1 className="font-bold">Follow us on :</h1>

            <Link
              href="#"
              className="block text-gray-600 hover:text-yellow-900"
            >
              <FaXTwitter size={20} />
            </Link>
            <Link
              href="#"
              className="block text-gray-600 hover:text-yellow-900"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="#"
              className="block text-gray-600 hover:text-yellow-900"
            >
              <FaFacebook size={20} />
            </Link>
          </div>

          {/* COPYRIGHT NOTICE */}
          <p className="text-gray-600 lg:flex-1 text-sm font-bold text-center">
            © 2025 Aroma Bumi Roasters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
