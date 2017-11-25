import React from 'react';
import ReactDOM from 'react-dom';

// material ui
//import customTheme from 'library/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



import App from './App';
import Home from './containers/Home';
import Recent from './containers/Recent';
import MostLiked from './containers/MostLiked';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

import Post from './containers/Post';
//import Button from './containers/Button';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import './index.css';

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
  
  
    <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="Recent" component={Recent}/>
      <Route path="MostLiked" component={MostLiked}/>
      <Route path="SignIn" component={SignIn}/>
      <Route path="SingUp" component={SignUp}/>
     
        <Route path=":id" component={Post}/>
      </Route>
    
  </Router>
  
  </MuiThemeProvider>
  
  ,
  document.getElementById('root')
);
