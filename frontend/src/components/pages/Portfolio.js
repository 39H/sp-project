import React, { Component } from 'react';
import { HeaderContainer, PortfolioContainer } from 'containers';

class Portfolio extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <HeaderContainer />
        <PortfolioContainer select={0} userName={match.params.username}/>
      </div>
    );
  }
}

export default Portfolio;
