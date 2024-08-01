import { FaGoogle } from 'react-icons/fa';

import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { authAsync } from '../authSlice';

export default function GoogleAuth() {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const token = credentialResponse.access_token;
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await userInfoResponse.json();

      dispatch(authAsync({ result, token }));
    },
    onError: () => {
      console.log('Google login error');
    }
  });

  return (
    <button onClick={login} className="w-full border border-black flex items-center gap-2 px-5 py-2 rounded-full">
      <FaGoogle /> <span className="flex-1">Login</span>
    </button>
  );
}
