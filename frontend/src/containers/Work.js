import React, { Component } from 'react';
import { HeaderContainer, WorkDetailContainer } from 'containers';

class Work extends Component {
  render() {
    const { match } = this.props;
    return (
        <div className="Work">
            <HeaderContainer />
            <WorkDetailContainer workid={match.params.workid} />
        </div>
    );
  }
}

export default Work;
