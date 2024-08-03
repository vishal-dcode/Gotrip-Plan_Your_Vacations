import User from '../models/auth.js';

export const googleLogin = async (req, res) => {
  const { email, name, picture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        picture
      });
      await user.save();
    } else {
      // Update user information if it has changed
      user.name = name;
      user.picture = picture;
      await user.save();
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
