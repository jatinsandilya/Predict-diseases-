import React, { Component } from 'react';
import {Editors} from 'react-data-grid-addons';
import ReactDOM from 'react-dom';
import ReactDataGrid from 'react-data-grid';
import PToolbar from '../../ui/components/PTableToolbar/PTableToolbar';
 
class GridComponent extends Component {
 constructor(props){
   super(props);
   console.log("In Grid Component: ",this.props);

   this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this); 
   this.onAdd = this.props.toolbarConfig.actions.add.bind(this);
   this.onEdit = this.props.toolbarConfig.actions.edit.bind(this);
   this.onDelete = this.props.toolbarConfig.actions.delete.bind(this);

  
   this.onRowsSelected=this.props.onRowsSelected.bind(this);
   this.onRowsDeselected=this.props.onRowsDeselected.bind(this);
   this.selectedIndexes=this.props.selectedIndexes||[];
   this.state={selectedIndexes:[]};
 }

onRowsSelected(rows){
     this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
    this.props.onRowsSelected(rows);
}

  onRowsDeselected(rows) {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
    this.props.onRowsDeselected(rows);
  }


handleGridRowsUpdated({ fromRow, toRow, updated }) {
  console.log('in GridComponent',this.props);  
   let rows = this.props.rows.slice();
    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = Object.assign({}, rowToUpdate, updated);
        rows[i] = updatedRow;
    }
    this.props.handleGridRowsUpdated({ fromRow, toRow, updated,rows });
  }

  /*componentWillReceiveProps(){
    if(this.props.selectedRows && this.props.selectedRows.length>0){
        var s=this.props.selectedRows.map((f)=> {
          return f.rowIdx;
        });
        this.setState({selectedIndexes:s});
    }else{
      this.setState({selectedIndexes:[]});
    }
  }*/

	render() {
    if(this.props.selectedRows && this.props.selectedRows.length>0){
        var s=this.props.selectedRows.map((f)=> {
          return f.rowIdx;
        });
        this.selectedIndexes =s;
    }else{
      this.selectedIndexes=[];
    }

    console.log('ingrid component', this.props);  
    //const rowText = this.props.selectedIndexes.length === 1 ? 'row' : 'rows';
    var rowGetter = rowNumber => this.props.rows[rowNumber]  
		return (<div> 
		 {this.renderGrid()}
     </div> 
		);
	}
  

  renderGrid(){
  var rdg;
  if (this.props.columns && this.props.rows) 
  {
    var rowGetter = rowNumber => this.props.rows[rowNumber];
    rdg=<div>
    <PToolbar 
        onAdd={this.onAdd}
        onDelete={this.onDelete}
        onEdit={this.onEdit}
        onUpload={this.props.toolbarConfig.actions.upload||null}
        name={this.props.toolbarConfig.name || "John Doe"}
    />
    <ReactDataGrid
     rowKey="id"
    columns={this.props.columns}
    rowGetter={this.props.rowGetter || rowGetter} 
    rowsCount={this.props.rows.length}
    enableCellSelect={true}
    onGridRowsUpdated={this.handleGridRowsUpdated}
    rowHeight={this.props.rowHeight}
    minHeight={this.props.minHeight}
    rowSelection={{
       showCheckbox: true,
       enableShiftSelect: true,
       onRowsSelected: this.onRowsSelected.bind(this),
       onRowsDeselected: this.onRowsDeselected.bind(this),
       selectBy: {
              indexes: this.selectedIndexes
            }
       }}
     /></div>
  }
else{
  rdg=<div>No Data</div> 
}
return rdg;
}
}




export default (GridComponent);