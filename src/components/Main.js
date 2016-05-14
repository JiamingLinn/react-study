require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

let ReactCSSTransitionGroup = require('react-addons-css-transition-group');

let imageDatas = require('../data/img-info');
imageDatas = imageDatas.forEach(obj => {
  obj.imageData = require('../images/' + obj.fileName);
});

class AppComponent extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <section key={'app'} className='stage'>
          <section className='img-sec'></section>
          <nav className="controller-nav"></nav>
        </section>
      </ReactCSSTransitionGroup>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
