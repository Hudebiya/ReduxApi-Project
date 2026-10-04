import React, { useEffect } from 'react'
import { fetchPhotos, fetchVideos, fetchGifs } from "../api/mediaApi";
import { setLoading, setResults, setError } from "../redux/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import ResultCard from './ResultCard'

const ResultGrid = () => {

    const dispatch = useDispatch()
    const { query, activeTab, results, loading, error } = useSelector((store) => store.search)

    useEffect(function () {
        if (!query) return

        const getData = async () => {
            try {
                dispatch(setLoading())
                let data = []

                if (activeTab == 'photos') {
                    data = await fetchPhotos(query)
                }
                if (activeTab == 'videos') {
                    data = await fetchVideos(query)
                }
                if (activeTab == 'gifs') {
                    data = await fetchGifs(query)
                }

                console.log(data);
                dispatch(setResults(data || []))
            } catch (err) {
                dispatch(setError(err.message))
            }
        }

        getData()
    }, [query, activeTab])

    if (loading) return <h1 className='p-10'>Loading...</h1>
    if (error) return <h1 className='p-10'>Error: {error}</h1>

    return (
    <div className='flex flex-wrap gap-5 p-10'>
        {results.map(function (item) {
            return <ResultCard key={item.id} item={item} />
        })}
    </div>
)
}

export default ResultGrid