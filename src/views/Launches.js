import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

var filterTerm = "";

class LaunchesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launches: [],
      loading: false,
      sort: 'Mission'
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    var api = axios.create();
    api
      .get("https://api.spacexdata.com/v4/launches")
      .then((launches) => {
        this.setState({
          launches: launches.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  getContent() {
    if (this.state.loading) {
      return <div> LOADING </div>;
    }

    if (!this.state.launches.length) {
      return <div> NO DATA </div>;
    }

    var filteredLaunches = [];
    for (var i = 0; i < this.state.launches.length; i++) {
      var launch = this.state.launches[i];
      if (launch.name.includes(filterTerm)) {
        filteredLaunches.push(launch);
      }
    }

    var launchDetails = [];

    for (var i = 0; i < filteredLaunches.length; i++) {
      var launch = filteredLaunches[i];

      launchDetails.push(
        <li className="launch">
          <h2> {launch.name} </h2>
          <div> {launch.rocket} </div>
          <div className="launch-details-popup">
            {launch.details || "No details to display"}
          </div>
        </li>
      );
    }

    return <ul>{launchDetails}</ul>;
  }

  render() {

    var handleFilterChange = (e) => {
      filterTerm = e.currentTarget.value;
    };

    var handleSortClick = (sortBy) => {
      var currentSort = this.state.sort;
      var newSort;
      if (currentSort == 'Rocket') {
        newSort = 'Mission'
      } else {
        newSort = 'Rocket'
      }
      this.setState({ sort: newSort })
    };

    return (
      <div>
        <label htmlFor="term-filter">Term:</label>
        <input name="filter" type="text" onChange={handleFilterChange} />
        <button onClick={() => handleSortClick('Rocket')}>Sort by {this.state.sort}</button>
        {this.getContent()}
      </div>
    );
  }
}

var mapStateToProps = (state) => state;

var mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchesView);
