import { useState, useMemo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './ProfileContentHeader.module.scss';
import { UserInfoType } from 'features/user/user';
import { ProfilePathsEnum } from '../../constants/profile.paths';
import { useDataToken } from 'hooks/hooks';

import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  patchFollowersUser,
  patchUnFollowersUser,
} from '../../redux/profile.slice';
import { SOCIALS } from './../../constants/profile.constants';

interface ProfileContentHeaderProps {
  profileUser: UserInfoType;
}

const ProfileContentHeader: React.FC<ProfileContentHeaderProps> = ({
  profileUser,
}) => {
  const dispatch = useAppDispatch();
  const { _id: userId } = useDataToken();
  const followingUser = useAppSelector(
    (state) => state.user.userInfo?.following
  );

  const [isFollowing, setIsFollowing] = useState<boolean>(
    () => followingUser?.includes(profileUser._id) || false
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFollow = () => {
    return isFollowing
      ? dispatch(patchUnFollowersUser(profileUser._id))
      : dispatch(patchFollowersUser(profileUser._id));
  };

  const handleFollowOrUnFollow = async () => {
    if (!profileUser._id) {
      return;
    }
    setIsLoading(true);

    await handleFollow().finally(() => setIsLoading(false));

    setIsFollowing(!isFollowing);
  };

  const socials = useMemo(() => {
    return profileUser.socials.map((item) => ({
      ...item,
      image: SOCIALS[item.name],
    }));
  }, [profileUser.socials]);

  return (
    <div className={styles.profileContentHeader}>
      <div className={styles.authAvatar}>
        <img src={profileUser.avatar} alt="" />
      </div>

      <div className={styles.authContent}>
        <h2 className={styles.authName}>
          {profileUser.name}

          {userId !== profileUser._id && (
            <button
              className={clsx(styles.btnFlow)}
              onClick={handleFollowOrUnFollow}
              disabled={isLoading}
            >
              {isFollowing ? 'Hủy theo dõi' : 'Theo dõi'}
            </button>
          )}
        </h2>
        <p className={styles.authInfo}>{profileUser.description}</p>
        <div className={styles.listSocials}>
          {socials &&
            socials.length > 0 &&
            socials.map((social) => (
              <a
                href={social.link}
                className={styles.itemSocial}
                key={social._id}
                target="_blank"
                rel="noreferrer"
              >
                <img src={social.image} alt="" />
              </a>
            ))}
        </div>
      </div>

      <Link
        to={ProfilePathsEnum.PROFILE_SETTING}
        className={styles.btnEditProfile}
      >
        Chỉnh sửa
      </Link>
    </div>
  );
};

export default ProfileContentHeader;
