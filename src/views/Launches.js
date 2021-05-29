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

  getContent(filterTerm='', sort='') {
    if (this.state.loading) {
      return <div> LOADING </div>;
    }

    if (!this.state.launches.length) {
      return <div> NO DATA </div>;
    }

    let filteredLaunches = [];

    if (sort) {
      this.state.launches.sort((aLaunch, bLaunch) => {
        if(sort==='Mission') {
          return (aLaunch.name.toLowerCase() < bLaunch.name.toLowerCase()? -1:1);
        } else {
          return (aLaunch.rocket.toLowerCase() < bLaunch.rocket.toLowerCase()? -1:1);
        }
      });
    }

    for (let i = 0; i < this.state.launches.length; i++) {
      let launch = this.state.launches[i];
      let currentFilter = !filterTerm ? this.state.filterTerm : filterTerm;
      if (launch.name.toLowerCase().includes(currentFilter.toLowerCase())) {
        filteredLaunches.push(launch);
      }
    }

    let launchDetails = [];
    for (let ind = 0; ind < filteredLaunches.length; ind++) {
      let launch = filteredLaunches[ind];

      launchDetails.push(
        <li className="launch" key={launch.id}>
          <h2> {launch.name} </h2>
          <span> {launch.rocket} </span>
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
    this.getContent(input);
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
      this.getContent('', newSort);
      this.setState({ sort: newSort })
    };

    return (
      <div>
        <div className="fixHeader">
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
