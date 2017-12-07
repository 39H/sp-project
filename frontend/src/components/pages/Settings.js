import React, { Component } from 'react';
import { HeaderContainer } from 'containers';
import Setting from 'components/Settings';

class Settings extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Setting/>
      </div>
    );
  }
}

export default Settings;
