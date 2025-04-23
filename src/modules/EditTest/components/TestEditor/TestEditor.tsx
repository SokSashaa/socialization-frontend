import { FieldArray, Form, Formik } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { arrayMove } from '@dnd-kit/sortable';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useEditTestMutation } from '../../api/editTestApiSlice';
import { useGetTestQuery } from '../../../../app/api/common/testApiSlice';

import { Button, Container, ErrorMessage } from '../../../../UI';
import { DraggableList } from '../../../../components';
import FormTop from '../FormTop/FormTop';
import AddQuestionButton from '../AddQuestionButton/AddQuestionButton';
import QuestionCard from '../QuestionCard/QuestionCard';

import { testSchema } from '../../utils/validation.helper';
import { onFieldArrayControl } from '../../utils/form.helper';
import { getQuestionPosition, transformResponse, transformTest } from '../../utils/data.helper';
import { INITIAL_QUESTION } from '../../utils/constants';
import styles from './TestEditor.module.css';
import Spinner from '../../../../UI/spinners/Spinner';
import { DragEndEvent } from '@dnd-kit/core';

const TestEditor = ({ id }) => {
    const { data: test, isLoading, isError } = useGetTestQuery(id);
    const [editTest, { isLoading: isLoadingEdit }] = useEditTestMutation();

    if (isLoading) {
        return <Spinner style={{ margin: '10px auto' }} />;
    }

    if (isError) {
        return (
            <ErrorMessage
                message="Ошибка загрузки теста"
                className="mt-10"
            />
        );
    }

    const upgradeTest = test && transformResponse(test);

    const onDragEnd = (questions, setFieldValue) => (event: DragEndEvent) => {
        //TODO разобраться почему не работает callback
        const { active, over } = event;

        if (active.id !== over?.id) {
            const originalPos = getQuestionPosition(questions, active.id);
            const finalPos = getQuestionPosition(questions, over?.id);

            setFieldValue('questions', arrayMove(questions, originalPos, finalPos));
        }
    };

    const onSubmit = async (values) => {
        try {
            const transformedTest = transformTest(values);

            await editTest(transformedTest);

            toast.success('Тест сохранен');
        } catch (error) {
            toast.error(error?.data?.detail || 'Что-то пошло не так');
        }
    };

    const submitBtnText = isLoadingEdit ? <Spinner /> : 'Сохранить';

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.inner}>
                    <Formik
                        initialValues={upgradeTest}
                        onSubmit={onSubmit}
                        validationSchema={testSchema}
                    >
                        {({ values: testValues, handleSubmit, setFieldValue }) => (
                            <Form
                                method="post"
                                className={styles.form}
                            >
                                <FormTop />
                                <FieldArray
                                    name="questions"
                                    render={(arrayHelpers) => {
                                        const { questions } = testValues;

                                        return questions && questions.length > 0 ? (
                                            <DraggableList
                                                data={questions}
                                                onDragEnd={onDragEnd(questions, setFieldValue)}
                                                classNameList={styles.questionList}
                                                withDragHandle
                                                renderItemContent={(item, index) => (
                                                    <QuestionCard
                                                        question={item}
                                                        qIndex={index}
                                                        arrayHelpers={arrayHelpers}
                                                    />
                                                )}
                                            />
                                        ) : (
                                            <AddQuestionButton
                                                onClick={onFieldArrayControl(arrayHelpers.push, {
                                                    id: nanoid(),
                                                    ...INITIAL_QUESTION,
                                                })}
                                                className="self-end"
                                            >
                                                <PlusCircleIcon className="icon h-8 w-8 fill-gray-500" />
                                            </AddQuestionButton>
                                        );
                                    }}
                                />

                                <Button
                                    className={styles.saveButton}
                                    type="submit"
                                    disabled={isLoadingEdit}
                                    onClick={handleSubmit}
                                >
                                    {submitBtnText}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    );
};

export default TestEditor;
