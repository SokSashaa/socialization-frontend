import React, {FC} from 'react';
import clsx from 'clsx';

import {AvatarSizes} from './types';

import css from './Avatar.module.scss';

interface AvatarProps {
	id: string;
	defaultPhoto: string;
	photo?: string | null;
	size?: AvatarSizes;
}

const Avatar: FC<AvatarProps> = ({id, photo, defaultPhoto, size = AvatarSizes.MEDIUM}) => {
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

export default Avatar;
