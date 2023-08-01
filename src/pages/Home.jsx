import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/home.css";

import OfferCard from "../components/OfferCard";
import Offer from "./Offer";

export default function Home() {
  const [offersList, setOffersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        console.log(response.data);

        setOffersList(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log("catch home>>>", error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main>
      <div className="container offers-bloc">
        {offersList.map((offer) => {
          // console.log("offer>>>", offer.product_price);
          return <OfferCard key={offer._id} offer={offer} />;
        })}
      </div>
    </main>
  );
}
