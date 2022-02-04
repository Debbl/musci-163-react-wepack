import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

WYThemeHeaderRCM.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

WYThemeHeaderRCM.defaultProps = {
  keywords: [],
};

export default function WYThemeHeaderRCM({ title, keywords }) {
  return (
    <div className={`${style['wy-theme-header-rcm']}  sprite-02`}>
      <div className={style['left']}>
        <h3 className={style['title']}>{title}</h3>
        <div className={style['keywords-wrapper']}>
          {keywords.map((item, index) => (
            <div className={style['item']} key={item}>
              <a>{item}</a>
              {index + 1 !== keywords.length ? (
                <span className={style['divider']}>|</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className={style['right']}>
        <a>更多</a>
        <i className={`${style['icon']}  sprite-02`}></i>
      </div>
    </div>
  );
}
