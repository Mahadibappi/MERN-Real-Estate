import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBed, FaChair, FaParking } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { MdLocalParking } from "react-icons/md";
import { MdChair } from "react-icons/md";
const PreviewList = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const ListingFetch = async () => {
      try {
        setLoading(true);
        const url = `http://localhost:5000/api/listing/showListing/${params.listingId}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.length < 1) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    ListingFetch();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[450px]"
                  style={{
                    background: `url(${url.imageUrls}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="flex flex-col justify-center items-center max-w-4xl mx-auto p-3 my-5 gap-2">
        {listing?.map((list) => (
          // eslint-disable-next-line react/jsx-key
          <>
            <p className="text-2xl text-white lg:ml-[-165px]">
              {list.name} - ${""}
              {list.offer
                ? list.discountPrice.toLocaleString("en-US")
                : list.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>

            <p className=" flex items-center sm:ml-[110px] md:ml-[115px] mx-auto  gap-2 text-md text-white p-2 ">
              <FaMapMarkerAlt className="text-white" />
              {list.address}
            </p>
            <div className=" flex items-center gap-4 mx-auto sm:ml-[125px] md:ml-[115px]">
              <p className="text-sm bg-red-600 text-white px-3 py-1 rounded-md">
                {list.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {list.offer && (
                <p className="text-sm bg-green-600 text-white px-3 py-1  rounded-md">
                  Discount ${+list.regularPrice - +list.discountPrice} Off
                </p>
              )}
            </div>
            <p className=" text-sm sm:ml-[115px] lg:ml-[115px] text-slate-200">
              <span className="font-semibold">Description - </span>
              {list.description}
            </p>
            <ul className=" flex items-center mt-2 gap-4 text-green-700 sm:ml-[-40px] md:ml-[-235px] ">
              <li className="flex  items-center gap-2 text-md ">
                <FaBed className="text-3xl" />
                {list.bedrooms > 1
                  ? `${list.bedrooms} beds`
                  : `${list.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-2">
                <FaBath className="text-2xl" />
                {list.bathrooms > 1
                  ? `${list.bathrooms} baths`
                  : `${list.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-2">
                <FaParking className="text-2xl" />
                {list.parking ? "parking" : "no parking"}
              </li>
              <li className="flex  items-center gap-2">
                <FaChair className="text-2xl" />
                {list.furnished ? "furnished" : "not furnished"}
              </li>
            </ul>
          </>
        ))}
      </div>
    </main>
  );
};

export default PreviewList;
