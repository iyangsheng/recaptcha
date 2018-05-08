"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const captcha_resolver_1 = require("./resolver/captcha.resolver");
const graphql_1 = require("@nestjs/graphql");
const apollo_server_express_1 = require("apollo-server-express");
const captcha_service_1 = require("./service/captcha.service");
let AppModule = class AppModule {
    constructor(graphQLFactory) {
        this.graphQLFactory = graphQLFactory;
    }
    configure(consumer) {
        const schema = this.createSchema();
        consumer
            .apply(apollo_server_express_1.graphiqlExpress({ endpointURL: "/graphql" }))
            .forRoutes({ path: "/graphiql", method: common_1.RequestMethod.GET })
            .apply(apollo_server_express_1.graphqlExpress(req => ({ schema, rootValue: req })))
            .forRoutes({ path: "/graphql", method: common_1.RequestMethod.ALL });
    }
    createSchema() {
        const typeDefs = this.graphQLFactory.mergeTypesByPaths("./**/*.graphql");
        const schema = this.graphQLFactory.createSchema({ typeDefs });
        return schema;
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [graphql_1.GraphQLModule],
        controllers: [],
        components: [captcha_service_1.CaptchaService, captcha_resolver_1.CaptchaResolver],
    }),
    __metadata("design:paramtypes", [graphql_1.GraphQLFactory])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map