import React, { Component } from 'react';
import { HeaderContainer, WorkList } from 'containers';

class Trending extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <div>
          <WorkList type="likes" />
        </div>
      </div>
    );
  }
}

export default Trending;
