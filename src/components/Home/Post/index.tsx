import { ReactComponent as Comment } from 'assets/images/home/comment.svg';
import { ReactComponent as Heart } from 'assets/images/home/heart.svg';
import { ReactComponent as HeartRed } from 'assets/images/home/heart_red.svg';
import { ReactComponent as Share } from 'assets/images/home/share.svg';
import React, { useState } from 'react';
import cls from './_userPost.module.scss';

const Post: React.FC = () => {
    const postImage = 'https://loremflickr.com/650/614';
    const avtHeader = 'https://loremflickr.com/320/240';

    const userName = 'pebeoooo';

    const likeCount = 5;
    const commentCount = 10;
    const shareCount = 2;

    const [like, setLike] = useState(false);

    const onClickLike = () => {
        setLike(!like);
    };
    return (
        <div className={cls.home_main}>
            <div className={cls.home_post}>
                <header className={cls.home_post_header}>
                    <div
                        className={cls.header_avt}
                        style={{ backgroundImage: `url(${avtHeader})` }}
                    />
                    <div className={cls.header_username}>{userName}</div>
                </header>
                <div
                    className={cls.home_post_image}
                    style={{ backgroundImage: `url(${postImage})` }}
                />
                <div className={cls.home_post_comment}>
                    <div className={cls.home_post_comment_react}>
                        {!like && (
                            <Heart
                                className={cls.home_post_comment_icon}
                                height={25}
                                width={25}
                                onClick={onClickLike}
                            />
                        )}
                        {like && (
                            <HeartRed
                                className={cls.home_post_comment_icon}
                                height={25}
                                width={25}
                                onClick={onClickLike}
                            />
                        )}
                        <Comment
                            className={cls.home_post_comment_icon}
                            height={25}
                            width={25}
                        />
                        <Share
                            className={cls.home_post_comment_icon}
                            height={25}
                            width={25}
                        />
                    </div>
                    <div>
                        <span className={cls.home_post_react}>{likeCount}</span>
                        <span className={cls.home_post_react}>
                            {commentCount}
                        </span>
                        <span className={cls.home_post_react}>
                            {shareCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
