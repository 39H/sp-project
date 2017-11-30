import React, { Component } from 'react';
import { HeaderContainer, WorkList } from 'containers';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <HeaderContainer />
        <div>
          <WorkList type="recent" />
        </div>
      </div>
    );
  }
}

export default Home;
