import { useState } from 'react'
import Navigation from './navigation/navigation'
import './App.css'


function App() {
  sessionStorage.setItem('role', 'undifended')

  return (
    
    <>
   <Navigation/>
   {/* <BottomNavigation/> */}

   
    </>
  )
}

export default App
