import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class PTableToolbar extends Component {
    constructor(props) {
        super(props);
        this.onAdd = this.props.onAdd.bind(this);
        this.onDelete = this.props.onDelete.bind(this);
        this.onEdit = this.props.onEdit.bind(this);
        if(this.props.onUpload)
        {
            this.onUpload = this.props.onUpload.bind(this);
        }
    }
    onAction(action) {
        switch (action) {
            case 'add':
                return (x) => this.onAdd.call(this, action);
                break;
            case 'delete':
                return (x) => this.onDelete.call(this, action,this.props.name);
                break;
            case 'edit':
                return (x) => this.onEdit.call(this, action);
                break;
            case 'upload':
                return (x) => this.onUpload.call(this, action);
            default:
        }
    }

    render() {        
        return (<div className="row toolBar"><div className="col-md-12">
            {this.props.onUpload!=null &&
            <button type="button" 
                    data-action="upload"
                    className="db-table-btn"
                    onClick={this.onAction('upload')}>
                <span className="glyphicon glyphicon-cloud-upload"></span>
            </button>
            }
            <button type="button"
                data-action="add"
                className="db-table-btn"
                onClick={this.onAction('add')}>
                <span className="glyphicon glyphicon-plus"></span>
            </button>
            <button type="button"
                data-action="edit"
                className="db-table-btn"
                onClick={this.onAction('edit')}>
                <span className="glyphicon glyphicon-edit"></span>
            </button>
            <button type="button"
                data-action="delete"
                className="db-table-btn"
                onClick={this.onAction('delete')}>
                <span className="glyphicon glyphicon-trash"></span>
            </button>
        </div></div>);
    }
}