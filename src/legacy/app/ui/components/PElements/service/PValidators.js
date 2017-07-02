
export var PRequired={
        validate:function(element,val){
                return !!val;
            },
        errorMsg:"Can not be empty!",
        key:'Required!'
}

export var PRange ={
        validate:function(element,val){
                    return val <= element.props.max && val >= element.props.min 
        },
        errorMsg:"Value is not in Range!",
        key:'Range'
}

export function validate(){
    this.setState({isValid:false});
    this.props.validators.forEach((v,i)=>{
    var isV=v.validate(this,this.value); 

    this.props.onValidationCheck(this.props.id, isV,v);
    });
  }