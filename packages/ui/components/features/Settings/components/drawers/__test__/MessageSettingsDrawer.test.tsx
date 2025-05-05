import { MessageSettingsDrawer } from "../MessageSettingsDrawer";
import React from "react";
import { RenderResult, render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  GetMyPrivacySettingsQuery,
  useGetMySocialPrivacySettings,
  useUpdateMyPrivacySettings,
} from "@features/Social";
import { MessagingSettings } from "@features/API";

const testids = {
  messageReadStatus: "MessageReadStatus",
  initialSettings: (type: MessagingSettings) => `initialMessaging-${type}`,
};

jest.mock("@features/Social", () => ({
  ...jest.requireActual("@features/Social"),
  useGetMySocialPrivacySettings: jest.fn(),
  useUpdateMyPrivacySettings: jest.fn(),
}));

describe("MessageSettingsDrawer", () => {
  let wrapper: RenderResult;
  const getSettingsMock = useGetMySocialPrivacySettings as jest.Mock;
  const updateSettingsMock = useUpdateMyPrivacySettings as jest.Mock;
  const mutateSettingsMock = jest.fn();

  beforeEach(() => {
    getSettingsMock.mockClear();
    updateSettingsMock.mockClear();
    mutateSettingsMock.mockClear();

    updateSettingsMock.mockImplementation(() => ({
      mutate: mutateSettingsMock,
    }));

    wrapper = render(
      <QueryClientProvider client={new QueryClient()}>
        <RecoilRoot>
          <MessageSettingsDrawer />
        </RecoilRoot>
      </QueryClientProvider>
    );
  });

  it("should render", () => {
    expect(wrapper).toBeDefined();
  });

  it("should call the get privacy hook initialy", () => {
    expect(getSettingsMock).toBeCalledTimes(1);
  });

  it("should set intial data provided by onSuccess fn", async () => {
    const lastCall = getSettingsMock.mock.lastCall;
    const options = lastCall[0];

    expect(typeof options?.onSuccess === "function").toBe(true);

    options.onSuccess({
      initialMessaging: MessagingSettings.All,
      messageReadStatus: false,
    } as GetMyPrivacySettingsQuery["getMyPrivacySettings"]);

    const intitialMessagingOptions = await wrapper.findAllByTestId(
      testids.initialSettings(MessagingSettings.All)
    );

    expect(intitialMessagingOptions.length).toBe(1);
    expect(intitialMessagingOptions.at(0)["checked"]).toBe(true);
  });
});
