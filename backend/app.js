const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const serve = require('koa-static');
const cors = require('@koa/cors');
const sqlite = require('sqlite');
const qs = require('./db/queries');

const DB_LOC = './db/terror.sqlite';

const app = new Koa();
const router = new Router();

app.use(serve('build/'));
app.use(cors());
app.use(logger());
app.use(
  (() => {
    let db;
    return async (ctx, next) => {
      if (!db) {
        try {
          db = await sqlite.open(DB_LOC);
        } catch (err) {
          db = null;
          ctx.throw(500, 'Unable to open SQLite db.');
          return;
        }
      }
      ctx.db = db;
      return next();
    };
  })()
);

router.get('/slice', async ctx => {
  if (!('start' in ctx.query) || !('end' in ctx.query))
    ctx.throw(400, 'Need to specify "start" and "end" as query parameters');
  ctx.body = await ctx.db.all(qs.slice(ctx.query.start, ctx.query.end));
});

router.get('/info/:id', async ctx => {
  ctx.body = await ctx.db.get(qs.info(ctx.params.id));
});

router.all('*', async ctx => {
  ctx.body = { routes: router.stack.map(e => e.path) };
});

app.use(router.routes());

app.listen(3001);
