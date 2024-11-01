import {useCallback, useMemo, useState} from 'react';
import {useFormikContext} from 'formik';
import {nanoid} from '@reduxjs/toolkit';
import {FormikSelect, InputText} from '../../../../UI';
import QuestionFooter from '../QuestionFooter/QuestionFooter';
import ListEditableAnswers from '../ListEditableAnswers/ListEditableAnswers';
import TextAnswerPreview from '../TextAnswerPreview/TextAnswerPreview';
import styles from './QuestionEdit.module.css';

const QuestionEdit = ({question, qIndex, arrayHelpers}) => {
    const [showPoints, setShowPoints] = useState(false);

    const {setFieldValue} = useFormikContext();

    const selectOptions = [
        {
            value: 'radio',
            label: 'Один из списка',
        },
        {
            value: 'checkbox',
            label: 'Несколько из списка',
        },
    ];


    const renderQuestionContent = (q, index) => {
        const {type, answers} = q;

        switch (type) {
            case 'text': {
                return <TextAnswerPreview/>;
            }
            case 'radio':
            case 'checkbox': {
                return (
                    <ListEditableAnswers
                        showPoints={showPoints}
                        qIndex={index}
                        answers={answers}
                        type={type}
                    />
                );
            }

            default:
                return null;
        }
    };

    const onChangeQuestionType = useCallback((q, index) => (e) => {
        const {value: type} = e.target;
        const {answers} = q;

        if (type === 'text') {
            setFieldValue(`questions[${index}].answers`, []);
        } else if (type === 'radio' || type === 'checkbox') {
            if (answers.length === 0) {
                const newAnswer = {
                    id: nanoid(),
                    text: 'Ответ 1',
                    point: 0,
                };

                const newAnswers = [newAnswer];

                setFieldValue(`questions[${index}].answers`, newAnswers);
            }
        }
    },[]);

    return (
        <div>
            <div className={styles.top}>
                <InputText
                    wrapperClassNames={styles.questionTitleWrapper}
                    className={styles.questionTitle}
                    name={`questions[${qIndex}].title`}
                    placeholder="Вопрос"
                />
                <FormikSelect
                    className={styles.questionType}
                    name={`questions[${qIndex}].type`}
                    options={selectOptions}
                    onChange={onChangeQuestionType(question, qIndex)}
                    selectProps={{
                        'aria-label': 'Тип вопроса',
                    }}
                />
            </div>
            {renderQuestionContent(question, qIndex)}
            <QuestionFooter
                qIndex={qIndex}
                question={question}
                arrayHelpers={arrayHelpers}
                onShowPoints={() => setShowPoints((prev) => !prev)}
            />
        </div>
    );
};

export default QuestionEdit;
