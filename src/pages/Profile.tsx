import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonItem,
  IonRow,
  IonText,
} from '@ionic/react'
import React from 'react'
import Layout from '../components/Layout'
import { logoutUser } from '../lib/firebase'
import firebase from '../lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const Profile: React.FC = () => {
  const [user, loading] = useAuthState(firebase.auth())

  if (loading) return <></>

  return (
    <Layout title="Profile">
      <IonGrid className="ion-margin">
        <IonRow className="ion-justify-content-center">
          <IonCol sizeLg="6" sizeSm="12">
            <IonCard className="ion-padding">
              <IonCardContent>
                <IonRow>
                  <IonText color="dark" class="ion-margin-bottom">
                    <h2>{user.email}</h2>
                  </IonText>
                </IonRow>
                <IonRow>
                  <IonButton onClick={logoutUser}>Logout</IonButton>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Layout>
  )
}

export default Profile
