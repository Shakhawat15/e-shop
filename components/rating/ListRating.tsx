"use client";

import { FC } from "react";
import Heading from "../Heading";
import moment from "moment";
import { Rating } from "@mui/material";

type ListRatingProps = {
  product: any;
};

const ListRating: FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product Review" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any, index: number) => (
            <div key={index} className="max-w-[300px]">
              <div className="flex gap-2 items-center">
                <div>Avatar</div>
                <div className="font-semibold">{review?.user.name}</div>
                <div className="font-light">
                  {moment(review.createdDate).fromNow()}
                </div>
              </div>
              <div className="mt-2">
                <Rating value={review.rating} readOnly />
                <div className="ml-2">{review.comment}</div>
                <hr className="my-4" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListRating;
