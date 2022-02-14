import React from 'react';
import { shallow } from 'enzyme';
import {Divider} from '../../components';

describe('Divider component render as expected', () => {
    it("check for last snapshot", () => {
        const wrapper = shallow(
            <Divider />
        );
        expect(wrapper).toMatchSnapshot();
        }
    );
});