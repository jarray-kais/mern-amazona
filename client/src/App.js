import React from 'react'
import './App.css';

import {Routes , Route} from 'react-router-dom'
import HomeScreen from './HomeScreen';

function App() {
  return (
    <div >
    <Routes>
      <Route path='/' element={<HomeScreen />}/>'
    </Routes>
    </div>
    
  );
}

export default App;
