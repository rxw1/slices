import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';

import { slices, languages } from './routes';

const app = koa()
  .use(bodyparser())
  .use(slices())
  .use(languages())
;

export default function () {
  return compose(app.middleware);
}
