import { FC, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

import CreateOrganizationModal from '@modules/Organizations/components/CreateOrganizationModal/CreateOrganizationModal';
import OrganizationItem from '@modules/Organizations/components/OrganizationItem/OrganizationItem';

import { organizations_dto } from '@dto/organizations.dto';

import { useModalState } from '@hooks/useModalState';

import { Portal, SearchBar } from '../../components';
import { ButtonAddItemList } from '../../UI';

import css from './organizations.module.scss';

const Organizations: FC = () => {
    const [isOpen, open, close] = useModalState(false);
    const queryClient = useQueryClient();
    const url = import.meta.env.VITE_SERVER_URL;
    const valueSearch = useRef('');

    const deleteOrganizationsMutate = useMutation({
        onSuccess: () => queryClient.invalidateQueries('organizations'),
        mutationFn: async (id: string) => {
            return (await axios.delete(url + `organizations/${id}/delete_org/`)).data;
        },
    });

    const deleteOnClick = (id: string) => {
        try {
            deleteOrganizationsMutate.mutate(id);
            if (deleteOrganizationsMutate.isError) {
                throw new Error('Ошибка');
            }
            toast.success('Организация удалена');
        } catch (error) {
            toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
        }
    };

    const getOrganizations = async (value: string): Promise<organizations_dto[]> => {
        return (await axios.get(url + `organizations/?search=${value}`)).data.results;
    };

    const onSearch = async (value: string) => {
        valueSearch.current = value;
        await queryClient.invalidateQueries('organizations');
    };

    const { data } = useQuery(
        ['organizations', valueSearch],
        () => getOrganizations(valueSearch.current),
        {
            refetchOnWindowFocus: false,
        },
    );

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
            {
                <Portal>
                    <CreateOrganizationModal
                        isOpenModal={isOpen}
                        setShowModal={close}
                    />
                </Portal>
            }
        </div>
    );
};

export default Organizations;
