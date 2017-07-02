import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {validate} from './service/PValidators';
export default class PInput extends Component{
  constructor(props){
    super(props);
    this.state={
      isValid:false
    }
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validate = validate.bind(this);

  }

  onBlur(e){    
    this.validate();
    if(this.props.onBlur){
      this.props.onBlur(this.value);
    }
  }

  onChange(e){   
    if(this.props.valueFormatter){ 
    this.value = this.props.valueFormatter.call(null,e.target.value);
    }else{
      this.value=e.target.value;
    }
    if(this.props.onChange){
      this.props.onChange(this.value);
    }
  }
getElement(){
 if(this.props.type == 'textarea'){
        return (<textarea
                className={this.props.elementClass} 
                id={this.props.id} 
                 ref={this.props.refVal}
                onChange={this.onChange}
                onBlur={this.onBlur}
                />);
      }else{
        return (<input type={this.props.type}
                className={this.props.elementClass}
                id={this.props.id}
                ref={this.props.refVal}
                onChange={this.onChange}
                onBlur={this.onBlur}
                />);
      }
}
  render(){
    return(
     this.getElement()
    )
  }
}