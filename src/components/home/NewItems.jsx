import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SliderNews from "../UI/SliderNews";

const NewItems = () => {
  const [news, setNews] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    async function getNews() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        if (isMounted.current) {
          setNews(Array.isArray(data) ? [...data] : []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (isMounted.current) {
          setNews([]);
        }
      }
    }
    getNews();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <SliderNews news={news} />
        </div>
      </div>
    </section>
  );
};

export default NewItems;
