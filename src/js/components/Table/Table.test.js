import React from 'react';
import { shallow } from 'enzyme';

import TableComponent from './Table';
import Table from '../../models/Table';

const tableContentMock = [
    [ 1, '', 2],
    [ 0, null, 2]
];

const tableMock = new Table(tableContentMock);

describe('Table', () => {
    it('should render', () => {
        const wrapper = shallow(
            <TableComponent 
                table={ tableMock }
            />
        );
        
        expect(wrapper.length).toBeTruthy();
    });
});
