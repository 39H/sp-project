import React, { Component } from 'react';
import { HeaderContainer, ChangePasswordContainer } from 'containers';
import Setting from 'components/Settings';

class ChangePassword extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Setting>
            <ChangePasswordContainer/>
        </Setting>
      </div>
    );
  }
}

export default ChangePassword;
