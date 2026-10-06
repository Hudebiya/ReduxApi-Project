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

  useEffect(function () {
    if (!query) return

    let ignore = false

    const getData = async () => {
      try {
        dispatch(setLoading())
        let data = []

        if (activeTab == 'photos') data = await fetchPhotos(query)
        if (activeTab == 'videos') data = await fetchVideos(query)
        if (activeTab == 'gifs') data = await fetchGifs(query)

        if (!ignore) dispatch(setResults(data || []))
      } catch (err) {
        if (!ignore) dispatch(setError(err.message))
      }
    }

    getData()

    return () => {
      ignore = true
    }
  }, [query, activeTab])

  if (!query) {
    return (
      <p className='px-10 py-20 text-center text-stone-600'>
       Search Anything You Want...
      </p>
    )
  }
  if (loading) {
    return <p className='px-10 py-20 text-center text-stone-600'>Loading...</p>
  }
  if (error) {
    return <p className='px-10 py-20 text-center text-red-700'>Error: {error}</p>
  }
  if (results.length == 0) {
    return <p className='px-10 py-20 text-center text-stone-600'>No Match Found.</p>
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10 pb-10'>
      {results.map(function (item) {
        return <ResultCard key={item.id} item={item} />
      })}
    </div>
  )
}

export default ResultGrid