import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import Timer from "./Timer";

const SliderNews = ({ news }) => {

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

  const newsKey = news === null ? "skeleton" : `loaded-${news.length}`;

  const content =
    news === null
      ? new Array(7).fill(0).map((_, index) => (
          <div className="nft__item" key={index}>
            <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
                <i className="fa fa-check"></i>
            </div>
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
                <Skeleton height="200px" width="100%" borderRadius="10px" />
            </div>
            <div className="nft__item_info">
                <h4>
                  <Skeleton width="80px" height="18px" />
                </h4>
              <div className="nft__item_price">
                <Skeleton width="50px" height="18px" />
              </div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>
                  <Skeleton width="15px" height="10px" />
                </span>
              </div>
            </div>
          </div>
        ))
      : news.length === 0
      ? [
          <p key="empty" className="text-center">
            No collections found.
          </p>,
        ]
      : news.map((item) => (
          <div className="nft__item" key={item.id}>
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Creator: Monica Lucas"
              >
                <img className="lazy" src={item.authorImage} loading="lazy" alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">
              <Timer timeleft={item.expiryDate - Date.now()} />
            </div>
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  loading="lazy"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price}</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        ));

  return  (
    <ReactOwlCarousel key={newsKey} className="owl-theme" {...options}>
      {content}
    </ReactOwlCarousel>
  ) 
};

export default SliderNews;
