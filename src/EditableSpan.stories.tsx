import React from 'react';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {EditableSpan} from './EditableSpan';


export default {
    title: 'Components/EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;

const changeCallback = action(`Value changed`);


const Template: ComponentStory<typeof EditableSpan> = () => {

    return <EditableSpan title={'Hello'}
                         onChange={changeCallback}/>
}

export const EditableSpanBaseExample = Template.bind({});
