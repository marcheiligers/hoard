import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { selectStyles } from './styles';

class SimpleSelect extends Component {
  state = {
    dateRange: "",
    labelWidth: 0
  };
  handleChange = event => {
    this.props.updateDateRange(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const classes = this.props.classes;
    return (
      <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="dateRange-helper">dateRange</InputLabel>
          <Select
            value={this.props.dateRange}
            onChange={this.handleChange}
            input={<Input name="dateRange" id="dateRange-helper" />}
          >
            <MenuItem value="ytd">
              <em>YTD</em>
            </MenuItem>
            <MenuItem value={'5y'}>Five Years</MenuItem>
            <MenuItem value={'2y'}>Two Years</MenuItem>
            <MenuItem value={'1y'}>One Year</MenuItem>
            <MenuItem value={'6m'}>Six Months</MenuItem>
            <MenuItem value={'3m'}>Three Months</MenuItem>
            <MenuItem value={'1m'}>One Month</MenuItem>
            <MenuItem value={'1d'}>One Day</MenuItem>
          </Select>
          <FormHelperText>Select Date Range</FormHelperText>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(selectStyles)(SimpleSelect);
// Options from https://iextrading.com/developer/docs/#chart