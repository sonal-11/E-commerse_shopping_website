import React, { useState } from "react";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/Cart/cart.actions";
import FormInput from "../form/FormInput";
import Button from "../form/Button";
import "./style.scss";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const PaymentDetails = () => {
    const dispatch = useDispatch();
  const elements = useElements();
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameonCard] = useState("");

  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    const CardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping Address</h2>

          <FormInput
            required
            placeholder="Recipient Name"
            name="recipientName"
            handleChange={(evt) => setRecipientName(evt.target.value)}
            value={recipientName}
            type="text"
          />

          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line1}
            type="text"
          />

          <FormInput
            required
            placeholder="Line 2"
            name="line2"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.postal_code}
            type="text"
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Billing Address</h2>

          <FormInput
            required
            placeholder="Name On Card"
            name="nameOnCard"
            handleChange={(evt) => setNameonCard(evt.target.value)}
            value={nameOnCard}
            type="text"
          />

          <FormInput
            required
            placeholder="Line 1"
            handleChange={(evt) => handleBilling(evt)}
            name="line1"
            value={billingAddress.line1}
            type="text"
          />

          <FormInput
            required
            placeholder="Line 2"
            name="line2"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.postal_code}
            type="text"
          />

          <div required className="formRow checkoutInput">
            <CountryDropdown
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAddress.country}
              valueType="short"
            />
          </div>
        </div>
        <div className="group">
          <h2>Card Details</h2>

          <CardElement options={configCardElement} />
        </div>

        <Button type="submit" text> Pay Now </Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
