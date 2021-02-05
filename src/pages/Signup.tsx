import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Layout from '../components/Layout'
import { registerUser } from '../lib/firebase'

const Signup: React.FC = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const history = useHistory()

  return (
    <Layout title="Sign up">
      <IonGrid className="ion-margin">
        <IonRow className="ion-justify-content-center">
          <IonCol sizeLg="6" sizeSm="12">
            <IonCard className="ion-padding">
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  name="email"
                  onIonChange={(e) =>
                    setFormValues({ ...formValues, email: e.detail.value! })
                  }
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  name="password"
                  onIonChange={(e) =>
                    setFormValues({ ...formValues, password: e.detail.value! })
                  }
                />
              </IonItem>
              <IonButton
                className="ion-margin-top"
                onClick={() => {
                  registerUser(formValues)
                  history.push('/lists')
                }}
              >
                Sign up
              </IonButton>
              <IonButton
                color="dark"
                fill="outline"
                className="ion-margin-top"
                onClick={() => history.push('/login')}
              >
                Login
              </IonButton>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Layout>
  )
}

export default Signup
