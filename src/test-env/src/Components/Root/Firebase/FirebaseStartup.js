import {useEffect} from 'react';
import {initializeApp} from 'firebase/app';
import firebaseConfig from "../../../Config/FIREBASE_CONFIG.json";

const FirebaseStartup = () => {

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  return null;
}

export default FirebaseStartup;
