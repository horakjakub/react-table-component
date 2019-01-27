import React from 'react';
import { string, func } from 'prop-types';
import { REMOVE_COLUMN_MODE, REMOVE_ROW_MODE, ADD_COLUMN_MODE, ADD_ROW_MODE, NORMAL_MODE } from '../Table'

function ControlPanel({ mode, onModeChange }){
    return (
        mode === NORMAL_MODE ?
            <div>
                <button onClick={ () => { onModeChange(ADD_COLUMN_MODE) } }>add column</button>
                <button onClick={ () => { onModeChange(ADD_ROW_MODE) } }>add row</button>
                <button onClick={ () => { onModeChange(REMOVE_COLUMN_MODE) } }>remove column</button>
                <button onClick={ () => { onModeChange(REMOVE_ROW_MODE) } }>remove row</button>
            </div> : 
            <div>
                <button onClick={ () => { onModeChange(NORMAL_MODE) } }>X</button>
            </div>
    );
}

ControlPanel.propTypes = {
    mode: string.isRequired,
    onModeChange: func.isRequired,
}

export default ControlPanel;
