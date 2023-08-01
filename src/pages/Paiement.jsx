import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

export default function Paiement() {
  const location = useLocation();
  const { price } = location.state;
  const { title } = location.state;
  const totalPrice = price + 1.2;

  return (
    <>
      <span>Nom de l'article : {title} </span> <br />
      <span>Commande : {price} €</span> <br />
      <span>Frais de protection acheteur : 0.40 €</span>
      <br />
      <span>Frais de port : 0.80 €</span>
      <br />
      <span>Total :{totalPrice}€</span>
      <p>Vous allez payer {totalPrice}€ ( frais de port inclus ) </p>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice} />
      </Elements>
    </>
  );
}
