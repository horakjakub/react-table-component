import React from 'react';
import { shallow } from 'enzyme';

import TablePage from './TablePage';

global.URL = {
    createObjectURL: ()=>{}
};

describe('TablePage', () => {
    it('should render', () => {
        const wrapper = shallow(<TablePage />);
        expect(wrapper.length).toBeTruthy();
    });
});