import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Connected to MongoDB')
    server = app.listen(config.port, () => {
      logger.info(`Example app listening at http://localhost:${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }

  process.on('unhandledRejection', error => {
    console.log('we are closing our server for temporary', error)
    if (server) {
      server.close(() => {
        errorLogger.error('Server close :', error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM RECEIVED. Shutting down gracefully')
//   if (server) {
//     server.close()
//   }
// })
