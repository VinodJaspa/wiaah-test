import React, { useState, useEffect } from "react";
import { Input, DatePicker, Select as AntSelect } from "antd";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
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
import { isDocumentElement } from "react-select/src/utils";

const { Option } = AntSelect;
const webCamVideoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};
const NO_PROFIL_PIC_URL = "/person-icon.png";
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

export const BuyerProfileStartUpView: React.FC = ({}) => {
  let [formStep, setFormStep] = useState(0);
  const formStepTitle = [
    t("Personal_information", "Personal information"),
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
        <div className="p-4 md:p-8">
          {formStep == 0 && (
            <div className="">
              <h2 className="hidden text-xl font-bold md:block">
                {t("Personal_information", "Personal information")}
              </h2>
              <div className="flex md:p-5">
                <div className="w-full ">
                  <Input
                    className="mb-4 rounded-md border-gray-300"
                    size="large"
                    placeholder={t("First_Name", "First Name") + "*"}
                  />
                  <Input
                    className="mb-4 rounded-md border-gray-300"
                    size="large"
                    placeholder={t("Last_Name", "Last Name") + "*"}
                  />
                  <Input
                    className="mb-4 rounded-md border-gray-300"
                    size="large"
                    placeholder={t("Email", "Email") + "*"}
                  />
                  <DatePicker
                    className="mb-4 w-full rounded-md border-gray-300"
                    size="large"
                    placeholder={t("Date_of_Birthday", "Date of Birthday")}
                  />
                  <AntSelect
                    defaultValue="male"
                    className="mb-4 w-full border-gray-300"
                    size="large"
                  >
                    <Option value="male">{t("Male", "Male")}</Option>
                    <Option value="femal">{t("Femal", "Femal")}</Option>
                  </AntSelect>
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
                    placeholder={t("Height", "Height") + "*"}
                  />
                  <Input
                    className="mb-4 rounded-md border-gray-300"
                    size="large"
                    placeholder={t("Weight", "Weight") + "*"}
                  />
                </div>
              </div>
            </div>
          )}
          {formStep == 1 && (
            <div>
              <h2 className="hidden text-xl font-bold md:block">
                {t("Find_friends_on_Wiaah", "Find friends on Wiaah")}
              </h2>
              <p className="pb-6 text-gray-400 md:pb-0">
                {t(
                  "This_information_will_help",
                  "This information will help you find friends on Wiaah"
                )}
              </p>
              <div className="md:p-12">
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
                        className="mt-8 mb-4 block border-gray-300 md:w-4/12"
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
                        className="mt-8 mb-4 block border-gray-300 md:w-4/12"
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
                        className="mt-8 mb-4 block border-gray-300 md:w-4/12"
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
                        className="mt-8 mb-4 block border-gray-300 md:w-4/12"
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
                        className="mt-8 mb-4 block border-gray-300 md:w-4/12"
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
          {formStep == 2 && (
            <div className="">
              <h2 className="hidden text-xl font-bold lg:block">
                {t("Set_your_profile_picture", "Set your profile picture")}
              </h2>
              <div className="centered-step flex flex flex-col items-center justify-center md:p-0 lg:flex-row lg:p-12">
                <div className="mb-4  justify-center lg:w-4/12">
                  <div className="profile-pic-container relative h-80 w-80 overflow-hidden rounded-xl lg:h-96 lg:w-96">
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
                      className="profil-pic-btn mt-4 flex h-16 w-80 flex-row items-center justify-center rounded-full px-4 lg:h-12 lg:w-fit lg:flex-col"
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
                      className="profil-pic-btn mt-4 flex h-16 w-80 flex-row items-center justify-center rounded-full px-4 lg:h-12 lg:w-fit lg:flex-col"
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
        <div className="fixed bottom-0 left-0 z-10 flex w-full justify-between bg-white p-4 pt-10 md:px-8">
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
