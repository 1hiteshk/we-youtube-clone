import React from 'react';
import { abbreviateNumber } from 'js-abbreviation-number';
import { Link } from 'react-router-dom';
import {BsFillCheckCircleFill} from "react-icons/bs";
import VideoLength from '../shared/videoLength';

const SuggestionVideoCard = ({video}) => {

  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className='flex mb-3'>
        <div className="relative h-24 lg:h-24 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-lg bg-slate-800 overflow-hidden">
          <img className='h-full w-full object-cover' src={video?.thumbnails[0]?.url} />
          { video?.lengthSeconds && (
            <VideoLength  time={video?.lengthSeconds} />
          )}
        </div>
        
        <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold dark:text-white lg:text-xs xl:text-sm line-clamp-2">{video?.title}</span>
            <Link to={`/channel/${video?.author?.channelId}`}>
            <span className="text-[12px] font-semibold lg:text-[10px] xl:text-[12px] mt-2 hover:text-black text-gray-500 dark:hover:text-white dark:text-white/[0.7] flex items-center">
              {video?.author?.title}
              {video?.author?.badges[0]?.type === 'VERIFIED_CHANNEL' && (
                <BsFillCheckCircleFill className='text-gray-500 dark:text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1' />
              )}
            </span>
            </Link>
            <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-gray-500 dark:text-white/[0.7] truncate overflow-hidden">
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
              {/* <span className="flex text[24px] leading-none font-bold text-gray-500 dark:text-white/[0.7] relative top-[-10px] mx-1">
                .
              </span> */}
              <span className="truncate ml-3"><li>{video?.publishedTimeText}</li></span>
            </div>
          </div>

      </div>
    </Link>
  )
}

export default SuggestionVideoCard