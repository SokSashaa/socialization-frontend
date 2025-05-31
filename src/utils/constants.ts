type RoleType = {
	code: string;
	label: string;
};

type RolesType = {
	observed: RoleType;
	tutor: RoleType;
	administrator: RoleType;
	unroled: RoleType;
};

export const ROLES: RolesType = {
	observed: {
		code: 'observed',
		label: 'Наблюдаемый',
	},
	tutor: {
		code: 'tutor',
		label: 'Наставник',
	},
	administrator: {
		code: 'administrator',
		label: 'Старший наставник',
	},
	unroled: {
		code: 'unroled',
		label: 'Неизвестная роль',
	},
};

export type RoleCode = RolesType[keyof RolesType]['code'];

export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
