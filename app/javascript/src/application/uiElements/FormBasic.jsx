// Formik Render Prop Form
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import stocksActions from '../stocks/stocksActions';
// REDUX
const addStockRequest = stocksActions.addStockRequest;
class AddStockForm extends Component {
  render(props) {
    const currentSymbols = this.props.stocks.map(stock => stock.symbol);
    return (
      <div>
        <Formik
          initialValues={{ symbol: '' }}
          validate={values => {
            const dup = currentSymbols.find(item => item === values.symbol.toUpperCase())
            const pattern = /^[A-Z]{2,5}((.|-)[A-Z])?$/;
            let errors = {};
            if (dup) {
              errors.symbol = 'Duplicate';
            } else if (!values.symbol.match(pattern)) {
              errors.symbol = 'Not A Valid Symbol';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, errors }) => {
            const newStockSymbol = values.symbol.toUpperCase();
            if (!errors) {
              this.props.addStockRequest(newStockSymbol);
              setSubmitting(false)
            };
          }}
        >
          {({ isSubmitting, errors, values }) => (
            <Form>
              <Field type='text' name='symbol' placeholder='symbol' style={{ textTransform: 'uppercase' }} />
              <ErrorMessage name='symbol' component='div' />
              <button
                type='submit'
                disabled={isSubmitting || !!Object.values(errors).length || !values.symbol.length}
              >
                Add
              </button>
              <button type='reset' disabled={!values.symbol.length}>
                Clear
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
    error: state.stocks.error || null,
  }), { addStockRequest })(AddStockForm);
  // TODO style the form better using material-ui input maybe?
  // TODO: validation ain't working on duplications