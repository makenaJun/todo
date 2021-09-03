import React, {ChangeEvent, FC, FocusEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type PropsType = {
    title: string,
    onChange: (title: string) => void,
}
export const EditableSpan: FC<PropsType> = React.memo((props) => {
    const {title, onChange} = props;
    const [editMode, setEditMode] = useState(false);
    const [localTitle, setLocalTitle] = useState('');

    const activateEditMode = () => {
        setLocalTitle(title);
        setEditMode(true);
    };
    const deactivateEditMode = (event: FocusEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (value) {
            onChange(value);
            setEditMode(false);
        } else {
            setLocalTitle(title);
            setEditMode(false);
        }
    };
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(event.currentTarget.value)
    };

    return editMode ?
        <TextField autoFocus onBlur={deactivateEditMode} value={localTitle} onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
})