import {ROLES} from "../utils/constants";

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
}
