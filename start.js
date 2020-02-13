
const Koa = require("koa");
const swagger = require("swagger2");
const Router = require("koa-router");
const { ui, validate } = require("swagger2-koa");
const bodyParser = require("koa-bodyparser");

const swaggerDocument = swagger.loadDocumentSync("api.yaml");
const app = new Koa();
const router = new Router();

router.get('/health', (ctx, next) => {
  ctx.body = {
    "status": "UP"
  };
});

router.post('/login', (ctx, next) => {
  if (ctx.request.body.username === "admin" && ctx.request.body.password === "password") {
    ctx.body = { "data": { token: "atoken" } };
    ctx.status = 201;
  }
  else {
    ctx.body = { "data": { error: "invalid login" } };
    ctx.status = 401;
  }
});

app
  .use(bodyParser())
  .use(ui(swaggerDocument, "/swagger"))
  .use(validate(swaggerDocument))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

console.log("API started");
