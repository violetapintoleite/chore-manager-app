import React, { useContext, useState } from "react";
import YouTube, { YouTubeProps } from 'react-youtube';

function YTiframe() {

   {/* note - the below turns the URL that someone copies from Youtube's URL bar and makes it embeddable in an iFrame
e.g. URL direct from Youtube site: https://www.youtube.com/watch?v=vyis-EmiZXI
video embed that works: https://www.youtube.com/embed/vyis-EmiZXI */}
                        
const [videoUrl, setVideoUrl] = useState("");
 const embedURL = "https://www.youtube.com/embed/";
  let videoCode;
    if (videoUrl) {
    videoCode = embedURL.concat(videoUrl.split("v=")[1].split("&")[0]);
    };

  return (
    <div>
       <input type="text" placeholder="Youtube URL" className="form-control mb-2" value = {videoCode} onChange={(event) => setVideoUrl(event.target.value)}/>
                {console.log(videoUrl)}
                    { !videoUrl || videoUrl== "" ? <p>Add your video above</p> : ""}
                    <div class="ratio ratio-16x9">
                      <iframe src={videoCode} allow="autoplay;" value="player" allowfullscreen></iframe>
                    </div>
    </div>
  )
};

export default YTiframe


