import React, { useState, useEffect } from 'react';
import  YTSearch  from "youtube-api-search";

const API_KEY= process.env.YT_API_KEY;

const VideoSearch = () => {
  
  const [videoID, setVideoID] = useState("");

  useEffect(() => {

  const videoSearch = (term) => {
    YTSearch({ key: API_KEY, term: term }, videos => {
      const firstVideoResult = videos[1];
      const videoValues = Object.values(firstVideoResult);

      setVideoID(firstVideoResult);
      console.log(firstVideoResult);
      console.log(videoValues);
    });
  };

  console.log(videoID);

  videoSearch("little l");

}, []);
   

const [videoUrl, setVideoUrl] = useState("");
const embedURL = "https://www.youtube.com/embed/";
let videoCode;

    if (videoUrl) {
    videoCode = embedURL.concat(videoUrl.split("v=")[1].split("&")[0]);
    };

    //note to tweak the above - need to concat the video ID only, something like
    // videoCode = embedURL.concat(video.id)
  


const searchHandler = (term) =>{
 // need to pass the 'term' through the onclick submit in here and set that as the setVideoID state
 //then take that and append/concat that to embedURL variable above
  setVideoID(term);

};

  return (
    <div>
      <p>VideoSearch</p>
      <p>{videoID}</p>
      <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search in Youtube" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(event) => videoSearch(event.target.value)}></input>
      <button class="btn btn-outline-secondary" value = {videoCode} onChange={(event) => setVideoUrl(event.target.value)} type="button" id="button-addon2">Search</button>
      </div>
      <input type="text" placeholder="Youtube URL" className="form-control mb-2" value = {videoCode} onChange={(event) => setVideoUrl(event.target.value)}/>
                {console.log(videoUrl)}
                    { !videoUrl || videoUrl== "" ? <p>Add your video above</p> : ""}
                    <div class="ratio ratio-16x9">
                      <iframe src={videoCode} allow="autoplay;" value="player" allowfullscreen></iframe>
                    </div>
    </div>
  )
  
};

export default VideoSearch