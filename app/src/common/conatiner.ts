import "reflect-metadata";
import 'dotenv/config'
import { Container } from "inversify";
import { TYPES } from "./types";
import { ExampleService } from "../domain/services/example.service";
import { ExampleRepository } from "../domain/repositories/example.repository";
import { DynExampleClient } from "../infrastructure/clients/example.client";
import { ExampleHandler } from "../functions/example/handler";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const initContainer = () => {
    const client = new DynamoDBClient({});
    const container = new Container();

    container.bind<ExampleHandler>(TYPES.ExampleHandler).to(ExampleHandler);

    container.bind<ExampleService>(TYPES.ExampleService).to(ExampleService);
    container.bind<ExampleRepository>(TYPES.DynExampleClient).to(DynExampleClient)
    return container;
}

export { initContainer }