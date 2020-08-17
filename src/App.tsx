import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Landing } from './components/landing/Landing'
import {Purchase} from './components/purchase/Purchase'
import './components/style.scss';


export function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/commander" component={Purchase} />
    </Switch>
  );
}