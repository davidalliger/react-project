import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from './store/session';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(async() => {
    await dispatch(restoreUser());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
            <Route path='/login'>
              <LoginFormPage />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
