import {FC} from "react";
import css from './organization_item.module.scss'
import {organizations_dto} from "../../../dto/organizations.dto";
import {Link} from "react-router-dom";
import {XCircleIcon} from "@heroicons/react/24/solid";

type OrganizationItemPropsType = {
    item: organizations_dto,
    onDelete?: () => void
}
const OrganizationItem: FC<OrganizationItemPropsType> = ({ onDelete=()=>{}, item }) => {
    return <div className={css.root}>
        <div>
            <h3>{item.name}</h3>
            <a href={item.site} target={'_blank'}>{item.site}</a>
        </div>
        <div className={css.buttons}>
            <Link to={`/organizations/${item.id}/edit`}>Редактировать</Link>
        </div>
        <XCircleIcon className={css.icon} onClick={onDelete}/>
    </div>
}

export default OrganizationItem
