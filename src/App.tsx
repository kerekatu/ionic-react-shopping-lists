import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IonApp } from '@ionic/react'

import Lists from './pages/Lists'
import List from './pages/List'
import Add from './pages/Add'
import Profile from './pages/Profile'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NavigationTabs from './components/NavigationTabs'
import firebase from './lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const App: React.FC = () => {
  const [user, loading] = useAuthState(firebase.auth())

  if (loading) {
    return <></>
  }

  return (
    <IonApp>
      <NavigationTabs isUserLogged={user}>
        <Route path="/lists" exact>
          {!user ? <Redirect to="/login" /> : <Lists />}
        </Route>
        <Route path="/list/:id">
          {!user ? <Redirect to="/login" /> : <List />}
        </Route>
        <Route path="/add" exact>
          {!user ? <Redirect to="/login" /> : <Add />}
        </Route>
        <Route path="/profile" exact>
          {!user ? <Redirect to="/login" /> : <Profile />}
        </Route>
        <Route path="/login" exact>
          {user ? <Redirect to="/lists" /> : <Login />}
        </Route>
        <Route path="/signup" exact>
          {user ? <Redirect to="/lists" /> : <Signup />}
        </Route>
        <Route
          path="/"
          render={() => <Redirect to={user ? '/lists' : '/login'} />}
          exact
        />
      </NavigationTabs>
    </IonApp>
  )
}

export default App
