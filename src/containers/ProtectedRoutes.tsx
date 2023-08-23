import React from 'react';
import { shallow } from 'zustand/shallow';
import useRecordStore, { State } from 'store/useRecordStore';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { user } = useRecordStore((state: State) => {
    return {
      user: state.user,
    };
  }, shallow);
  return user ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedRoutes;
