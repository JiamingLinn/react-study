/**
 * Module style dependencies
 */
require('normalize.css/normalize.css');
require('styles/App.css');

/**
 * Module components dependencise
 */
import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigure';


/**
 * Module resource dependencese
 */
let yeomanImage = require('../images/yeoman.png');

let imageDatas = require('../data/img-info.json');
imageDatas = [].slice.call(imageDatas);
for (let i = 0, len = imageDatas.length; i < len; i++) {
  let imageData = imageDatas[i];
  imageData.imageURL = require('../images/' + imageData.fileName);
}


function getRandomInt(low, high) {
  return Math.floor( Math.random() * (high - low) + low );
}


const TOP_AREA = 0;
const LEFT_AREA = 1;
const RIGHT_AREA = 2;
/**
 * Module Component
 */
class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {imgStates:[]};

    this._Constant =  {
      //中心坐标
      centerPos: {
        left: 0,
        top: 0
      },
      //左右分区范围
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      //上分区范围
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    };
    this._centerInd = 0;

    this.rerange = this.rerange.bind(this);
  }

  /**
   * 随机分配图片到区域 0上分区，1左分区， 2右分区
   * @return {Number} 分区索引
   */
  assignImgRandomly() {
    let vec = [1, 7, 7];
    let high = 0;
    vec.forEach(n => {
      high += n;
    });
    let ran = getRandomInt(0, high);
    let ind = 0;
    for(let i = 0, len = vec.length; i < len; i++) {
      if (ran < vec[i]) {
       //ind = i;
       // break;
        return i;
      }
      ran -= vec[i];
    }
    return ind;
  }

  /**
   * 重新分布图片
   * @param index {Number} 中心图片索引
   */
  rerange(index) {
    this._centerInd = index;
    let con = this._Constant;
    let rotateDeg = 30;
    let imgStates = new Array(imageDatas.length);

    //中心图片信息
    imgStates[index] = {
      //坐标信息
      pos: {
        left: con.centerPos.left,
        top: con.centerPos.top
      },
      //是否翻转
      inverse: false
    };
    for (let i = 0, len = imageDatas.length; i < len; i++) {
      if (i != index) {
        let areaInd = this.assignImgRandomly();
        if (areaInd == TOP_AREA) {
          let tx = con.vPosRange.x;
          let ty = con.vPosRange.topY;
          imgStates[i] = {
            //坐标信息
            pos: {
              left: getRandomInt(tx[0], tx[1]),
              top: getRandomInt(ty[0], ty[1])
            },
            //旋转角度
            rotate: getRandomInt(-rotateDeg, rotateDeg),
            //是否翻转
            inverse: false
          };
        } else if (areaInd == LEFT_AREA) {
          let lx = con.hPosRange.leftSecX;
          let ly = con.hPosRange.y;
          imgStates[i] = {
            //坐标信息
            pos: {
              left: getRandomInt(lx[0], lx[1]),
              top: getRandomInt(ly[0], ly[1])
            },
            //旋转角度
            rotate: getRandomInt(-rotateDeg, rotateDeg),
            //是否翻转
            inverse: false
          };
        } else {
          let rx = con.hPosRange.rightSecX;
          let ry = con.hPosRange.y;
          imgStates[i] = {
            //坐标信息
            pos: {
              left: getRandomInt(rx[0], rx[1]),
              top: getRandomInt(ry[0], ry[1])
            },
            //旋转角度
            rotate: getRandomInt(-rotateDeg, rotateDeg),
            //是否翻转
            inverse: false
          };
        }
      }
    }      //end for
    this.setState({imgStates: imgStates});
  }

  center(index) {
    return function() {
      this.rerange(index);
    }.bind(this);
  }

  componentDidMount() {
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight;
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight;

    this._Constant.centerPos = {
      left: (stageW - imgW) / 2,
      top: (stageH - imgH) / 2
    };

    let h = this._Constant.hPosRange;

    h.leftSecX = [-imgW / 2, (stageW / 2 - imgW / 2 * 3)];
    h.rightSecX = [(stageW / 2 + imgW / 2), (stageW - imgW / 2)];
    h.y = [-imgH / 2, stageH - imgH /2 ];

    this._Constant.hPosRange = h;

    let v = this._Constant.vPosRange;
    v.topY = [-imgH / 2, (stageH / 2 - imgH / 2 * 3)];
    v.x = [(stageW / 2 - imgW / 2 * 3), (stageW / 2 + imgW / 2)];

    this._Constant.vPosRange = v;

    this.rerange(0);
  }

  render() {
    let imgStates = this.state.imgStates;
    let imgFigureComponents = imageDatas.map(function(value, index) {
      let imgState = imgStates[index];
      return (
        <ImgFigure data={value} ref={'imgFigure' + index}
                   center={this.center(index)}
                   key={index}
                   isCenter={index == this._centerInd || 0}
                   arrange={imgState} />
      )

    }.bind(this));

    return (
        <section key={'app'} className='stage' ref="stage">
          <section className='img-sec'>
            {imgFigureComponents}
          </section>
          <nav className="controller-nav">fff</nav>
        </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
