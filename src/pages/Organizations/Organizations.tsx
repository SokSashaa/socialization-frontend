import React, {FC, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {
	useDeleteOrganizationsMutation,
	useGetAllOrganizationsQuery,
} from '@app/api/common/organizationsApiSlice';

import CreateOrganizationModal from '@modules/Organizations/components/CreateOrganizationModal/CreateOrganizationModal';
import OrganizationItem from '@modules/Organizations/components/OrganizationItem/OrganizationItem';

import {FilteredList} from '@components/index';

import {ButtonAddItemList, Container} from '@UI/index';

import {organizations_dto} from '@dto/organizations/organizations.dto';
import {sortList} from '@dto/users/getUsers.dto';

import {useModalState} from '@hooks/useModalState';

import {findFirstErrorWithPath} from '@utils/helpers/findFirstErrorWithPath';

import styles from './organizations.module.scss';

const DEFAULT_PAGINATION_LIMIT = 1;

const Organizations: FC = () => {
	const [isOpen, open, close] = useModalState(false);

	const [searchParams, setSearchParams] = useSearchParams();

	const [count, setCount] = useState(0);

	const pagination = {
		offset: Number(searchParams.get('offset')) || 0,
		limit: Number(searchParams.get('limit')) || DEFAULT_PAGINATION_LIMIT,
		count: count,
	};

	const {data, isLoading, isFetching, isError} = useGetAllOrganizationsQuery({
		search: searchParams.get('search') || '',
		limit: pagination.limit,
		offset: pagination.offset,
	});

	const [deleteOrganizationTrigger] = useDeleteOrganizationsMutation();

	useEffect(() => {
		if (data && data.count !== count) {
			setCount(data.count);
		}
	}, [data]);

	useEffect(() => {
		if (data) {
			setSearchParams((prev) => {
				const params = new URLSearchParams(prev);
				params.set('offset', '0');

				return params;
			});
		}
	}, [count]);

	const deleteOnClick = async (id: string) => {
		try {
			const result = await deleteOrganizationTrigger(id).unwrap();

			if (result.error) {
				throw result.error;
			}

			toast.success('Организация удалена');
		} catch (error) {
			toast.error(
				findFirstErrorWithPath(error)?.message || error.message || 'Что-то пошло не так'
			);
		}
	};

	const onSearch = async (query: string) => {
		setSearchParams((prev) => {
			const value = query.trim();
			const params = new URLSearchParams(prev);

			if (value) {
				params.set('search', value);
			} else {
				params.delete('search');
			}

			return params;
		});
	};

	return (
		<div className={styles.wrapper}>
			<Container>
				<FilteredList<organizations_dto>
					items={data ? data.results : []}
					isError={isError}
					sortList={sortList}
					isLoading={isLoading || isFetching}
					pagination={pagination}
					renderListItem={(item: organizations_dto) => (
						<OrganizationItem
							key={item.id}
							item={item}
							onDelete={() => deleteOnClick(item.id)}
						/>
					)}
					onSearch={onSearch}
				>
					<ButtonAddItemList onClick={open}>Добавить организацию</ButtonAddItemList>
				</FilteredList>
			</Container>
			<CreateOrganizationModal isOpenModal={isOpen} setShowModal={close} />
		</div>
	);
};

export default Organizations;
