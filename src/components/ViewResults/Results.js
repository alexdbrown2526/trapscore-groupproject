import React, { Component } from "react";
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Results extends Component {
  state = {
    page: 1,
  };

  paginateOnASchedule = () => {
    this.setState({
      page: this.state.page + 1,
    })
  }

  render() {

    const columns = [{
      Header: 'Shooter Name',
      accessor: 'name', //change later based on server response
    }, {
      Header: 'Total Score',
      accessor: 'score',
      //Cell: render function to include score out of 100 shots
    }, {
      Header: 'Placement',
      accessor: 'placement', //change this after 
    }];

    const data = [{
      name: 'Luke Schlangen',
      score: 42,
      placement: 1,
    }]

    return (
      <>
        <h1>Results</h1>
        {/* toggle button component */}
        <button>Toggles Go Here</button>
        {/* react-table component */}
        <ReactTable
          columns={columns}
          data={data}
          pageSize={15}
        />
      </>
    );
  }
}

export default Results;
