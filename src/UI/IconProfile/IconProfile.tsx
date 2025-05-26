import React, {FC} from 'react';
import clsx from 'clsx';

import {IconProfileSizes} from '@UI/IconProfile/types';

import css from './IconProfile.module.scss';

interface IconListProps {
	id: string;
	defaultPhoto: string;
	photo?: string | null;
	size?: IconProfileSizes;
}

const IconProfile: FC<IconListProps> = ({
	id,
	photo,
	defaultPhoto,
	size = IconProfileSizes.MEDIUM,
}) => {
	return (
		<>
			{photo ? (
				<div key={`photo_div_${id}`} className={clsx(css.imageWrapper, css[size])}>
					<img className={css.image} src={photo} alt="user" />
				</div>
			) : (
				<img key={`photo_img_${id}`} src={defaultPhoto} alt="user" />
			)}
		</>
	);
};

export default IconProfile;
