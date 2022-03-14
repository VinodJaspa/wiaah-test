import React from "react";
import {BreadCrumb} from "../BreadCrumb";
import { shallow } from 'enzyme';


it("renders default correctly", () => {
        const wrapper = shallow(
        <BreadCrumb />
        );
        expect(wrapper).toMatchSnapshot();
    } 
);

it("renders with parameters correctly", () => {
    const wrapper = shallow(
    <BreadCrumb  breadcrumb={[{text:'Shop', url: '/shop'},{text:'', url: '/categorie'},{text:'Clothing', url: 'clothing'}]}/>
    );
    //console.log(wrapper.find('Link').first().prop('href'));
    expect(wrapper.find('Link').length).toEqual(2);
    expect(wrapper.find('Link').first().prop('href')).toEqual('/shop');
    expect(wrapper.find('Link').at(1).prop('href')).toEqual('/categorie');
} 
);