"use client";

import { FC } from "react";
import { CartProductType } from "../ProductDetails";
import { FormatPrice } from "@/utils/FormatPrice";
import Link from "next/link";
import { TruncateText } from "@/utils/TruncateText";
import Image from "next/image";
import SetQuantity from "../products/SetQuantity";
import { useCart } from "@/hooks/useCart";

type ItemContentProps = {
  product: CartProductType;
};

const ItemContent: FC<ItemContentProps> = ({ product }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={product.selectedImg.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${product.id}`}>
            {TruncateText(product.name)}
          </Link>
          <div>{product.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => handleRemoveProductFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{FormatPrice(product.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={product}
          handleQtyIncrease={() => handleCartQtyIncrease(product)}
          handleQtyDecrease={() => handleCartQtyDecrease(product)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {FormatPrice(product.price * product.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
