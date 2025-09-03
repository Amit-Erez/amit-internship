import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [nfts, setNfts] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    async function getNfts() {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        if (isMounted.current) {
          setNfts(data);
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

  function showNfts(nfts) {
    return nfts.map((nft, Id) => (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={Id}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <Link to="/item-details">
              <img src={nft.nftImage} className="lazy img-fluid" alt="" />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <img className="lazy pp-coll" src={nft.authorImage} alt="" />
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <h4>{nft.title}</h4>
            </Link>
            <span>ERC-{nft.code}</span>
          </div>
        </div>
      </div>
    ));
  }

  function OwlSlider(nfts) {
    const options = {
      items: 4,
      margin: 10,
      nav: true,
      dots: false,
      loop: true,
    };
    return (
      <OwlCarousel {...options}>
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to="/item-details">
                <img src={nftImage} className="lazy img-fluid" alt="" />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <img className="lazy pp-coll" src={AuthorImage} alt="" />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>Pinky Ocean</h4>
              </Link>
              <span>ERC-192</span>
            </div>
          </div>
        </div>
      </OwlCarousel>
    );
  }

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
        
          {OwlSlider()}
          {showNfts(nfts)}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
