import { initializeApp } from 'firebase/app';
import { clientConfig } from './config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const app = initializeApp(clientConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db };