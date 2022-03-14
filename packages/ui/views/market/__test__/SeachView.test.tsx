import React from "react";
import { shallow } from 'enzyme';
import {SearchView} from '../SearchView'


describe('Search View', () => {
    let wrapper:any;
    beforeEach(() =>{
        wrapper = shallow(
            <SearchView />
        );
    });
    it('have products loaded', () =>{
        expect(wrapper.find('Product').length).toBeGreaterThan(0);
    });
    it('have breadcrumb loaded', () =>{
        expect(wrapper.find('BreadCrumb').length).toBeGreaterThan(0);
    });
    it('have products filter loaded', () =>{
        expect(wrapper.find('ProductFilter').length).toBe(1);
    });
    it('is in list layout on mobile by default', () =>{
        expect(wrapper.find('.product-list.grid-cols-1').length).toBe(1);
    });
    it('change layout on mobile', () =>{
        wrapper.find('.list-button').first().simulate('click');
        expect(wrapper.find('.product-list.grid-cols-1').length).toBe(1);
        wrapper.find('.grid-button').first().simulate('click');
        expect(wrapper.find('.product-list.grid-cols-2').length).toBe(1);
    });
    it('show filter on mobile when click on "filter" button an hide when click arrow back', () =>{
        expect(wrapper.find('.filter-section.hidden').length).toBe(1);
        wrapper.find('.filter-button').first().simulate('click');
        expect(wrapper.find('.filter-section.hidden').length).toBe(0);
        wrapper.find('.back-button').first().simulate('click');
        expect(wrapper.find('.filter-section.hidden').length).toBe(1);
    });
});
