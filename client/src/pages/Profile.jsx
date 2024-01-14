// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  userUpdateStart,
  userUpdateFail,
  userUpdateSuccess,
  deleteFail,
  deleteStart,
  deleteSuccess,
  logOutFail,
  logOutSuccess,
  logOutStart,
} from "../redux/user/userSlice.js";
import { toast } from "react-toastify";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // notification function
  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });
  };

  // user update function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userUpdateStart());
      const res = await fetch(
        `http://localhost:5000/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(userUpdateFail(data.message));
        return;
      }

      dispatch(userUpdateSuccess(data));
    } catch (error) {
      dispatch(userUpdateFail(error.message));
    }
  };

  //log out functions
  const handleLogOut = async () => {
    try {
      dispatch(logOutStart());
      const url = "http://localhost:5000/api/user/signuot";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success === false) {
        dispatch(logOutFail(data.message));
        return;
      }
      dispatch(logOutSuccess(data));
    } catch (error) {
      dispatch(logOutFail(error.message));
    }
  };

  // user delete function
  const handleDelete = async () => {
    try {
      dispatch(deleteStart());
      const url = `http://localhost:5000/api/user/delete/${currentUser._id}`;
      const res = await fetch(url, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteFail(data.message));
        return;
      }
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFail(error.message));
    }
  };

  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-center text-2xl my-10 font-semibold">Profile</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className=" rounded-full w-24 h-24 object-cover self-center"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          onChange={handleChange}
          className="outline-none p-2 border rounded-full text-center font-semibold focus-within:shadow"
          type="text"
          defaultValue={currentUser?.name}
          placeholder="Name"
          id="name"
        />
        <input
          onChange={handleChange}
          className="outline-none p-2 border rounded-full text-center font-semibold"
          type="email"
          defaultValue={currentUser?.email}
          placeholder="Email"
          id="email"
        />
        <input
          onChange={handleChange}
          className="outline-none p-2 border rounded-full text-center font-semibold"
          type="password"
          placeholder="Password"
          id="password"
        />
        <button
          className="mt-6 bg-green-500 w-full p-2 rounded-full text-white font-semibold"
          onClick={() => notify("User update successful")}
        >
          Update
        </button>
        <Link to="/create-listing">
          <button className="mt-2 bg-gray-600 w-full p-2 rounded-full text-white font-semibold">
            Create Listing
          </button>
        </Link>
      </form>
      <div className="flex justify-between my-2">
        <span
          onClick={() => {
            notify("Account deleted successfully");
            handleDelete();
          }}
          className="bg-red-500 p-2 rounded-full  text-white m-1 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleLogOut}
          className="bg-green-500 p-2 px-4 rounded-full  text-gray-300 m-1 cursor-pointer"
        >
          Log Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
