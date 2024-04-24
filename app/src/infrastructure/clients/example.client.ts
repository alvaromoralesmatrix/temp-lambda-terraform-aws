import { inject, injectable } from "inversify";
import { TYPES } from "../../common/types";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { ExampleRepository } from "src/domain/repositories/example.repository";
import { Hello } from "../models/hello";
@injectable()
export class DynExampleClient implements ExampleRepository{
    constructor(
    ){}
    async hello(hello: Hello): Promise<Hello> {
        try {
            return hello;
        } catch (error) {
            console.log("ERROR--->",error);
            throw new Error("error de ejemplo");
        }
    }
}