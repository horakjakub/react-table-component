import React, { Component } from 'react';

import TableComponent from '../../components/Table';
import Table from '../../models/Table';
import { tablePage } from './TablePage.scss';

class TablePage extends Component {
    state = { 
        table: new Table([
            [1, null, 'cat'],
            [2, null, 'spy'],
            [1, 3, 'dog']
        ])
    }

    setTable = () => (table) => {
        this.setState({ table });
    }

    render(){ 
        const { table } = this.state;
 
        return (
            <div className={ tablePage }>
                <TableComponent 
                    table={ table } 
                    onTableChange={ this.setTable() }
                />
                <div>
                    <a href={ this.getCSVUrl(table) } download='table.csv'>
                        <button className='blue' >EXPORT CSV</button>
                    </a>
                </div>
            </div>
        )
    }

    getCSVUrl(table){
        const tableContent = table.get();
        
        const csvContent = tableContent.reduce((acc, row) => {
            return `${acc}\r\n${row.join(',')}`;
        });

        const blob = new Blob([csvContent], {
            encoding: 'UTF-8',
            type: 'text/csv;charset=UTF-8'
        });

        return window.URL.createObjectURL(blob);
    }
}

export default TablePage;
