import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h4 className="font-bold text-base mb-2">Shop Categories</h4>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Tablets</Link>
            <Link href="#">Accessories</Link>
            <Link href="#">Cameras</Link>
            <Link href="#">Watches</Link>
          </FooterList>
          <FooterList>
            <h4 className="font-bold text-base mb-2">Customer Service</h4>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping</Link>
            <Link href="#">Returns</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="font-bold text-base mb-2">About Us</h4>
            <p className="mb-2">
              At our electronics store, we offer a wide selection of products at
              competitive prices. Our quality products and superior customer
              service make us the best choice for all your electronic needs.
            </p>
            <p>&copy; {new Date().getFullYear()} E-Shop. All Rights Reserved</p>
          </div>
          <FooterList>
            <h4 className="font-bold text-base mb-2">Follow Us</h4>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
