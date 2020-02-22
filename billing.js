import { success, failure } from "./libs/response-lib";
import { calculateCost } from "./libs/billing-lib";
import stripePackage from "stripe";


export async function main(event, context) {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";
    console.log("stripe key", process.env);
    const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

    try {
        await stripe.charges.create({
            source,
            amount,
            description,
            currency: "aud"
        });
        return success({ status: true });
    } catch (error) {
        console.log(error);
        return failure({ status: false });
    }
}