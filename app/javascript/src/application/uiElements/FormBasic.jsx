// Formik Render Prop Form
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import stocksActions from '../stocks/stocksActions';
// REDUX
const addStockRequest = stocksActions.addStockRequest;
const clearStockError = stocksActions.clearStockError;
// TODO: add some prettiness to this form!
class AddStockForm extends Component {
  handleClearError = () => {
    this.props.clearStockError();
  };
  render() {
    const currentSymbols = this.props.stocks.map(stock => stock.symbol);
    return (
      <div>
        {this.props.error ?
          <Fragment>
            <div style={{ paddingRight: '1vw' }}>{this.props.error}</div>
            <button onClick={this.handleClearError}>Ok</button>
          </Fragment> :
          <Formik
            initialValues={{ symbol: '' }}
            validate={values => {
              const dup = currentSymbols.find(item => item === values.symbol.toUpperCase())
              const pattern = /^[A-Z]{2,5}((.|-)[A-Z])?$/;
              let errors = {};
              if (dup) {
                errors.symbol = 'Duplicate';
              } else if (!values.symbol.toUpperCase().match(pattern)) {
                errors.symbol = 'Not A Valid Symbol';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, errors, resetForm }) => {
              const newStockSymbol = values.symbol.toUpperCase();
              if (!errors) {
                this.props.addStockRequest(newStockSymbol);
                setSubmitting(false);
                resetForm({ symbol: '' });
              };
            }}
          >
            {({ isSubmitting, errors, values, handleReset }) => (
              <Form>
                <Field
                  type='text'
                  name='symbol'
                  placeholder='symbol'
                  value={values.symbol.toUpperCase() || ''}
                  style={{ textTransform: 'uppercase' }}
                />
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
        }
      </div >
    )
  }

};
export default connect(
  state => ({
    error: state.stocks.error || null,
  }), { addStockRequest, clearStockError })(AddStockForm);
  // TODO style the form better using material-ui input maybe?
  // TODO: validation ain't working on duplications