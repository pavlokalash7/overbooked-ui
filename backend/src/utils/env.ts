import dotenv from 'dotenv';
import { cleanEnv, port, str, url } from 'envalid';

dotenv.config();

const Env = cleanEnv(process.env, {
  PORT: port({ default: 8000 }),
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
    default: 'development',
  }),
  LOG_LEVEL: str({ choices: ['debug', 'error', 'info'], default: 'debug' }),
  DATABASE_URL: url(),
  LLM_AGENT_URL: url(),
});

export default Env;
