export const loginWithGoogle = async (userData) => {
  const response = await fetch('https://gotrip-backend.onrender.com/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: userData.email,
      name: userData.name,
      picture: userData.picture
    })
  });

  if (!response.ok) {
    throw new Error('Failed to save user data');
  }

  return await response.json();
};
