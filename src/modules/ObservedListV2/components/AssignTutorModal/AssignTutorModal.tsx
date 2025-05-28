import {useState} from 'react';
import React from 'react';
import {toast} from 'react-toastify';
import {useAppointObservedsMutation, useGetObservedsQuery} from '@app/api/common/usersApiSlice';

import {Modal, ModalLayout} from '../../../../UI';
import AssignTutorModalLayout from '../AssignTutorModalLayout/AssignTutorModalLayout';

const AssignTutorModal = ({showModal, setShowModal, currentObserved, tutorId}) => {
	const [selectedObs, setSelectedObs] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const {
		isLoading: isObsLoading,
		isError: isObsError,
		isFetching: isObsFetching,
		data: observeds,
		isSuccess,
	} = useGetObservedsQuery({text: searchValue.trim()}, {skip: !showModal});

	const [appointObserveds, {isLoading: isAppointLoading}] = useAppointObservedsMutation();

	let availableObs = [];

	const onAssign = async () => {
		try {
			await appointObserveds({
				link: selectedObs,
				tutor_id: +tutorId,
			}).unwrap();

			toast.success('Успешно!');
		} catch (error) {
			toast.error(error?.data?.detail || 'Что-то пошло не так');
		}
	};

	const onSelectObs = (e) => {
		const {checked, value} = e.target;

		if (checked) {
			setSelectedObs((prev) => [...prev, +value]);
		} else {
			setSelectedObs((prev) => prev.filter((id) => id !== +value));
		}
	};

	const onClose = () => {
		setShowModal(false);
		setSelectedObs([]);
	};

	const onSearch = (query) => {
		setSearchValue(query);
	};

	if (isSuccess) {
		availableObs = observeds.filter(
			(obs) => !currentObserved.some((curObs) => curObs.id === obs.id)
		);
	}

	return (
		<Modal active={showModal} handleClose={onClose}>
			<ModalLayout
				title="Назначить наблюдаемого"
				content={
					// eslint-disable-next-line
					<AssignTutorModalLayout
						selectedObs={selectedObs}
						observeds={availableObs}
						isObservedsLoading={isObsLoading || isObsFetching}
						isError={isObsError}
						isAssigning={isAppointLoading}
						onSearch={onSearch}
						onAssign={onAssign}
						onSelectObs={onSelectObs}
					/>
				}
			/>
		</Modal>
	);
};

export default AssignTutorModal;
