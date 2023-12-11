/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Listing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "sale",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const { currentUser } = useSelector((state) => state.user);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // image upload functions
  const handleFiles = (e) => {
    if (files.length > 0 && files.length < 7) {
      setLoading(true);
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
          setLoading(false);
        })
        .catch((error) => {
          setImageError("Image upload failed (max image size 2mb )");
          setLoading(false);
        });
    } else {
      setImageError("You can only upload 6 Images per list");
      setLoading(false);
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

  //notification
  const notify = () => {
    toast.success("Listing created successfully", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };
  // Image delete function
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  // form submit functions
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }
      setLoading(true);
      setError(false);
      const url = "http://localhost:5000/api/listing/create";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
      notify();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-center text-4xl p-3 font-semibold mt-5">
        Create Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-6 p-2 mt-5"
      >
        {/* //description start  */}
        <div className=" flex flex-col flex-1 gap-3 mt-2">
          <input
            className=" px-5 py-2 rounded-lg font-semibold outline-none"
            type="text"
            placeholder="name"
            onChange={handleChange}
            value={formData.name}
            id="name"
            required
          />
          <textarea
            className=" px-5 py-2 rounded-lg font-semibold outline-none"
            type="textarea"
            placeholder="description"
            onChange={handleChange}
            value={formData.description}
            id="description"
            required
          />
          <input
            className=" px-5 py-2 rounded-lg font-semibold outline-none"
            type="text"
            placeholder="address"
            id="address"
            onChange={handleChange}
            value={formData.address}
            required
          />

          <div className=" flex  flex-col flex-1 gap-3">
            <div className="p-3 flex gap-2 flex-wrap">
              <div className=" flex items-center gap-2">
                <input
                  className="w-5 h-6"
                  type="checkbox"
                  id="sale"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span className="text-lg ">Sale</span>
              </div>
              <div className=" flex items-center gap-2">
                <input
                  className="w-5 h-6"
                  type="checkbox"
                  id="rent"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span className="text-lg ">Rent</span>
              </div>
              <div className=" flex items-center gap-2">
                <input
                  className="w-5 h-6"
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span className="text-lg ">Parking Spot</span>
              </div>
              <div className=" flex items-center gap-2">
                <input
                  className="w-5 h-6"
                  type="checkbox"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span className="text-lg ">Furnished</span>
              </div>
              <div className=" flex items-center gap-2">
                <input
                  className="w-5 h-6"
                  type="checkbox"
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span className="text-lg ">Offer</span>
              </div>
            </div>
            <div className=" flex items-center">
              <div className=" flex items-center">
                <input
                  className="w-16 h-10 rounded-lg text-center"
                  type="number"
                  id="bedrooms"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <span className="m-2 text-1xl ">Beds</span>
              </div>
              <div className="">
                <input
                  className="w-16 h-10 rounded-lg text-center"
                  type="number"
                  id="bathrooms"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <span className="m-2 text-1xl ">Baths</span>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center">
                <input
                  className="w-18 h-10 rounded-lg text-center"
                  type="number"
                  id="regularPrice"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p className="mx-2 text-1xl ">Regular Price</p>
                  {formData.type === "rent" && (
                    <span className="text-sm">($/month)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className="mt-5 flex items-center">
                  <input
                    className="w-18 h-10 rounded-lg text-center"
                    type="number"
                    id="discountPrice"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <span className="mx-2 text-1xl ">Discount Price</span>
                    {formData.type === "rent" && (
                      <span className="text-sm">($/month)</span>
                    )}
                  </div>
                </div>
              )}
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
              disabled={loading}
              className=" m-2 border p-3 rounded-md text-white bg-green-700  shadow-md "
            >
              {loading ? "Loading..." : "Upload"}
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
            {loading ? "Creating..." : " Crate Listing"}
          </button>
          {error && <p className="text-red-700 ml-2">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default Listing;
