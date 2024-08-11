const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        //console.log(rows);
        if (rows.length > 0) return res.status(400).json({ message: 'Username already exists' });
        const password1= await bcrypt.hash(password, saltRounds);
        //console.log(password1);
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password1]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(401).json({ msg: 'Invalid credentials' });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ msg: 'Invalid Password' });
        
        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '10d' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
