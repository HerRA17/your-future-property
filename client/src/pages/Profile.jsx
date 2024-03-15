import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  console.log(filePerc);
  console.log(file);
  console.log(formData);
  console.log(fileUploadError);

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = () => {
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
        setFormData({...formData, avatar: downloadURL })
      );
    }
  );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input 
        type="file" ref={fileRef}
        hidden 
        accept="image/*" 
        onChange={(e) => setFile(e.target.files[0])}/>
        <img src={formData || currentUser.avatar} alt="profile-image" onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
          <p className="text-small self-center">
            {fileUploadError ? 
            (<span className="text-red-700">Error Image Upload (image must be less than 2 mb)</span>) :
              filePerc > 0 && filePerc < 100 ?
            (<span className="text-slate-700">
              {`Uploading ${filePerc}%`}
            </span>) :
            filePerc === 100 ? 
            (<span className="text-green-700">
              successfully uploaded!
            </span>)
            :
            ""
            }
          </p>
          <input type="text" defaultValue={currentUser.username} onChange={handleChange}
           placeholder="username" id="username" className="border p-3 rounded-lg"/>
          <input type="email" defaultValue={currentUser.email} onChange={handleChange}
           placeholder="email" id="email" className="border p-3 rounded-lg"/>
          <input type="password" placeholder="password"
           id="password" className="border p-3 rounded-lg"/>
          <button disabled={loading} className="bg-slate-700 text-white rounded-label 
          p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading..." : "Update"}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700">Delete Account</span>
        <span className="text-red-700">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "User successfully updated!" : ""}</p>
    </div>
  )
}
