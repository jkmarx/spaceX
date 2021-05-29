import React, { Component } from 'react';
import Launches from './views/Launches';

class App extends Component {
  render() {
    return (
      <main className={`layout`}>
        <section>
          <h2> SpaceX Launches </h2>
          <Launches />
        </section>
      </main>
    );
  }
}

export default App;
