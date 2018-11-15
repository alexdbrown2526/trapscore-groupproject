import React from 'react';
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
  scoreContainer: {
    display: "flex",
    width: "80vw",
    height: "4vw",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },

  score: {
    width: "3vw",
    height: "3vw",
    // border: "1px solid lightgray",
    borderRadius: "2px",
    margin: "1px",
    lineHeight: "3vw",
    fontSize: "2.8vw",
    backgroundColor: "whitesmoke",
    boxShadow: "1px 1px 4px darkgray"
  },

  hit: {
    backgroundColor: "gainsboro"
  }
});

const ResultsDetail = (props) => {
  const { classes } = props;

  return (
    <>
      <div className={classes.scoreContainer}>
        {props.boxScore.map(score => {
          let value = score === 1 ? 'hit' : 'miss';
          return value === 'hit' ? 
            <div className={`${classes.score} ${classes.hit}`} >/</div> 
            : 
            <div className={classes.score} >O</div>
        })}
      </div>
    </>
  )
};


export default withStyles(styles)(ResultsDetail);
