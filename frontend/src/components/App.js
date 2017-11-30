import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from 'containers/Home';
import Trending from 'containers/Trending';
import Work from 'containers/Work';
import Portfolio from 'containers/Portfolio';
import Test from 'containers/Test';

import { UserLoader } from 'containers';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/trending" component={Trending}/>
                <Route path="/work/:workid" component={Work}/>
                <Route path="/portfolio/:username" component={Portfolio}/>
                <Route path="/test" component={Test}/>
                <UserLoader/>
            </div>
        );
    }
}

export default App;