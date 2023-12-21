/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = ({ list }) => {
  const [LandLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const url = `http://localhost:5000/api/user/${list?.userRef}`;
        const res = await fetch(url);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [list.userRef]);

  return (
    <div>
      {LandLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{LandLord.name} </span>
            for <span className="font-semibold">{list.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here.."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${LandLord.email}?subject=Regarding ${list.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
