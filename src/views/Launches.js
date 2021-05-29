import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import _ from 'underscore';

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

  filterAndSortLaunches(searchText, sortField) {
    this.setState({ loading: true });
    var api = axios.create();
    let body={options: {pagination: false}};
    if(searchText || filterTerm) {
      let term = searchText ? searchText : filterTerm;
      body.query = {"$text": {"$search": `${term}`, "$caseSensitive": "false"}};
    }
    body.options.sort = sortField === 'Mission'? "name" : "rocket";

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

  componentDidMount() {
    this.setState({ loading: true });
    var api = axios.create();
    api
      .get("https://api.spacexdata.com/v4/launches")
      .then((launches) => {
        console.log(launches.data);
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

    for (var ind = 0; ind < filteredLaunches.length; ind++) {
      let launch = filteredLaunches[ind];

      launchDetails.push(
        <li className="launch" key={launch.id}>
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

  debounceSearch = _.throttle(function(input){
    // getFiles(bucketPath, fileView, params);
    // setSearchText(input);
    this.filterAndSortLaunches(input);
    // leading is required due to state hook, otherwise it'll throttle will break
  }, 700, { leading: false });

  render() {
    const handleFilterChange = (event) => {
      const text = event.target.value;
      this.debounceSearch(text);
    };

    const handleSortClick = (sortBy) => {
      var currentSort = this.state.sort;
      var newSort;
      if (currentSort === 'Rocket') {
        newSort = 'Mission'
      } else {
        newSort = 'Rocket'
      }
      this.filterAndSortLaunches('', newSort);
      this.setState({ sort: newSort })
    };

    return (
      <div>
        <div className="fixHeader">
          <label htmlFor="term-filter">Term:</label>
          <input name="filter" type="text" onChange={handleFilterChange} />
          <button onClick={() => handleSortClick('Rocket')}>Sort by {this.state.sort}</button>
        </div>
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
