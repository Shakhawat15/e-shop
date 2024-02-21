"use client";

import { Rating } from "@mui/material";
import { FC, use, useCallback, useEffect, useState } from "react";
import Button from "./Button";
import ProductImage from "./products/ProductImage";
import SetColor from "./products/SetColor";
import SetQuantity from "./products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

type ProductDetailsProps = {
  product: any;
};

const HorizontalLine = () => {
  return <hr className="w-[30%] my-2" />;
};

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  category: string;
  inStock: boolean;
  selectedImg: SelectedImgType;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts, cartTotalQty } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: 1,
    brand: product.brand,
    category: product.category,
    inStock: product.inStock,
    selectedImg: { ...product.images[0] },
  });

  const router = useRouter();

  useEffect(() => {
    if (cartProducts) {
      const productInCart = cartProducts.find(
        (item: CartProductType) => item.id === product.id
      );
      if (productInCart) {
        setIsProductInCart(true);
      } else {
        setIsProductInCart(false);
      }
    }
  }, [cartProducts, product.id]);

  const productRating =
    product.reviews.reduce((acc: any, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => ({
      ...prev,
      selectedImg: value,
    }));
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  }, [cartProduct.quantity]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity - 1,
    }));
  }, [cartProduct.quantity]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        product={product}
        cartProduct={cartProduct}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <HorizontalLine />
        <div>{product.description}</div>
        <HorizontalLine />
        <div>
          <span className=" font-semibold uppercase">Category: </span>
          {product.category}
        </div>
        <div>
          <span className=" font-semibold uppercase">Brand: </span>
          {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <HorizontalLine />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              images={product.images}
              cartProduct={cartProduct}
              handleColorSelect={handleColorSelect}
            />
            <HorizontalLine />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <HorizontalLine />
            <div className="max-w-[300px]">
              <Button
                label="Add to cart"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
