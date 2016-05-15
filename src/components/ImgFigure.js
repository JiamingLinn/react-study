require('../styles/ImgFigure.less')

import React from 'react';

export default class ImgFigureComponent extends React.Component {

  constructor() {
    super();
    this.state = {inverse: false};

  }

  inverse() {
    this.setState({inverse: !this.state.inverse});
  }

  handleClick(e) {
    if (this.props.isCenter) {
      this.inverse();
    } else {
      this.props.center();
    }
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    let styleObj = {};
    let imgFigureStyleClasses = 'img-figure';
    let info = this.props.arrange;

    if (info) {
      Object.assign(styleObj, info.pos);
      if (this.props.isCenter) {
        styleObj.zIndex = 1000;
      }
      if (info.rotate) {
        ['MozTransform', 'msTransform', 'transform'].forEach(attr => {
          styleObj[attr] = `rotate(${info.rotate}deg)`;
        });
      }
    }
    if (this.state.inverse) {
      imgFigureStyleClasses += ' is-inverse';
    }

    return (
      <figure className={imgFigureStyleClasses} style={styleObj} onClick={this.handleClick.bind(this)}>
        <img src={this.props.data.imageURL} width={'240px'} height={"250px"} alt={this.props.data.title} />
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}
