import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBed } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
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
      <div className="flex flex-col max-w-4xl text-center mx-auto my-5">
        {listing?.map((list) => (
          // eslint-disable-next-line react/jsx-key
          <>
            <p className="text-2xl text-white">
              {list.name} - ${""}
              {list.offer
                ? list.discountPrice.toLocaleString("en-US")
                : list.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>

            <p className=" flex items-center mx-auto ml-2  gap-2 text-xl text-white p-2 ">
              <FaMapMarkerAlt className=" text-white" />
              {list.address}
            </p>
            <div className=" flex items-center gap-4 mx-auto sm:ml-40 lg:ml-60">
              <p className="text-sm bg-red-600 text-white px-3 rounded-md">
                {list.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {list.offer && (
                <p className="text-sm bg-green-600 text-white px-3 rounded-md">
                  {" "}
                  Discount ${+list.regularPrice - +list.discountPrice} Off
                </p>
              )}
            </div>
          </>
        ))}
      </div>
    </main>
  );
};

export default PreviewList;
