import { FC, useRef } from 'react';
import { toast } from 'react-toastify';
import {
    useGetAllOrganizationsQuery,
    useLazyGetAllOrganizationsQuery,
} from '@app/api/common/organizationsApiSlice';

import { useDeleteOrganizationsMutation } from '@modules/Organizations/api/organizaionsApi.slice';
import CreateOrganizationModal from '@modules/Organizations/components/CreateOrganizationModal/CreateOrganizationModal';
import OrganizationItem from '@modules/Organizations/components/OrganizationItem/OrganizationItem';
import { findFirstErrorWithPath } from '@modules/Organizations/utils/findFirstErrorWithPath';

import { SearchBar } from '@components/index';

import { ButtonAddItemList } from '@UI/index';

import { useModalState } from '@hooks/useModalState';

import css from './organizations.module.scss';

const Organizations: FC = () => {
    const [isOpen, open, close] = useModalState(false);
    const valueSearch = useRef('');

    const [organizations] = useLazyGetAllOrganizationsQuery(); //триггер, чтобы работал для поиска
    const { data } = useGetAllOrganizationsQuery(valueSearch.current); // основные данные

    const [deleteOrganizationTrigger] = useDeleteOrganizationsMutation();

    const deleteOnClick = async (id: string) => {
        try {
            const result = await deleteOrganizationTrigger(id).unwrap();

            if (result.error) {
                throw result.error;
            }

            toast.success('Организация удалена');
        } catch (error) {
            toast.error(
                findFirstErrorWithPath(error).message || error.message || 'Что-то пошло не так',
            );
        }
    };

    const onSearch = async (value: string) => {
        valueSearch.current = value;
        await organizations(valueSearch.current).unwrap(); //вызывается триггер, но обновится data
    };

    return (
        <div className={css.root}>
            <SearchBar onSearch={onSearch} />
            <ButtonAddItemList onClick={open}>Добавить организацию</ButtonAddItemList>
            {data &&
                data.map((item) => (
                    <OrganizationItem
                        key={item.id}
                        item={item}
                        onDelete={() => deleteOnClick(item.id)}
                    />
                ))}

            <CreateOrganizationModal
                isOpenModal={isOpen}
                setShowModal={close}
            />
        </div>
    );
};

export default Organizations;
