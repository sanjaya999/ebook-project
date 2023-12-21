// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Nav from './components/Navigation/Nav';
import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Top from './components/Top Picks/Top';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Nav />} />
        <Route path="Home" element={<Home />} />
        <Route path="Explore" element={<Explore />} />
        <Route path="Top" element={<Top />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
