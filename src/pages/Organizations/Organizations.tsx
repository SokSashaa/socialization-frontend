import {FC} from "react";
import {Portal, SearchBar} from "../../components";
import css from './organizations.module.scss'
import {ButtonAddItemList} from "../../UI";
import axios from "axios";
import {organizations_dto} from "../../dto/organizations.dto";
import {useMutation, useQuery, useQueryClient} from "react-query";
import CreateOrganizationModal from "./CreateOrganizationModal/CreateOrganizationModal";
import {useModalState} from "../../hooks/useModalState";
import OrganizationItem from "../../modules/Organizations/OrganizationItem/OrganizationItem";
import {toast} from "react-toastify";

const Organizations: FC = () => {
    const [isOpen, open, close] = useModalState(false)
    const queryClient = useQueryClient()

    const deleteOrganizationsMutate = useMutation({
        onSuccess: () => queryClient.invalidateQueries('organizations'),
        mutationFn: async (id: string) => {
            return (await axios.delete(`http://127.0.0.1:8000/api/organizations/${id}/delete_org/`)).data
        }
    })

    const deleteOnClick = (id: string) => {
        try {
            deleteOrganizationsMutate.mutate(id)
            if (deleteOrganizationsMutate.isError) {
                throw new Error('Ошибка')
            }
            toast.success('Организация удалена')
        } catch (error) {
            toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
        }
    }
    const getOrganizations = async (): Promise<organizations_dto[]> => {
        return (await axios.get('http://127.0.0.1:8000/api/organizations/')).data.results
    }
    const {data} = useQuery('organizations', getOrganizations)
    return <div className={css.root}>
        <SearchBar/>
        <ButtonAddItemList onClick={open}>Добавить организацию</ButtonAddItemList>
        {data && data.map(item => (
            <OrganizationItem key={item.id} item={item} onDelete={() => deleteOnClick(item.id)}/>
        ))}
        {
            <Portal>
                <CreateOrganizationModal isOpenModal={isOpen} setShowModal={close}/>
            </Portal>
        }


    </div>
}

export default Organizations
