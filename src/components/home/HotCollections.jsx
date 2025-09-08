import React from "react";
import Slider from "../UI/Slider";
import { useApiData } from "../../../src/hooks/useApiData"


const HotCollections = () => {

  const { data: nfts } = useApiData(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );


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
