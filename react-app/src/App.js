import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// components
import NavBar from './components/NavBar/index.js';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Users/UsersList';
import User from './components/Users/User';
import SplashPage from './components/SplashPage';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Footer from './components/Footer';

// import thunk
import { authenticateUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticateUser());
    setLoaded(true);
  }, [dispatch]);

  if (!loaded) {
    return <h1 className='loading'>Loading DOT...</h1>;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div className='btwn-nav-footer'>
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/signup' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute
            path='/users'
            exact={true}
            authenticated={!!sessionUser}
          >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute
            path='/users/:userId'
            exact={true}
            authenticated={!!sessionUser}
          >
            <User />
          </ProtectedRoute>
          <Route path='/' exact={true}>
            <SplashPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
