import React, { useState, useEffect } from 'react';
import  YTSearch  from "youtube-api-search";

const API_KEY= process.env.YT_API_KEY

const VideoSearch = () => {
  
  const [videos, setVideos] = useState("");

  useEffect(() => {

  const videoSearch = (term) => {
    YTSearch({ key: API_KEY, term: term }, videos => {
      const videoResults = videos[0].id;

      // setVideos(videoResults);
      console.log(videoResults);
    });
  };

  videoSearch("little l");

}, []);
   
  return (
    <div>
      <p>VideoSearch</p>
      <p>{videos}</p>
      {/* <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
  </div> */}
    </div>
  )
  
};

export default VideoSearch