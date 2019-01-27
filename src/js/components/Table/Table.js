import React, { Component } from 'react';
import { func, object } from 'prop-types';

import ControlPanel from './ControlPanel';
import Cell from './Cell';
import CellEditableValue from './CellEditableValue';
import { table, tableContainer, tableAddColumn, tableAddRow, tableRemoveColumn, tableRemoveRow, tableWrapper, tableWrapperAddRow } from './Table.scss';

export const REMOVE_COLUMN_MODE = 'removeColumnMode';
export const REMOVE_ROW_MODE = 'removeRowMode'; 
export const ADD_COLUMN_MODE = 'addColumnMode'; 
export const ADD_ROW_MODE = 'addRowMode';
export const NORMAL_MODE = 'normalMode';

class TableComponent extends Component {
    propTypes = {
        table: object.isRequired, 
        onTableChange: func.isRequired,
    }

    state = {
        editedCells: [],
        mode: NORMAL_MODE
    }

    setTableMode = () => (mode) => {
        this.setState({ mode });
    }

    setEditedCells = () => (editedCells) => {
        this.setState({ editedCells });
    }

    getTableClassName(mode){
        switch(mode) {
            case NORMAL_MODE:
                return table;
            case REMOVE_COLUMN_MODE:
                return `${table} ${tableRemoveColumn}`;
            case REMOVE_ROW_MODE:
                return `${table} ${tableRemoveRow}`;
            case ADD_COLUMN_MODE:
                return `${table} ${tableAddColumn}`;
            case ADD_ROW_MODE:
                return `${table} ${tableAddRow}`;
        }
    }

    setTableValue = () => ({ rowIndex, columnIndex, value }) => { 
        const { table, onTableChange } = this.props;
        const tableCopy = table.getCopy();
        const { editedCells } = this.state;

        const newEditedCells = editedCells.filter((cell) =>!(cell.rowIndex === rowIndex && cell.columnIndex === columnIndex));
        this.setState({ editedCells: newEditedCells });

        tableCopy.changeSelectedValue({ rowIndex, columnIndex, value });
        onTableChange(tableCopy);
    }

    modifyTable = ({ rowIndex, columnIndex }) => () => {
        const { table, onTableChange } = this.props;
        const { mode } = this.state;
        const tableCopy = table.getCopy();

        switch(mode) {
            case REMOVE_COLUMN_MODE:
                tableCopy.removeColumn(columnIndex);
                break;
            case REMOVE_ROW_MODE:
                tableCopy.removeRow(rowIndex)
                break;
            case ADD_COLUMN_MODE:
                tableCopy.addColumn(columnIndex)
                break;
            case ADD_ROW_MODE:
                tableCopy.addRow(rowIndex)
                break;
        }
        
        onTableChange(tableCopy);
    }

    renderRow(rowContent, rowIndex){
        const { mode, editedCells } = this.state;

        return (
            <tr key={ rowIndex }>
                {
                    rowContent.map((value, j) => (
                        mode === NORMAL_MODE ? 
                            <CellEditableValue 
                                key={ j }
                                cell={ { value, rowIndex, columnIndex: j } }
                                editedCells={ editedCells }
                                onCellValueChange={ this.setTableValue() }
                                onEditedCellsChange={ this.setEditedCells() }
                            /> 
                            :
                            <Cell 
                                key={ j }
                                cell={ { value, rowIndex, columnIndex: j } }
                                onCellSelect={ this.modifyTable({ rowIndex, columnIndex: j }) }
                            />
                    )) 
                }
            </tr>
        )
    }

    renderAddNewColumnOrRowButton(mode){
        const { table } = this.props;
        const tableContent = table.get();

        return (
            mode === ADD_COLUMN_MODE || mode === ADD_ROW_MODE ?  
                <button 
                    onClick={ this.modifyTable({ rowIndex: tableContent.length, columnIndex: tableContent[0].length }) }
                >+</button> 
                : null
        )
    }

    render(){ 
        const { table } = this.props;
        const tableContent = table.get();
        const { mode } = this.state;
        const tableWrapperClassName = mode === ADD_ROW_MODE ? `${tableWrapper} ${tableWrapperAddRow}` : tableWrapper;

        return (
            <div className={ tableContainer }>
                <div className={ tableWrapperClassName }>
                    <table className={ this.getTableClassName(mode) }>
                        <tbody> 
                            {
                                tableContent.map((rowContent, i) => ( this.renderRow(rowContent, i) ))
                            }
                        </tbody>
                    </table>
                    { 
                        this.renderAddNewColumnOrRowButton(mode)
                    }
                </div>
                <ControlPanel mode={ mode } onModeChange={ this.setTableMode() } />
            </div>
        )
    }
}

export default TableComponent;
