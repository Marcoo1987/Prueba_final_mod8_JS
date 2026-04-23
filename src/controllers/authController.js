const jwt = require('jsonwebtoken');
const { User } = require('../models');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '1d'
    });
};

exports.register = catchAsync(async (req, res) => {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ status: 'fail', message: 'Email already in use' });
    }
    const newUser = await User.create({ name, email, password, role });
    const token = signToken(newUser.id);
    res.status(201).json({
        status: 'success',
        token,
        data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    });
});

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validatePassword(password))) {
        return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }
    const token = signToken(user.id);
    res.json({
        status: 'success',
        token,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});
