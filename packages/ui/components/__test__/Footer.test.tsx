import React from 'react';
import { shallow } from 'enzyme';
import {Footer} from '../../components';

describe('Footer component render as expected', () => {
    it("check for last snapshot", () => {
        const wrapper = shallow(
            <Footer />
        );
        expect(wrapper).toMatchSnapshot();
        }
    );
});