import React, { Component } from 'react';
import { HeaderContainer, WorksContainer } from 'containers';

class Trending extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <WorksContainer type="likes" />
      </div>
    );
  }
}

export default Trending;
