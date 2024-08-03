import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { authAsync } from '../authSlice';

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const token = credentialResponse.access_token;
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await userInfoResponse.json();

        await dispatch(authAsync({ result, token })).unwrap();
        setError(null);
      } catch (error) {
        setError('Failed to login. Please try again.');
      }
    },
    onError: () => {
      setError('Google login failed. Please try again.');
    }
  });

  return (
    <div>
      <button onClick={login} className="w-full border border-black flex items-center gap-2 px-5 py-2 rounded-full">
        <FaGoogle /> <span className="flex-1">Login</span>
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
