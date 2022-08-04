import React, { useState, useEffect } from "react";
import YTSearch from "youtube-api-search";

const API_KEY = process.env.YT_API_KEY;

const VideoSearch = () => {
  const [videoID, setVideoID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const embedURL = "https://www.youtube.com/embed/";
  let videoCode = embedURL.concat(videoID);

  const searchYouTube = (term) => {
    console.log(term, searchTerm);
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      const firstVideoResult = videos[0].id.videoId;

      setVideoID(firstVideoResult);
      console.log(firstVideoResult, "returning obj of the first result");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchYouTube(searchTerm);
  };

  return (
    <div className="container"> 
      <div className="input-group mb-3">
      <p>Need help with how to do a chore? Search for tutorial below ...or want to listen to a song, search for that instead!</p>
        <form className="d-flex container">
          
          <input
            type="text"
            className="form-control"
            placeholder="Search in Youtube"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          ></input>
          <p>&nbsp;</p>
          <button
            className="btn"
            onSubmit={handleSubmit}
            onClick={handleSubmit}
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </form>
      </div>
      {console.log(videoID)}
      { !videoCode || videoCode== "" ? "" : 
      <div className="ratio ratio-16x9">
        <iframe src={videoCode} allow="autoplay;" value="player"></iframe>
      </div>
}
    </div>
  );
};

export default VideoSearch;
