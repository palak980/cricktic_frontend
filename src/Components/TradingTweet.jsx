import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import LazyLoad from 'react-lazyload';

function TweetEmbed() {
  const [tweetData, setTweetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get('https://65.1.75.185/manual_news/get_post_twitter/')
      .then(response => {
        console.log(response);
        setTweetData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const extractTweetId = tweetData => {
    const regex = /twitter\.com\/[^/]+\/status\/(\d+)/;
    const match = tweetData.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="container-fluid">

      <div className="container">
        {loading ? (
          <center><p>Loading data...</p></center>

        ) : (
          tweetData.length > 0 &&
          tweetData.map((tweet, index) => (
            <LazyLoad key={index}>
              <TwitterTweetEmbed tweetId={extractTweetId(tweet.chtml)} />
            </LazyLoad>
          ))
        )}
      </div>
    </div>
  );
}

export default TweetEmbed;
