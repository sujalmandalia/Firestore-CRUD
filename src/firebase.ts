import admin from "firebase-admin"
import { getFirestore } from 'firebase-admin/firestore';
import  serviceAccount  from "../service-key.json"


admin.initializeApp({
  credential:admin.credential.cert(serviceAccount as admin.ServiceAccount)
})

const db = getFirestore();

export {db}
