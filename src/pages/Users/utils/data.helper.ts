import {organizations_dto} from '@dto/organizations/organizations.dto';

import {ROLES} from '@utils/constants';
import {toInitial} from '@utils/helpers';

export const rolesSelectOptions = () =>
	[...Object.values(ROLES)]
		.filter((item) => item.code !== ROLES.unroled.code)
		.map((item) => {
			return {
				value: item.code,
				label: item.label,
			};
		});

export const transformUsersToSelectOptions = (users) =>
	users.map((user) => ({
		value: user.id,
		label: `${user.second_name || ''} ${toInitial(user.name)} ${user?.patronymic ? toInitial(user.patronymic) : ''} \nПочта: ${user.email}`,
	}));

export const transformOrganizationToSelectOptions = (organizations: organizations_dto[]) =>
	organizations.map((item) => ({
		value: item.id,
		label: item.name,
	}));
