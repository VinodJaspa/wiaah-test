import React, { useState, useEffect } from "react";
import { Input, Checkbox, Select as AntSelect } from "antd";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { FiBox } from "react-icons/fi";
import { AiFillCheckCircle, AiOutlineInbox } from "react-icons/ai";
import {
  MdArrowBackIosNew,
  MdPhotoCamera,
  MdOutlineClose,
} from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { Divider } from "ui/components";
import Webcam from "react-webcam";
import { blobToDataURL } from "blob-util";
import { Progress } from "antd";
import { t } from "i18next";

const { Option } = AntSelect;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const webCamVideoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};

const storeOptions = ["Men", "Women", "Children", "Babies"];
const options = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange" },
];
const NO_PROFIL_PIC_URL = "/person-icon.png";
const FREE_PLAN = 0;
const PAY_PLAN = 1;
const GMAIL_MAIL_SERVICE = 1;
const YAHOO_MAIL_SERVICE = 2;
const OUTLOOK_MAIL_SERVICE = 3;
const WHATSAPP_MAIL_SERVICE = 4;
const OTHER_MAIL_SERVICE = 5;
let countriesArray = Array();
const countries = Country.getAllCountries();
countries.forEach((element) => {
  countriesArray.push({
    value: element.isoCode,
    label: element.name,
  });
});

export const SellerProfileStartupView: React.FC = ({}) => {
  let [formStep, setFormStep] = useState(0);
  const formStepTitle = [
    t("Shop_information", "Shop information"),
    t("Select_a_plan", "Select a plan"),
    t("Payment_Gate", "Payment Gate"),
    t("Shipping Settings", "Shipping Settings"),
    t("Find_your_freinds", "Find your freinds"),
    t("Add_Profile_Pic", "Add Profile Pic"),
  ];
  let [states, setState] = useState([
    { value: "", label: t("Select_country_first!", "Select country first!") },
  ]);
  let [cities, setCities] = useState([
    { value: "", label: t("Select_state_first!", "Select state first!") },
  ]);
  let [countryCode, setCountryCode] = useState("");
  let [stateCode, setStateCode] = useState("");
  let [plan, setPlan] = useState(FREE_PLAN);
  let [shippingMethode, setShippingMethod] = useState(false);
  let [mailService, setMailService] = useState(0);
  let [webCamOn, setWebcamOn] = useState(false);
  let [profilePicSrc, setProfilePicSrc] = useState(NO_PROFIL_PIC_URL);

  const webcamRef = React.useRef<any>();
  const imageFileRef = React.useRef<any>();

  function handleCountryChange(value: any) {
    setStateCode("");
    setCountryCode(value.value);
  }
  function handleStateChange(value: any) {
    setStateCode(value.value);
  }
  function handleProfilImageChange(files: any) {
    console.log(files.files[0]);
    blobToDataURL(files.files[0]).then((dataUrl) => {
      setProfilePicSrc(dataUrl);
    });
  }
  const captureFromWebCam = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamOn(false);
    setProfilePicSrc(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    const statesArray = State.getStatesOfCountry(countryCode);
    let index = 0;
    statesArray?.forEach((element) => {
      states[index] = { value: element.isoCode, label: element.name };
      index++;
    });
  }, [countryCode]);
  useEffect(() => {
    const citiesArray = City.getCitiesOfState(countryCode, stateCode);
    let index = 0;
    citiesArray?.forEach((element) => {
      cities[index] = { value: element.name, label: element.name };
      index++;
    });
  }, [stateCode]);
  return (
    <>
      <div className="py-28 lg:py-20">
        <div className="fixed top-0 left-0 z-10 w-full">
          <div className="flex items-center justify-between bg-white p-4 lg:hidden">
            <Progress
              type="circle"
              strokeColor="#57bf9c"
              percent={((formStep + 1) / formStepTitle.length) * 100}
              width={90}
              strokeWidth={9}
              format={() => formStep + 1 + " of " + formStepTitle.length}
            />
            <div className="flex flex-col items-end">
              <div className="mb-2 text-lg font-bold">
                {formStepTitle[formStep]}
              </div>
              <div className="text-xs text-gray-400">
                {formStepTitle[formStep + 1]
                  ? "Next: " + formStepTitle[formStep + 1]
                  : t("Finalisation", "Finalisation")}
              </div>
            </div>
          </div>
          <div className="hidden items-stretch justify-start bg-gray-200 lg:flex">
            {formStepTitle.map((item, key: number) => {
              return (
                <div
                  key={key}
                  className={`${
                    formStep == key ? "green-background text-white" : ""
                  } flex w-4/12 flex-col justify-center px-6 py-4`}
                >
                  <div className="text-lg font-bold">
                    {t("Step", "Step")} {key + 1}
                  </div>
                  <div>{item}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4 lg:p-8">
          {formStep == 0 && (
            <div>
              <h2 className="hidden text-xl font-bold lg:block">
                {t("Fill_out_shop_information", "Fill out shop information")}
              </h2>
              <div className="flex lg:p-5">
                <div className="w-full">
                  <Input
                    className="mb-4 rounded-md border-gray-300"
                    size="large"
                    placeholder={t("Company", "Company")}
                  />
                  <Input
                    className="mb-4 rounded-md border-gray-300"
                    size="large"
                    placeholder={t("Address", "Address") + " 1"}
                  />
                  <Input
                    className="mb-4 rounded-md border-gray-300"
                    size="large"
                    placeholder={t("Address", "Address") + " 2"}
                  />
                  <Select
                    id="countryselect"
                    instanceId="countryselect"
                    className="react-select-container mb-4 rounded-md border-gray-300"
                    classNamePrefix="react-select"
                    options={countriesArray}
                    placeholder={t("Country", "Country")}
                    onChange={(value) => {
                      handleCountryChange(value);
                    }}
                  />
                  <Select
                    id="stateselect"
                    instanceId="stateselect"
                    className="react-select-container mb-4 rounded-md border-gray-300"
                    classNamePrefix="react-select"
                    onChange={(value) => {
                      handleStateChange(value);
                    }}
                    options={states}
                    placeholder={t("State", "State")}
                  />
                  <Select
                    id="cityselect"
                    instanceId="cityselect"
                    className="react-select-container mb-4 rounded-md border-gray-300"
                    classNamePrefix="react-select"
                    options={cities}
                    placeholder={t("City", "City")}
                  />
                  <Input
                    className="mb-4 rounded-md border-gray-300"
                    size="large"
                    placeholder={t(
                      "company_CRN",
                      "Company Registered Number (CRN)"
                    )}
                  />
                  <AntSelect
                    placeholder={t("Currency", "Currency")}
                    className="mb-4 w-full border-gray-300"
                    size="large"
                  >
                    <Option value="male">USD</Option>
                    <Option value="femal">EUR</Option>
                  </AntSelect>
                  <AntSelect
                    placeholder={t("Type_of_Seller", "Type of Seller")}
                    className="mb-4 w-full border-gray-300"
                    size="large"
                  >
                    <Option value="male">{t("ONE", "ONE")}</Option>
                    <Option value="femal">{t("TOW", "TOW")}</Option>
                  </AntSelect>
                  <AntSelect
                    placeholder={t("Type_of_Shop", "Type of Shop")}
                    className="mb-4 w-full border-gray-300"
                    size="large"
                  >
                    <Option value="male">{t("ONE", "ONE")}</Option>
                    <Option value="femal">{t("TOW", "TOW")}</Option>
                  </AntSelect>
                  <TextArea
                    rows={4}
                    placeholder={t("Brand_presentation", "Brand presentation")}
                    className="mb-4 w-full border-gray-300"
                    maxLength={6}
                  />
                  <div className="">
                    <label htmlFor="">{t("Store_for", "Store for")}</label>
                    <div className="mt-2">
                      <Checkbox>{t("All", "All")}</Checkbox>
                      <Checkbox>{t("Men", "Men")}</Checkbox>
                      <Checkbox>{t("Women", "Women")}</Checkbox>
                      <Checkbox>{t("Children", "Children")}</Checkbox>
                      <Checkbox>{t("Babies", "Babies")}</Checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {formStep == 1 && (
            <div className="">
              <h2 className="hidden text-xl font-bold lg:block">
                {t("Select_a_plan", "Select a plan")}
              </h2>
              <div className="lg-centered-step flex flex-col justify-center lg:flex-row">
                <div
                  onClick={() => {
                    setPlan(0);
                  }}
                  className={`${
                    plan == FREE_PLAN ? "green-border border-8" : ""
                  } w-full cursor-pointer rounded-xl bg-slate-900 p-6 lg:mx-5 lg:w-4/12`}
                >
                  <div className="flex items-center">
                    <div className="green-text mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl">
                      <FiBox />
                    </div>
                    <div>
                      <div className="text-lg text-white">
                        {t("Free_Plan", "Free Plan")}
                      </div>
                      <div className="text-gray-400">
                        <span>$</span>
                        <span className="mx-1 text-2xl text-white">0</span>
                        <span>/ {t("mounth", "mounth")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="my-4 h-px bg-white opacity-50"></div>
                  <div className="mb-2 flex items-center text-lg text-white">
                    <AiFillCheckCircle className="mr-2 text-xl" />{" "}
                    <span>$0 / {t("no_limit", "no limit")}</span>
                  </div>
                  <div className="flex items-center text-lg text-white">
                    <AiFillCheckCircle className="mr-2 text-xl" />{" "}
                    <span>
                      20%{" "}
                      {t("commission_on_each_sale", "commission on each sale")}
                    </span>
                  </div>
                  <div className="mt-9 mb-6">
                    <button className="green-background h-10 w-full rounded-md text-white">
                      {t("Choose_a_plan", "Choose a plan")}
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setPlan(1);
                  }}
                  className={`${
                    plan == PAY_PLAN ? "green-border border-8" : ""
                  } mt-6 w-full cursor-pointer rounded-xl bg-slate-900 p-6 lg:mx-5 lg:mt-0 lg:w-4/12`}
                >
                  <div className="flex items-center">
                    <div className="green-text mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl">
                      <AiOutlineInbox />
                    </div>
                    <div>
                      <div className="text-lg text-white">
                        {t("Pay_Plan", "Pay Plan")}
                      </div>
                      <div className="text-gray-400">
                        <span>$</span>
                        <span className="mx-1 text-2xl text-white">500</span>
                        <span>/ {t("mounth", "mounth")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="my-4 h-px bg-white opacity-50"></div>
                  <div className="mb-2 flex items-center text-lg text-white">
                    <AiFillCheckCircle className="mr-2 text-xl" />{" "}
                    <span>$500 / {t("no_limit", "no limit")}</span>
                  </div>
                  <div className="flex items-center text-lg text-white">
                    <AiFillCheckCircle className="mr-2 text-xl" />{" "}
                    <span>
                      {t("No_commission_on_sales", "No commission on sales")}
                    </span>
                  </div>
                  <div className="mt-9 mb-6">
                    <button className="green-background h-10 w-full rounded-md text-white">
                      {t("Choose_a_plan", "Choose a plan")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {formStep == 2 && (
            <div>
              <h2 className="hidden text-xl font-bold lg:block">
                {t("Enter_paymen_details", "Enter payment details")}
              </h2>
              <div className="rounded-md border-2 border-gray-300 px-4 py-6 lg:mt-8">
                <h3 className="text-lg font-bold">{t("Payment", "Payment")}</h3>
                <div className="flex flex-wrap items-center">
                  <Input type="radio" checked />
                  <span className="ml-4">
                    {t("Credit_Debit_card", "Credit / Debit card")}
                  </span>
                  <img
                    className="ml-2 inline h-8"
                    src="/visa-logo.png"
                    alt="visa logo"
                  />
                  <img
                    className="ml-2 inline h-8"
                    src="/master-card-logo.png"
                    alt="master card logo"
                  />
                  <img
                    className="ml-2 inline h-8"
                    src="/american-express-logo.png"
                    alt="american express logo"
                  />
                  <img
                    className="ml-2 inline h-8"
                    src="/discover-network-logo.png"
                    alt="discover network logo"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="">{t("Name_on_Card", "Name on Card")}</label>
                  <Input
                    className="mt-2 mb-4 rounded-md border-gray-300"
                    placeholder={t("Enter_Name", "Enter name")}
                    name="name-on-card"
                    id="name-on-card"
                    type="text"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="">{t("Card_Number", "Card Number")}</label>
                  <Input
                    className="mt-2 mb-4 rounded-md border-gray-300"
                    placeholder="2222 2222 2222 2222"
                    name="name-on-card"
                    id="name-on-card"
                    type="text"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="mr-2 w-6/12">
                    <label htmlFor="">{t("Expiry_Date", "Expiry Date")}</label>
                    <Input
                      className="mt-2 mb-4 rounded-md border-gray-300"
                      placeholder="MM/YY"
                      name="name-on-card"
                      id="name-on-card"
                      type="text"
                    />
                  </div>
                  <div className="ml-2 w-6/12">
                    <label htmlFor="">CVC/CVV</label>
                    <Input
                      className="mt-2 mb-4 rounded-md border-gray-300"
                      placeholder="123"
                      name="name-on-card"
                      id="name-on-card"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="green-background rounded-md py-2 px-4 text-white">
                    {t("Pay_Now", "Pay Now")}
                  </button>
                </div>
              </div>
            </div>
          )}
          {formStep == 3 && (
            <div>
              <h2 className="hidden text-xl font-bold lg:block">
                {t("Enter_shipping_details", "Enter shipping details")}
              </h2>
              <div>
                <div className="flex justify-between lg:mt-6">
                  <div className="mr-2 w-6/12">
                    <label htmlFor="">
                      {t("Sending_Country", "Sending Country")}
                    </label>
                    <Select
                      id="sending-country"
                      instanceId="sending-country"
                      className="react-select-container mt-2 mb-4 rounded-md border-gray-300"
                      classNamePrefix="react-select"
                      options={countriesArray}
                      placeholder={t("Country", "Country")}
                    />
                  </div>
                  <div className="ml-2 w-6/12">
                    <label htmlFor="">
                      {t("Treatment_Time", "Treatment Time")}
                    </label>
                    <AntSelect
                      placeholder={t("Treatment_Time", "Treatment Time")}
                      className="mt-2 mb-4 w-full rounded-md border-gray-300"
                      size="large"
                    >
                      <Option value="1-3">1-3 {t("days", "days")}</Option>
                      <Option value="3-5">3-5 {t("days", "days")}</Option>
                      <Option value="7">7 {t("days", "days")}</Option>
                      <Option value="1-2weeks">
                        1-2 {t("Weeks", "Weeks")}
                      </Option>
                      <Option value="2-3weeks">
                        2-3 {t("Weeks", "Weeks")}
                      </Option>
                      <Option value="3-4weeks">
                        3-4 {t("Weeks", "Weeks")}
                      </Option>
                    </AntSelect>
                  </div>
                </div>
                {shippingMethode && (
                  <div className="mr-4 mb-8 w-full rounded-lg bg-slate-100 p-4">
                    <div>
                      <label htmlFor="">
                        {t("Destination", "Destination")}
                      </label>
                      <Select
                        id="destination-country"
                        instanceId="destination-country"
                        className="react-select-container mt-2 mb-4 rounded-md border-gray-300"
                        classNamePrefix="react-select"
                        options={countriesArray}
                        placeholder={t("Destination", "Destination")}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        {t("Transporter", "Transporter")}
                      </label>
                      <Input
                        className="mb-4 mt-2 rounded-md border-gray-300"
                        size="large"
                        placeholder={t("Name", "Name") + "*"}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="">
                        {t("Delivery_Time", "Delivery Time")}
                      </label>
                      <AntSelect
                        placeholder={t("Delivery_Time", "Delivery Time")}
                        className="mt-2 mb-4 w-full rounded-md border-gray-300"
                        size="large"
                      >
                        <Option value="1-3">1-3 {t("days", "days")}</Option>
                        <Option value="3-5">3-5 {t("days", "days")}</Option>
                        <Option value="7">7 {t("days", "days")}</Option>
                        <Option value="1-2weeks">
                          1-2 {t("Weeks", "Weeks")}
                        </Option>
                        <Option value="2-3weeks">
                          2-3 {t("Weeks", "Weeks")}
                        </Option>
                        <Option value="3-4weeks">
                          3-4 {t("Weeks", "Weeks")}
                        </Option>
                      </AntSelect>
                    </div>
                    <div className="">
                      <label htmlFor="">
                        {t("Type_of_Shipping", "Type of Shipping")}
                      </label>
                      <AntSelect
                        placeholder={t("Type_of_Shipping", "Type of Shipping")}
                        className="mt-2 mb-4 w-full rounded-md border-gray-300"
                        size="large"
                      >
                        <Option value="1-3">{t("One", "One")}</Option>
                        <Option value="3-5">{t("Two", "Two")}</Option>
                      </AntSelect>
                    </div>
                    <div>
                      <label htmlFor="">{t("Price", "Price")}</label>
                      <Input
                        className="mb-4 mt-2 rounded-md border-gray-300"
                        size="large"
                        placeholder={t("Price", "Price")}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        {t(
                          "Price_by_Additional_Item",
                          "Price by Additional Item"
                        )}
                      </label>
                      <Input
                        className="mb-4 mt-2 rounded-md border-gray-300"
                        size="large"
                        placeholder={t("Price", "Price")}
                      />
                    </div>
                    <div>
                      <button className="green-background rounded-md py-2 px-4 text-white">
                        {t("Save", "Save")}
                      </button>
                      <button
                        className="ml-4 rounded-md bg-red-400 py-2 px-4 text-white"
                        onClick={() => {
                          setShippingMethod(false);
                        }}
                      >
                        {t("Remove", "Remove")}
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex justify-start">
                  <button
                    className="rounded-md bg-gray-200 py-2 px-4"
                    onClick={() => {
                      setShippingMethod(true);
                    }}
                  >
                    {t("Add_Method", "Add Method")}
                  </button>
                </div>
              </div>
            </div>
          )}
          {formStep == 4 && (
            <div>
              <h2 className="hidden text-xl font-bold lg:block">
                {t("Find_friends_on_Wiaah", "Find friends on Wiaah")}
              </h2>
              <p className="mb-8 text-gray-400 lg:mb-0">
                {t(
                  "This_information_will_help",
                  "This information will help you find friends on Wiaah"
                )}
              </p>
              <div className="lg:p-12">
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="inline-block flex w-16">
                        <img
                          className="h-8"
                          src="/gmail-logo.png"
                          alt="gmail logo"
                        />
                      </div>
                      <span className="text-lg font-bold">Gmail</span>
                    </div>
                    <div
                      className="green-text cursor-pointer font-bold"
                      onClick={() => {
                        setMailService(GMAIL_MAIL_SERVICE);
                      }}
                    >
                      {t("Find_Friends", "Find Friends")}
                    </div>
                  </div>
                  {mailService == 1 && (
                    <div className="">
                      <Input
                        className="mt-8 mb-4 block w-4/12 border-gray-300"
                        type="email"
                        placeholder={t("Email", "Email")}
                      />
                      <button className="green-background h-10 rounded-sm px-4 text-white">
                        {t("Find_Friends", "Find Friends")}
                      </button>
                    </div>
                  )}
                </div>
                <Divider />
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="inline-block flex w-16">
                        <img
                          className="h-8"
                          src="/yahoo-logo.png"
                          alt="gmail logo"
                        />
                      </div>
                      <span className="text-lg font-bold">Yahoo</span>
                    </div>
                    <div
                      className="green-text cursor-pointer font-bold"
                      onClick={() => {
                        setMailService(YAHOO_MAIL_SERVICE);
                      }}
                    >
                      {t("Find_Friends", "Find Friends")}
                    </div>
                  </div>
                  {mailService == 2 && (
                    <div className="">
                      <Input
                        className="mt-8 mb-4 block w-4/12 border-gray-300"
                        type="email"
                        placeholder={t("Email", "Email")}
                      />
                      <button className="green-background h-10 rounded-sm px-4 text-white">
                        {t("Find_Friends", "Find Friends")}
                      </button>
                    </div>
                  )}
                </div>
                <Divider />
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="inline-block flex w-16">
                        <img
                          className="h-8 pr-4"
                          src="/outlook-logo.png"
                          alt="gmail logo"
                        />
                      </div>
                      <span className="text-lg font-bold">Outlook</span>
                    </div>
                    <div
                      className="green-text cursor-pointer font-bold"
                      onClick={() => {
                        setMailService(OUTLOOK_MAIL_SERVICE);
                      }}
                    >
                      {t("Find_Friends", "Find Friends")}
                    </div>
                  </div>
                  {mailService == 3 && (
                    <div className="">
                      <Input
                        className="mt-8 mb-4 block w-4/12 border-gray-300"
                        type="email"
                        placeholder={t("Email", "Email")}
                      />
                      <button className="green-background h-10 rounded-sm px-4 text-white">
                        {t("Find_Friends", "Find Friends")}
                      </button>
                    </div>
                  )}
                </div>
                <Divider />
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="inline-block flex w-16">
                        <img
                          className="h-8 pr-4"
                          src="/whatsapp-logo.png"
                          alt="gmail logo"
                        />
                      </div>
                      <span className="text-lg font-bold">WhatsApp</span>
                    </div>
                    <div
                      className="green-text cursor-pointer font-bold"
                      onClick={() => {
                        setMailService(WHATSAPP_MAIL_SERVICE);
                      }}
                    >
                      {t("Find_Friends", "Find Friends")}
                    </div>
                  </div>
                  {mailService == 4 && (
                    <div className="">
                      <Input
                        className="mt-8 mb-4 block w-4/12 border-gray-300"
                        type="text"
                        placeholder={t("Enter_phone", "Enter phone")}
                      />
                      <button className="green-background h-10 rounded-sm px-4 text-white">
                        {t("Find_Friends", "Find Friends")}
                      </button>
                    </div>
                  )}
                </div>
                <Divider />
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="inline-block flex w-16">
                        <IoMdMail className="text-3xl" />
                      </div>
                      <span className="text-lg font-bold">
                        {t("Others_Email_Service", "Others Email Service")}
                      </span>
                    </div>
                    <div
                      className="green-text cursor-pointer font-bold"
                      onClick={() => {
                        setMailService(OTHER_MAIL_SERVICE);
                      }}
                    >
                      {t("Find_Friends", "Find Friends")}
                    </div>
                  </div>
                  {mailService == 5 && (
                    <div className="">
                      <Input
                        className="mt-8 mb-4 block w-4/12 border-gray-300"
                        type="email"
                        placeholder={t("Email", "Email")}
                      />
                      <button className="green-background h-10 rounded-sm px-4 text-white">
                        {t("Find_Friends", "Find Friends")}
                      </button>
                    </div>
                  )}
                </div>
                <Divider />
              </div>
            </div>
          )}
          {formStep == 5 && (
            <div className="">
              <h2 className="hidden text-xl font-bold lg:block">
                {t("Set_your_profile_picture", "Set your profile picture")}
              </h2>
              <div className="centered-step flex flex flex-col items-center justify-center lg:flex-row lg:p-0 lg:p-12">
                <div className="mb-2  justify-center lg:w-4/12">
                  <div className="profile-pic-container relative h-64 w-64 overflow-hidden rounded-xl lg:h-96 lg:w-96">
                    {!webCamOn && (
                      <>
                        <img
                          className="h-full w-full object-cover"
                          src={profilePicSrc}
                          alt=""
                        />
                        {!(profilePicSrc == NO_PROFIL_PIC_URL) && (
                          <div
                            onClick={() => {
                              setProfilePicSrc(NO_PROFIL_PIC_URL);
                            }}
                            className="absolute left-2 top-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black"
                          >
                            <MdOutlineClose className="text-xl text-white" />
                          </div>
                        )}
                      </>
                    )}
                    {webCamOn && (
                      <div className="h-full w-full">
                        <Webcam
                          ref={webcamRef}
                          mirrored={true}
                          height={600}
                          width={600}
                          videoConstraints={webCamVideoConstraints}
                          screenshotFormat="image/jpeg"
                        />
                        <div
                          onClick={captureFromWebCam}
                          className="absolute right-4 bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white"
                        >
                          <MdPhotoCamera className="text-2xl text-black" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  hidden
                  ref={imageFileRef}
                  onChange={(e) => handleProfilImageChange(e.target)}
                  name="myImage"
                  accept="image/png, image/jpeg"
                />
                <div className="w-full px-4 lg:w-fit">
                  <div className="flex cursor-pointer justify-center">
                    <div
                      className="profil-pic-btn mt-2 flex h-16 w-64 flex-row items-center justify-center rounded-full px-4 lg:h-12 lg:w-fit lg:flex-col"
                      onClick={() => {
                        imageFileRef.current.click();
                        setWebcamOn(false);
                      }}
                    >
                      <div className="profil-pic-btn-text text-center text-lg">
                        {t("Upload_a_photo", "Upload a photo")}
                      </div>
                      <div className="hidden text-center text-gray-500 lg:block">
                        {t("From_your_computer", "From your computer")}
                      </div>
                    </div>
                  </div>
                  <div className="my-8 hidden lg:block">
                    <Divider />
                  </div>
                  <div className="flex cursor-pointer justify-center">
                    <div
                      className="profil-pic-btn mt-4 flex h-16 w-64 flex-row items-center justify-center rounded-full px-4 lg:h-12 lg:w-fit lg:flex-col"
                      onClick={() => {
                        setWebcamOn(true);
                      }}
                    >
                      <div className="profil-pic-btn-text text-center text-lg">
                        {t("Take_a_Photo", "Take a Photo")}
                      </div>
                      <div className="hidden text-center text-gray-500 lg:block">
                        {t("with_your_webcam", "with your webcam")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="fixed bottom-0 left-0 z-10 flex w-full justify-between bg-white p-4 pt-10 lg:px-8">
          <button
            className="flex items-center rounded-md py-2 pl-0 pr-8"
            onClick={() => {
              setFormStep(formStep - 1);
            }}
          >
            <MdArrowBackIosNew className="mr-1 inline" />
            {t("Back", "Back")}
          </button>
          <div>
            <button
              className="rounded-md py-2 px-4"
              onClick={() => {
                setFormStep(formStep + 1);
              }}
            >
              {t("Skip", "Skip")}
            </button>
            <button
              className="green-background ml-4 rounded-md py-2 px-6 text-white"
              onClick={() => {
                setFormStep(formStep + 1);
              }}
            >
              {t("Next", "Next")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
