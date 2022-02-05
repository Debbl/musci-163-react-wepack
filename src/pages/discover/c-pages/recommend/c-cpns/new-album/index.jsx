import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Carousel } from 'antd';

import style from './style.module.scss';
import { getNewAlbumAction } from '../../store/actionCreation';
import WYThemeHeaderRCM from '@/components/theme-header-rcm';

export default function WYNewAlbum() {
  const dispatch = useDispatch();
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommend', 'newAlbums']),
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getNewAlbumAction(10));
  }, [dispatch]);

  return (
    <div className={style['wy-new-album']}>
      <WYThemeHeaderRCM title="新碟上架" />
      <div>
        <button>left</button>
        <div className="album">
          <Carousel autoplay>
            <div>1</div>
            <div>1</div>
          </Carousel>
        </div>
        <button>right</button>
      </div>
    </div>
  );
}
