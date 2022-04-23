import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";

const AddressForm = ({ checkoutToken, test, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <div style={{ marginTop: "5px", width: "50%" }}>
              <label style={{ margin: "15px 15px 0px 5px" }}>First Name</label>
              <FormInput required name="firstName" value="First name" />
            </div>
            <div style={{ marginTop: "5px", width: "50%" }}>
              <label style={{ margin: "15px 15px 0px 5px" }}>Last Name</label>
              <FormInput required name="lastname" value="lastname" />
            </div>
            <div style={{ marginTop: "5px", width: "50%" }}>
              <label style={{ margin: "15px 15px 0px 5px" }}>Address</label>
              <FormInput required name="address" value="address" />
            </div>
            <div style={{ marginTop: "5px", width: "50%" }}>
              <label style={{ margin: "15px 15px 0px 5px" }}>Email</label>
              <FormInput required name="email" value="email" />
            </div>
            <div style={{ marginTop: "5px", width: "50%" }}>
              <label style={{ margin: "15px 15px 0px 5px" }}>City</label>
              <FormInput required name="city" value="city" />
            </div>
            <div style={{ marginTop: "5px", width: "50%" }}>
              <label style={{ margin: "15px 15px 0px 5px" }}>Postal Code</label>
              <FormInput required name="ZIP" value="ZIP" />
            </div>
            <div style={{ marginTop: "5px", width: "50%" }}>
              <label style={{ margin: "15px 15px 0px 5px" }}>
                Shipping country
              </label>
              <FormInput required name="country" value="country" />
            </div>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="info" to="/cart">
              Back to Cart
            </Button>
            <Button type="submit" variant="success" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
