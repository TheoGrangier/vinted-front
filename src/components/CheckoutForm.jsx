import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur",
    });
    console.log(stripeResponse);
    console.log(totalPrice);

    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        // le token que vous avez reçu de l'API Stripe
        title: "Le Titre de l'annonce",
        amount: totalPrice,
        // le prix indiquée dans l'annonce
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <span>Paiement effectué ! Pour un Total de {totalPrice}€ </span>
      )}
    </>
  );
};

export default CheckoutForm;
