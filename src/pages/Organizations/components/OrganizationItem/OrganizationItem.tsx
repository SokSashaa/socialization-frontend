import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {XCircleIcon} from '@heroicons/react/24/solid';

import ControlModal from '@components/ControlModal/ControlModal';

import {organizations_dto} from '@dto/organizations/organizations.dto';

import {useModalState} from '@hooks/useModalState';

import {ROUTING_FUNCTIONS} from '@routes/RouterConfig';

import css from './organization_item.module.scss';

type OrganizationItemPropsType = {
	item: organizations_dto;
	onDelete?: () => void;
};

const OrganizationItem: FC<OrganizationItemPropsType> = ({onDelete = () => {}, item}) => {
	const [isOpen, open, close] = useModalState(false);

	return (
		<div className={css.root}>
			<div>
				<h3>{item.name}</h3>
				<a href={item.site} target={'_blank'} rel="noreferrer">
					{item.site}
				</a>
			</div>
			<div className={css.buttons}>
				<Link to={ROUTING_FUNCTIONS.organizationEdit(item.id)}>Редактировать</Link>
			</div>
			<XCircleIcon className={css.icon} title={'Удалить'} onClick={open} />
			<ControlModal isOpen={isOpen} setIsOpen={close} onClickNo={close} onClickYes={onDelete}>
				<p className={css.childrenModal}>
					Вы уверены, что хотите удалить организацию под названием
					<span> {item.name}</span>, которая привязана к почте <span>{item.email}</span>?
				</p>
			</ControlModal>
		</div>
	);
};

export default OrganizationItem;
