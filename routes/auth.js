const express = require('express');
const { createUser, loginUser } = require('../controllers/auth');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        await createUser(email, password);
        res.status(201).send("User Created!");
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.post('/login',  async (req, res) => {
    await loginUser(req.body.email, req.body.password);
    res.send("User Found!");
});

module.exports = router;