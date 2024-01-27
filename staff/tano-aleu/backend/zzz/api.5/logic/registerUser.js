const CSV = require('../utils/CSV')
const generateId = require('../data/generateId')
const { validateText, validateFunction } = require('../utils/validators')

function registerUser(name, email, password, callback) {
    validateText(name, 'name')
    validateText(email, 'email')
    validateText(password, 'passaword')
    validateFunction(callback, 'callback')

    CSV.parseFromFile('./data/users.csv', (error, users) => {

        if (error) {
            callback(error)

            return
        }

        let user = users.find(user => user.email === email)

        if (user) {

            callback(new Error('user already exists'))

            return

        }

        user = {
            id: generateId(),
            name,
            email,
            password
        }

        users.push(user)

        CSV.stringifyToFile('./data/users.csv', users, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)


        })
    })
}

module.exports = registerUser