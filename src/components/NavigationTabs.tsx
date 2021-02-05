import React from 'react'
import {
  addCircleOutline,
  listCircleOutline,
  personOutline,
} from 'ionicons/icons'
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonTabs,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

const NavigationTabs: React.FC<{ isUserLogged: boolean }> = ({
  isUserLogged,
  children,
}) => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>{children}</IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="lists" href="/lists">
            <IonIcon icon={listCircleOutline} />
            <IonLabel>Lists</IonLabel>
          </IonTabButton>
          <IonTabButton tab="add" href="/add">
            <IonIcon icon={addCircleOutline} />
            <IonLabel>Add</IonLabel>
          </IonTabButton>
          {isUserLogged ? (
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={personOutline} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          ) : (
            <IonTabButton tab="login" href="/login">
              <IonIcon icon={personOutline} />
              <IonLabel>Login</IonLabel>
            </IonTabButton>
          )}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )
}

export default NavigationTabs
