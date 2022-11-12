
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, StorageReference, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCJzXHk8Xjzn6Rs1EW7AtcTvnef5x8MpiE",
    authDomain: "upload-storage-gk.firebaseapp.com",
    projectId: "upload-storage-gk",
    storageBucket: "upload-storage-gk.appspot.com",
    messagingSenderId: "725290773001",
    appId: "1:725290773001:web:23b79bc307c8ad0fe9e6d8"
  };
  
export default function Upload() {
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    console.log({selectedFile}); 
    const handleUpload = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault(); 
        if(!selectedFile) {
            alert("Please select a file first!")
            return
        }
        //connect to firebase project 
        const app = initializeApp(firebaseConfig); 
        //connect to our storage bucket
        const storage = getStorage(app);
        //create a reference to our file in storage
        const filename: string = selectedFile?.name;
        const imageRef: StorageReference = ref (storage, 'photos/' + filename); 
        //(Todd's quick cheat) create the url from reference
        const url = `https://firebasestorage.googleapis.com/v0/b/upload-storage-cgl.appspot.com/o/photos%2F${filename}?alt=media`
        //upload file to bucket
        uploadBytes(imageRef, selectedFile);
        //uploadBytes is a promise and we need to add .then .then . catch or async await/ add await or .then update our database with url
    
    }
    return (
        <form onSubmit={handleUpload}>
            <input type="file" name="photo"
            onChange={(e: React.FormEvent<HTMLInputElement> | any ) => setSelectedFile(e.CurrentTarget.files[0])}
            //value={selectedFile} 
            />
            <button type="submit">Upload</button>
        </form>
    )
}