// Make sure to call `loadStripe` outside of a component’s render to avoid

import { EnvVars } from "@const";
import { loadStripe } from "@stripe/stripe-js";

// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(EnvVars.stripePublicKey);
