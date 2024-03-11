import React from 'react'
import Nav from './components/Navigation/Nav'
import { Outlet } from 'react-router';
import Footer from './components/Footer/Footer';


function Layout() {
  return (
    <div className="page-container">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;