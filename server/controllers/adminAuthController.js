require('dotenv').config();
const jwt = require('jsonwebtoken');

const adminCredentials = [
  {
    email: process.env.ADMIN_EMAIL_1,
    password: process.env.ADMIN_PASSWORD_1,
    adminType: 'IEEECS ADMIN',
  },
  {
    email: process.env.ADMIN_EMAIL_2,
    password: process.env.ADMIN_PASSWORD_2,
    adminType: 'IEEESB ADMIN',
  },
  {
    email: process.env.ADMIN_EMAIL_3,
    password: process.env.ADMIN_PASSWORD_3,
    adminType: 'IEEE CS Web Master',
  },
];

const login = (req, res) => {
  const { email, password } = req.body;

  const validUser = adminCredentials.find(
    (admin) => admin.email === email && admin.password === password
  );

  if (validUser) {
    const token = jwt.sign({ email: validUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, token, adminType: validUser.adminType });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
};

module.exports = {
  login
};
