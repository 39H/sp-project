import React, { Component } from 'react';
import { HeaderContainer, PortfolioContainer } from 'containers';

class Portfolio extends Component {
  render() {
    const { match } = this.props;
    return (
      <div className="Home">
        <HeaderContainer />
        <div>
            <PortfolioContainer userName={match.params.username}/>
        </div>
      </div>
    );
  }
}

export default Portfolio;
