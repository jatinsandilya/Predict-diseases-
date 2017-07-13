import React, { Component } from 'react';

class TeamMemUploadImage extends Component{


  propTypes(){
    value: React.PropTypes.object.isRequired
  }

  handleDocumentTitleChange(){
      console.log(this.file);
      this.props.onUpload(this.file,this.props.value);
  }

  render() {
    //const percentComplete = this.props.value + '%';
    return (<div className="fileinput fileinput-new" data-provides="fileinput">
      <a href="#" className="btn-file">
      Choose file
      <input type="file" ref={(f)=>{this.file=f}} onChange={this.handleDocumentTitleChange.bind(this)}/>
      </a>
      <b className="fileinput-filename">{}</b>
    </div>);
  }
}

export default TeamMemUploadImage;