import {FC} from 'react';
import React from 'react';
import {useGetObservedsByTutorQuery} from '@app/api/common/usersApiSlice';

import ItemUser from '../ProfileInfoForm/ItemUser/ItemUser';

import css from '../ProfileInfoForm/ProfileInfo.module.scss';

interface ObservedListProps {
	user_id: number;
}

const ObservedList: FC<ObservedListProps> = ({user_id}) => {
	const {data: observeds} = useGetObservedsByTutorQuery({id: user_id, ordering: 'id'});

	return (
		<>
			{observeds && (
				<>
					{observeds.results.length < 1 && <h3 className={css.title}>Наблюдаемых нет</h3>}
					{observeds.results.length > 0 && (
						<>
							<h3 className={css.title}>Назначенные наблюдаемые: </h3>
							<div>
								{observeds.results.map((item) => {
									if (item) {
										return <ItemUser key={item.id} user={item} />;
									} else {
										return null;
									}
								})}
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default ObservedList;
