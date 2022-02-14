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
import DeleteSpookingForm from './components/DeleteSpookingForm';
import SpookingDetailPage from './components/SpookingDetailPage';
import PageNotFound from './components/PageNotFound'

function App() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const session = useSelector(state => state.session);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gotSpookings, setGotSpookings] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(async() => {

    await dispatch(restoreUser());
    await dispatch(getHaunts());
    // await dispatch(getSpookings(sessionUser));
    // if (isLoading) {
    setIsLoaded(true);
    // }
    return () => setIsLoaded(false);
  }, []);

  useEffect(async() => {
    console.log('Inside use effect!');
    if (sessionUser) {
      console.log('Trying to get spookings')
      const spookings = await dispatch(getSpookings(sessionUser));
      console.log('spookings is ', spookings);
    }
    setReady(true);
    return () => setReady(false);
}, [isLoaded, sessionUser]);

// useEffect(() => {
//   if (isLoaded && gotSpookings) {
//     setReady(true);
//   }
// }, [gotSpookings, isLoaded, session])

  console.log('isLoaded? ', isLoaded);
  // console.log('gotSpookings? ', gotSpookings);
  console.log('ready? ', ready);
  console.log('sessionUser is ', sessionUser)
  return (
    <>
      {ready && (
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
            <Route path='/spookings/:spookingId/delete'>
                <DeleteSpookingForm />
            </Route>
            <Route path='/spookings/:spookingId'>
                <SpookingDetailPage />
            </Route>
            <Route path='/spookings'>
                <SpookingsPage />
            </Route>
            <Route>
                <PageNotFound />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
