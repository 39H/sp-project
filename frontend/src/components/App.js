import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Trending, Subscriptions, Work, WorkEdit, Portfolio, Community, Thread, ThreadWrite, ThreadEdit, UploadWork, Profile, Settings, ChangePassword, DeleteAccount, ManageThreads, ManageComments, ChangeForgotPassword } from './pages';

import { UserLoader } from 'containers';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/trending" component={Trending}/>
                <Route path="/subscriptions" component={Subscriptions}/>
                <Route path="/password/:code" component={ChangeForgotPassword}/>
                <Switch>
                    <Route path="/work/:workid/edit" component={WorkEdit}/>
                    <Route path="/work/:workid" component={Work}/>
                </Switch>
                <Route path="/profile" component={Profile}/>
                <Switch>
                    <Route path="/settings/password" component={ChangePassword}/>
                    <Route path="/settings/unregister" component={DeleteAccount}/>
                    <Route path="/settings/threads" component={ManageThreads}/>
                    <Route path="/settings/comments" component={ManageComments}/>
                    <Route path="/settings" component={Settings}/>
                </Switch>
                <Switch>
                    <Route path="/portfolio/:username/community/write" component={ThreadWrite}/>
                    <Route path="/portfolio/:username/community/:threadid/edit" component={ThreadEdit}/>
                    <Route path="/portfolio/:username/community/:threadid" component={Thread}/>
                    <Route path="/portfolio/:username/community" component={Community}/>
                    <Route path="/portfolio/:username/upload" component={UploadWork}/>
                    <Route path="/portfolio/:username" component={Portfolio}/>
                </Switch>
                <UserLoader/>
            </div>
        );
    }
}

export default App;