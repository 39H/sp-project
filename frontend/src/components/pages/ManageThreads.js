import React, { Component } from 'react';
import { HeaderContainer, ManageThreadsContainer } from 'containers';
import Setting from 'components/Settings';

class ManageThreads extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Setting>
            <ManageThreadsContainer />
        </Setting>
      </div>
    );
  }
}

export default ManageThreads;
