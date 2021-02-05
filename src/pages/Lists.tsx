import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonDatetime,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router'
import Layout from '../components/Layout'
import firebase from '../lib/firebase'

const Lists: React.FC = () => {
  const [user, loading] = useAuthState(firebase.auth())
  const history = useHistory()
  const [lists, setLists] = useState([] as any)
  const [selectedDate, setSelectedDate] = useState<{
    start: string
    end: string
  }>({ start: '', end: '' })
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    firebase
      .firestore()
      .collection('lists')
      .where('owner', '==', user.uid)
      .onSnapshot((snapshot) => {
        const results: any[] = []
        snapshot.forEach((doc) => results.push({ ...doc.data(), id: doc.id }))
        setLists(results)
      })
  }, [user])

  if (loading) return <></>

  const filterPrices = (list: any) => {
    const prices = list?.products?.map(
      (product: { price: string; amount: string }) =>
        +product.price * +product.amount
    )
    return prices.reduce((a: number, b: number) => a + b, 0)
  }

  const filterByDate = async () => {
    await firebase
      .firestore()
      .collection('lists')
      .where('date', '>=', selectedDate.start)
      .where('date', '<=', selectedDate.end)
      .onSnapshot((snapshot) => {
        const results: any[] = []
        snapshot.forEach((doc) => results.push({ ...doc.data(), id: doc.id }))
        setLists(results)
      })
  }

  return (
    <Layout title="Shopping Lists">
      <IonGrid className="ion-margin">
        <IonRow className="ion-justify-content-center">
          <IonCol sizeLg="8" size="12">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <IonButton onClick={() => setOpenFilter(!openFilter)}>
                    Filter by Date
                  </IonButton>
                </IonCardTitle>
              </IonCardHeader>

              {openFilter && (
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">Date Start</IonLabel>
                    <IonDatetime
                      value={selectedDate.start}
                      onIonChange={(e) =>
                        setSelectedDate({
                          ...selectedDate,
                          start: e.detail.value!,
                        })
                      }
                      min={new Date().getFullYear().toString()}
                      max="2100"
                    ></IonDatetime>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Date End</IonLabel>
                    <IonDatetime
                      value={selectedDate.end}
                      onIonChange={(e) =>
                        setSelectedDate({
                          ...selectedDate,
                          end: e.detail.value!,
                        })
                      }
                      min={new Date().getFullYear().toString()}
                      max="2100"
                    ></IonDatetime>
                  </IonItem>
                  <IonButton className="ion-margin-top" onClick={filterByDate}>
                    Apply Filter
                  </IonButton>
                </IonCardContent>
              )}
            </IonCard>
          </IonCol>
        </IonRow>
        {lists &&
          lists.map(
            (list: {
              createdAt: number
              date: string
              id: string
              name: string
              owner: string
              products?: any[]
            }) => (
              <IonRow className="ion-justify-content-center" key={list.id}>
                <IonCol sizeLg="8" size="12">
                  <IonCard
                    button={true}
                    onClick={() => history.push(`/list/${list.id}`)}
                  >
                    <IonCardContent className="ion-padding">
                      <IonText color="dark">
                        <h2>{list.name}</h2>
                      </IonText>
                      <IonText>
                        <h3>
                          Date: {format(new Date(list.date), 'dd/MM/yyyy')}
                        </h3>
                      </IonText>
                      <IonText>
                        <h3>
                          Price: {list.products ? filterPrices(list) : 0} DKK
                        </h3>
                      </IonText>
                      <IonText>
                        <h3>Products: {list?.products?.length ?? 0}</h3>
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            )
          )}
      </IonGrid>
    </Layout>
  )
}

export default Lists
