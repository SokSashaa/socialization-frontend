import { toInitial } from '../../../utils/helpers';

export const transformRolesToSelectOptions = (roles) =>
  Object.keys(roles).reduce((acc, role) => {
    if (roles[role].code !== roles.administrator.code) {
      return [
        ...acc,
        {
          value: roles[role].code,
          label: roles[role].label,
        },
      ];
    }

    return acc;
  }, []);

export const transformUsersToSelectOptions = (users) =>
  users.map((user) => ({
    value: user.id,
    label: `${user.second_name || ''} ${toInitial(user.name)} ${user?.patronymic ? toInitial(user.patronymic) : ''}`,
  }));
