import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import PostCardAuth from 'components/atoms/PostCardAuth/PostCardAuth';
import styles from './PostTrendingItem.module.scss';
import { PostHomeTypeDef } from 'features/new-post/new-post';
import { PostPathsEnum } from 'features/post/post';

interface PostTrendingItemProps {
  post: PostHomeTypeDef;
}

const PostTrendingItem: React.FC<PostTrendingItemProps> = ({ post }) => {
  return (
    <div className={styles.postTrendingItem}>
      <div className={styles.postBody}>
        <div className={styles.postContent}>
          <div className={styles.postTitle}>
            <Link
              to={{
                pathname: PostPathsEnum.POST.replace(/:slug/, post.slug),
                state: post._id,
              }}
            >
              {post.titleOutside}
            </Link>
          </div>
          <p className={styles.postDes}>{post.description}</p>
        </div>

        <PostCardAuth
          auth="sonel"
          time={moment(post.createdAt).fromNow()}
          avatar={post.authPost.avatar}
        />
      </div>
      <div className={styles.postImg}>
        <img src={post.avatar.img} alt="" />
      </div>
    </div>
  );
};

export default PostTrendingItem;
