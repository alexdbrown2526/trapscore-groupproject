import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab/";

class Results extends Component {
  state = {
    page: 0,
    selectedEventId: 1,
  };

  // paginateOnASchedule = () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   })
  // }

  handleToggle = (event, value) => {
    console.log("In handleToggle. Event target:", event.target);

    this.setState({ ...this.state, selectedEventId: value });
  };

  render() {
    const columns = [
      {
        Header: "Shooter Name",
        accessor: "name"
      },
      {
        Header: "Total Score",
        accessor: "score", // Cell: render function to include score out of 100 shots //change later based on server response
        Cell: row => <div>{row.value} / 100</div>
      },
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
        //Assumes that data object is sorted by 1st place to last place
        Cell: row => <div> {data.indexOf(row.original) + 1} </div>
      }
    ]; //change this after


    //TODO: get data from redux or API
    const dataStore = [
      {
      id: 1,
      name: 'singles',
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
    }, {
      id: 2,
      name: 'doubles',
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
      ]}, {
      id: 3,
      name: 'handicap',
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
      ]}
    ];

    //reassigns results data by event selected in local state (which is determined by the toggle button)
    let data = dataStore[dataStore.findIndex(item => item.id === this.state.selectedEventId)].results;

    return (
      <>
        <h1>Results</h1>
        {/* toggle button component */}
        <ToggleButtonGroup
          value={this.state.selectedEventId}
          exclusive
          onChange={this.handleToggle}
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

export default Results;
