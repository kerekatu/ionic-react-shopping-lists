import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

type User = {
  email: string
  password: string
}

// TODO: Change to Env Variables (not sure how to expose them in TypeScript - gives undefined)
const firebaseConfig = {
  apiKey: 'AIzaSyCNiuU7zWrx2_u-U9aBK90aREH8krx2lr0',
  authDomain: 'shoppo-903ae.firebaseapp.com',
  databaseURL: 'https://shoppo-903ae-default-rtdb.firebaseio.com',
  projectId: 'shoppo-903ae',
  storageBucket: 'shoppo-903ae.appspot.com',
  messagingSenderId: '37985949594',
  appId: '37985949594:web:e54205334a61d34da1cc23',
  measurementId: 'G-Q91T32FRW7',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const registerUser = (user: User) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((newUser) => {
      return firebase
        .firestore()
        .collection('users')
        .doc(newUser.user!.uid)
        .set({
          email: newUser.user!.email,
        })
    })
    .catch((error) => console.log(error))
}

export const loginUser = (user: User) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .catch((error) => error)
}

export const logoutUser = () => {
  return firebase.auth().signOut()
}

export default firebase
