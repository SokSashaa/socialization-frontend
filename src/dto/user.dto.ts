import {ROLES} from "../utils/constants";
import {organizations_dto} from "./organizations.dto";

export type user_dto = {
    birthday: Date | null | string,
    email: string,
    id: string,
    patronymic: string,
    login: string,
    name: string,
    phone_number: string,
    photo: null | string,
    role: ROLES.observed.code | ROLES.administrator.code | ROLES.tutor.code,
    second_name: string,
    organization: organizations_dto
}
