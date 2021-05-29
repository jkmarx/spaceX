import React, { Component } from 'react';
import Launches from './views/Launches';

class App extends Component {
  render() {
    return (
      <div>
          <header className="sticky">
            <h2> SpaceX Launches </h2>
          </header>
          <main className={`layout`}>
            <Launches />
          </main>
      </div>
    );
  }
}

export default App;
