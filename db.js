import { connect } from 'mongoose'
import { MONGO_URI } from './config.js'

connect(MONGO_URI)
    .then(() => {
        console.log('DB is connected')
    })
    .catch(console.error)
