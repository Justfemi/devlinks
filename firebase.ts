import { initializeApp } from 'firebase/app';
import { clientConfig } from './config';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';

const app = initializeApp(clientConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);

export { app, auth, db, storage };