import React from 'react';
import { shallow } from 'enzyme';

import TablePage from './TablePage';

describe('TablePage', () => {
    it('should render', () => {
        const wrapper = shallow(<TablePage />);
        expect(wrapper.length).toBeTruthy();
    });
});