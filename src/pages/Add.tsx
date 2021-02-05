import {
  IonButton,
  IonCol,
  IonDatetime,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from '@ionic/react'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router'
import Layout from '../components/Layout'
import firebase from '../lib/firebase'

const Add: React.FC = () => {
  const [user, loading] = useAuthState(firebase.auth())
  const [formValues, setFormValues] = useState({ name: '', date: '' })
  const history = useHistory()

  if (loading) {
    return <></>
  }

  const createList = async () => {
    try {
      if (!formValues.name || !formValues.date) return

      await firebase
        .firestore()
        .collection('lists')
        .add({
          owner: user.uid,
          name: formValues.name,
          date: formValues.date,
          createdAt: new Date().getTime(),
        })
        .then((doc) => history.push(`/list/${doc.id}`))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title="Add List">
      <IonGrid className="ion-margin">
        <IonRow className="ion-justify-content-center">
          <IonCol sizeLg="8" size="12">
            <IonItem className="ion-margin-bottom">
              <IonLabel>List Name:</IonLabel>
              <IonInput
                name="name"
                onIonChange={(e) =>
                  setFormValues({ ...formValues, name: e.detail.value! })
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel>Date:</IonLabel>
              <IonDatetime
                name="date"
                onIonChange={(e) =>
                  setFormValues({ ...formValues, date: e.detail.value! })
                }
                min={new Date().getFullYear().toString()}
                max="2100"
              ></IonDatetime>
            </IonItem>
            <IonButton className="ion-margin-top" onClick={createList}>
              Create List
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Layout>
  )
}

export default Add
