import React, { Component } from 'react';
import { HeaderContainer, DeleteAccountContainer } from 'containers';
import Setting from 'components/Settings';

class DeleteAccount extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Setting>
            <DeleteAccountContainer/>
        </Setting>
      </div>
    );
  }
}

export default DeleteAccount;
