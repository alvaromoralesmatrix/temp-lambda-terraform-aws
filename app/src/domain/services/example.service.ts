import { inject, injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { TYPES } from "../../common/types";
import { ExampleRepository } from "../repositories/example.repository";
import { Hello } from "../../infrastructure/models/hello";

@injectable()
export class ExampleService{
    constructor(
        @inject(TYPES.DynExampleClient) private readonly exampleRepository:ExampleRepository,
    ){}
    async hello(dimention:any){
        const buildDimentionSave = this.buildDimention(dimention); 
        return await this.exampleRepository.hello(buildDimentionSave);
    }

    private buildDimention(event:any):Hello{
        const newDimention:Hello = {
            source: `${uuidv4()}`,
        }
        return newDimention;
    }
}