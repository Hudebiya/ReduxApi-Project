import React from 'react'
import SearchBar from './components/SearchBar'
 import Tabs from './components/Tabs'
import ResultGrid from './components/ResultGrid'
const App = () => {

  return (
    <div className="h-screen w-full bg-amber-200 text-black">
      <SearchBar />
      <Tabs />
      <ResultGrid/>
    </div>
  )
}

export default App