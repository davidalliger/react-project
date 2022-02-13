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
import SpookingsPage from './components/SpookingsPage';
import HauntDetail from './components/HauntDetail';
import AddHauntForm from './components/AddHauntForm';
import EditHauntForm from './components/EditHauntForm';
import DeleteHauntForm from './components/DeleteHauntForm';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user);
  useEffect(async() => {

    await dispatch(restoreUser());
    await dispatch(getHaunts());
    // await dispatch(getSpookings(sessionUser));
    // if (isLoading) {
    setIsLoaded(true);
    // }
    return () => setIsLoaded(false);
  }, []);

  console.log('isLoaded? ', isLoaded);
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
            <Route path='/spookings'>
                <SpookingsPage isLoaded={isLoaded} />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
