import React from 'react'
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';



const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/collection' element={<CollectionPage/>}></Route>
      </Routes>
      <ToastContainer position='bottom-right' autoClose={2000} />
    </div>
  )
}

export default App