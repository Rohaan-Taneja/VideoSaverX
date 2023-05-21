import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import youtube from "../images/youtube.png"
import audio from "../images/audio.png"


const Downloadelink = (props) => {

    //dd=download details (object)
    const [dd ,setdd ]=useState(
        {
            mb720:"" ,
            dlink720:"",
            storage720:"",
            mb360:"",
            dlink360:"",
            storage360:"",
            mb144 :"",
            dlink144 : "",
            mbaudio:"",
            dlinkaudio:"",
            storageaudio:"",
            banner : ""
        })



      // use effect to call the api , and get the youtube video download links  
      useEffect(() => {
        async function getVideoInfo() {
          const options = {
            method: 'GET',
            url: 'https://youtube-video-download-info.p.rapidapi.com/dl',
            params: {id: props.ytid},
            headers: {
              'X-RapidAPI-Key': '94999765edmsha451b2e882a8b6fp120f48jsnb618a7be4aed',
              'X-RapidAPI-Host': 'youtube-video-download-info.p.rapidapi.com'
            }
          };
          try {
            const response = await axios.request(options);
            console.log(response.data)
            setdd(
                {...dd,

                    banner: response.data.thumb,

                    mb720 : response.data.link[22][2],
                    dlink720 : response.data.link[22][0],

                    mb360 : response.data.link[18][3],
                    dlink360 : response.data.link[18][0],

                    mb144 : response.data.link[17][3],
                    dlink144 : response.data.link[17][0],

                    mbaudio : response.data.link[599][1],
                    dlinkaudio : response.data.link[599][0]

                })

          
           
           
          } catch (error) {
            console.error(error);
          }
        }
        if (props.ytid !== ''  && props.ytid !== undefined) {
          console.log(props.ytid ,"helllo")
          
          getVideoInfo();
          
          //to make the download links visible , when we get the id 
          const dl=document.getElementById("download_detailsid")
          dl.style.display="flex"
          dl.style.transition='1s'
        
        }
      }, [props.ytid]);

      console.log(dd.banner)
  return (
    <div className='download_details' id='download_detailsid'>
      
        <div className='heading'> 
          <img className='youtubeicon' src={youtube} alt="" />
          <div className='heading_text'> Videos </div>
        </div>

  

        <div className='dd_row'>

          <button className='but'>

            <a className='actuallink' href={dd.dlink720} target="#" >Download 📥</a>
          </button>
          <div>
            <span className='quality'>720</span>
            <span className='mp4_mp3'>.mp4</span>

          </div>
      
        </div>


        {/* 360 */}
        <div className='dd_row'>
          <button className='but'>

            <a className='actuallink' href={dd.dlink360} target="#" >Download 📥</a>
        
          </button>
          <div>
            <span  className='quality'>360</span>  
            <span className='mp4_mp3'>.mp4</span>  
          </div>

        </div>


        {/* 144  */}
        <div className='dd_row'>
        <button className='but'>

          <a className='actuallink'  href={dd.dlink144} target="#" >Download 📥</a>
        
        </button>
        <div>
          <span  className='quality'>144</span>  
          <span className='mp4_mp3'>.mp4</span>  
        </div>

        </div>
 
        {/* mp3 heading */}
        <div className='heading'> 
        <img className='audioicon' src={audio} alt="" />
    
        <div  className='heading_text'> audio </div>
        </div>


        {/* mp3 */}
        <div className='dd_row'>
        <button className='but'>

          <a className='actuallink'  href={dd.dlinkaudio} target="#" >Download 📥</a>
        </button>
        
        <div>
          <span className='quality'> audio</span> 
          <span className='mp4_mp3'>.mp3</span> 

          
        </div>
        </div>
      

        
        
    
    </div>
  )
}

export default Downloadelink
