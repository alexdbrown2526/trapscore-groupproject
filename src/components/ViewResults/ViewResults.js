import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Switch, FormControlLabel, Typography, Paper } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab/";
import { withStyles } from "@material-ui/core/styles";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { USER_ACTIONS } from "../../redux/actions/userActions";
import ResultsDetail from "../ResultsDetail/ResultsDetail";

//JSS Styles object
const styles = theme => ({
  boxScoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    margin: '0 1vw',
  },
  totalScore: {
    height: '100%',
    width: '18vw',
    lineHeight: '16vw',
    fontSize: '8vw',
  },
  container: {
    padding: '10px 0'
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
    finishedLoading: false
  };

  //increments selected event in local state
  toggleNextEvent = () => {
    this.setState({
      ...this.state,
      indexOfSelectedEvent: this.state.indexOfSelectedEvent + 1
    });
  };

  //toggles pagination boolean in local state
  togglePagination = () => {
    this.setState({
      ...this.state,
      resultsShouldPaginate: !this.state.resultsShouldPaginate
    });
    this.paginate();
  };

  // Toggles between event views every 10 seconds (doesn't restart at 1 after finishing)
  scheduleEventToggle = () => {
    if (this.state.indexOfSelectedEvent < this.props.events.length - 1) {
      this.toggleNextEvent();
    } else {
      this.setState({
        ...this.state,
        indexOfSelectedEvent: 0
      });
    }
  };

  //sets event ID to local state from toggle buttons above table
  selectEvent = (event, value) => {
    this.setState({
      ...this.state,
      indexOfSelectedEvent: value
    });
  };

  paginate = () => {
    if (!this.state.resultsShouldPaginate) {
      //schedules toggling between events every 10 seconds
      //TODO: write subroutine of paging through all event results before switching between events
      this.isScrolling = setInterval(this.scheduleEventToggle, 10000);
    } else {
      clearInterval(this.isScrolling);
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
          resultsData: response.data
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
    console.log(this.props.events);
    await this.setState({
      ...this.state,
      finishedLoading: true
    });
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
        accessor: "name",
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
      <>
        <Typography variant="h3">Results</Typography>
        <FormControlLabel
          control={<Switch onChange={this.togglePagination} />}
          label="Scroll Results"
        />
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
              style: {
                fontFamily: "Roboto, sans-serif",
                textAlign: "center"
              }
            };
          }}
          columns={columns}
          data={data}
          pageSizeOptions={[5, 10, 15, 20, 25, 50, 100]}
          defaultPageSize={15}
          page={this.state.page}
          className="-striped -highlight"
          onPageChange={pageIndex =>
            this.setState({ ...this.state, page: pageIndex })
          }
          SubComponent={row => {
            let scoreSlices = [];

            for (let i = 0; i < row.original.raw_scores.length; i+=25) {
              scoreSlices.push(row.original.raw_scores.slice(i, i + 25));
            }
            return (
              <Paper className={classes.container}>
              <Typography variant={'h5'}>Score Details: {row.original.first_name} {row.original.last_name}</Typography>
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
                <div >
                  <Typography className={classes.totalScore} variant={"h2"}>
                  {row.original.total_hits}
                </Typography>
                </div>
              </div>
              </Paper>
            );
          }}
        />
      </>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = ({ events }) => ({ events });

export default withStyles(styles)(connect(mapStateToProps)(ViewResults));
