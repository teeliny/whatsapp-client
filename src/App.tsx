import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import { useStateValue } from './stateProvider';

function App() {
  
  const [{ user }, /*dispatch*/] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) :
      (
        <div className="app__body">
          <Router>
                <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <h2 className="welcome">Welcome back....</h2>
              </Route>
            </Switch>
          </Router>
        </div>  
      )}
    </div>
  );
}

export default App;
