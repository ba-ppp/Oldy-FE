import { ReactComponent as Comment } from 'assets/images/home/comment.svg';
import { ReactComponent as Heart } from 'assets/images/home/heart.svg';
import { ReactComponent as HeartRed } from 'assets/images/home/heart_red.svg';
import { ReactComponent as Share } from 'assets/images/home/share.svg';
import React, { useState } from 'react';
import cls from './_userPost.module.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'app/reducers/type';
import likePost from 'api/data/post/likePost';

type Props = {
    heightPost: string;
    postId: string;
    caption?: string;
    postImage?: string;
    avtHeader: string;
    userName: string;
    likeCount: number;
    liked: boolean;
    commentCount: number;
    shareCount: number;
};

const Post: React.FC<Props> = (props) => {
    const state = useSelector((state) => state.profile);
    const userId = state.id;

    const postId = props.postId;
    const postImage = props.postImage;

    const avtHeader = props.avtHeader;

    const userName = props.userName;

    const commentCount = props.commentCount;
    const shareCount = props.shareCount;

    const [like, setLike] = useState(props.liked);
    const [likeCount, setLikeCount] = useState(props.likeCount);

    const onClickLike = () => {
        setLike(!like);
        setLikeCount(likeCount + 1);
        likePost({ userId, postId });
    };
    const onClickDisLike = () => {
        setLike(!like);
        setLikeCount(likeCount - 1);
        likePost({ userId, postId });
    };

    return (
        <div className={cls.home_post} style={{ height: props.heightPost }}>
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
                <h3>{props.caption}</h3>
                <div className={cls.home_post_comment_react}>
                    {!like && (
                        <Heart
                            className={cls.home_post_comment_icon}
                            height={25}
                            width={25}
                            onClick={onClickLike}
                            style={{ marginRight: 15 }}
                        />
                    )}
                    {like && (
                        <HeartRed
                            className={cls.home_post_comment_icon}
                            height={25}
                            width={25}
                            onClick={onClickDisLike}
                            style={{ marginRight: 15 }}
                        />
                    )}
                    <Comment
                        className={cls.home_post_comment_icon}
                        height={25}
                        width={25}
                        style={{ marginRight: 15 }}
                    />
                    <Share
                        className={cls.home_post_comment_icon}
                        height={25}
                        width={25}
                        style={{ marginRight: 15 }}
                    />
                </div>
                <div>
                    <span
                        className={cls.home_post_react}
                        style={{ marginRight: 23 }}
                    >
                        {likeCount}
                    </span>
                    <span
                        className={cls.home_post_react}
                        style={{ marginRight: 23 }}
                    >
                        {commentCount}
                    </span>
                    <span
                        className={cls.home_post_react}
                        style={{ marginRight: 23 }}
                    >
                        {shareCount}
                    </span>
                </div>
            </div>
        </div>
    );
};

Post.propTypes = {
    heightPost: PropTypes.string.isRequired,
    caption: PropTypes.string,
    postImage: PropTypes.string,
    avtHeader: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    liked: PropTypes.bool.isRequired,
    commentCount: PropTypes.number.isRequired,
    shareCount: PropTypes.number.isRequired,
    postId: PropTypes.string.isRequired,
};

export default Post;
