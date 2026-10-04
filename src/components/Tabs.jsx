import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'

const Tabs = () => {
  const tabs = ['photos', 'videos', 'gifs']
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.search.activeTab)

  return (
    <div className='flex gap-5 p-10'>
      {tabs.map((elem, idx) => (
        <button
          key={idx}
          onClick={() => dispatch(setActiveTab(elem))}
          className={`${
            activeTab === elem ? 'bg-amber-300' : 'bg-amber-600'
          } transition cursor-pointer active:scale-95 px-5 py-2 rounded-2xl uppercase`}
        >
          {elem}
        </button>
      ))}
    </div>
  )
}

export default Tabs