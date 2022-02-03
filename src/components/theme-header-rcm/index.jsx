import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

WYThemeHeaderRCM.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

WYThemeHeaderRCM.defaultProps = {
  keywords: [],
};

export default function WYThemeHeaderRCM({ title, keywords }) {
  return (
    <div className="wy-theme-header-rcm sprite-02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keywords-wrapper">
          {keywords.map((item, index) => (
            <div className="item" key={item}>
              <a>{item}</a>
              {index + 1 !== keywords.length ? (
                <span className="divider">|</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <a>更多</a>
        <i className="icon sprite-02"></i>
      </div>
    </div>
  );
}
