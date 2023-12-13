import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const PreviewList = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  console.log(listing);
  const [error, setError] = useState(false);
  useEffect(() => {
    const ListingFetch = async () => {
      try {
        const url = `http://localhost:5000/api/listing/showListing/${params.listingId}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success === false) {
          return setError(data.message);
        }
        setError(false);
        setListing(data);
      } catch (error) {
        setError(error.message);
      }
    };
    ListingFetch();
  }, [params.listingId]);
  return (
    <div>
      PreviewList
      <div>
        {listing?.map((list) => (
          // eslint-disable-next-line react/jsx-key
          <p>{list.name}</p>
        ))}
      </div>
    </div>
  );
};

export default PreviewList;
