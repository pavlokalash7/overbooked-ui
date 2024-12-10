import app from '@/app';
import Env from '@/utils/env';
import Logger from '@/utils/logger';

app.listen(Env.PORT, () => {
  Logger.info(`Server running in ${Env.NODE_ENV} mode on port ${Env.PORT}`);
});
