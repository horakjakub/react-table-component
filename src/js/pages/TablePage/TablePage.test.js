import React from 'react';
import { shallow } from 'enzyme';

import TablePage from './TablePage';
import Table from '../../models/Table';

const tableContentMock = [
    [ 1, '', 2],
    [ 0, null, 2]
];

const tableMock = new Table(tableContentMock);

global.URL = {
    createObjectURL: ()=>{}
};

describe('TablePage', () => {
    let wrapper; 

    beforeEach(()=>{
        wrapper = shallow(<TablePage />);
    })

    it('should render', () => {
        expect(wrapper.length).toBeTruthy();
    });

    it('should contain default Table in initial state', () => {
        const stateTable = wrapper.state('table');

        expect(stateTable).toBeInstanceOf(Table); 
        expect(stateTable.get().length).toBe(3);
    });

    describe('setTable()', () => {
        let setTable;

        beforeEach(() => { 
            setTable = wrapper.instance().setTable();
        })

        it('should return function', () => {
            expect(setTable).toBeInstanceOf(Function);
        });

        it('returned function should change current `table` state on passed one', () => {
            setTable(tableMock);
            const stateTable = wrapper.state('table');

            expect(stateTable).toBeInstanceOf(Table); 
            expect(stateTable.get().length).toBe(2);
        });
    });
});