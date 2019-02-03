// Formik Render Prop Form
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import stocksActions from '../stocks/stocksActions';
// REDUX
const addStockRequest = stocksActions.addStockRequest;
class AddStockForm extends Component {
  render() {
    return (
      <div>
        <h4>Add Stock</h4>
        <Formik
          initialValues={{ symbol: '' }}
          validate={values => {
            let errors = {};
            if (!values.symbol) {
              errors.symbol = 'Required';
            } else if (
              // check if the symbol is already in the stocks we have
              this.props.stocks.find(stock => stock.symbol === values.symbol).length
            ) {
              errors.symbol = 'Duplicate';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              this.props.addStockRequest(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type='text' name='symbol' />
              <ErrorMessage name='symbol' component='div' />
              <button type='submit' disabled={isSubmitting}>
                Add
              </button>
            </Form>
          )}
        </Formik>
      </div >
    )
  }

};
export default connect(
  state => ({
    stocks: state.stocks.AllStocks || [],
    error: state.stocks.error || null,
  }), { addStockRequest })(AddStockForm);