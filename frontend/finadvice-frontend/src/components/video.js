import React from "react";
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import YouTube from 'react-youtube';
export default function VideoPlayer() {
    const opts = {
        height: '500',
        width: '1200',
        playerVars: {
            autoplay: 1,
        }
    };
    // _onReady((event) => {
    //     // access to player in all event handlers via event.target
    //     event.target.pauseVideo();
    // });
    // const url = "https://www.youtube.com/watch?v=9kpg2_JYRZQ&list=PLT6_Bt_TKitIUCEsI-3SGCrVHCy0g_5jd";
    const url = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
    const youtube_parser = ((url) =>{
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length===11)? match[7] : false;
    });

    return(
        <div className="container mx-auto mt-8">
            {
                youtube_parser(url)!==false? 
            
                <YouTube videoId={youtube_parser(url)} opts={opts} />
                :
                <Player
                    fluid={false}
                    width={1200}
                    height={500}
                >
                    <source src={url} />
                </Player> 
            }
            <h1 className="mt-6 text-2xl float-left">What are stocks and how does it work?</h1>


        </div>
        
    );
    
}