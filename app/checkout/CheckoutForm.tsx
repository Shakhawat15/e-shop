"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { useCart } from "@/hooks/useCart";
import { FormatPrice } from "@/utils/FormatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CheckoutFormProps = {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
};

const CheckoutForm: FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const formattedPrice = FormatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) return;

    if (!clientSecret) return;

    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Payment successful");
          handleClearCart();
          handleSetPaymentIntent(null);
          handleSetPaymentSuccess(true);
        } else {
          toast.error(result.error.message || "Something went wrong");
          console.log(result.error);
        }
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold mb-2">Address Information</h2>
      <AddressElement
        options={{
          mode: "shipping",
          //   allowedCountries: ["US", "KE"],
        }}
      />
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button
        label={loading ? "Procesing" : "Pay now"}
        disabled={loading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
