import React from 'react';
import theme from '../theme/theme'
import classNames from 'classnames'
import { withStyles } from '@material-ui/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = () => ({
    amountField: {
        width: '100%'
    },
    endAdornment: {
        '& p': {
            color: '#000'
        }
    }
})

class CurrencyInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: ''
        }
        this.value = null;
    }

    handleInput(event) {
      this.value
      try {
        this.value = new WadDecimal(event.target.value)
      } catch {
        if (event.target.value.length === 0) {
          this.value = new WadDecimal(0)
        } else {
          return
        }
      }
      this.props.onChange(this.value);
    }

    render() {

    }
}

export default withStyles(styles)(CurrencyInput);
