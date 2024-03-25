import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "stream/consumers";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Missing the stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;

      if (typeof charge.payment_intent === "string") {
        console.log("charge.shipping.address", charge.shipping.address);
        // Adjusting the address to match the Address type in Prisma schema
        const addressData = {
          city: charge.shipping.address.city || "",
          country: charge.shipping.address.country || "",
          line1: charge.shipping.address.line1 || "",
          line2: charge.shipping.address.line2 || "",
          postal_code: charge.shipping.address.postal_code || "",
          state: charge.shipping.address.state || "",
        };
        await prisma?.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: { status: "complete", address: addressData },
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
