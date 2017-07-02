import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class PElements extends Component{
  
  getAllErrorMsg(){
     if(this.props.error){
        var p = Object.keys(this.props.error).map((v,i)=>{
        {
          return this.getErrorMsg(this.props.error[v],i)}
        })
        return p;
     }
  }

  getErrorMsg(v,i){
    var errorMsg;
    if(this.props.error && this.props.error!="") {      
        errorMsg = <b key={i} className="required_msg">{v.errorMsg}</b>;
    }
    return errorMsg;
  }

  render(){
    var requiredIcon;
    if(this.props.required) {
         requiredIcon = <b className="required_asterisk">*</b>;
    }
    return(<div className="form-group">
            {requiredIcon} 
            <label>{this.props.label}</label>
            <br/>
            {this.props.children}
            {<div>{this.getAllErrorMsg.bind(this)()}</div>}
        </div>         
    )
  }

  /*
  if(this.props.isInvalid){
              <b className="required_msg">{this.props.error}</b>
            } 
  */
}