import React from 'react'
import { useContext,useEffect } from 'react';
import VideoCard from './VideoCard';

import { Context } from '../context/contextApi';
import LeftNav from './LeftNav';

const Feed = () => {
    const {loading, searchResults} = useContext(Context);

    useEffect(() => {
         document.getElementById("root").classList.remove('custom-h'); // when we are on feed page this class we want to be removed
    },[])

  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
        <LeftNav />
        <div className='grow w-[calc(100%-250px)] h-full overflow-y-auto dark:bg-black'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5'>
               { !loading && 
                 searchResults &&
                 searchResults.map((item) => {
                if(item?.type !== "video") return false;
                return(
                    <VideoCard key={item?.video?.videoId} video={item?.video} />
                )
               })}
            </div>
        </div>
    </div>
  )
}

export default Feed