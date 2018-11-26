import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import {
  Switch,
  FormControlLabel,
  Typography,
  Paper,
  Button
} from "@material-ui/core";

import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab/";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { USER_ACTIONS } from "../../redux/actions/userActions";
import ResultsDetail from "../ResultsDetail/ResultsDetail";
import fileDownload from "js-file-download";

//JSS Styles object
const styles = theme => ({
  boxScoreContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    margin: "0 1vw"
  },
  totalScore: {
    height: "100%",
    width: "18vw",
    lineHeight: "16vw",
    fontSize: "8vw"
  },
  container: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  scoreDetailContainer: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

class ViewResults extends Component {
  state = {
    //defaults table to first results page on render
    page: 0,
    indexOfSelectedEvent: 0,
    resultsShouldPaginate: false,
    //populates on componentDidMount
    resultsData: [],
    //boolean stops table from rendering before server response
    finishedLoading: false,
    totalPages: 0
  };
  //creates a reference to the react-table child component
  tableRef = null;

  fetchCSV = () => {
    axios
      .get("/api/competition/results/export")
      .then(response => {
        fileDownload(response.data, "competition-results.csv");
      })
      .catch(error => {
        console.log("Error downloading CSV", error);
        alert("Error downloading CSV file");
      });
  };

  //increments selected event in local state
  toggleNextEvent = () => {
    this.setState({
      ...this.state,
      indexOfSelectedEvent: this.state.indexOfSelectedEvent + 1
    });
  };

  incrementPage = () => {
    this.setState({
      ...this.state,
      page: this.state.page + 1
    });
  };

  //toggles pagination boolean in local state
  togglePagination = () => {
    this.setState({
      ...this.state,
      resultsShouldPaginate: !this.state.resultsShouldPaginate
    });
  };

  //sets event ID to local state from toggle buttons above table
  selectEvent = (event, value) => {
    this.setState({
      ...this.state,
      indexOfSelectedEvent: value,
      totalPages: Math.ceil(this.state.resultsData[value].results.length / 20),
      page: 0
    });
  };

  paginate = () => {
    if (this.state.resultsShouldPaginate) {
      if (this.state.page < this.state.totalPages - 1) {
        this.incrementPage();
      } else if (
        this.state.indexOfSelectedEvent <
        this.props.events.length - 1
      ) {
        this.toggleNextEvent();
        this.setState({
          ...this.state,
          page: 0
        });
      } else {
        this.setState({
          indexOfSelectedEvent: 0,
          page: 0
        });
      }
    }
  };

  //Pulls all score results from server and stores response in local state
  fetchResultsData = () => {
    this.setState({
      ...this.state,
      finishedLoading: false
    });
    axios
      .get("/api/competition/results")
      .then(response => {
        this.setState({
          ...this.state,
          resultsData: response.data,
          totalPages: Math.ceil(response.data[0].results.length / 20)
        });
      })
      .catch(error => {
        console.log("Error getting results:", error);
      });
  };

  async componentDidMount() {
    //pulls list of events from redux to populate toggle buttons at top
    await this.props.dispatch({ type: USER_ACTIONS.FETCH_EVENTS });
    await this.fetchResultsData();
    await this.setState({
      ...this.state,
      finishedLoading: true
    });
    this.paginate = setInterval(this.paginate, 8000);
  }

  render() {
    const { classes } = this.props;
    const columns = [
      {
        Header: "Placement",
        accessor: "placement",
        maxWidth: "100",
        //Assumes that data object is sorted by 1st place to last place
        Cell: row => <div> {data.indexOf(row.original) + 1} </div>
      },
      {
        Header: "Shooter Name",
        accessor: "last_name",
        maxWidth: "150",
        Cell: row => (
          <div>{row.original.first_name + " " + row.original.last_name}</div>
        )
      },
      {
        Header: "Total Hits",
        accessor: "total_hits",
        Cell: row => (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#dadada",
                borderRadius: "2px"
              }}
            >
              <div
                style={{
                  width: `${(row.value / row.original.total_shots) * 100}%`,
                  height: "100%",
                  backgroundColor:
                    (row.value / row.original.total_shots) * 100 > 66
                      ? "#85cc00"
                      : (row.value / row.original.total_shots) * 100 > 33
                      ? "#ffbf00"
                      : "#ff2e00",
                  borderRadius: "2px",
                  transition: "all .2s ease-out",
                  textAlign: "center"
                }}
              >
                {row.value} / {row.original.total_shots}
              </div>
            </div>
          </>
        )
      }
    ];

    //reassigns results data by event selected in local state (which is determined by the toggle buttons)
    let data = this.state.resultsData.length
      ? this.state.resultsData[this.state.indexOfSelectedEvent].results
      : [];

    return this.state.finishedLoading ? (
      <div className={classes.container}>
        <Typography variant="h3">Results</Typography>
        <div className={classes.optionsContainer}>
          <FormControlLabel
            control={<Switch onChange={this.togglePagination} />}
            label="Scroll Results"
          />
          <Button variant="contained" color="secondary" onClick={this.fetchCSV}>
            Download CSV
          </Button>
        </div>
        <ToggleButtonGroup
          value={this.state.indexOfSelectedEvent}
          exclusive
          onChange={this.selectEvent}
        >
          {this.props.events.map(ev => {
            return (
              <ToggleButton key={ev.id} value={this.props.events.indexOf(ev)}>
                {ev.name}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
        <ReactTable
          getProps={() => {
            return {
              style: { fontFamily: "Roboto, sans-serif", textAlign: "center" }
            };
          }}
          columns={columns}
          data={data}
          pageSizeOptions={[15]}
          pageSize={15}
          page={this.state.page}
          className="-striped -highlight"
          onPageChange={pageIndex => {
            this.setState({ ...this.state, page: pageIndex });
          }}
          SubComponent={row => {
            let scoreSlices = [];

            for (let i = 0; i < row.original.raw_scores.length; i += 25) {
              scoreSlices.push(row.original.raw_scores.slice(i, i + 25));
            }
            return (
              <Paper className={classes.scoreDetailContainer}>
                <Typography variant={"h5"}>
                  Score Details: {row.original.first_name}{" "}
                  {row.original.last_name}
                </Typography>
                <div className={classes.boxScoreContainer}>
                  <div>
                    {scoreSlices.map(boxScore => {
                      return (
                        <ResultsDetail
                          key={row.original.id}
                          boxScore={boxScore}
                        />
                      );
                    })}
                  </div>
                  <div>
                    <Typography className={classes.totalScore} variant={"h2"}>
                      {row.original.total_hits}
                    </Typography>
                  </div>
                </div>
              </Paper>
            );
          }}
        />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = ({ events }) => ({ events });

export default withStyles(styles)(connect(mapStateToProps)(ViewResults));
