import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'

const Tabs = () => {
  const tabs = ['photos', 'videos', 'gifs']
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.search.activeTab)

    return (
    <div className='flex flex-wrap gap-3 px-10 py-6'>
      {tabs.map((elem, idx) => (
        <button
          key={idx}
          onClick={() => dispatch(setActiveTab(elem))}
          className={`${
  activeTab === elem
    ? 'bg-stone-900 text-amber-300'
    : 'bg-amber-100 text-stone-700 hover:bg-amber-300'
     } transition cursor-pointer active:scale-95 px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide`}
        >
          {elem}
        </button>
      ))}
    </div>
  )
}

export default Tabs