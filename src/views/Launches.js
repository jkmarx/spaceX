import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import _ from 'underscore';

class LaunchesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launches: [],
      loading: false,
      sort: 'Mission',
      filterTerm: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    let api = axios.create();
    let body = {options: {
      pagination: false,
      sort: 'name',
      populate: {path: "rocket", select: "name"}
    }};
    api
      .post("https://api.spacexdata.com/v4/launches/query", body)
      .then((launches) => {
        this.setState({
          launches: launches.data.docs,
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

    let filteredLaunches = [];

    for (let i = 0; i < this.state.launches.length; i++) {
      let launch = this.state.launches[i];
      if (launch.name.toLowerCase().includes(this.state.filterTerm.toLowerCase())) {
        filteredLaunches.push(launch);
      }
    }
    // query default sort by mission name
    if (this.state.sort==='Rocket') {
      filteredLaunches.sort((aLaunch, bLaunch) => {
        return (aLaunch.rocket.name.toLowerCase() < bLaunch.rocket.name.toLowerCase()? -1:1);
      });
    }

    let launchDetails = [];
    for (let ind = 0; ind < filteredLaunches.length; ind++) {
      let launch = filteredLaunches[ind];

      launchDetails.push(
        <li className="launch" key={launch.id}>
          <h2> {launch.name} </h2>
          <span> {launch.rocket.name} </span>
          <span className="launch-details-popup">
            {launch.details || "No details to display"}
          </span>
        </li>
      );
    }

    return <ul>{launchDetails}</ul>;
  }

  // wait for time elapse before filtering through array
  throttleSearch = _.throttle(function(input){
    this.setState({ filterTerm: input });
  }, 700);

  render() {
    const handleFilterChange = (event) => {
      const text = event.target.value;
      this.throttleSearch(text);
    };

    const handleSortClick = (sortBy) => {
      const currentSort = this.state.sort;
      // toggle sort
      let newSort = currentSort === 'Rocket' ? 'Mission' : 'Rocket';
      this.setState({ sort: newSort })
    };

    return (
      <div>
        <div className="fixSearchForm">
          <span className="missionName">
            <label htmlFor="term-filter">Term:</label>
              <input name="filter" type="text" onChange={handleFilterChange} />
          </span>
          <button onClick={() => handleSortClick('Rocket')}>Sort by {this.state.sort}</button>
        </div>
        { this.getContent() }
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchesView);
