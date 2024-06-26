import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { updateUserStart, updateUserSuccess, updateUserFailure, 
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signoutUserStart, signoutUserSuccess, signoutUserFailure, resetUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStorage } from "../hooks/useUsageStorageHook";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const {uploadFile, filePerc, fileUploadError} = useStorage();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  
  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

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
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch(error) {
      dispatch(deleteUserFailure(error.message))
    }
  };
  
  const hanldeSignOut = async () => {
    try{
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
      dispatch(resetUser());
      navigate("/signin", { replace: true});
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try{
      setShowListingsError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json()
      if(data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch(error) {
      showListingsError(true);
    }
  };

  const  handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if(data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId ));
    } catch(error) {
      console.log(error.message)
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
          <button disabled={loading} className="bg-slate-700 text-white rounded-lg 
          p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading..." : "Update"}</button>
          <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
           to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={hanldeSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "User successfully updated!" : ""}</p>
      <button className="text-green-700 w-full" onClick={handleShowListings}>Show Listing</button>
      <p className="text-red-700 mt-5">{showListingsError ? "Error showing listing" : ""}</p>
      {userListings && userListings.length > 0 && 
        <div className="flex flex-col gap-3">
          <h1 className="text-center my-7 text-2xl font-semibold">Your Listings</h1>
          {userListings.map((listing)=> 
          <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain"/>
            </Link>
            <Link to={`/listing/${listing._id}`} className="text-slate-700 font-semibold flex-1 hover:underline truncate">
              <p >{listing.name}</p>
            </Link>
            <div className="flex flex-col item-center"> 
              <Link to={`/update-listing/${listing._id}`}>            
                <button className="text-green-700">Edit</button>
              </Link>
              <button className="text-red-700" onClick={() => handleListingDelete(listing._id)}>Delete</button>
            </div>
          </div> 
          )}
        </div>
      }
    </div>
  )
}