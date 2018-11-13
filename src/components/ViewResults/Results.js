import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab/";
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

class Results extends Component {
  state = {
    page: 0,
    selectedEventId: 1,
    resultsShouldPaginate: true,
    resultsData: {},
  };

  toggleNextEvent = () => {
    this.setState({
      ...this.state,
      selectedEventId: this.state.selectedEventId + 1
    });
  };

  togglePagination = () => {
    this.setState({
      ...this.state,
      resultsShouldPaginate: !this.state.resultsShouldPaginate
    });
    this.paginate();
  };

  // Toggles between event views every 10 seconds (doesn't restart at 1 after finishing)
  scheduleEventToggle = () => {
    if (this.state.selectedEventId < 3) {
      this.toggleNextEvent();
    } else {
      this.setState({
        ...this.state,
        selectedEventId: 1
      });
    }
  };

  //sets event ID to local state from toggle buttons above table
  selectEvent = (event, value) => {
    this.setState({ ...this.state, selectedEventId: value });
  };

  isScrolling;

  paginate = () => {
    if (this.state.resultsShouldPaginate) {
      //schedules toggling between events every 5 seconds
      //TODO: write subroutine of paging through all event results before switching between events
      this.isScrolling = setInterval(this.scheduleEventToggle, 2000);
    } else {
      clearInterval(this.isScrolling);
    }
  };

  fetchResultsData = () => {
    axios.get('/api/competition/results')
      .then(response => {
        console.log(response.data)
        this.setState({
          ...this.state,
          resultsData: response.data
        })
      })
      .catch(error => {
        console.log('Error getting results:', error);
      })
  }

  componentDidMount() {
    this.fetchResultsData();
  }

  render() {
    const columns = [
      {
        Header: "Shooter Name",
        accessor: "name",
        maxWidth: 125
      },
      // {
      //   Header: "Total Score",
      //   accessor: "score", // Cell: render function to include score out of 100 shots //change later based on server response
      //   Cell: row => <div>{row.value} / 100</div>
      // },
      {
        Header: "Chart Score",
        accessor: "score",
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
                  width: `${row.value}%`,
                  height: "100%",
                  backgroundColor:
                    row.value > 66
                      ? "#85cc00"
                      : row.value > 33
                      ? "#ffbf00"
                      : "#ff2e00",
                  borderRadius: "2px",
                  transition: "all .2s ease-out",
                  textAlign: "center"
                }}
              >
                {row.value} / 100
              </div>
            </div>
          </>
        )
      },
      {
        Header: "Placement",
        accessor: "placement",
        maxWidth: "100",
        //Assumes that data object is sorted by 1st place to last place
        Cell: row => <div> {data.indexOf(row.original) + 1} </div>
      }
    ]; //change this after

    //TODO: get data from redux or API
    const dataStore = [
      {
        id: 1,
        name: "singles",
        results: [
          {
            id: 1,
            name: "Luke Schlangen",
            score: 78
          },
          {
            id: 2,
            name: "Tony Tiger",
            score: 47
          }
        ]
      },
      {
        id: 2,
        name: "doubles",
        results: [
          {
            id: 1,
            name: "Double Trouble",
            score: 99
          },
          {
            id: 2,
            name: "Tony Tiger",
            score: 32
          }
        ]
      },
      {
        id: 3,
        name: "handicap",
        results: [
          {
            id: 1,
            name: "Clark Kent",
            score: 56
          },
          {
            id: 2,
            name: "Tony Tiger",
            score: 22
          }
        ]
      }
    ];

    //reassigns results data by event selected in local state (which is determined by the toggle button)
    let data =
      dataStore[
        dataStore.findIndex(item => item.id === this.state.selectedEventId)
      ].results;

    return (
      <>
        <h1>Results</h1>
        <label><input type="checkbox" onChange={this.togglePagination} />Scroll Results</label>
        {/* toggle button component */}
        <ToggleButtonGroup
          value={this.state.selectedEventId}
          exclusive
          onChange={this.selectEvent}
        >
          {/* TODO: map these from server/redux */}
          <ToggleButton value={1}>Singles</ToggleButton>
          <ToggleButton value={2}>Doubles</ToggleButton>
          <ToggleButton value={3}>Handicap</ToggleButton>
        </ToggleButtonGroup>
        {/* react-table component */}
        <ReactTable
          columns={columns}
          data={data}
          pageSize={15}
          page={this.state.page}
          className="-striped -highlight"
        />
      </>
    );
  }
}

const mapStateToProps = ({ reduxStore }) => ({ reduxStore });

export default connect(mapStateToProps)(Results);

