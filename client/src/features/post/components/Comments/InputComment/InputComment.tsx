import { useState } from 'react';
import clsx from 'clsx';

import styles from './InputComment.module.scss';
import { useAppSelector } from 'redux/store';
import ContentEditableTag from 'components/atoms/ContentEditableTag/ContentEditableTag';

interface CommentsProps {
  getValue: (value: string) => void;
  isReply?: boolean;
  setIsReply?: (value: boolean) => void;
}

const InputComment: React.FC<CommentsProps> = ({
  getValue,
  isReply,
  setIsReply,
}) => {
  const [isToggleComment, setIsToggleComment] = useState<boolean>(false);
  const [valueComment, setValueComment] = useState<string>('');

  const handlePostComment = () => {
    if (!valueComment.trim()) return;
    getValue(valueComment);
    setValueComment('');
    setIsToggleComment(false);
    setIsReply && setIsReply(false);
  };

  const avatar = useAppSelector((state) => state.user.userInfo?.avatar);

  return (
    <div className={styles.comments}>
      <div className={styles.inputComment}>
        <div className={styles.headerComment}>
          <img src={avatar} alt="auth-avatar" />

          <ContentEditableTag
            html={valueComment}
            onChange={(e) => setValueComment(e.target.value)}
            data-content="Nội dung bình luận"
            className={styles.contentComment}
            onFocus={() => setIsToggleComment(true)}
          />
        </div>

        {(isToggleComment || !!isReply) && (
          <div className={styles.actionComment}>
            <button
              className={clsx(styles.cancelComment, styles.btnComment)}
              onClick={() => {
                setIsToggleComment(false);
                setValueComment('');
                setIsReply && setIsReply(false);
              }}
            >
              Hủy
            </button>
            <button
              className={clsx(styles.sendComment, styles.btnComment, {
                [styles.active]: valueComment.trim(),
              })}
              onClick={handlePostComment}
            >
              Bình luận
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputComment;
