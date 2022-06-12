import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  BreadCrumb,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerProps,
} from "ui";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaUserAlt,
} from "react-icons/fa";
import { BreadCrumbLink } from "ui";
import { useRouter } from "next/router";
import { shopRouting } from "uris";
export interface Step {
  label: string;
  steps?: Step[];
  url: string;
}

export interface MultiStepDrawerProps extends DrawerProps {
  steps: Step[];
  onClose: () => any;
  isOpen: boolean;
}
const LinksStack: React.FC<{
  steps: Step[];
  onStepSelect: (step: Step) => any;
  onClick?: (cate: string) => any;
}> = ({ onStepSelect, steps, onClick }) => {
  return (
    <div className="flex flex-col justify-center gap-2">
      {steps &&
        steps.map((step, i) => {
          if (step.steps && step.steps.length > 0) {
            return (
              <li
                className="nasted-menu-children group flex w-full cursor-pointer items-center justify-between rounded-full p-2 hover:bg-green-100"
                onClick={() => onStepSelect(step)}
              >
                <p className="group-hover:text-green-400">{step.label}</p>
                <FaChevronRight className="h-4 w-4" />
              </li>
            );
          } else {
            return (
              <li
                onClick={() => onClick && onClick(step.label)}
                className="nasted-menu-children group flex w-full cursor-pointer items-center justify-between rounded-full p-2 hover:bg-green-100"
              >
                <Link href={step.url}>
                  <a className="group-hover:text-green-400">{step.label}</a>
                </Link>
              </li>
            );
          }
        })}
    </div>
  );
};

export const MultiStepDrawer: React.FC<MultiStepDrawerProps> = ({
  steps,
  isOpen,
  onClose,
  ...rest
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = React.useState<Step>();
  const router = useRouter();
  const [path, setPath] = useState<Step[]>([]);

  const breadcrumbPath: BreadCrumbLink[] = path.map((step) => ({
    text: step.label,
    url: step.url,
  }));

  const resetInitalStep = () => {
    setCurrentStep({
      label: "all",
      steps: steps,
      url: "/",
    });
    setPath([]);
  };

  const updateCurrentStep = (link: BreadCrumbLink) => {
    const stepIndex =
      path.findIndex(
        (step) => step.label.toLowerCase() == link.text.toLowerCase()
      ) + 1;

    if (stepIndex > -1) {
      setPath((path) => path.slice(0, stepIndex));
    } else {
      resetInitalStep();
    }
  };
  const handleClose = () => {
    onClose();
    resetInitalStep();
  };

  React.useEffect(() => {
    if (path.length > 0) {
      setCurrentStep(path[path.length - 1]);
    }
  }, [path]);

  function handleStepSelection(step: Step) {
    setPath((path) => [...path, step]);
  }
  function handleNavToCate(step: string) {
    const cateLink = path.map((path) => path.label);
    const concated = cateLink.join("/").concat(`/${step}`);
    router.push(`${shopRouting.searchRefaults}/${concated}`);
  }

  return (
    <>
      <Drawer {...rest} onClose={handleClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader closeButton={false}>
            <div className="flex w-full items-center justify-between bg-gray-800 p-4 text-white">
              <span className="inline-flex items-center">
                <Link href="/login">
                  <a className="flex items-center">
                    <FaUserAlt className="mr-2 h-4 w-4" />{" "}
                    {t("Hello_Sign_in", "Hello, Sign in")}
                  </a>
                </Link>
              </span>
              <div className="flex">
                <button
                  id="hideSidebarButton"
                  className="px-2 py-1.5"
                  onClick={handleClose}
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>
            </div>
          </DrawerHeader>
          <div className="flex flex-col gap-4">
            {path.length > 0 && (
              <li
                className="group flex w-full cursor-pointer items-center justify-between rounded py-2 hover:bg-green-100"
                onClick={() => resetInitalStep()}
              >
                <FaChevronLeft className="h-4 w-4" />
                <p className="uppercase group-hover:text-green-400">
                  {t("Main_Menu", "Main Menu")}
                </p>
              </li>
            )}
            <BreadCrumb
              onLinkClick={(link) => updateCurrentStep(link)}
              links={breadcrumbPath}
            />
            <LinksStack
              onClick={handleNavToCate}
              onStepSelect={handleStepSelection}
              steps={(currentStep && currentStep.steps) || []}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
