import React from 'react'
import firebase from "firebase";
export default function DatabaseStorage() {
    useEffect(() => {
        const db = firebase.firestore();
        console.log("yaoo");
        return () => {
        console.log("clean up when component unloaded")
        }
    }, [input])
    
    return (
        <div>
            
        </div>
    )
}

