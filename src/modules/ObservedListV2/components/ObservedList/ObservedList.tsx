import { useState } from 'react';
import { m } from 'framer-motion';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useGetObservedsByTutorQuery } from '../../../../app/api/common/usersApiSlice';
import { Container, ErrorMessage } from '../../../../UI';
import { Portal } from '../../../../components';
import ObservedListItem from '../ObservedListItem/ObservedListItem';
import AssignTutorModal from '../AssignTutorModal/AssignTutorModal';
import styles from './ObservedList.module.css';
import Spinner from '../../../../UI/spinners/Spinner';

const liVariants = {
    visible: (i) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.2, duration: 0.2, type: 'ease' },
    }),
    hidden: {
        opacity: 0,
        y: 20,
    },
};

const ObservedList = ({ userId }) => {
    const [showAssignModal, setShowAssignModal] = useState(false);

    const {
        data: curObserveds,
        isLoading,
        isError,
        isFetching,
    } = useGetObservedsByTutorQuery({ id: userId });

    const onShowAssignModal = () => {
        setShowAssignModal(true);
    };

    if (isLoading || isFetching) {
        return <Spinner style={{ margin: '10px auto' }} />;
    }

    if (isError) {
        return <ErrorMessage message="Ошибка загрузки наблюдаемых" />;
    }

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.inner}>
                    <h2 className={styles.title}>Назначенные наблюдаемые</h2>
                    <ul className={styles.list}>
                        {curObserveds.map((obs, i) => (
                            <m.li
                                variants={liVariants}
                                initial="hidden"
                                animate="visible"
                                custom={i}
                                className={styles.listItem}
                                key={obs.id}
                            >
                                <ObservedListItem observed={obs} />
                            </m.li>
                        ))}
                        <m.button
                            variants={liVariants}
                            initial="hidden"
                            animate="visible"
                            custom={curObserveds.length}
                            className={styles.button}
                            type="button"
                            aria-label="Добавить наблюдаемого"
                            onClick={onShowAssignModal}
                        >
                            <PlusCircleIcon className="icon mx-auto h-36 w-36 fill-gray-500" />
                        </m.button>
                    </ul>
                </div>
            </Container>

            <Portal>
                <AssignTutorModal
                    showModal={showAssignModal}
                    setShowModal={setShowAssignModal}
                    currentObserved={curObserveds}
                    tutorId={userId}
                />
            </Portal>
        </div>
    );
};

export default ObservedList;
