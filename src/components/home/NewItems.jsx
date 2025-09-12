import React from "react";
import SliderNews from "../UI/SliderNews";
import { useApiData } from "../../../src/hooks/useApiData";

const NewItems = () => {
  const { data: news } = useApiData(
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
  );

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <div data-aos="fade" data-aos-easing="linear">
                <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
              </div>
              <SliderNews news={news} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
