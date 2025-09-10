import React, { useEffect, useState, useRef } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    isMounted.current = true;
    setLoading(true);

    async function getDetails() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      );
      try {
        if (isMounted.current) {
          setDetails(data ? { ...data } : {});
        }
      } catch (err) {
        console.error("No Data Found", err);
        setError(err);
        setDetails({});
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    }
    getDetails();

    return () => {
      isMounted.current = false;
    };
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">

                {loading ? (
                  <Skeleton className="img-fluid img-rounded mb-sm-30 nft-image"
                   width="600px" height="464px" />
                ) : (
                  <img
                    src={details.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}

              </div>
              <div className="col-md-6">
                <div className="item_info">

                  {loading ? (
                    <h2>
                      <Skeleton width="350px" height="46px" />
                    </h2>
                  ) : (
                    <h2>
                      {details.title} #{details.tag}
                    </h2>
                  )}

                  {loading ? (
                    <div className="item_info_counts">
                      <Skeleton
                        className="item_info_views"
                        width="80px"
                        height="30px"
                      />
                      <Skeleton
                        className="item_info_like"
                        width="80px"
                        height="30px"
                      />
                    </div>
                  ) : (
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {details.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {details.likes}
                      </div>
                    </div>
                  )}

                  {loading ? (
                    <Skeleton width="450px" height="80px" />
                  ) : (
                    <p>{details.description}</p>
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      {loading ? 
                      <Skeleton width="60px" height="16px" />
                      : 
                      <h6>Owner</h6>
                      }
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ?
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                          : 
                          <Link to={`/author/${details.ownerId}`}>
                            <img
                              className="lazy"
                              src={details.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                          }
                        </div>
                        <div className="author_list_info">
                          { loading ?
                          <Skeleton width="60px" height="16px" />
                          :
                          <Link to={`/author/${details.ownerId}`}>
                            {details.ownerName}
                          </Link>
                          }
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      {loading ? 
                      <Skeleton width="60px" height="16px" />
                      : 
                      <h6>Creator</h6>
                      }
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? 
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                          :
                          <Link to={`/author/${details.creatorId}`}>
                            <img
                              className="lazy"
                              src={details.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                          }
                        </div>
                        <div className="author_list_info">
                          {loading ?
                          <Skeleton width="60px" height="16px" />
                          : 
                          <Link to={`/author/${details.creatorId}`}>
                            {details.creatorName}
                          </Link>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    {loading ?
                    <Skeleton width="40px" height="16px" />
                    :
                    <h6>Price</h6>
                    }
                    <div className="nft-item-price">
                      { loading ?
                      <Skeleton width="70px" height="30px" />
                      :
                      <>
                      <img src={EthImage} alt="" />
                      <span>{details.price}</span>
                      </>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
