import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TextField} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm: FC<AddItemFormPropsType> = (props) => {

    const [title, setNewTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onAddItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setNewTitle('');
        } else {
            setError('Field is required');
        }
    };
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            onAddItemHandler();
        }
    };
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value);
        setError(null)
    };

    return (
        <div className={'addItemForm'}>
            <TextField error={!!error}
                       label="Type value"
                       variant={'outlined'}
                       onKeyDown={onKeyDownHandler}
                       onChange={onChangeTitleHandler}
                       value={title}
                       helperText={error}
            />
            <IconButton onClick={onAddItemHandler} color={'primary'}>
                <AddBoxIcon fontSize="large"/>
            </IconButton>
        </div>
    )
}