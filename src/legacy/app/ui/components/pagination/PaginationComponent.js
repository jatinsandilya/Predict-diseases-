import React, { Component } from 'react';
import {Pagination} from 'react-bootstrap';

export default class PaginationComponent extends Component{
  constructor(props){
    super(props);
      this.handleSelect= this.handleSelect.bind(this);
  };

  handleSelect(eventKey) {    
    this.props.handleSelect({      
      activePage: eventKey,
      maxShowItem:this.props.maxShowItem
    });
    this.props.loadDataByPagination(eventKey);
  }

  render(){   
    return(
     <Pagination 
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={Math.round(this.props.totalItems/this.props.maxShowItem) || 1}
        maxButtons={this.props.maxButtons || 2}
        activePage={this.props.activePage || 1}
        onSelect={this.handleSelect} />
    )
  }
}