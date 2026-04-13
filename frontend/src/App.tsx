import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { GuestProfile } from './pages/GuestProfile';
import { Bookings } from './pages/Bookings';

import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="guest" element={<GuestProfile />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
