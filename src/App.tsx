import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Landing } from './components/landing/Landing'
import { Purchase } from './components/purchase/Purchase'
import { LandingDemo } from './components/demo/template1/landing/Landing'
import { ShopDemo } from './components/demo/template1/shop/Shop'
import './components/style.scss';


export function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/commander" component={Purchase} />
      <Route path="/demo" component={LandingDemo} />
      <Route path="/demo-boutique" component={ShopDemo} />
    </Switch>
  );
}