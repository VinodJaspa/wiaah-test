import { RoutesType } from "..";

export type ServicesRoutesType = {
  extractServiceId: (props: Record<string, any>) => string | null;
  service: () => RoutesType;
  services: () => RoutesType;
  serviceType: (serviceType: string) => RoutesType;
  place: () => RoutesType;
  places: () => RoutesType;
  localisation: () => RoutesType;
  visitService: (props: Record<string, any>, serviceType: string) => RoutesType;
  visitServiceDetails: (id: string) => RoutesType;
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
  visitPlace: (props: Record<string, any>) => RoutesType;
  visitLocalisation: (props: Record<string, any>) => RoutesType;
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

  place() {
    return this.addPath("place");
  },

  places() {
    return this.addPath("places");
  },

  localisation() {
    return this.addPath("localisation");
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
    const serviceId = props["id"];
    if (!serviceId) return this;

    return this.search()
      .services()
      .serviceType(serviceType)
      .onMap()
      .id(serviceId);
  },

  visitServiceDetails(id) {
    return this.service().id(id);
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
  visitPlace(props) {
    const place = props["location"];
    return this.places().addQuery({ tag: place });
  },
  visitLocalisation(props) {
    const tag = props["location"];
    return this.localisation().addQuery({ tag });
  },
} as RoutesType;
