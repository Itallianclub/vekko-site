import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyCSoaDY-U_8bw7y3nakXylcrigTc9zrUvA',
  appId: '1:977923297552:web:f80c22c3f9345bd3945595',
  authDomain: 'vekko-e1033.firebaseapp.com',
  messagingSenderId: '977923297552',
  projectId: 'vekko-e1033',
  storageBucket: 'vekko-e1033.firebasestorage.app',
};

const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
firebaseAuth.languageCode = "pt-BR";
