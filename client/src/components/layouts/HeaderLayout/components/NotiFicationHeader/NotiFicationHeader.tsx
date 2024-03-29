import { useState } from 'react';
import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
import moment from 'moment';

import styles from './NotiFicationHeader.module.scss';
import { useAppSelector } from 'redux/store';
import { NotifyItem } from 'features/notify/notify';
import { patchReadNotify } from 'features/notify/notify';
import { useAppDispatch } from 'redux/store';

const NotiFicationHeader = () => {
  const [isToggleNotify, setIsToggleNotify] = useState<boolean>(false);
  const [isShadow, setIsShadow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { listNotify, istLoadingListNotify } = useAppSelector((state) => ({
    listNotify: state.notify.listNotify,
    istLoadingListNotify: state.notify.istLoadingListNotify,
  }));

  const handleReadNotify = (notifyItem: NotifyItem) => {
    if (notifyItem.isRead) {
      return;
    }
    dispatch(patchReadNotify(notifyItem._id));
  };

  return (
    <button
      className={clsx('headerBtn', styles.btnNoti)}
      onClick={() => setIsToggleNotify(true)}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsToggleNotify(false);
        }}
      >
        <div className={clsx(`headerOptionIcon`, styles.wrapNotification)}>
          <div className={styles.notifyCount}>
            <span className={clsx(listNotify.length >= 1 && styles.active)}>
              <i className="las la-bell" />
            </span>
            {listNotify.length >= 1 && (
              <span className={styles.notifyNumber}>{listNotify.length}</span>
            )}
          </div>

          <div
            className={clsx(styles.boxNotification, {
              [styles.active]: isToggleNotify,
            })}
          >
            <h3
              className={clsx(
                styles.titleNotification,
                isShadow && styles.active
              )}
            >
              Thông báo
            </h3>
            {istLoadingListNotify && <div>Loading...</div>}
            {!istLoadingListNotify && listNotify && (
              <div
                className={styles.groupNotification}
                onScroll={(e) => {
                  setIsShadow((e.target as HTMLElement).scrollTop > 0);
                }}
              >
                {listNotify.map((item) => {
                  return (
                    <div
                      className={styles.itemNotification}
                      key={item._id}
                      onClick={() => handleReadNotify(item)}
                    >
                      <img src={item.image} alt="" />
                      <div className={styles.content}>
                        <p>{item.text}</p>
                        <div>{moment(item.createdAt).fromNow()}</div>
                      </div>
                      {!item.isRead && <div className={styles.status}></div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </OutsideClickHandler>
    </button>
  );
};

export default NotiFicationHeader;
