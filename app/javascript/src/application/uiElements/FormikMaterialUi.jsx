import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Field, Form } from 'formik';
import { LinearProgress } from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import { fieldToTextField, TextFieldProps } from 'formik-material-ui';

const UppercasingTextField = (props) => (
  <MuiTextField
    {...fieldToTextField(props)}
    onChange={event => {
      const { value } = event.target;
      props.form.setFieldValue(
        props.field.name,
        value ? value.toUpperCase() : ''
      );
    }}
  />
);
const AddStockForm = () => {
  <Formik
    initialValues={{ symbol: '' }}
    validate={values => {
      const errors = {} />
}