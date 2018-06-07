import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { images } from './files'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '20px'
  },
  paper: {
    padding: 10,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const imageSrc = (image) => `http://www.francescovertucci.com/images/${image}.jpg`

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {images.map((image) => (
          <Grid item xs={12} sm={12} lg={6}>
            <Paper className={classes.paper}>
              <a href={imageSrc(image)}> <img src={imageSrc(image)} /></a>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);