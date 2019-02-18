// Formik Render Prop Form
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import MuiTextField from '@material-ui/core/TextField';
import ContainedButton from './Button';
import { LinearProgress } from '@material-ui/core';
import { fieldToTextField } from 'formik-material-ui';

import stocksActions from '../stocks/stocksActions';
// REDUX
const addStockRequest = stocksActions.addStockRequest;
const clearStockError = stocksActions.clearStockError;

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
class AddStockForm extends Component {
  static propTypes = {
    addStockRequest: PropTypes.func.isRequired,
    clearStockError: PropTypes.func.isRequired,
    error: PropTypes.string,
    stocks: PropTypes.array.isRequired,
  }
  handleClearError = () => {
    this.props.clearStockError();
  };
  handleValidate = (values) => {
    const currentSymbols = this.props.stocks.map(stock => stock.symbol);
    const dup = currentSymbols.find(item => item === values.symbol.toUpperCase())
    const pattern = /^[A-Z]{2,5}((.|-)[A-Z])?$/;
    let errors = {};
    if (dup) {
      errors.symbol = 'Duplicate';
    } else if (!values.symbol.toUpperCase().match(pattern)) {
      errors.symbol = 'Not A Valid Symbol';
    }
    return errors;
  }
  handleSubmit = (values, { setSubmitting, errors, resetForm }) => {
    const newStockSymbol = values.symbol.toUpperCase();
    if (!errors) {
      this.props.addStockRequest(newStockSymbol);
      setSubmitting(false);
      resetForm({ symbol: '' });
    };
  }
  render() {
    return (
      <Fragment>
        <Formik
          initialValues={{ symbol: '' }}
          validate={values => this.handleValidate(values)}
          onSubmit={(values, formProps) => this.handleSubmit(values, formProps)}
        >
          {({ submitForm, isSubmitting, errors, values, setFieldValue }) => (
            <Form>
              <Field
                type='text'
                name='symbol'
                label='symbol'
                component={UppercasingTextField}
              />
              <br />
              {isSubmitting && <LinearProgress />}
              <br />
              <ContainedButton
                variant="contained"
                size="large"
                color="primary"
                onClick={submitForm}
                disabled={isSubmitting || !!Object.values(errors).length || !values.symbol.length}
              >
                Add
              </ContainedButton>
              <ContainedButton
                variant="contained"
                size="large"
                color="secondary"
                type='reset'
                disabled={!values.symbol.length}
              > Reset </ContainedButton>
            </Form>
          )}
        </Formik>
      </Fragment>
    )
  }

};
export default connect(
  state => ({
    error: state.stocks.error || null,
  }), { addStockRequest, clearStockError })(AddStockForm);