import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesInputTitle } from "utils";
import { CancelationPolicyInput } from "./CancelationPolicyInput";

export default {
    title:storybookOtherServicesInputTitle + "CancelationPolicyInput",
    component:CancelationPolicyInput
} as ComponentMeta<typeof CancelationPolicyInput>


const template:ComponentStory<typeof CancelationPolicyInput> = (args)=> <CancelationPolicyInput {...args} />

export const Default = template.bind({})
Default.args = {

}