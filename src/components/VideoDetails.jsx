import { useState, useEffect, useContext } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';
import { AiOutlineMessage } from 'react-icons/ai';
import { abbreviateNumber } from 'js-abbreviation-number';
import { fetchDataFromApi } from '../utils/api';
import { Context } from '../context/contextApi';
import SuggestionVideoCard from './SuggestionVideoCard';
import LiveChat from './LiveChat';
// import CommentsContainer from './CommentsContainer';

const VideoDetails = () => {

  const [video,setVideo] = useState();
  const [relatedVideos,setRealtedVideos] = useState();
  const {id} = useParams();
  const {setLoading} = useContext(Context);
  const [liveMsg, setLiveMsg] = useState(true);
  // const [videoComments, setVideoComments] = useState(false);

  useEffect(() => {
    document.getElementById('root').classList.add("custom-h");
    // console.log("id", id)
  });

 useEffect(()=>{
  fetchVideoDetails();
  fetchRelatedVideos();
  // fetchVideoComments();
 },[id])

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setRealtedVideos(res);
      setLoading(false);
  });
};

// const fetchVideoComments = () => {
//   setLoading(true);
//   fetchDataFromApi(`video/comments/?id=${id}`).then((res) => {
//     // console.log(res);
//     setVideoComments(res);
//     setLoading(false);
//   });
// };

  return (
    <div className='flex justify-center flex-row h-[calc(100%-56px)] dark:bg-black'>
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row overflow-y-auto">
         <div className='flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto'>
          <div className="h-[200px] md:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer 
               url={`https://www.youtube.com/watch?v=${id}`}
               controls
               width="100%"
               height="100%"
               style={{ backgroundColor: "#000000" }}
               playing={true}
             />
          </div>

          <div className="dark:text-white font-bold text-sm md:text-xl mt-4 line-clamp-0 ">
            {video?.title}
          </div>

          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img className='h-full w-full object-cover' src={video?.author?.avatar[0]?.url} />
                </div>
              </div>

              <div className="flex flex-col ml-3">
                <div className="dark:text-white text-md font-semibold flex items-center">
                {video?.author?.title}
              {video?.author?.badges[0]?.type === 'VERIFIED_CHANNEL' && (
                <BsFillCheckCircleFill className='text-gray-500 dark:text-white/[0.5] text-[12px] ml-1' />
              )}
                </div>

                <div className="dark:text-white/[0.7] text-gray-500 text-sm ">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>

            <div className="flex dark:text-white mt-4 md:mt-0 ">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className='text-xl dark:text-white mr-2'/>
                <span>{`${abbreviateNumber(video?.stats?.likes, 2)} likes`}</span>
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                <AiOutlineComment className='text-xl dark:text-white mr-2'/>
                <span>{`${abbreviateNumber(video?.stats?.comments, 2)} comments`}</span>
              </div>
              { (video?.isLive || video?.isLiveContent) && (
                <div
                 onClick={() => setLiveMsg(!liveMsg)} 
                 className="flex items-center justify-center cursor-pointer h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                <AiOutlineMessage className='text-xl dark:text-white mr-2'/>
                <span>LiveChat</span>
              </div>
              )}
            </div>
          </div>
          {/* {videoComments && <CommentsContainer videoComments={videoComments} />} */}
         </div>

         <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {/* Live Chat if isLive component here */}
          {(video?.isLive || video?.isLiveContent) && (liveMsg) && (
            <div>
              <LiveChat />
            </div>
          ) }

          {relatedVideos?.contents?.map((item,index) => {
            if(item?.type !== "video") return false;
            return (
              <SuggestionVideoCard key={item?.video?.videoId + index} video={item?.video} />
            )
          } )}
         </div>
      </div>
    </div>
  );
};

export default VideoDetails;