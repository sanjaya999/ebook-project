import React from 'react'
import Nav from './components/Navigation/Nav'
import { Outlet } from 'react-router';
import Footer from './components/Footer/Footer';


function Layout() {
  return (
    <>
    <Nav />
    <Outlet />
    <Footer />
    </>
    
  )
}

export default Layout;