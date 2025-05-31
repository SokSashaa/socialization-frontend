import {ROLES} from '@utils/constants';

export const initialValuesFormRegistration = {
    name: '',
    second_name: '',
    patronymic: '',
    photo: '',
    birthday: '',
    email: '',
    organization: '',
    role: {
        code: ROLES.tutor.code,
        tutor_id: '',
    },
    login: '',
    password: '',
    phone_number: '',
    address: '',
};
