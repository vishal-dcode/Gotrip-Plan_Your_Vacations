import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout, selectUser } from '../authSlice';

export default function Signout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return null;
}
