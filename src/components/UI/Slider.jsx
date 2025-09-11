import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
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

  const carouselKey = nfts === null ? "skeleton" : `loaded-${nfts.length}`;

  const content =
    nfts === null
      ? new Array(6).fill(0).map((_, index) => (
          <div className="nft_coll" key={index}>
            <div className="nft_wrap">
                <Skeleton height="200px" width="100%" />
            </div>
            <div className="nft_coll_pp">
                <Skeleton width="60px" height="60px" borderRadius="50%" />
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
                <h4>
                  <Skeleton width="80px" height="18px" />
                </h4>
              <span>
                <Skeleton width="50px" height="18px" />
              </span>
            </div>
          </div>
        ))
      : nfts.length === 0
      ? [
          <p key="empty" className="text-center">
            No collections found.
          </p>,
        ]
      : 
      nfts.map((nft, Id) => (
          <div className="nft_coll" key={Id}>
            <div className="nft_wrap">
              <Link to={`/item-details/${nft.nftId}`}>
                <img src={nft.nftImage} className="lazy img-fluid" loading="lazy" alt="" />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to={`/author/${nft.authorId}`}>
                <img className="lazy pp-coll" src={nft.authorImage} loading="lazy" alt="" />
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
        ));


  return (
    <ReactOwlCarousel key={carouselKey} className="owl-theme" {...options}>
      {content}
    </ReactOwlCarousel>
  )
};

export default Slider;
