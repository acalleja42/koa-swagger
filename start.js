
const Koa = require("koa");
const swagger = require("swagger2");
const Router = require("koa-router");
const { ui, validate } = require("swagger2-koa");

const swaggerDocument = swagger.loadDocumentSync("api.yaml");
const app = new Koa();
const router = new Router();

router.get('/health', (ctx, next) => {
  ctx.body = {
    "status": "UP"
  };
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(ui(swaggerDocument, "/swagger"))
  .use(validate(swaggerDocument))
  .listen(3000);

console.log("API started");
