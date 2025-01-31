import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL || 'mongodb://localhost:27017/test',
  default_student_pass: process.env.DEFAULT_STUDENT_PASS || '1234',
}
