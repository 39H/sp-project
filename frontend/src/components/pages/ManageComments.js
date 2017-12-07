import React, { Component } from 'react';
import { HeaderContainer, ManageCommentsContainer } from 'containers';
import Setting from 'components/Settings';

class ManageComments extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Setting>
            <ManageCommentsContainer />
        </Setting>
      </div>
    );
  }
}

export default ManageComments;
