import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Carousel } from 'antd';

import style from './style.module.scss';
import { getNewAlbumAction } from '@/stores/recommend/actionCreation';
import WYThemeHeaderRCM from '@/components/theme-header-rcm';
import WYAlbumCover from '@/components/album-cover';

export default function WYNewAlbum() {
  const dispatch = useDispatch();
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommend', 'newAlbums']),
    }),
    shallowEqual,
  );

  const carouselRef = useRef();

  useEffect(() => {
    dispatch(getNewAlbumAction(10));
  }, [dispatch]);

  return (
    <div className={style['wy-new-album']}>
      <WYThemeHeaderRCM title="新碟上架" />
      <div className={style['content']}>
        <button
          className={`${style['arrow']} ${style['arrow-left']} sprite-02`}
          onClick={() => carouselRef.current.prev()}
        ></button>
        <div className={style['album']}>
          <Carousel dots={false} ref={carouselRef}>
            {[0, 1].map((item) => (
              <div key={item} className={style['page']} test={item}>
                {newAlbums.slice(item * 5, (item + 1) * 5).map((album) => (
                  <WYAlbumCover
                    key={album.id}
                    info={album}
                    size={100}
                    width={118}
                    bgp="-570px"
                  />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
        <button
          className={`${style['arrow']} ${style['arrow-right']} sprite-02`}
          onClick={() => carouselRef.current.next()}
        ></button>
      </div>
    </div>
  );
}
