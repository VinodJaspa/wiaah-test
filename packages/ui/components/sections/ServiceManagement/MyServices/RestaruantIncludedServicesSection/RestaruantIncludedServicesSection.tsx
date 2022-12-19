import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  RestaurantMenuDishsList,
  RestaurantAddMenuForm,
  Stack,
  Divider,
  CloseIcon,
} from "@UI";
import { NewServiceSchemas } from "validation";

type Menu = {
  title: string;
  dishs: { title: string; price: number }[];
};

export const RestaurantIncludedServicesSection: React.FC<{
  onChange?: (props: Record<string, any>) => any;
}> = ({ onChange }) => {
  const { t } = useTranslation();
  return (
    <Formik<{
      starter: Menu;
      main: Menu;
      deseert: Menu;
      drinks: Menu;
      additionalMenus: Menu[];
    }>
      onSubmit={() => {}}
      initialValues={{
        deseert: {
          dishs: [],
          title: t("Dessert"),
        },
        drinks: {
          dishs: [],
          title: t("Drinks"),
        },
        main: {
          dishs: [],
          title: t("Main Course"),
        },
        starter: {
          title: t("Starter"),
          dishs: [],
        },
        additionalMenus: [],
      }}
      validationSchema={NewServiceSchemas.RestaurantIncludedServicesSchema}
    >
      {({ setFieldValue, values }) => {
        onChange && onChange(values);
        return (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="font-bold text-xl">{values.starter.title}</p>
              </div>
              <RestaurantMenuDishsList
                value={values.starter.dishs}
                onChange={(dishs) => {
                  setFieldValue("starter", { ...values.starter, dishs });
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="font-bold text-xl">{values.main.title}</p>
              </div>
              <RestaurantMenuDishsList
                value={values.main.dishs}
                onChange={(dishs) => {
                  setFieldValue("main", { ...values.main, dishs });
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="font-bold text-xl">{values.deseert.title}</p>
              </div>
              <RestaurantMenuDishsList
                value={values.starter.dishs}
                onChange={(dishs) => {
                  setFieldValue("dessert", { ...values.deseert, dishs });
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="font-bold text-xl">{values.drinks.title}</p>
              </div>
              <RestaurantMenuDishsList
                value={values.starter.dishs}
                onChange={(dishs) => {
                  setFieldValue("drinks", { ...values.drinks, dishs });
                }}
              />
            </div>
            <Stack col divider={Divider}>
              {Array.isArray(values.additionalMenus)
                ? values.additionalMenus.map((menu, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <CloseIcon
                          className="cursor-pointer"
                          onClick={() =>
                            setFieldValue(
                              "additionalMenus",
                              values.additionalMenus.filter((_, i) => i !== idx)
                            )
                          }
                        />
                        <p className="font-bold text-xl">{menu.title}</p>
                      </div>
                      <RestaurantMenuDishsList
                        value={menu.dishs}
                        onChange={(dishs) => {
                          console.log({ dishs });
                          const targetMenuIdx =
                            values.additionalMenus.findIndex(
                              (m) => m.title === menu.title
                            );
                          const menus = values.additionalMenus;
                          menus.splice(targetMenuIdx, 1, {
                            title: menu.title,
                            dishs,
                          });

                          setFieldValue("additionalMenus", menus);
                        }}
                      />
                    </div>
                  ))
                : null}
            </Stack>
            <Divider />
            <RestaurantAddMenuForm
              onSubmit={(data) => {
                setFieldValue("menus", [
                  ...values.additionalMenus,
                  { title: data.title, dishs: [] },
                ]);
              }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
