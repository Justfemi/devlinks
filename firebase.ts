import { initializeApp } from 'firebase/app';
import { clientConfig } from './config';
import { getAuth } from 'firebase/auth';

const app = initializeApp(clientConfig);
const auth = getAuth(app)

export { app, auth };