import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Searchresult from './Searchresult';
import Completelogo from './Completelogo';


const Mainbody = () => {
    
    // use state to store the youtube link or whatever is written on the search bar
    const [ytl,setytl]=useState('')

    const [ytid,setytid]=useState('')
 
    //usestate object to store all the api retrieve data
    const [apidata ,setapidata]=useState({ifr :"" , video_name :"" , v_quality :"" , thumb:""})

    
    // called , whenever something is written in the search bar 
    const writting =(e) =>{
        setytl(e.target.value)
        console.log(ytl)

    } 


     // called whenver the search button is clicked
    const ytlink =()=>
    {
 
      // saving youtube video link , given by the user
      const videoUrl=ytl
      

      if(videoUrl.includes('?feature=share'))
      {
        const shorts_id=getShortsVideoId(videoUrl)
        setytid(shorts_id)

         // function to retrieve id from shorts video , if the link is copied from share button
        function getShortsVideoId(link) {
          const shortsRegex = /^https?:\/\/(?:www\.)?youtube\.com\/shorts\/([-\w]{11})(?:\?.*)?$/;
          const match = link.match(shortsRegex);
          if (match) {
            return match[1];
          }
          return null;
        }

        //calling api to get data 
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,player&id=${shorts_id}&key=AIzaSyCKDMb9woZoRcJJWIMNpdhrPEjWUOljmPs`)
        .then(response =>{
          // console.log(response.data.items[0].player.embedHtml)
          setapidata({...apidata,
            ifr : response.data.items[0].player.embedHtml,
            video_name :response.data.items[0].snippet.localized.title,
            v_quality :response.data.items[0].contentDetails.definition,
            thumb:response.data.items[0].snippet.thumbnails.high.url
          })
  
        })
        .catch(error =>
          {
            alert('Failed to fetch video data');
          }) 

      }

       else if(videoUrl.includes('shorts'))
        {
          const shorts_id=getShortsVideoId(videoUrl)
          setytid(shorts_id)


          
          // function to retrieve the id of the shorts video 
          function getShortsVideoId(link) {
            const shortsRegex = /^https:\/\/www\.youtube\.com\/shorts\/(\w{11})/;
            const match = link.match(shortsRegex);
            if (match) {
              return match[1];
            }
            return null;
          }

          axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,player&id=${shorts_id}&key=AIzaSyCKDMb9woZoRcJJWIMNpdhrPEjWUOljmPs`)
          .then(response =>{
            // console.log(response.data.items[0].player.embedHtml)
            setapidata({...apidata,
              ifr : response.data.items[0].player.embedHtml,
              video_name :response.data.items[0].snippet.localized.title,
              v_quality :response.data.items[0].contentDetails.definition,
              thumb:response.data.items[0].snippet.thumbnails.high.url
            })
    
          })
          .catch(error =>
            {
              alert('Failed to fetch video data');
            }) 



        }

      else
        {
        
        // #getting id from that ytvideo url
        const video_id= extractVideoId(videoUrl);
        setytid(video_id)

        const apikey='AIzaSyCKDMb9woZoRcJJWIMNpdhrPEjWUOljmPs'

        // axios calling the api for the data 
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cplayer&id=${video_id}&key=${apikey}`)
        .then(response =>{
          console.log(response.data)
          setapidata({...apidata,
            ifr : response.data.items[0].player.embedHtml,
            video_name :response.data.items[0].snippet.localized.title,
            v_quality :response.data.items[0].contentDetails.definition,
            thumb:response.data.items[0].snippet.thumbnails.high.url
          })
  
        })
        .catch(error =>
          {
            alert('Failed to fetch video data');
          }) 

        }
      
    }

    // function to get the id from the videourl 
    function extractVideoId(url) {

      // #url type 1 , copied from youtube share option
      if (url.includes('youtu.be')){
        const videoId = url.split('youtu.be/')[1];
        if (videoId) {
          const ampersandPosition = videoId.indexOf('&');
          if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition);
          }
          return videoId;
        }
        return null;
      }

      else if (url.includes('v=')){
        // second type of ytlink , copied from the search bar
        const videoId = url.split('v=')[1];
        if (videoId)
          {
            const ampersandPosition = videoId.indexOf('&');
            if (ampersandPosition !== -1) 
              {
              return videoId.substring(0, ampersandPosition);
              }
            return videoId;
          }
        return null;
      }
    }


  return (
    <div>
      <div className='mainbody'>

        <Completelogo   />
          
          <div  className='searchingarea'>
            <div  className='textabovesearchbar'  data-aos="zoom-in"   data-aos-duration="2000">YouTube Video Downloader</div>
            <div className='s_b'>
              <div className='searchbar_and_bttn'  >

                <input className='searchbar'   type="text" onChange={writting}  />

                <button  class="btn" onClick={ytlink}  > search &#128269;</button>     

              </div>
            </div>
            <Searchresult  searched_v_ifr={apidata.ifr}  v_nam = {apidata.video_name} youtube_video_id={ytid} thumbnail= {apidata.thumb}  />
          </div>

      </div>
    </div>
  )
}

export default Mainbody


