import { MiddlewaresConsumer } from "@nestjs/common";
import { GraphQLFactory } from "@nestjs/graphql";
export declare class AppModule {
    private readonly graphQLFactory;
    constructor(graphQLFactory: GraphQLFactory);
    configure(consumer: MiddlewaresConsumer): void;
    createSchema(): any;
}
