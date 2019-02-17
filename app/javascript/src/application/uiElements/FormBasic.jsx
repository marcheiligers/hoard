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
  handleClick = (ev) => {
    console.log('clear')
    ev.preventDefault();
  }
  render() {
    return (
      <Fragment>
        {this.props.error ?
          <Fragment>
            <span style={{ paddingRight: '1vw' }}>{this.props.error}</span>
            <button onClick={this.handleClearError}>Ok</button>
          </Fragment> :
          <Formik
            initialValues={{ symbol: '' }}
            validate={values => this.handleValidate(values)}
            onSubmit={(values, formProps) => this.handleSubmit(values, formProps)}
          >
            {({ isSubmitting, errors, values }) => (
              <Form>
                <Field
                  type='text'
                  name='symbol'
                  placeholder='symbol'
                  value={values.symbol.toUpperCase() || ''}
                  style={{ textTransform: 'uppercase' }}
                />

                <button
                  type='submit'
                  disabled={isSubmitting || !!Object.values(errors).length || !values.symbol.length}
                >
                  Add
              </button>
                <input
                  type='reset'
                  disabled={!values.symbol.length}
                  value="Reset"
                />
                {errors ? <ErrorMessage name='symbol' component='div' /> : <div></div>}
              </Form>
            )}
          </Formik>
        }
      </Fragment>
    )
  }

};
export default connect(
  state => ({
    error: state.stocks.error || null,
  }), { addStockRequest, clearStockError })(AddStockForm);
  // TODO style the form better using material-ui input maybe?
  // TODO: validation ain't working on duplications