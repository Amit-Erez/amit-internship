import React, { useState, useEffect, useRef } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState();
  const [isFollow, setIsFollow] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    let timeoutId;

    async function getAuthor() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        if (isMounted.current) {
          setAuthor( data ? { ...data } : {});
          setFollowers(data.followers);
          timeoutId = setTimeout(() => setLoading(false), 300);
        }
      } catch (err) {
        if (isMounted.current) {
          console.error("Error fetching data:", err);
          setError(err);
          setAuthor({});
          timeoutId = setTimeout(() => setLoading(false), 300);
        }
      } 
    }

    getAuthor();

    return () => {
      isMounted.current = false;
      clearTimeout(timeoutId);
    };
  }, [id]);

  function toggleFollow() {
    setFollowers((prev) => (isFollow ? prev - 1 : prev + 1));
    setIsFollow((prev) => !prev);
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width="160px" height="31px" />
                            <span className="profile_username">
                              <Skeleton width="80px" height="22px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width="200px" height="31px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width="104px" height="26px" />
                        </div>
                        <Skeleton
                          className="btn-main"
                          width="124px"
                          height="42px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} followers
                        </div>
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={toggleFollow}
                        >
                          {isFollow ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    author={author}
                    nftItems={author.nftCollection}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
