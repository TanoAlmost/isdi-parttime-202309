const mongoose = require('mongoose')

const retrieveFavPosts = require('./retrieveFavPosts')

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => {
        try {
            retrieveFavPosts('65abfd4bb4c824321d85d89f', (error, posts) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('retrieved posts', posts)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))