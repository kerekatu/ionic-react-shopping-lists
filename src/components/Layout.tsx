import React from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

const Layout: React.FC<{
  title: string
}> = ({ title, children }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary" class="ion-text-center">
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  )
}

export default Layout
