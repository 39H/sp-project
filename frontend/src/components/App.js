import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Trending, Work, Portfolio, Community, Thread } from './pages';

import { UserLoader } from 'containers';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/trending" component={Trending}/>
                <Route path="/work/:workid" component={Work}/>
                <Switch>
                    <Route path="/portfolio/:username/community/:threadid" component={Thread}/>
                    <Route path="/portfolio/:username/community" component={Community}/>
                    <Route path="/portfolio/:username" component={Portfolio}/>
                </Switch>
                <UserLoader/>
            </div>
        );
    }
}

export default App;