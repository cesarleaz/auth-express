export const {
    MONGO_URI = 'mongodb://127.0.0.1:27017/auth-with-express',
    NODE_ENV,
    PORT = 3000,
    JWT_REFRESH = 'basic',
    JWT_SECRET = 'default'
} = process.env

export const IS_PROD = NODE_ENV === 'production'

export const KV_REFRESH_TOKEN = 'refresh_token'
