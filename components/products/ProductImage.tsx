"use client";

import { FC } from "react";
import { CartProductType, SelectedImgType } from "../ProductDetails";
import Image from "next/image";

type ProductImageProps = {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
};

const ProductImage: FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((img: SelectedImgType, index: number) => (
          <div
            key={index}
            onClick={() => handleColorSelect(img)}
            className={`relative w-[80%] aspect-square rounded border-teal-300 
            ${
              cartProduct.selectedImg.color === img.color
                ? "border-[1.5px]"
                : "border-none"
            }`}
          >
            <Image
              src={img.image}
              alt={img.color}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="col-span-5 relative aspect-square">
        <Image
          src={cartProduct.selectedImg.image}
          alt={cartProduct.selectedImg.color}
          layout="fill"
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default ProductImage;
