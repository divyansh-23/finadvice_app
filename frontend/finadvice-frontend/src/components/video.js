import React from "react";
import { Player } from 'video-react';
import { useLocation } from 'react-router-dom'
import 'video-react/dist/video-react.css';
import YouTube from 'react-youtube';


export default function VideoPlayer() {
    const location = useLocation();
    const { module } = location.state;
    const opts = {
        height: '500',
        width: '1200',
        playerVars: {
            autoplay: 1,
        }
    };
    const url = module.media_url;
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
            <h1 className="mt-6 text-2xl float-left">{module.name}</h1>


        </div>
        
    );
    
}