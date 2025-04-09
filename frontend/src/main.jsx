
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
const stripePromise = loadStripe("pk_test_51RBLl4PaX6hIXI1JZG923403qFaq2L7YfgK6GREEmoI5MhUImSA7CZwA8V0bF93fNb7Hp3j3ZnAezmZyIwtF6CAs008fYBZ5AT")
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


createRoot(document.getElementById("root")).render(
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Elements>
    

);
