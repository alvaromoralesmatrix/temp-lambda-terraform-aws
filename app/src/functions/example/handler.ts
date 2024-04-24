import { inject, injectable } from "inversify";
import { initContainer } from "../../common/conatiner";
import { TYPES } from "../../common/types";
import { ExampleService } from "../../domain/services/example.service";

@injectable()
export class ExampleHandler{
    constructor(
        @inject(TYPES.ExampleService) private readonly exampleService:ExampleService,
    ){}
    async main(event:any) {
       try {
            return await this.exampleService.hello(event);
       } catch (error:any) {
            console.log("ERROR----->",error);
            return{
                code:"errorValidation",
                message: error.errors
            }
       }
    }
}

export const main = async(event:any)=>{
    const container = initContainer();
    const getAllHandler = container.get<ExampleHandler>(TYPES.ExampleHandler);
    return await getAllHandler.main(event);
}
