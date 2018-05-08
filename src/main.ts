import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cross);
  app.use(bodyParser.json({limit: "1000kb"}));
  await app.listen(3000);
}
/**
 * 跨域问题
 * @param req
 * @param res
 * @param next
 */
const cross = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Content-Length,X-Requested-With,Access-Control-Allow-Origin");
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
bootstrap().then(() => console.log("Application is listening on port 3000"));