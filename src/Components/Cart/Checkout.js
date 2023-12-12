import React from "react";

import classes from "./Checkout.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "../Utils/TextError";

const initialValues = {
  name: "",
  phone: "",
  address: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name Required"),
  phone: Yup.string().required("Phone Number Required"),
  address: Yup.string().required("Address Required"),
});

const Checkout = (props) => {
  const onSubmit = (values) => {
    console.log("form data", values);
    props.onConfirm({
      name: values.name,
      phone: values.phone,
      address: values.address,
    });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form className={classes.form}>
            <div className={classes.control}>
              <label htmlFor="name">Name</label>
              <Field name="name" id="name" type="text" />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className={classes.control}>
              <label htmlFor="phone">Phone Number</label>
              <Field name="phone" id="phone" type="text" />
              <ErrorMessage name="phone" component={TextError} />
            </div>
            <div className={classes.control}>
              <label htmlFor="address">Address</label>
              <Field name="address" id="address" type="text" />
              <ErrorMessage name="address" component={TextError} />
            </div>

            <div className={classes.actions}>
              <button
                type="button"
                className={classes["button--alt"]}
                onClick={props.onCancel}
              >
                Cancel
              </button>
              <button
                className={classes.button}
                type="submit"
                disabled={!formik.isValid}
              >
                Confirm
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Checkout;
