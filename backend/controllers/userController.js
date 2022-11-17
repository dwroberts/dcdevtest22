// Get users
// /api/users
// Private
const getUsers = (req, res) => {
    res.status(200).json({message: 'Get users'})
}

const createUser = (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('The user could not be added')
    }
    res.status(200).json({message: 'Create user'})
}

const updateUser = (req, res) => {
    res.status(200).json({message: `Update user ${req.params.id}`})
}

const deleteUser = (req, res) => {
    res.status(200).json({message: `Delete user ${req.params.id}`})
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}