import { storybookPartailsTitle, StorybookImplemntationLayout } from "utils";
import { ComponentMeta } from "@storybook/react";
import { ToggleVisable, ToggleVisableItem, Button } from "@UI";

export default {
  title: storybookPartailsTitle + "ToggleVisable",
  component: ToggleVisable,
} as ComponentMeta<typeof ToggleVisable>;

export const Default = () => {
  return (
    <StorybookImplemntationLayout
      implmentation={`
import { ToggleVisable, ToggleVisableItem, Button } from "@UI";
<ToggleVisable>
    {({ changeState, state }) => (
        <div className="flex flex-col gap-4">
            <div>
                <Button onClick={() => changeState("state 1")}>state 1</Button>
                <Button onClick={() => changeState("state 2")}>state 2</Button>
            </div>

            <ToggleVisableItem visableOnState={"state 1"}>
                <div className="p-4 bg-primary">this is state 1</div>
            </ToggleVisableItem>
            <ToggleVisableItem visableOnState={"state 2"}>
                <div className="p-4 bg-primary">this is state 2</div>
            </ToggleVisableItem>
        </div>
    )}
</ToggleVisable>
      
      
      `}
    >
      <ToggleVisable>
        {({ changeState, state }) => (
          <div className="flex flex-col gap-4">
            <div>
              <Button onClick={() => changeState("state 1")}>state 1</Button>
              <Button onClick={() => changeState("state 2")}>state 2</Button>
            </div>

            <ToggleVisableItem visableOnState={"state 1"}>
              <div className="p-4 bg-primary">this is state 1</div>
            </ToggleVisableItem>
            <ToggleVisableItem visableOnState={"state 2"}>
              <div className="p-4 bg-primary">this is state 2</div>
            </ToggleVisableItem>
          </div>
        )}
      </ToggleVisable>
    </StorybookImplemntationLayout>
  );
};
