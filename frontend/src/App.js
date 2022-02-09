import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from './store/session';
import { getHaunts } from './store/haunts';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import HauntsPage from './components/HauntsPage';
import HauntDetail from './components/HauntDetail';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async() => {
    await dispatch(restoreUser());
    await dispatch(getHaunts());
    setIsLoaded(true);
  }, []);



  return (
    <>
      {isLoaded && (
        <div id='content-wrapper'>
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route exact path='/'>
              <SplashPage />
            </Route>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
            <Route path='/login'>
              <LoginFormPage />
            </Route>
            <Route path='/haunts/:hauntId'>
              <HauntDetail />
            </Route>
            <Route path='/haunts'>
              <HauntsPage />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
