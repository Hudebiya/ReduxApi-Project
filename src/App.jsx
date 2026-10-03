import React from 'react'
import { fetchPhotos, fetchVideos, fetchGifs } from './api/mediaApi'

const App = () => {

    function getPhotos() {
       fetchPhotos()
    }
  return (
    <div className="h-screen w-full bg-amber-200 text-black">
        <button className="bg-amber-800 px-4 py-3 m-5" onClick={async ()=> {
          const data = await fetchPhotos('cat')

           console.log(data);

        }}> Get Photos</button>

        <button className="bg-amber-800 px-4 py-3 m-5" onClick={async ()=> {
          const data = await fetchVideos('dog')

           console.log(data);

        }}> Get Videos</button>

        <button className="bg-amber-800 px-4 py-3 m-5" onClick={async ()=> {
          const data = await fetchGifs('dog')

           console.log(data);

        }}> Get GIFs</button>

    </div>
  )
}

export default App