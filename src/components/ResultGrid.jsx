import React, { useEffect } from 'react'
import { fetchPhotos, fetchVideos, fetchGifs } from '../api/mediaApi'
import { setLoading, setResults, setError } from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'

const ResultGrid = () => {
  const dispatch = useDispatch()
  const { query, activeTab, results, loading, error } = useSelector(
  (store) => store.search
   )
  const collection = useSelector((store) => store.collection.items)

  useEffect(function () {
    if (!query || activeTab == 'saved') return

    const getData = async () => {
      try {
        dispatch(setLoading())
        let data = []

        if (activeTab == 'photos') data = await fetchPhotos(query)
        if (activeTab == 'videos') data = await fetchVideos(query)
        if (activeTab == 'gifs') data = await fetchGifs(query)

        dispatch(setResults(data || []))
      } catch (err) {
        dispatch(setError(err.message))
      }
    }

    getData()
  }, [query, activeTab])

    const list = activeTab == 'saved' ? collection : results

  if (activeTab != 'saved' && !query) {
  return <p className='px-10 py-20 text-center text-stone-600'>Search Something...</p>
}
if (activeTab != 'saved' && loading) {
  return <p className='px-10 py-20 text-center text-stone-600'>Loading...</p>
}
if (activeTab != 'saved' && error) {
  return <p className='px-10 py-20 text-center text-red-700'>Error: {error}</p>
}
if (list.length == 0) {
  return <p className='px-10 py-20 text-center text-stone-600'>Not Found.</p>
}

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10 pb-10'>
      {list.map(function (item) {
        return <ResultCard key={item.id} item={item} />
      })}
    </div>
  )
}

export default ResultGrid