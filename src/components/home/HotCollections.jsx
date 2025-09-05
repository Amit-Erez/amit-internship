import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Slider from "../UI/Slider";

const HotCollections = () => {
  const [nfts, setNfts] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    async function getNfts() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        if (isMounted.current) {
          setNfts(Array.isArray(data) ? [...data] : []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (isMounted.current) {
          setNfts([]);
        }
      }
    }
    getNfts();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider nfts={nfts} />
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
