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
    const [userName, setUserName] = useState<File | undefined>();
    const [description, setDescription] = useState<File | undefined>();
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
        const url = `https://firebasestorage.googleapis.com/v0/b/upload-storage-gk.appspot.com/o/photos%2F${filename}?alt=media`
        //upload file to bucket
        uploadBytes(imageRef, selectedFile)
    
        {
            "imagePath": url,
            "userName" : userName,
            "description": description
        }

        fetch(`https://express-ts-ee.web.app/add`, { 
            //This is a basic fetch to a .get request. We didn't a lot only a few lines.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'//We need to put in objects, such as the method, we need to tell it is a post request, when we choose JSON it automatically for us the packages. We have to tell the in the headers that it is JSON. 
            },
            body: JSON.stringify(addNewPost)//We use JSON stringify it converts it in actual JSON but all into one string but if converted to a variable you can JSON.parse(msg). We send it JSON stringify to our API.
        }) 
        .then()
        .catch(console.error)


        //uploadBytes is a promise and we need to add .then .then . catch or async await/ add await or .then update our database with url
    
    }
    return (
        <form onSubmit={handleUpload}>
            <input type="text" name="userName" onChange={e: setUserName}
            /> 
            <input type="text" name="description" 
            /> 
            <input type="file" name="photo"
            onChange={(e: React.FormEvent<HTMLInputElement> | any ) => setSelectedFile(e.CurrentTarget.files[0])}
            //value={selectedFile} 
            />
            <button type="submit">Upload</button>
        </form>
    )
}