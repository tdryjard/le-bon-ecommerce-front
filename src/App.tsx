import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import { Landing } from './components/landing/Landing'
import { Purchase } from './components/purchase/Purchase'
import { CGU } from './components/CGU/CGU'
import './components/style.scss';


export function App() {

  useEffect(() => {
    initializeReactGA()
  }, [])

  function initializeReactGA() {
    ReactGA.initialize('UA-169275626-2');
    ReactGA.pageview('/');
    ReactGA.pageview('/commander');
  }

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/commander" component={Purchase} />
      <Route path="/CGU" component={CGU} />
    </Switch>
  );
}