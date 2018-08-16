import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';
import { REST_API_URL } from '../constants';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  textField: {
    width: "75%"
  }
});

class InputAddress extends React.Component {
  state = {
    loading: false,
    walletAddress: "",
    message: "We send you TETH!"
  };

  handleClick = () => {
    this.state.loading = true;
    this.setState(this.state);
    fetch(`${REST_API_URL}/request?address=${this.state.walletAddress}`,
      {
        method: "GET", headers: {"Content-Type": "application/json; charset=utf-8"},
      }
    ).then((result)=>{
      this.state.loading = false;
      this.state.success = result;
      this.setState(this.state);
    }).catch((e)=>{
      this.state.loading = false;
      this.state.error = e;
      this.setState(this.state);
    });
  };

  handleAddressChange(event){
    this.state.walletAddress = event.target.value;
    this.setState(this.state);
  }

  render() {
    const { classes } = this.props;
    let content;

    if(this.state.loading){
      content = (
        <div className={classes.root}>
          <CircularProgress className={classes.progress} size={50} />
        </div>
      );
    } else if(this.state.success){
      content = (
        <div className={classes.root}>
          <Typography variant="title">
            TETH sent successfuly!
          </Typography>
        </div>
      );
    } else if(this.state.error){
      content = (
        <div className={classes.root}>
          <Typography variant="title">
            {this.state.error}
          </Typography>
        </div>
      );
    } else {
      content = (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Typography variant="title">
                {this.state.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="name"
                label="Type your wallet address"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleAddressChange.bind(this)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" color="secondary" onClick={this.handleClick}>
                Send me TETH
              </Button>
            </Grid>
          </Grid>
        </div>
      );
    }

    return content;
  }
}

export default withRoot(withStyles(styles)(InputAddress));
