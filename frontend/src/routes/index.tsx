import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Subject from '../pages/Subject';
import Subscribe from '../pages/Subscribe';
import Create from '../pages/Create';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/subject/:idSubject" component={Subject} isPrivate />
    <Route path="/subscribe" component={Subscribe} isPrivate />
    <Route path="/create" component={Create} isPrivate />
  </Switch>
);

export default Routes;
