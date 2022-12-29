import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListNews from './pages/ListNews';


const App: React.FC = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ListNews/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
