import { MiddlewaresConsumer, Module, RequestMethod } from "@nestjs/common";
import { CaptchaResolver } from "./resolver/captcha.resolver";
import { GraphQLFactory, GraphQLModule } from "@nestjs/graphql";
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { CaptchaService } from "./service/captcha.service";

@Module({
  imports: [GraphQLModule],
  controllers: [],
  components: [CaptchaService, CaptchaResolver],
})
export class AppModule {
  constructor(
    private readonly graphQLFactory: GraphQLFactory,
  ) {}

  configure(consumer: MiddlewaresConsumer) {
    /*创建Scheam*/
    const schema = this.createSchema();

    /*使用中间件的方式来处理请求*/
    consumer
    /*设置自带的IDE端点graphiql*/
      .apply(graphiqlExpress({endpointURL: "/graphql"}))
      .forRoutes({ path: "/graphiql", method: RequestMethod.GET })
      /*设置处理graphql请求端点*/
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes({ path: "/graphql", method: RequestMethod.ALL });
  }

  createSchema() {
    /*合并指定路径下的模式定义*/
    const typeDefs = this.graphQLFactory.mergeTypesByPaths("./**/*.graphql");
    /*根据指定模式定义与Resolve对象生成可执行模式*/
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    return schema;
  }
}
