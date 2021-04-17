import { Modal } from 'antd';
import getPost, { ArrayPost, PromiseResponse } from 'api/data/post/post';
import uploadImage from 'api/data/post/uploadImage';
import upPost from 'api/data/post/upPost';
import { useSelector } from 'app/reducers/type';
import { ReactComponent as AddIcon } from 'assets/images/home/add.svg';
import { ReactComponent as FindIcon } from 'assets/images/home/find.svg';
import { ReactComponent as HeartIcon } from 'assets/images/home/heart.svg';
import { ReactComponent as HomeIcon } from 'assets/images/home/home.svg';
import { ReactComponent as PictureIcon } from 'assets/images/home/picture.svg';
import Header from 'components/Header';
import openNotificationWithIcon from 'helpers/design/notification';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Post from './Post';
import cls from './_home.module.scss';

type State = {
    caption: string;
    images: FileList;
};

//style
const modal = {
    width: '95%',
    height: '50px',
    backgroundColor: '#fafafa',
    border: '1px solid #fff',
    borderRadius: '5%',
    paddingLeft: '12px',
    fontSize: '20px',
    outline: 'none',
};
const modal_input = {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    zIndex: -1,
};

const modal_image = {
    height: '300px',
    width: '300px',
};

const picture = {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
    width: '95%',
};

const Home: React.FC = () => {
    const state = useSelector((state) => state.profile);
    const avt = state.avt;
    const userId = state.id;
    const [posts, setPosts] = useState<PromiseResponse | any>(null);
    const [imageURL, setImageURL] = useState<string>('');
    const { handleSubmit, register } = useForm<State>();

    const [modalShow, setModalShow] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            const data = await getPost({ userId });
            setPosts(data.posts);
        }
        fetchData();
    }, []);

    const showModal = () => {
        setModalShow(!modalShow);
    };

    const upload = async (value: React.ChangeEvent<HTMLInputElement>) => {
        if (value.target.files) {
            const formData = new FormData();
            formData.append('image', value.target.files[0]);
            formData.append('userId', userId);
            const data = await uploadImage(formData);
            if (data.url) {
                setImageURL(data.url);
                openNotificationWithIcon('success', '', data.message);
            } else {
                openNotificationWithIcon('error', '', data.message);
            }
        }
    };

    const onFinish = async (value: State) => {
        const caption = value.caption;
        if (!imageURL) {
            showModal();
            return;
        }
        const data = {
            userId: userId,
            images: imageURL,
            caption: caption,
        };
        const result = await upPost(data);
        openNotificationWithIcon('success', '', result.message);
        showModal();
    };
    return (
        <div>
            <Header
                avt={avt}
                exploreClick={false}
                heartClick={false}
                homeClick={true}
                messClick={false}
            />
            <div className={cls.main}>
                <div className={cls.post}>
                    <div className={cls.create_post}>
                        <div
                            className={cls.create_post_avt}
                            style={{ backgroundImage: `url(${avt})` }}
                        />
                        <input
                            className={cls.create_post_input}
                            placeholder="Bạn đang nghĩ gì vậy?"
                            onClick={showModal}
                        />
                    </div>
                    <Modal
                        title="Tạo bài viết"
                        visible={modalShow}
                        onOk={handleSubmit(onFinish)}
                        onCancel={showModal}
                    >
                        <form encType="multipart/form-data">
                            <input
                                style={modal}
                                placeholder="Bạn đang nghĩ gì vậy?"
                                name="caption"
                                ref={register}
                            />
                            <input
                                type="file"
                                style={modal_input}
                                id="pic"
                                name="images"
                                onChange={upload}
                                ref={register}
                            />
                            {!imageURL && (
                                <label htmlFor="pic" style={picture}>
                                    <PictureIcon height={25} width={25} />
                                </label>
                            )}

                            {imageURL && (
                                <div
                                    style={{
                                        backgroundImage: `url(${imageURL})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        height: '300px',
                                        width: '447px',
                                        marginTop: '20px',
                                    }}
                                />
                            )}
                        </form>
                    </Modal>
                    {posts &&
                        posts.map(function (post: ArrayPost, key: number) {
                            return (
                                <Post
                                    postId={post.post._id}
                                    avtHeader={post.user.avt}
                                    postImage={post.post.image}
                                    likeCount={
                                        post.post.likes
                                            ? post.post.likes.length
                                            : 0
                                    }
                                    liked={post.post.liked}
                                    userName={post.user.username}
                                    commentCount={
                                        post.post.comment
                                            ? post.post.comment.length
                                            : 0
                                    }
                                    shareCount={
                                        post.post.share
                                            ? post.post.share.length
                                            : 0
                                    }
                                    key={key}
                                />
                            );
                        })}
                </div>
                <div className={cls.footer}>
                    <div className={cls.nav}>
                        <Link to="/">
                            <HomeIcon
                                height={25}
                                width={25}
                                className={cls.nav_icon}
                            />
                        </Link>
                        <FindIcon
                            width={25}
                            height={25}
                            className={cls.nav_icon}
                        />
                        <AddIcon
                            width={25}
                            height={25}
                            className={cls.nav_icon}
                        />
                        <HeartIcon
                            width={25}
                            height={25}
                            className={cls.nav_icon}
                        />
                        <Link to="/profile">
                            <div
                                className={cls.nav_icon_avt}
                                style={{ backgroundImage: `url(${avt})` }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
