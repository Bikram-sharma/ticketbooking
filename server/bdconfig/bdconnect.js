const mongoose = require('mongoose');
require('dotenv').config()
const MONGODB_URI = process.env.MONGO_URL

if (!MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        console.log(`RETURED FROM CACHE CONNECTION`)
        return cached.conn
    }

    if (!cached.promise) {
        console.log(`CACHE DOESN'T EXIST`)

        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose

        })
    }

    try {
        cached.conn = await cached.promise
        console.log(`CACHE DOESN'T EXIST`)

    } catch (error) {
        cached.promise = null
        console.error(`CONNECTION ERROR ${error}`)

        throw error
    }

    return cached.conn
}

module.exports = dbConnect


