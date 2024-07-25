
exports.checkError = async (req, res, next) => {
    const {
        username,
        verifyPassword,
        currentPassword
    } = req.body;
    if (username === '') {
        return res.send('please fill username')
    }
    if (currentPassword === '' && verifyPassword === '') {
        return res.send('Please fill username and password')
    }
    if (currentPassword !== verifyPassword) {
        return res.send('password is incorrect')
    }
    next()

}
