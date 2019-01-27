import React, { Component } from 'react';
import { arrayOf, func, shape, string, number } from 'prop-types';

import Cell from '../Cell'

class CellEditableValue extends Component {
    propTypes = {
        cell: shape({ 
            value: string,
            rowIndex: number,
            columnIndex: number,
        }).isRequired,
        onCellValueChange: func.isRequired,
        editedCells: arrayOf(shape({ 
            value: string,
            rowIndex: number,
            columnIndex: number,
        })).isRequired,
        onEditedCellsChange: func.isRequired,
    }

    render(){
        const { cell, editedCells } = this.props;
        const { value, rowIndex, columnIndex } = cell;
        const editedCell = editedCells.find((cell) => cell.rowIndex === rowIndex && cell.columnIndex === columnIndex);

        return (
            editedCell ? 
                <td>
                    <input type='text' value={ editedCell.value } onChange={ this.cellValueChanged(editedCell) }/> 
                    <i onClick={ this.saveCellValue(editedCell) }>
                        V
                    </i>
                    <i onClick={ this.removeCellFromEdited({ rowIndex, columnIndex }) }>
                        X
                    </i>
                </td> : 
                <Cell
                    cell={ { rowIndex, columnIndex, value } } 
                    onCellSelect={ this.addCellToEdited({ rowIndex, columnIndex, value }) }
                /> 
        )
    }

    cellValueChanged = ({ rowIndex, columnIndex }) => (event) => {
        const { value } = event.target;
        const { editedCells, onEditedCellsChange } = this.props;

        const newEditedCells = 
            editedCells.filter((cell) => !(cell.rowIndex === rowIndex && cell.columnIndex === columnIndex));
        const editedCell = editedCells.find((cell) => cell.rowIndex === rowIndex && cell.columnIndex === columnIndex);

        editedCell.value = value;
        newEditedCells.push(editedCell);
        onEditedCellsChange(newEditedCells);
    }

    addCellToEdited = ({ rowIndex, columnIndex, value }) => () => {
        const { editedCells, onEditedCellsChange } = this.props;
        const newEditedCells = [ ...editedCells ];
        const newvalue = value ===  null ? '' : value;

        newEditedCells.push({ rowIndex, columnIndex, value: newvalue })
        onEditedCellsChange(newEditedCells);
    }

    removeCellFromEdited = ({ rowIndex, columnIndex }) => () => {
        const { editedCells, onEditedCellsChange } = this.props;
        const newEditedCells = editedCells.filter((cell) =>!(cell.rowIndex === rowIndex && cell.columnIndex === columnIndex));
        
        onEditedCellsChange(newEditedCells);
    }
 
    saveCellValue = ({ rowIndex, columnIndex, value }) => () => {
        const { onCellValueChange } = this.props;
        onCellValueChange({ rowIndex, columnIndex, value });
    }
}

export default CellEditableValue;
