import React, { Component } from 'react';
import { HeaderContainer, WorksContainer } from 'containers';

class Subscriptions extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <WorksContainer type="subscriptions" />
      </div>
    );
  }
}

export default Subscriptions;
