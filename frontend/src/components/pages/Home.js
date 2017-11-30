import React, { Component } from 'react';
import { HeaderContainer, WorksContainer } from 'containers';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <HeaderContainer />
        <WorksContainer type="recent" />
      </div>
    );
  }
}

export default Home;
