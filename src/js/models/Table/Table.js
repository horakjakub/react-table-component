class Table { 
    _content = [];
    _errorMessage = 'Incorrect data format. Passed data should be 2 dimensional Array, and all internal Arrays should have same length.'

    constructor(content){
        this.set(content);
    }

    set(content){
        if (this.isDataFormatCorrect(content)) {
            this._content = content;
        } else { 
            throw new Error(this._errorMessage);
        }
    }

    isDataFormatCorrect(content) {
        if(content instanceof Array) {
            let allRowsAreArrays = true;
            let allRowsHaveSameLength = true;
            let rowsLength = 0; 

            content.forEach((row, i) => { 
                if (!(row instanceof Array)) { 
                    allRowsAreArrays = false; 
                }
                if (i === 0) {
                    rowsLength = row.length;
                } 
                if (row && rowsLength !== row.length) {
                    allRowsHaveSameLength = false;
                }
            })

            return allRowsAreArrays && allRowsHaveSameLength;
        }

        return false;    
    }

    get(){
        return this._content;
    }

    getCopy(){
        return new Table(this._content.map((row) => row.slice()));
    }

    changeValue({ rowIndex, columnIndex, value }){
        this._content[rowIndex][columnIndex] = value
    }

    addRow(index) {
        this._content.splice(index, 0, new Array(this._content[0].length).fill(null));
    }

    addColumn(index) { 
        this._content.forEach((row)=>{ row.splice(index, 0, null) }); 
    }

    removeRow(index){          
        this._content.splice(index, 1);
    }

    removeColumn(index) {
        this._content.forEach((row)=>{ row.splice(index, 1) });
    }
}

export default Table;
