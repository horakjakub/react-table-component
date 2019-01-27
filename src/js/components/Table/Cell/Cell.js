import React from 'react';
import { func, shape, string, number, oneOfType } from 'prop-types';

function Cell({ cell, onCellSelect }){
    return (
        <td onClick={ () => onCellSelect({ rowIndex: cell.rowIndex, columnIndex: cell.columnIndex }) }
        >
            { cell.value }
        </td>
    );
}

Cell.propTypes = {
    cell: shape({ 
        value: oneOfType([string, number]),
        rowIndex: number,
        columnIndex: number,
    }).isRequired,
    onCellSelect: func.isRequired,
}

export default Cell;
