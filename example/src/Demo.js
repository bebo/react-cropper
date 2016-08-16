import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';

import Cropper from '../../src/react-cropper';

const src = 'http://fengyuanchen.github.io/cropper/img/picture.jpg';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
    };
    this._cropImage = this._cropImage.bind(this);
    this._onChange = this._onChange.bind(this);
    this._useDefaultImage = this._useDefaultImage.bind(this);
  }

  _cropImage() {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.refs.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  _onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  _useDefaultImage() {
    this.setState({ src });
  }

  render() {
    return (
      <div style={{ width: 400, height: 400 }}>
        <div style={{ height: '100%', width: '100%' }}>
          <Cropper
            style={{ height: '100%', width: '100%' }}
            aspectRatio={1}
            guides={false}
            src={this.state.src}
            ref="cropper"
            crop={this._crop}
            cropBoxMovable={false}
            cropBoxResizable={false}
            toggleDragModeOnDblclick={false}
            dragMode="move"
            modal={false}
            center={false}
            highlight={false}
            background={false}
            autoCrop
            autoCropArea={0.8}
            viewMode={1}
          />
        </div>
      </div>
    );
  }
}
