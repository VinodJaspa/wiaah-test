import { ArrElement } from "types";
import { ServicesRoutes, ServicesRoutesType } from "./services";
import { UserRelatedRoutesType, UserRelatedRoutes } from "./userRelated";
import { ShopRoutes, ShopRoutesType } from "./Shop";
import { SocialRoutes, SocialRoutesType } from "./social";
import { SettingsRoutes, SettingsRoutesType } from "./settings";
import { ProductsRoutes, ProductsRoutesType } from "./Products";

export type RoutesType = MainRouterInterface;
export type RoutingQueryType = Record<string, string>;
export type MainRouterInterface = {
  route: string;
  query: RoutingQueryType;
  dataKeys: Record<string, any>;
  addQuery: (query: RoutingQueryType) => RoutesType;
  removeQuery: (query: string) => RoutesType;
  mapProps: (
    keys: readonly string[],
    data: Record<string, any>,
  ) => Record<string, any>;
  id: (id: string) => RoutesType;
  addPath: (path: string) => RoutesType;
  location: (location: string) => RoutesType;
  onMap: () => RoutesType;
  search: () => RoutesType;
  checkout: () => RoutesType;
  visitCheckout: () => RoutesType;
  visitRecommendedServiceOrShop: (props: Record<string, any>) => RoutesType;
  visitChangePassword: () => RoutesType;
  visitRegister: () => RoutesType;
  visitLogout: () => RoutesType;
  visitSignin: () => RoutesType;
  visitSignup:() =>RoutesType;
  visitMarketSavedItems: () => RoutesType;
  visitContactUs: () => RoutesType;
  visitHelpAndFaqs: () => RoutesType;
  visitMainPage: () => RoutesType;
} & ServicesRoutesType &
  UserRelatedRoutesType &
  ShopRoutesType &
  SocialRoutesType &
  SettingsRoutesType &
  ProductsRoutesType;

export const MainRoutes: MainRouterInterface = {
  ...ServicesRoutes,
  ...UserRelatedRoutes,
  ...ShopRoutes,
  ...SocialRoutes,
  ...SettingsRoutes,
  ...ProductsRoutes,
  route: "",
  query: {},
  dataKeys: {},
 addPath(path: string) {
  const cleanCurrent = this.route.replace(/\/$/, ""); // remove trailing slash
  const cleanNext = path.replace(/^\/+/, ""); // remove leading slashes
  this.route = `${cleanCurrent}/${cleanNext}`;
  return this;
},
  id(id: string) {
    this.addPath(id);
    return this;
  },
  mapProps<TKeys extends readonly string[]>(
    keys: TKeys,
    data: Record<string, any>,
  ): Record<ArrElement<TKeys>, any> {
    const props: Record<ArrElement<TKeys>, any> = keys.reduce(
      (acc, curr) => {
        return { ...acc, [curr]: data[curr] };
      },
      {} as Record<ArrElement<TKeys>, any>,
    );
    return props;
  },
  location(location) {
    this.addPath(location);
    return this;
  },
  onMap() {
    this.addPath("onmap");
    return this;
  },
  search() {
    this.addPath("search");
    return this;
  },
  checkout() {
    this.addPath("checkout");
    return this;
  },
  visitRecommendedServiceOrShop(props) {
    const type = props["type"];
    const id = props["id"];
    if (!type || !id) return this;
    if (type === "shop") return this.visitShop(props);
    return this.visitService(props, type);
  },
  addQuery(query: RoutingQueryType) {
    this.query = { ...this.query, ...query };
    return this;
  },
  removeQuery(query) {
    delete this.query[query];
    return this;
  },
  visitCheckout() {
    return this.checkout();
  },
  visitChangePassword() {
    return this.addPath("auth").addPath("change-password");
  },
  visitRegister() {
    return this.addPath("auth").addPath("register");
  },
  visitLogout() {
    return this.addPath("auth").addPath("logout");
  },
  visitSignin() {
    console.log(this.addPath ,"path");
    
    return this.addPath("auth").addPath("login");
  },
  visitSignup() {
    return this.addPath("auth").addPath("register");
  },
  visitMarketSavedItems() {
    // TODO
    return this;
  },
  visitContactUs() {
    return this.addPath("contact-us");
  },
  visitHelpAndFaqs() {
    return this.addPath("help-and-faqs");
  },
  visitMainPage() {
    return this.addPath("/");
  },
};
