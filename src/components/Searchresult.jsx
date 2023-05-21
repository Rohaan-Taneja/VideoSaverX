import React from 'react';
import Downloadelink from './Downloadelink';

const Searchresult = (props) => {
 

  // storing the link of iframe or youtube embed video link
  const iframeString = props.searched_v_ifr;

  /// removing slashes from the iframe link
  const workable_iframelink = iframeString.replace(/\//g, '&#x2F;');



  return (
    <div className='resultgrid'>
      <div className='row1'>
        <div><img className='thumbnail' src={props.thumbnail} alt="" />  </div>
       
       
        
        <div className='video_name'> {props.v_nam}</div>
      </div>
      <div>
        <Downloadelink ytid={props.youtube_video_id} />
      </div>
    </div>
  );
};

export default Searchresult;
