import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from './store/session';
import { getHaunts } from './store/haunts';
import { getSpookings } from './store/spookings';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import HauntsPage from './components/HauntsPage';
import HauntDetail from './components/HauntDetail';
import AddHauntForm from './components/AddHauntForm';
import EditHauntForm from './components/EditHauntForm';
import DeleteHauntForm from './components/DeleteHauntForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  console.log('sessionUser is ', sessionUser);
  const spookings = useSelector(state => state.spookings.list);
  useEffect(async() => {
    await dispatch(restoreUser());
    await dispatch(getHaunts());
    setIsLoaded(true);
  }, []);
  useEffect(async() => {
    await dispatch(getSpookings(sessionUser));
  }, [isLoaded, sessionUser]);

  console.log('isLoaded? ', isLoaded);
  console.log('spookings is ', spookings);

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
            <Route exact path='/haunts/new'>
              <AddHauntForm />
            </Route>
            <Route path='/haunts/:hauntId/delete'>
              <DeleteHauntForm />
            </Route>
            <Route path='/haunts/:hauntId/edit'>
              <EditHauntForm />
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
