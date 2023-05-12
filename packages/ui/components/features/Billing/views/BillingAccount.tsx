import { mapArray, useForm } from "@UI/../utils/src";
import React, { useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateMyBillingAccountMutation } from "../services/useUpdateMyBillingAccount";
import {
  BillingAccountBusinessProfileInput,
  BillingAccountAddressInput,
  BillingAccountDateOfBirthInput,
  BillingAccountBusinessType,
  BillingAccountExternalAccountInput,
  BillingAccountCompanyInput,
  BillingAccountIndividualInput,
  CreateCompanyPersonInput,
  CreateCompanyPersonRelationshipInput,
} from "@features/API";
import {
  Button,
  Checkbox,
  HStack,
  Input,
  Select,
  SelectOption,
  Switch,
  Table,
  TableContainer,
  Td,
  Th,
  Tr,
  TrashIcon,
} from "@partials";
import { startCase } from "lodash";
import {
  useGetCountriesQuery,
  useGetCountryCititesQuery,
} from "@features/Admin";
import { DateFormInput } from "@blocks";
import { useGetMyPayoutAccountQuery } from "../services/useGetMyPayoutAccount";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@features/Stripe/stripeClient";

export const BillingAccount = React.forwardRef(
  (
    {
      onSuccess,
    }: {
      onSuccess: () => any;
    },
    ref
  ) => {
    const { t } = useTranslation();

    const { data: account } = useGetMyPayoutAccountQuery();

    const { form: bizProfile } = useForm<BillingAccountBusinessProfileInput>(
      {
        mcc: account?.business_profile?.mcc || "",
        name: account?.business_profile?.name || "",
        url: account?.business_profile?.url || "",
      },
      {},
      { addLabel: true }
    );

    const {
      form: dob,
      inputProps: dobInout,
      handleChange: dobChange,
    } = useForm<BillingAccountDateOfBirthInput>(
      {
        day: account?.individual?.dob.day || 1,
        month: account?.individual?.dob.month || 0,
        year: account?.individual?.dob.year || 1995,
      },
      {},
      { addLabel: true }
    );

    const {
      form: address,
      inputProps: addressInput,
      selectProps: addressSelect,
    } = useForm<BillingAccountAddressInput>(
      {
        city: account?.individual?.address.city || "",
        country: account?.individual?.address?.country || "",
        line1: account?.individual?.address?.line1 || "",
        postal_code: account?.individual?.address.postal_code || "",
        state: account?.individual?.address?.state || "",
      },
      {},
      { addLabel: true }
    );

    const { form: externalAccount, inputProps: externalAccInput } =
      useForm<BillingAccountExternalAccountInput>(
        {
          account_number: "",
          country: "",
          currency: "",
          object: "bank_account",
          routing_number: "",
        },
        {},
        { addLabel: true }
      );

    const { form: company, inputProps: companyInput } =
      useForm<BillingAccountCompanyInput>(
        {
          address,
          name: account?.company?.name || "",
          phone: account?.company?.phone || "",
          tax_id: account?.company?.tax_id || "",
        },
        {
          address,
        },
        {
          addLabel: true,
        }
      );

    const { form: individual, inputProps: individualInput } =
      useForm<BillingAccountIndividualInput>(
        {
          address,
          dob,
          email: account?.individual?.email || "",
          first_name: account?.individual?.first_name || "",
          id_number: account?.individual?.id_number || "",
          last_name: account?.individual?.last_name || "",
          phone: account?.individual?.phone || "",
          ssn_last_4: account?.individual?.ssn_last_4 || "",
        },
        {
          address,
          dob,
        },
        { addLabel: true }
      );

    const [members, setMembers] = React.useState<CreateCompanyPersonInput[]>(
      account?.companyMembers || []
    );

    const { form, inputProps, selectProps, dateInputProps } = useForm<
      Parameters<typeof mutate>[0]
    >(
      {
        business_profile: bizProfile,
        business_type: BillingAccountBusinessType.Individual,
        external_account: externalAccount,
      },
      {
        external_account: externalAccount,
        business_profile: bizProfile,
        company,
        individual,
        companyMembers: members,
      },
      { addLabel: true }
    );

    const isIndividual =
      form.business_type === BillingAccountBusinessType.Individual;

    const { mutate } = useUpdateMyBillingAccountMutation();

    const submit = () => {
      mutate(
        {
          ...form,
          individual: isIndividual ? form.individual : undefined,
          company: isIndividual ? undefined : form.company,
        },
        {
          onSuccess,
        }
      );
    };

    const [countrySearch, setCountrySearch] = React.useState<string>("");
    const [citySearch, setCitySearch] = React.useState<string>("");
    const [selectedCountry, setSelectedCountry] = React.useState<string>();

    const { data: countries } = useGetCountriesQuery(countrySearch);
    const { data: cities } = useGetCountryCititesQuery(
      {
        countryid: countries?.find((v) => v.code === selectedCountry)?.id!,
        name: citySearch || "",
      },
      !!selectedCountry && !!citySearch
    );

    useImperativeHandle(ref, () => ({
      submit,
    }));

    return (
      <div className="flex flex-col gap-4">
        <Select {...selectProps("business_type")} label={t("Business Type")}>
          {Object.values(BillingAccountBusinessType).map((v) => (
            <SelectOption value={v}>{t(startCase(v))}</SelectOption>
          ))}
        </Select>
        <p className="font-bold">
          {isIndividual ? t("Personal Location") : t("Company Location")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select {...addressSelect("country")}>
            {mapArray(countries, (v) => (
              <SelectOption value={v.code}>{v.name}</SelectOption>
            ))}
          </Select>
          <Select {...addressSelect("city")}>
            {mapArray(cities, (v) => (
              <SelectOption value={v.code}>{v.name}</SelectOption>
            ))}
          </Select>
          <HStack>
            <Input {...addressInput("state")} />
            <Input {...addressInput("postal_code")} />
          </HStack>
          <Input
            className="col-span-1 sm:col-span-2"
            {...addressInput("line1")}
            label={t("Address")}
          />
        </div>
        <p>{t("Card details")}</p>
        <Elements stripe={stripePromise}>
          <CardElement onChange={(v) => console.log({ v })} />
        </Elements>

        {form.business_type === BillingAccountBusinessType.Individual ? (
          <div className="flex flex-col gap-2 w-fulll">
            <p>{t("Personal Infomrations")}</p>
            <HStack>
              <Input {...individualInput("first_name")} />
              <Input {...individualInput("last_name")} />
            </HStack>
            <DateFormInput
              label={t("Birth Date")}
              dateValue={new Date(dob.year, dob.month, dob.day).toString()}
              onDateChange={(v) => {
                if (v) {
                  const d = new Date(v);
                  dobChange("year", d.getFullYear());
                  dobChange("month", d.getMonth());
                  dobChange("day", d.getDate());
                }
              }}
            />
            <Input {...individualInput("id_number")} />
            <Input {...individualInput("email")} />
            <Input {...individualInput("phone")} />
            <Input
              {...individualInput("ssn_last_4")}
              label={t("SSN (Social Security Number) last 4 numbers")}
              description={t("this is only required for US based accounts")}
            />
          </div>
        ) : null}

        {form.business_type === BillingAccountBusinessType.Company ? (
          <div className="flex flex-col gap-2 w-full">
            <p className="font-bold">{t("Company Details")}</p>
            <Input {...companyInput("name")} label={t("Company name")} />
            <Input {...companyInput("phone")} />
            <Input {...companyInput("tax_id")} />

            <p className="font-bold">{t("Company Members Details")}</p>

            <div className="flex flex-col gap-4">
              <div>
                <p>{t("Member type")}</p>
                <HStack className="flex-wrap">
                  {["director", "executive", "owner", "representative"].map(
                    (v, i) => (
                      <Checkbox
                        checked={false}
                        onChange={(e) => e.target.checked}
                        key={i}
                      >
                        {startCase(v)}
                      </Checkbox>
                    )
                  )}
                </HStack>
              </div>

              <HStack>
                <Input {...inputProps("firstName")} />
                <Input {...inputProps("lastName")} />
              </HStack>
              <Input {...inputProps("email")} />
              <Input {...inputProps("phone")} />
              <HStack>
                <DateFormInput {...dateInputProps("dob")} />
                <Input type="number" {...dateInputProps("id_number")} />
              </HStack>
              <Select {...addressSelect("country")}>
                {mapArray(countries, (v) => (
                  <SelectOption value={v.code}>{v.name}</SelectOption>
                ))}
              </Select>
              <Select {...addressSelect("city")}>
                {mapArray(cities, (v) => (
                  <SelectOption value={v.code}>{v.name}</SelectOption>
                ))}
              </Select>
              <HStack>
                <Input {...addressInput("state")} />
                <Input {...addressInput("postal_code")} />
              </HStack>
              <Input
                className="col-span-1 sm:col-span-2"
                {...addressInput("line1")}
                label={t("Address")}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

const CompanyMemberRow: React.FC<{
  member: CreateCompanyPersonInput;
  onChange: (member: CreateCompanyPersonInput) => any;
  onDelete: () => any;
}> = ({ member, onChange, onDelete }) => {
  const { t } = useTranslation();
  const { form: dob, handleChange: dobChange } =
    useForm<BillingAccountDateOfBirthInput>(member.dob);

  const {
    form: address,
    inputProps: addressInput,
    selectProps: addressSelect,
  } = useForm<BillingAccountAddressInput>(member.address);

  const { form: relation, switchInputProps } =
    useForm<CreateCompanyPersonRelationshipInput>(member.relationship);

  const { form, inputProps, selectProps, dateInputProps } =
    useForm<CreateCompanyPersonInput>(member, {
      address,
      dob,
      relationship: relation,
    });

  React.useEffect(() => {
    if (typeof onChange === "function") {
      onChange(form);
    }
  }, [form]);

  const [countrySearch, setCountrySearch] = React.useState<string>("");
  const [citySearch, setCitySearch] = React.useState<string>("");
  const [selectedCountry, setSelectedCountry] = React.useState<string>();

  const { data: countries } = useGetCountriesQuery(countrySearch);
  const { data: cities } = useGetCountryCititesQuery(
    {
      countryid: countries?.find((v) => v.code === selectedCountry)?.id!,
      name: citySearch || "",
    },
    !!selectedCountry && !!citySearch
  );

  return (
    <Tr>
      <Td>
        <Input {...inputProps("first_name")}></Input>
      </Td>
      <Td>
        <Input {...inputProps("last_name")}></Input>
      </Td>
      <Td>
        <Input {...inputProps("email")}></Input>
      </Td>
      <Td>
        <Input {...inputProps("phone")}></Input>
      </Td>
      <Td>
        <DateFormInput
          label={undefined}
          dateValue={new Date(dob.year, dob.month, dob.day).toString()}
          onDateChange={(v) => {
            if (v) {
              const d = new Date(v);
              dobChange("year", d.getFullYear());
              dobChange("month", d.getMonth());
              dobChange("day", d.getDate());
            }
          }}
        />
      </Td>
      <Td>
        <Input {...inputProps("id_number")}></Input>
      </Td>
      <Td>
        <Input
          className="col-span-1 sm:col-span-2"
          {...addressInput("line1")}
        />
      </Td>
      <Td>
        <Select {...addressSelect("country")}>
          {mapArray(countries, (v) => (
            <SelectOption value={v.code}>{v.name}</SelectOption>
          ))}
        </Select>
      </Td>
      <Td>
        <Select {...addressSelect("city")}>
          {mapArray(cities, (v) => (
            <SelectOption value={v.code}>{v.name}</SelectOption>
          ))}
        </Select>
      </Td>
      <Td>
        <Input {...addressInput("state")} />
      </Td>
      <Td>
        <Input {...addressInput("postal_code")} />
      </Td>
      <Td>
        <Switch {...switchInputProps("owner")}></Switch>
      </Td>
      <Td>
        <Switch {...switchInputProps("representative")}></Switch>
      </Td>
      <Td>
        <Switch {...switchInputProps("director")}></Switch>
      </Td>
      <Td>
        <Switch {...switchInputProps("executive")}></Switch>
      </Td>
      <Td>
        <Button
          center
          className="p-2 "
          colorScheme="danger"
          onClick={() => onDelete && onDelete()}
        >
          <TrashIcon />
        </Button>
      </Td>
    </Tr>
  );
};
