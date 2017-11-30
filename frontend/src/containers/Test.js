import React, { Component } from 'react';
import { HeaderContainer } from 'containers';
import ThreadTest from './ThreadTest';

class Test extends Component {
  render() {
    return (
        <div className="Test">
            <HeaderContainer />
            <ThreadTest />
        </div>
    );
  }
}

export default Test;
