import {
  SpecialDaysOpenTimeModal,
  Button,
  useSpecialDaysOpenTimeModal,
} from "ui";
import { storybookModalsTitle } from "utils";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookModalsTitle + "SpecialDaysOpenTimeModal",
  component: SpecialDaysOpenTimeModal,
} as ComponentMeta<typeof SpecialDaysOpenTimeModal>;

export const Default = () => {
  const { modifiDays } = useSpecialDaysOpenTimeModal();
  return (
    <>
      <Button onClick={() => modifiDays([...Array(3)].map(() => new Date()))}>
        open
      </Button>
      <SpecialDaysOpenTimeModal
        onClearSpeicalDays={() => {}}
        onScheduleComplete={() => {}}
      />
    </>
  );
};
