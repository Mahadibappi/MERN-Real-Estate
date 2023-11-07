// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-center text-2xl my-10 font-semibold">Profile</h1>
      <form className=" flex flex-col gap-4">
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
          className="outline-none p-2 border rounded-full text-center font-semibold focus-within:shadow"
          type="text"
          placeholder="Name"
          id="name"
        />
        <input
          className="outline-none p-2 border rounded-full text-center font-semibold"
          type="email"
          placeholder="Email"
          id="email"
        />
        <input
          className="outline-none p-2 border rounded-full text-center font-semibold"
          type="password"
          placeholder="Password"
          id="password"
        />
        <button className="mt-6 bg-green-500 w-full p-2 rounded-full text-white font-semibold">
          Update
        </button>
        <button className="mt-2 bg-gray-600 w-full p-2 rounded-full text-white font-semibold">
          Create Listing
        </button>
      </form>
      <div className="flex justify-between my-2">
        <span className="bg-red-500 px-2 p-1 rounded-full font-semibold text-gray-300 m-1 cursor-pointer">
          Delete Account
        </span>
        <span className="bg-green-500 px-2 p-1 rounded-full font-semibold text-gray-300 m-1 cursor-pointer">
          Log Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
