import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            © 2025 Aroma Bumi Roasters. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-yellow-900">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-900">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-yellow-900">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
