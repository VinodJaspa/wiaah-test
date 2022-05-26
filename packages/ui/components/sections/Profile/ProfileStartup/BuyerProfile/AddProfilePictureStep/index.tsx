import { Divider, Button, Input } from "ui";
import { blobToDataURL } from "blob-util";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineClose, MdPhotoCamera } from "react-icons/md";
import Webcam from "react-webcam";

export interface AddProfilePictureProps {}

const webCamVideoConstraints = {
  width: 720,
  height: 720,
  facingMode: "user",
};
const NO_PROFIL_PIC_URL = "/person-icon.png";

export const AddProfilePictureStep: React.FC<AddProfilePictureProps> = () => {
  const { t } = useTranslation();

  const webcamRef = React.useRef<any>();

  let [webCamOn, setWebcamOn] = React.useState(false);
  let [profilePicSrc, setProfilePicSrc] = React.useState(NO_PROFIL_PIC_URL);

  const imageFileRef = React.useRef<any>();
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

  return (
    <div className="">
      <h2 className="hidden text-xl font-bold lg:block">
        {t("Set_your_profile_picture", "Set your profile picture")}
      </h2>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form>
            <div className="centered-step flex  flex-col items-center justify-center md:p-0 lg:flex-row lg:p-12">
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
              <Field
                as={Input}
                type="file"
                hidden
                ref={imageFileRef}
                onChange={(e: any) => handleProfilImageChange(e.target)}
                name="photo"
                accept="image/png, image/jpeg"
              />
              <div className="w-full justify-center px-4 lg:w-fit">
                <div className="flex flex-col items-center cursor-pointer justify-center">
                  <Button
                    className={`w-[min(100%,15rem)] rounded-full`}
                    onClick={() => {
                      imageFileRef.current.click();
                      setWebcamOn(false);
                    }}
                  >
                    {t("Upload_a_photo", "Upload a photo")}
                  </Button>
                  <div className="hidden text-center text-gray-500 lg:block">
                    {t("From_your_computer", "From your computer")}
                  </div>
                </div>
                <Divider className="my-4" />
                <div className="w-full flex flex-col items-center cursor-pointer justify-center">
                  <Button
                    className={`w-[min(100%,15rem)] rounded-full`}
                    onClick={() => {
                      setWebcamOn(true);
                    }}
                  >
                    {t("Take_a_Photo", "Take a Photo")}
                  </Button>
                  <div className="hidden text-center text-gray-500 lg:block">
                    {t("with_your_webcam", "with your webcam")}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
