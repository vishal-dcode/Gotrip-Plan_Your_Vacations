export const loginWithGoogle = async (userData) => {
  const response = await fetch('http://localhost:5000/auth/google', {
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
