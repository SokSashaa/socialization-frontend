import {questions_dto} from "./questions.dto";

export type test_dto = {
    id: string,
    title:string,
    description: string,
    created_at: Date,
    questions: questions_dto[]
}


