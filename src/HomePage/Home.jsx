import React from 'react'
import Header from './Header.jsx'
import Body from './Body.jsx'
import Footer from "./Footer.jsx"

function Home({setCart}) {
  return (
    <>
    <Header></Header>
    <Body setCart={setCart}></Body>
    <Footer></Footer>
    </>
  )
}

export default Home