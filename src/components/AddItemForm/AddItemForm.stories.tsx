import React from 'react';
import {action} from '@storybook/addon-actions';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from './AddItemForm';


export default {
    title: 'Components/AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const callback = action(`Button 'add' was pressed inside the form`);


export const AddItemFormBaseExample: ComponentStory<typeof AddItemForm> = () => {
    return <AddItemForm addItem={callback} />;
}

export const AddItemFormDisabledExample: ComponentStory<typeof AddItemForm> = () => {
    return <AddItemForm addItem={callback} disabled={true} />;
}
