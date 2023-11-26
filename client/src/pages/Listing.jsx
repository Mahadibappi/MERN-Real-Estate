/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Listing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageError, setImageError] = useState(false);
  // imge upload functions
  const handleFiles = (e) => {
    if (files.length > 0 && files.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageError(false);
        })
        .catch((error) => {
          setImageError("Image upload failed (max image size 2mb )");
        });
    } else {
      setImageError("You can only upload 6 Images per list");
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  // Image delete function
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-center text-4xl p-3 font-semibold mt-5">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-6 p-2 mt-5">
        {/* //description start  */}
        <div className=" flex flex-col flex-1 gap-3 mt-2">
          <input
            className=" px-5 py-2 rounded-lg font-semibold outline-none"
            type="text"
            placeholder="name"
            id="name"
            required
          />
          <textarea
            className=" px-5 py-2 rounded-lg font-semibold outline-none"
            type="text"
            placeholder="description"
            id="description"
            required
          />
          <input
            className=" px-5 py-2 rounded-lg font-semibold outline-none"
            type="text"
            placeholder="address"
            id="address"
            required
          />

          <div className=" flex  flex-col flex-1 gap-3">
            <div className="p-3 flex gap-2 flex-wrap">
              <div className=" flex items-center gap-2">
                <input className="w-5 h-6" type="checkbox" />
                <span className="text-lg ">sell</span>
              </div>
              <div className=" flex items-center gap-2">
                <input className="w-5 h-6" type="checkbox" />
                <span className="text-lg ">Rent</span>
              </div>
              <div className=" flex items-center gap-2">
                <input className="w-5 h-6" type="checkbox" />
                <span className="text-lg ">Parking Spot</span>
              </div>
              <div className=" flex items-center gap-2">
                <input className="w-5 h-6" type="checkbox" />
                <span className="text-lg ">Furnished</span>
              </div>
              <div className=" flex items-center gap-2">
                <input className="w-5 h-6" type="checkbox" />
                <span className="text-lg ">Offer</span>
              </div>
            </div>
            <div className=" flex items-center">
              <div className=" flex items-center">
                <input
                  className="w-16 h-10 rounded-lg text-center"
                  type="number"
                  id="beds"
                />
                <span className="m-2 text-1xl ">Beds</span>
              </div>
              <div className="">
                <input
                  className="w-16 h-10 rounded-lg text-center"
                  type="number"
                  id="beds"
                />
                <span className="m-2 text-1xl ">Baths</span>
              </div>
            </div>
            <div className="my-5">
              <div>
                <input
                  className="w-18 h-10 rounded-lg text-center"
                  type="number"
                  id="beds"
                />
                <span className="m-2 text-1xl ">Regular Price</span>
              </div>
              <div className="mt-5">
                <input
                  className="w-18 h-10 rounded-lg text-center"
                  type="number"
                  id="beds"
                />
                <span className="m-2 text-1xl ">Discount Price</span>
              </div>
            </div>
          </div>
        </div>
        {/* //description end  */}
        <div className=" flex flex-col flex-1 gap-6">
          <h2 className="text-1xl">
            <span className="text-2xl ml-2">Image:</span> The first image will
            be cover (max 6 images)
          </h2>
          <div className="flex justify-center items-center">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="border p-3 rounded-md ml-2 sm:w-10/12"
              type="file"
              multiple
              accept="image/*"
            />
            <button
              type="button"
              onClick={handleFiles}
              className=" m-2 border p-3 rounded-md text-white bg-green-700  shadow-md "
            >
              Upload
            </button>
          </div>
          <p className="text-red-700 ml-2">{imageError && imageError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                className=" flex justify-between p-3 items-center border rounded-lg ml-2 w-10/12 h-1/4"
                key={index}
              >
                <img
                  src={url}
                  alt="list image"
                  className="w-24 h-24 object-contain rounded-md  "
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="text-gray-200 bg-red-600 p-2 hover:opacity-90 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className=" m-2 border p-3 rounded-md text-white bg-gray-600 hover:bg-gray-800 sm:w-10/12">
            Crate Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default Listing;
