import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormModal';
import LoginFormModal from './components/LoginFormModal';
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
import Footer from './components/Footer'

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadUserAndHaunts() {
      await dispatch(restoreUser());
      await dispatch(getHaunts());
      setIsLoaded(true);
    };
    loadUserAndHaunts();
    return () => setIsLoaded(false);
  }, [dispatch]);

  useEffect(() => {
    async function loadSpookings() {
      if (sessionUser) {
        await dispatch(getSpookings(sessionUser));
      }
      setReady(true);
    }
    loadSpookings();
    return () => setReady(false);
}, [isLoaded, sessionUser, dispatch]);

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
            {/* <Route path='/login'>
              <LoginFormModal />
            </Route> */}
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
              <HauntDetail isLoaded={isLoaded} />
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
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
