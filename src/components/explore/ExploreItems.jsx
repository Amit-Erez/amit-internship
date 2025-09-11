import React, { useState } from "react";
import { Link } from "react-router-dom";
import Timer from "../UI/Timer";
import Skeleton from "../UI/Skeleton";
import { useApiData } from "../../hooks/useApiData";

const ExploreItems = () => {
  const [count, setCount] = useState(8);
  const [filter, setFilter] = useState("");

  const { data: exploreNfts } = useApiData(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
  );

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreNfts === null
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
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
            </div>
          ))
        : exploreNfts.length === 0
        ? [
            <p key="empty" className="text-center">
              No collections found.
            </p>,
          ]
        : exploreNfts.slice(0, count).map((exNft) => (
            <div
              key={exNft.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                  to={`/author/${exNft.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={exNft.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  <Timer timeleft={exNft.expiryDate - Date.now()} />
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
                  <Link to={`/item-details/${exNft.nftId}`}>
                    <img
                      src={exNft.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${exNft.nftId}`}>
                    <h4>{exNft.title}</h4>
                  </Link>
                  <div className="nft__item_price">{exNft.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{exNft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        { 
        count === 16 ? 
        null :
        <Link
        to=""
        id="loadmore"
        className="btn-main lead"
        onClick={() =>
          setCount((prevCount) => Math.min(prevCount + 4, exploreNfts.length))
        }
        >
          Load more
        </Link>
        }
      </div>
    </>
  );
};

export default ExploreItems;
