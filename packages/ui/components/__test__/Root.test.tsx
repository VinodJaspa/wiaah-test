import React from 'react';
import { shallow } from 'enzyme';
import {Root} from '../../components';

describe('Root component render as expected', () => {
    test("check for last snapshot", () => {
        const wrapper = shallow(
            <Root />
        );
        expect(wrapper).toMatchSnapshot();
        }
    );
    it("show children", () => {
        const wrapper = shallow(
            <Root>
                <button></button>
            </Root>
        );
        expect(wrapper.find('button').length).toEqual(1);
        }
    );
});