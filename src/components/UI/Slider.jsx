import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import "./Slider.css";
import Skeleton from "./Skeleton";

const Slider = ({ nfts }) => {
  const options = {
    items: 4,
    margin: 10,
    nav: true,
    dots: false,
    loop: true,
    smartSpeed: 200,
    fluidSpeed: true,
    responsiveClass: true, 
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };
  if (!nfts || nfts.length === 0)
    return (
      <ReactOwlCarousel className="owl-theme" {...options}>
        {new Array(6).fill(0).map((_, index) => (
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to="/item-details">
                <Skeleton
                  height="200px"
                  width="300px"
                  className="lazy img-fluid"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <Skeleton
                  width="60px"
                  height="60px"
                  borderRadius="100%"
                  className="lazy pp-coll"
                  alt=""
                />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>
                  <Skeleton width="80px" height="18px" />
                </h4>
              </Link>
              <span>
                <Skeleton width="50px" height="18px" />
              </span>
            </div>
          </div>
        ))}
      </ReactOwlCarousel>
    );

  if (nfts)
    return (
      <ReactOwlCarousel className="owl-theme" {...options}>
        {nfts.map((nft, Id) => (
          <div className="nft_coll" key={Id}>
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
        ))}
      </ReactOwlCarousel>
    );
};

export default Slider;
