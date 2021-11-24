//Firebase class to handle login, register with Firebase Auth and DB with Firestore

// Import the needed firebase functions from their respective SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, signOut, signInWithPopup,getRedirectResult, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getFirestore, collection, getDoc, addDoc, setDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js';

class Firebase{
    
    constructor(){
        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAV-5GJuYiVo_Sdk0MR-jH_WtfDYUmOSe4",
            authDomain: "music-dashboard-d1b3f.firebaseapp.com",
            databaseURL: "",
            projectId: "music-dashboard-d1b3f",
            storageBucket: "music-dashboard-d1b3f.appspot.com",
            messagingSenderId: "422642480319",
            appId: "1:422642480319:web:bd86f8d4e4146851b8420a",
            measurementId: "G-TD3XB42C0P"
        };
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
        //Google Authorization
        this.provider = new GoogleAuthProvider();
    }

    //startup Firebase Auth and Firestore
    initializeFirebase = async () => {
        this.auth = await getAuth();
        this.user = this.auth.currentUser;
        
        //get Firestore db
        this.db = getFirestore(this.app);
    }

    //check if user in DB, add if they're not there and return their faves
    getUserData = async () => {
        const docRef = doc(this.db, "users", this.user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().favs;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            const newUser = await setDoc(doc(this.db, "users", this.user.email), {
                favs: []
            });
                return [];
            }
    }

    //update user data
    removeFave = (artist) => {
        this.favs = [...this.favs.filter(fav => fav !== artist)]
        this.writeData()
    }

    //update user data
    addFave = (artist) => {
        this.favs.push(artist);
        this.writeData()
    }

    //write data to firestore
    writeData = async () => {
        //Firestore Write Code
        try {
            const userRecord = doc(this.db, "users", this.user.email);

            // Set the "capital" field of the city 'DC'
            await updateDoc(userRecord, {favs: this.favs});
              } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    //sign out user
    signUserOut = async () => {
        try {
            await signOut(this.auth)
            console.log('signed out')
            this.user = null;
        }catch{(error) => {
            // An error happened.
            }      
        }
    }

    //sign in user
    signIn = async () => {
        try{
            const result = await signInWithPopup(this.auth, this.provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = await GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            this.user = result.user;
            this.favs = await this.getUserData();
            return null;
        }catch{
            (error) => {
                return error;
            }
        }
    }

}

export default Firebase;