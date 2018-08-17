import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import withRoot from '../withRoot';
import apiFetcher from '../services/ApiFetcher';
import CivicAuth from './CivicAuth';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  textField: {
    width: "75%"
  }
});

class RequestFaucetView extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false,
      loading: false,
      walletAddress: "",
      message: "Great! Now is time to tell me your wallet address!"
    };
  }

  handleClick(){

    if(!this.state.walletAddress){
      return this._handleError({message: "Address is required!"});
    }

    this.startSpinner();

    apiFetcher.request(this.state.walletAddress, this.state.authToken).then((result)=>{
      result.json().then((result)=>{
        this.stopSpinner()
        if(result && result.success && result.success.txid){
          this.state.success = result.success.txid;
          this.state.userData = result.success.user ? result.success.user.value : "";
        } else {
          this.state.error = (result && result.result && result.result.error) || 
            (result && result.error) || "Unexpected server response."; 
        }
        this.setState(this.state);
      }).catch((e)=>{
        this._handleError(e);
      });
    }).catch((e)=>{
      this._handleError(e);
    });
  }

  startSpinner(){
    
    let messages = [
      "Processing your request...",
      "Checking your identity...",
      "Checking your wallet address...",
      "Still processing... this may be a good sign...",
    ];

    this.state.loading = true;
    this.state.loadingMessage = messages[0];
    this.setState(this.state);

    this.loadingMessagesIndex=1;
    this.loadingMessagesInterval = setInterval(()=>{
      this.state.loadingMessage = messages[this.loadingMessagesIndex%messages.length];
      this.setState(this.state);
    }, 2000);
  }

  stopSpinner(){
    clearInterval(this.loadingMessagesInterval);
    this.state.loading = false;
    this.setState(this.state);
  }

  _handleError(e){
    this.state.error = e && e.message ? e.message : "Unexpected error"; 
    this.setState(this.state);
    this.stopSpinner()
  }

  handleAddressChange(event){
    this.state.walletAddress = event.target.value;
    this.setState(this.state);
  }

  didCivicLogin(data){
    const jwtToken = data.response;
    this.state.authToken = jwtToken;
    this.state.login = true;
    this.setState(this.state);
  }

  render() {
    const { classes } = this.props;
    let content;

    if(!this.state.login){
      return <CivicAuth onLogin={this.didCivicLogin.bind(this)}/>
    }

    if(this.state.loading){
      content = (
        <div className={classes.root}>
          <CircularProgress className={classes.progress} size={50} />
          <Typography variant="subheading">
            {this.state.loadingMessage}
          </Typography>
        </div>
      );
    } else if(this.state.success){
      content = (
        <div className={classes.root}>
          <Typography className="success-message" variant="title">
            Thanks {this.state.userData}! Enjoy the TETH's we've sent you!
          </Typography>
          <Typography variant="subheading">
            <a href={`https://kovan.etherscan.io/tx/${this.state.success}`}>Check transaction here</a>
          </Typography>
        </div>
      );
    } else if(this.state.error){
      content = (
        <div className={classes.root}>
          <Typography variant="title">
            Error when tried to send a new transaction
          </Typography>
          <Typography variant="subheading" className="error-message">
            {this.state.error}
          </Typography>
          <Button variant="contained" color="secondary" onClick={()=>{window.location=window.location}}>
            Try again
          </Button>
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
                id="walletAddress"
                label="Type your wallet address"
                className={classes.textField}
                value={this.state.walletAddress}
                onChange={this.handleAddressChange.bind(this)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button id="send-button" variant="contained" color="secondary" onClick={this.handleClick.bind(this)}>
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

export default withRoot(withStyles(styles)(RequestFaucetView));
