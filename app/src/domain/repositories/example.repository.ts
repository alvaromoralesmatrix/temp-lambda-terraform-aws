import { Hello } from "../../infrastructure/models/hello";

export interface ExampleRepository {
    hello(dimention:Hello):Promise<Hello>;
}