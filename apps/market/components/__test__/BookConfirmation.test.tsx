import React from "react";
import { mount, shallow, ShallowWrapper } from "enzyme";
import { Service } from "types/market/Booking";
import { BookConfirmationView } from "../BookConfirmation/BookConfirmationView";

const selectors = {
  bookNumber: "[data-testid='BookNumber']",
  serviceDetails: {
    serviceName: "[data-testid='ServiceName']",
    serviceOwner: "[data-testid='ServiceOwner']",
    servicePhoto: "[data-testid='ServicePhoto']",
  },
  contacts: {
    contactPhone: "[data-testid='ContactPhone']",
    contactEmail: "[data-testid='ContactEmail']",
  },
  location: {
    streetName: "[data-testid='StreetName']",
    streetNumber: "[data-testid='StreetNumber']",
    city: "[data-testid='LocationCity']",
    country: "[data-testid='LocationCountry']",
  },
  rooms: {
    container: "[data-testid='RoomsTable']",
    room: "[data-testid='Room']",
    roomType: "[data-testid='RoomType']",
    roomNightPrice: "[data-testid='RoomNightPrice']",
    nights: "[data-testid='RoomNights']",
    totalPrice: "[data-testid='RoomTotalPrice']",
  },
};

const service: Service = {
  serviceName: "test service name",
  serviceOwner: "Wiaah",
  serviceThumbnail:
    "https://cdn.dayrooms.com/image_cache/A1000/1783/King-d16ae5df94d1ffadec0a2eb6ffa86c97-hotel-homepage.jpg",
  contacts: {
    phone: "123456789",
    email: "testemail@email.com",
  },
  rooms: [
    {
      type: "one",
      nightPrice: 1250,
      nights: 2,
    },
    {
      type: "two",
      nightPrice: 1550,
      nights: 2,
    },
    {
      type: "three",
      nightPrice: 950,
      nights: 1,
    },
  ],
  location: {
    streetName: "Shri New Homestay, Coorg, Madikeri Road",
    streetNumber: 571201,
    city: "Karnataka",
    country: "",
  },
};

describe("BookConfirmation render tests", () => {
  let wrapper: ShallowWrapper;
  let bookId: ShallowWrapper;
  let serviceName: ShallowWrapper;
  let serviceOwner: ShallowWrapper;
  let servicePhoto: ShallowWrapper;
  let contactPhone: ShallowWrapper;
  let contactEmail: ShallowWrapper;
  let roomsContainer: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<BookConfirmationView service={service} />);
    bookId = wrapper.find(selectors.bookNumber);
    roomsContainer = wrapper.find(selectors.rooms.container);
    serviceName = wrapper.find(selectors.serviceDetails.serviceName);
    serviceOwner = wrapper.find(selectors.serviceDetails.serviceOwner);
    servicePhoto = wrapper.find(selectors.serviceDetails.servicePhoto);
    contactPhone = wrapper.find(selectors.contacts.contactPhone);
    contactEmail = wrapper.find(selectors.contacts.contactEmail);
  });
  it("should render properly", () => {
    shallow(<BookConfirmationView service={service} />);
  });

  it("should contain the right elements", () => {
    expect(bookId.length).toBe(1);
    expect(serviceName.length).toBe(1);
    expect(serviceOwner.length).toBe(1);
    expect(servicePhoto.length).toBe(1);
    expect(contactPhone.length).toBe(1);
    expect(contactEmail.length).toBe(1);
    expect(roomsContainer.children().length).toBe(service.rooms.length);
  });
  it("should contain an img tag with the right src image url", () => {
    const wrapper = mount(<BookConfirmationView service={service} />);
    const servicePhoto = wrapper.find(selectors.serviceDetails.servicePhoto);
    console.log(servicePhoto.debug());
    expect(servicePhoto.find("img").length).toBe(1);
    expect(servicePhoto.find("img").props().src).toBe(service.serviceThumbnail);
  });
  it("should have the right service info", () => {
    expect(serviceName.text()).toBe(service.serviceName);
    expect(serviceOwner.text()).toBe(`Owner: ${service.serviceOwner}`);
    expect(contactPhone.text()).toBe(service.contacts.phone);
    expect(contactEmail.text()).toBe(service.contacts.email);
  });
  it("should have the right room info", () => {
    const rooms = roomsContainer.children();
    expect(rooms.length).toBe(service.rooms.length);
    rooms.map((room, i) => {
      const nights = room.find(selectors.rooms.nights);
      const nightPrice = room.find(selectors.rooms.roomNightPrice);
      const totalPrice = room.find(selectors.rooms.totalPrice);
      const roomType = room.find(selectors.rooms.roomType);
      const targetRoom = service.rooms[i];

      expect(nights.text()).toBe(`${targetRoom.nights}`);
      expect(nightPrice.text()).toBe(`${targetRoom.nightPrice}`);
      expect(totalPrice.text()).toBe(
        `${targetRoom.nights * targetRoom.nightPrice}`
      );
      expect(roomType.text()).toBe(`Room Type ${targetRoom.type}`);
    });
  });
});

describe("BookConfirmation Snapshot test", () => {
  it("should match snapshot", () => {
    expect(
      shallow(<BookConfirmationView service={service} />)
    ).toMatchSnapshot();
  });
});
