import React, { Component } from 'react';

import './styles.scss';

import Appbar from 'muicss/lib/react/appbar';
import {
  Link
} from 'react-router-dom';

class AppHeader extends Component{
  constructor(props) {
    super(props);
    this.onQrButtonClicked = this.onQrButtonClicked.bind(this);
    this.onQrImageSelected = this.onQrImageSelected.bind(this);
    this.state = {
      inputClassName: `input-field-${Math.round(Math.random() * 100000).toString(16)}`
    }
  }

  onQrButtonClicked() {
    let fileInput = document.getElementsByClassName(this.state.inputClassName)[0];
    fileInput.click();
  }

  onQrImageSelected(evt) {
    //TODO handle errors properly
    return new Promise((resolve/*, reject*/) => {
      let { target: { files } } = evt;
      let file = files[0];
      var imageType = /^image\//;
      if (!imageType.test(file.type)) {
        throw new Error('File type not valid');
      }
      // Read file
      var reader = new FileReader();
      reader.addEventListener('load', () => {
        let img = new Image();
        let canvas = document.getElementsByClassName('qr-canvas')[0];
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          let ctx = canvas.getContext('2d');
          ctx.drawImage(img,0,0);
          let data = ctx.getImageData(0, 0, img.width, img.height);
          resolve(data);
        }
        img.src = event.target.result;
      }, false);


      reader.readAsDataURL(file);
    }).then((data) => {
      this.props.doQrScan(data);
      return data;
    });
  }

  render() {
    let { doLeftToggle, doRightToggle, numItemsInCart } = this.props;

    let appLogo = (
      <svg fill="#FFFF4C" className="logo" width="16pt" height="16pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="m23.352 64.449v22.93h53.301l-0.003906-22.93c2.0742 0.56641 4.2109 0.85547 6.3633 0.85938 0.55078 0 1.1016 0 1.6602-0.058594s1.4102-0.14062 2.1016-0.25l-0.003907 22.379h4.0703c2.6719 0.16797 4.75 2.3828 4.75 5.0625 0 2.6758-2.0781 4.8906-4.75 5.0586h-81.68c-2.6719-0.16797-4.75-2.3828-4.75-5.0586 0-2.6797 2.0781-4.8945 4.75-5.0625h4.0703v-22.379c0.69922 0.10938 1.4102 0.19922 2.1289 0.25 0.53906 0.035156 1.082 0.050781 1.6289 0.050781 2.1484 0 4.2891-0.28516 6.3633-0.85156zm74.418-29.809c2.2383 4.9961 1.8906 10.773-0.92969 15.469-2.6641 4.5469-7.4102 7.4766-12.668 7.8203h-1.1719c-4.0312-0.015626-7.9258-1.4531-11-4.0586-3.0625 2.6094-6.9492 4.0586-10.977 4.082-4.0234 0.023437-7.9297-1.3789-11.023-3.9531-3.0898 2.5781-6.9961 3.9805-11.02 3.9609-4.0273-0.019532-7.9141-1.4609-10.98-4.0703-3.0664 2.625-6.9648 4.0781-11 4.1094h-1.1602c-5.2812-0.35156-10.039-3.3086-12.691-7.8906-2.8203-4.6953-3.168-10.473-0.92969-15.469l11.492-25.539c1.8086-4.0156 5.8047-6.5977 10.211-6.6016h52.156c4.4062 0.003906 8.4023 2.5859 10.211 6.6016zm-8.9297 4l-11.48-25.52c-0.22656-0.50391-0.72656-0.82812-1.2812-0.83203h-52.156c-0.55469 0.003907-1.0547 0.32813-1.2812 0.83203l-11.492 25.539c-0.91797 2.0781-0.77344 4.4688 0.39062 6.418 1.0312 1.7891 2.8828 2.9453 4.9414 3.0938h0.5c2.8203-0.003906 5.3906-1.625 6.6094-4.1719 0.80859-1.7148 2.5352-2.8047 4.4297-2.8047s3.6211 1.0898 4.4297 2.8047c1.207 2.5586 3.7734 4.1953 6.6016 4.2109 2.7891 0.003906 5.3359-1.5898 6.5508-4.1016 0.81641-1.6797 2.5234-2.7461 4.3945-2.7461 1.8672 0 3.5742 1.0664 4.3945 2.7461 1.2148 2.5117 3.7578 4.1055 6.5508 4.1016 2.8281-0.011719 5.4023-1.6484 6.6094-4.2109 0.80469-1.7188 2.5312-2.8203 4.4297-2.8203 1.8984 0 3.625 1.1016 4.4297 2.8203 1.2109 2.543 3.7734 4.168 6.5898 4.1797h0.51172c2.0508-0.14453 3.8984-1.3008 4.9297-3.0781 1.1758-1.9531 1.3281-4.3555 0.41016-6.4414z"/>
      </svg>
    );

    let cartIcon = (
      <svg fill="#FFFF4C" width="20pt" height="20pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="m3.6875 8.5977c-2.0977 0.054688-3.6016 1.7422-3.6836 3.7773-0.09375 2.1758 1.5937 4.0195 3.7656 4.1133l12.25 0.53516 2.9297 10.695c0.019531 0.24219 0.0625 0.48438 0.125 0.72656l10.098 36.605c0.058594 0.21484 0.13672 0.42188 0.23047 0.62109 0.011718 0.027344 0.027344 0.054687 0.042968 0.082031 0.035157 0.070313 0.066407 0.13672 0.10547 0.20312 0.035157 0.066407 0.078125 0.12891 0.11719 0.19141 0.015625 0.027343 0.035156 0.054687 0.050781 0.082031 0.042969 0.066406 0.09375 0.125 0.14062 0.1875 0.015625 0.023437 0.03125 0.042969 0.050781 0.066406 0.050782 0.0625 0.10547 0.125 0.16016 0.18359 0.015626 0.019531 0.03125 0.035156 0.046876 0.054687 0.054687 0.054688 0.10937 0.10938 0.16406 0.16016 0.019531 0.019532 0.042969 0.042969 0.0625 0.0625 0.050781 0.042969 0.10156 0.085938 0.15234 0.125 0.03125 0.023438 0.058594 0.050782 0.089844 0.074219 0.046874 0.035157 0.09375 0.066407 0.14453 0.10156 0.039062 0.027344 0.078125 0.054687 0.11719 0.082031 0.046875 0.03125 0.097656 0.058594 0.14844 0.085937 0.042968 0.023438 0.082031 0.050782 0.125 0.070313 0.050781 0.027344 0.10547 0.050781 0.15625 0.074219 0.042968 0.019531 0.085937 0.042968 0.12891 0.0625 0.046875 0.019531 0.097656 0.039062 0.14844 0.058594 0.050781 0.019531 0.097656 0.039062 0.14844 0.058593 0.054687 0.019531 0.11328 0.035157 0.17188 0.050781 0.042969 0.011719 0.089844 0.027344 0.13281 0.039063 0.30859 0.078125 0.63281 0.12109 0.95703 0.12109h0.003906 0.003906 52.988c1.7734 0 3.3281-1.1836 3.7969-2.8945l10.098-36.605c0.33203-1.1875 0.082031-2.457-0.66406-3.4336-0.75-0.98047-1.8984-1.5586-3.1328-1.5586h-70.102l-3.0938-11.293c-0.45312-1.6523-1.9219-2.8203-3.6367-2.8945l-15.113-0.66016c-0.14453-0.011719-0.28906-0.015625-0.42578-0.011719zm24.434 22.742h62.758l-7.918 28.719h-46.977l-7.8672-28.719zm14.266 38.379c-5.9844 0-10.844 4.8633-10.844 10.844s4.8594 10.844 10.844 10.844c5.9727 0 10.844-4.8633 10.844-10.844s-4.8672-10.844-10.844-10.844zm32.859 0c-5.9844 0-10.844 4.8633-10.844 10.844s4.8594 10.844 10.844 10.844c5.9727 0 10.844-4.8633 10.844-10.844s-4.8672-10.844-10.844-10.844zm-32.859 7.8867c1.625 0 2.957 1.3281 2.957 2.957s-1.332 2.957-2.957 2.957c-1.6328 0-2.957-1.3281-2.957-2.957s1.3242-2.957 2.957-2.957zm32.859 0c1.625 0 2.957 1.3281 2.957 2.957s-1.332 2.957-2.957 2.957c-1.6328 0-2.957-1.3281-2.957-2.957s1.3242-2.957 2.957-2.957z"/>
      </svg>
    );

    let qrIcon = (
      <svg fill="#FFFF4C" width="20pt" height="20pt" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="m24.309 78.371h18.98zm4.7461-14.234h9.4883v9.4883h-9.4883zm23.727-9.4883h4.7461v18.98h-4.7461zm-33.215 28.469h28.469v-28.469h-28.469zm4.7422-4.7461v-18.98h18.98v18.98zm28.473 0h9.4883v4.7461h-9.4922zm23.723-14.234h4.7461v4.7461h-4.7461zm-9.4883-9.4883h14.234v4.7461l-14.234-0.003906zm-4.7461-23.727h9.4883v9.4883h-9.4883zm18.98-9.4883h-28.469v28.469h28.469zm-4.7461 23.723h-18.98v-18.98h18.98l0.003906 18.98zm-56.938 4.7461h28.469v-28.469h-28.469zm4.7422-23.727h18.98v18.98h-18.98zm52.195 52.195h-9.4883v4.7461h14.234v-9.4883h-4.7461zm-14.234-14.234v9.4883h9.4883v-4.7461h-4.7461l0.003906-4.7422zm-33.215-33.215h9.4883v9.4883h-9.4883z" />
      </svg>
    );

    return (
      <header className='header'>
        <Appbar className='mui--appbar-line-height'>
          <div className="mui-container-fluid">
            <a className="sidedrawer-toggle mui--visible-xs-inline-block mui--visible-sm-inline-block js-show-sidedrawer" onClick={doLeftToggle}>{appLogo}</a>
            <a className="sidedrawer-toggle mui--hidden-xs mui--hidden-sm js-hide-sidedrawer" onClick={doLeftToggle}>{appLogo}</a>
            <span className="mui--text-title mui--inline-block">
              <Link to="/">Frontend Grocer</Link>
            </span>
            <a className="appbar-icon cart-toggle mui--pull-right" onClick={doRightToggle}>
              {cartIcon}
              {numItemsInCart > 0 ? <span className="cart-item-count-badge">{numItemsInCart}</span> : ''}
            </a>
            <a 
              onClick={this.onQrButtonClicked} className="appbar-icon qr-reader mui--pull-right" >
              {qrIcon}
              <input className={`qr-input ${this.state.inputClassName}`} type="file" onChange={this.onQrImageSelected}/>
              <canvas className='qr-canvas'></canvas>
            </a>
          </div>
        </Appbar>
      </header>
    )
  }
}

export default AppHeader;