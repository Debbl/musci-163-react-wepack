import React, { Fragment } from 'react';

import style from './style.module.scss';
import { footerLinks } from '@/common/local-data';
import { footerImages } from '@/common/local-data';

export default function WYAppFooter() {
  return (
    <div className={style['wy-app-footer']}>
      <div className={`${style['center']} wrap-v2`}>
        <div className={style['left']}>
          <div className={style['link']}>
            {footerLinks.map((item) => (
              <Fragment key={item.title}>
                <a href={item.link}>{item.title}</a>
                <span className={style['line']}>|</span>
              </Fragment>
            ))}
          </div>
          <div className={style['copyright']}>
            <span>网易公司版权所有©1997-2020</span>
            <span>
              杭州乐读科技有限公司运营：
              <a
                href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png"
                rel="noopener noreferrer"
                target="_blank"
              >
                浙网文[2018]3506-263号
              </a>
            </span>
          </div>
          <div className="report">
            <span>违法和不良信息举报电话：0571-89853516</span>
            <span>
              举报邮箱：
              <a
                href="mailto:ncm5990@163.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ncm5990@163.com
              </a>
            </span>
          </div>
          <div className="info">
            <span>粤B2-20090191-18</span>
            <a
              href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action"
              rel="noopener noreferrer"
              target="_blank"
            >
              工业和信息化部备案管理系统网站
            </a>
          </div>
        </div>
        <div className={style['right']}>
          {footerImages.map((item) => (
            <li className={style['item']} key={item.link}>
              <a
                className={style['link']}
                href={item.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {' '}
              </a>
              <span className={style['title']}></span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
