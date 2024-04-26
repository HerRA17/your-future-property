import {useState} from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {app} from '../firebase';

export function useStorage() {
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);

    const uploadFile = (file, callbback) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        },
        (error) => {
        setFileUploadError(true);
        },
    
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
            callbback(downloadURL));
        }
      );
      };
      return {uploadFile, filePerc, fileUploadError}
}