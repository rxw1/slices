import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';

import { slices } from './routes';

const app = koa()
  .use(bodyparser())
  .use(slices())
;

export default function () {
  return compose(app.middleware);
}
