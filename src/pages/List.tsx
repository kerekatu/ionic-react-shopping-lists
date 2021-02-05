import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory, useParams } from 'react-router'
import Layout from '../components/Layout'
import firebase from '../lib/firebase'

const List: React.FC = () => {
  const [user, loading] = useAuthState(firebase.auth())
  const [list, setList] = useState<{
    createdAt: number
    date: string
    id: string
    name: string
    owner: string
    products?: any[]
  }>()
  const params: { id: string } = useParams()
  const [formValues, setFormValues] = useState({
    name: '',
    price: '',
    amount: '',
  })
  const history = useHistory()

  useEffect(() => {
    firebase
      .firestore()
      .collection('lists')
      .doc(params.id)
      .get()
      .then((doc: any) => {
        if (!doc.exists) return

        setList(doc.data())
      })
      .catch((error) => console.log(error))
  }, [params.id])

  if (loading || !list) return <></>

  const addProduct = async () => {
    try {
      if (!formValues.name) return

      await firebase
        .firestore()
        .collection('lists')
        .doc(params.id)
        .update({
          products: firebase.firestore.FieldValue.arrayUnion(
            ...[
              {
                name: formValues.name,
                price: formValues.price || 0,
                amount: formValues.amount || 1,
              },
            ]
          ),
        })
        .then(() => history.go(0))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProduct = async (product: {
    name: string
    price: string
    amount: string
  }) => {
    try {
      await firebase
        .firestore()
        .collection('lists')
        .doc(params.id)
        .update({
          products: firebase.firestore.FieldValue.arrayRemove({
            name: product.name,
            price: product.price,
            amount: product.amount,
          }),
        })
        .then(() => history.go(0))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title={`List - ${list.name}`}>
      <IonGrid className="ion-margin">
        <IonRow className="ion-justify-content-center">
          <IonCol sizeLg="8" size="12">
            <IonCard className="ion-padding">
              <IonCardHeader>
                <IonCardTitle color="dark">Add Product</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel position="floating">Name</IonLabel>
                  <IonInput
                    name="name"
                    onIonChange={(e) =>
                      setFormValues({ ...formValues, name: e.detail.value! })
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Price (per product)</IonLabel>
                  <IonInput
                    type="number"
                    name="price"
                    onIonChange={(e) =>
                      setFormValues({ ...formValues, price: e.detail.value! })
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Amount</IonLabel>
                  <IonInput
                    type="number"
                    name="amount"
                    onIonChange={(e) =>
                      setFormValues({ ...formValues, amount: e.detail.value! })
                    }
                  />
                </IonItem>
                <IonButton className="ion-margin-top" onClick={addProduct}>
                  Submit Product
                </IonButton>
              </IonCardContent>
            </IonCard>
            <IonCard className="ion-padding">
              <IonCardHeader>
                <IonCardTitle color="dark">Products</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {list.products && list.products.length !== 0 ? (
                  list.products.map((product, index) => (
                    <IonItemSliding className="ion-margin-top" key={index}>
                      <IonItemOptions side="end">
                        <IonItemOption
                          color="danger"
                          expandable
                          onClick={() => deleteProduct(product)}
                        >
                          Delete
                        </IonItemOption>
                      </IonItemOptions>
                      <IonItem>
                        <IonCol>
                          <IonText>
                            <h2>{product.name}</h2>
                          </IonText>

                          <IonText>
                            <h3>Price: {product.price}</h3>
                          </IonText>
                          <IonText>
                            <h3>Amount: {product.amount}</h3>
                          </IonText>
                        </IonCol>
                      </IonItem>
                    </IonItemSliding>
                  ))
                ) : (
                  <IonText color="medium">The shopping list is empty</IonText>
                )}
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Layout>
  )
}

export default List
