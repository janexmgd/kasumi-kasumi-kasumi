import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home.jsx';
import TiktokDL from '../pages/TiktokDL.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace='true' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/tiktokdl' element={<TiktokDL />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
