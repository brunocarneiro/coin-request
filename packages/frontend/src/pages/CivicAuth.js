import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';
import CivicLogo from './CivicLogo';
import civicService from '../services/CivicService';


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  cells: {
    padding: 8
  },
  playStoreImg: {
    width: 140
  }
});

class CivicAuth extends React.Component {
  
  constructor(props, context) {
    super(props, context);

    this.civicService = civicService;
    this.props = props;
    this.state = {
      loading: false,
      message: "Howdy! Want some TETH Faucets? First, please login using Civic!"
    };
  }

  handleClick(){
    this.state.loading = true;
    this.setState(this.state);
    this.civicService.signup((eventType, data)=>{
      if(eventType === 'auth-code-received'){
        this.props.onLogin(data);
      }
    });
  }


  render() {
    const { classes } = this.props;
    let content;

    content = (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={12} className={classes.cells}>
            <Typography variant="title">
              {this.state.message}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.cells}>
            <CivicLogo logoImgSize={75} logoNameSize={120}/>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button id="send-button" variant="contained" color="secondary" onClick={this.handleClick.bind(this)}>
              Login with Civic
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.cells}>
            <a href="https://play.google.com/store/apps/details?id=com.civic.sip" target="_blank">
              <img src="/playStore.png" className={classes.playStoreImg} />
            </a>
          </Grid>
        </Grid>
      </div>
    );

    return content;
  }
}

export default withRoot(withStyles(styles)(CivicAuth));
