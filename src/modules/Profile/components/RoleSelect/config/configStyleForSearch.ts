import {defaultConfigStylesForSearch} from '@UI/formik/FormikSelect/defaultConfigStylesForSearch';

export const configStyleForSearch = {
	...defaultConfigStylesForSearch,
	option: (base, state) => {
		const roleStyle = {
			height: '50px',
			whiteSpace: 'pre-wrap',
		};

		return {...defaultConfigStylesForSearch?.option(base, state), ...roleStyle};
	},
};
