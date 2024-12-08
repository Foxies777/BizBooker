const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const register = async (req, res) => {
  const { surname, name, patronymic, email, phone, password, role } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({ surname, name, patronymic, email, phone, password: hashedPassword, role })
    await user.save()
    const payload = {
      userId: user._id,
  }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1y'
    })

    res.status(201).json({ token })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Registration failed' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1y'
    })

    res.status(200).json({ token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
}

const check = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    res.status(200).json({ message: 'Token is valid', user: decoded })
  } catch (error) {
    console.error('Token validation error:', error)
    res.status(500).json({ error: 'Token validation failed' })
  }
}

module.exports = {
  register,
  login,
  check
}
