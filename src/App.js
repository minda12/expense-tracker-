import './App.css';
import Home from './Home';
import ContextProvider from './ContextProvider';
import Welcome from './Welcome';
import UpdateProfilePage from './UpdateProfilePage'; // Ensure correct path
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useContext } from 'react';
import Context from './Context';


function AppContent() {
  const ctx = useContext(Context);

  return (
    <div className="App">
      {!ctx.Token ? <Home /> : <Welcome />}
      {console.log("AppContent.js", ctx)}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ContextProvider>
        <Switch>
          <Route path="/" exact component={AppContent} />
          <Route path="/UpdateProfilePage" component={UpdateProfilePage}/>
        </Switch>
      </ContextProvider>
    </Router>
  );
}

export default App;
