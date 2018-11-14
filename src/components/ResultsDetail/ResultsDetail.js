import React from 'react';
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  scoreContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },

  score: {
    width: '1%',
    height: '100%',
    border: '1px solid gray',
    borderRadius: '2px',
  },

  hit: {
    backgroundColor: 'lightgray',
  }
})

const ResultsDetail = (props) => {
  const { classes } = props;

  return (
  <div className={classes.scoreContainer}>
    {props.row.original.raw_scores.map(score => {
      let value = score === 1 ? 'hit' : 'miss';
      return <div className={classes.score + ' ' + classes + `.${value}`} >{value === 'hit' ? '/' : '0'}</div>
    })}
  </div>
)};


export default withStyles(styles)(ResultsDetail);
