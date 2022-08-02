import { RoutesType } from "..";

export type ServicesRoutesType = {
  extractServiceId: (props: Record<string, any>) => string | null;
  service: () => RoutesType;
  services: () => RoutesType;
  serviceType: (serviceType: string) => RoutesType;
  visitService: (props: Record<string, any>, serviceType: string) => RoutesType;
  visitServiceOnMap: (
    props: Record<string, any>,
    serviceType: string
  ) => RoutesType;
  visitServiceTypeOnMap: (serviceType: string) => RoutesType;
  visitServiceLocationSearchResults: (
    serviceType: string,
    location: string
  ) => RoutesType;
  visitServiceSearch: (props: Record<string, any>) => RoutesType;
  visitServiceCheckout: () => RoutesType;
};

export const ServicesRoutes: RoutesType = {
  service() {
    return this.addPath("service");
  },
  services() {
    return this.addPath("services");
  },
  serviceType(serviceType) {
    return this.addPath(serviceType);
  },

  extractServiceId(props) {
    const id = props["id"];
    return typeof id === "string" ? id : null;
  },

  visitService(props, serviceType) {
    const serviceId = this.extractServiceId(props);
    if (!serviceId) return this;
    return this.service().serviceType(serviceType).id(serviceId);
  },

  visitServiceOnMap(props, serviceType) {
    const serviceId = this.extractServiceId(props);
    if (!serviceId) return this;

    return this.search()
      .services()
      .serviceType(serviceType)
      .onMap()
      .id(serviceId);
  },

  visitServiceTypeOnMap(serviceType) {
    return this.search().services().serviceType(serviceType).onMap();
  },
  visitServiceLocationSearchResults(serviceType, location) {
    if (typeof location !== "string" || location.length < 1) return this;

    return this.search().services().serviceType(serviceType).location(location);
  },

  visitServiceSearch(props) {
    const serviceSlug = props["slug"];
    if (!serviceSlug) return this;
    return this.search().services().serviceType(serviceSlug);
  },

  visitServiceCheckout() {
    return this.checkout().service();
  },
} as RoutesType;
