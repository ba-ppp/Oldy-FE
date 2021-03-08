import { ReactComponent as ExploreIcon } from 'assets/images/home/explore.svg';
import { ReactComponent as ExploreBlackIcon } from 'assets/images/home/explore_black.svg';
import { ReactComponent as HeartIcon } from 'assets/images/home/heart.svg';
import { ReactComponent as HeartBlackIcon } from 'assets/images/home/heart_black.svg';
import { ReactComponent as HomeIcon } from 'assets/images/home/home.svg';
import { ReactComponent as HomeBlackIcon } from 'assets/images/home/home_black.svg';
import { ReactComponent as MessIcon } from 'assets/images/home/mess.svg';
import { ReactComponent as Messenger } from 'assets/images/home/messenger.svg';
import { ReactComponent as MessBlackIcon } from 'assets/images/home/mess_black.svg';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import React, { useState } from 'react';
import cls from './_header.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

type Props = {
    avt: string;
    homeClick: boolean;
    messClick: boolean;
    exploreClick: boolean;
    heartClick: boolean;
    style?: any;
};

const Header: React.FC<Props> = (props) => {
    const [homeClick, setHomeClick] = useState(props.homeClick);
    const [messClick, setMessClick] = useState(props.messClick);
    const [exploreClick, setExploreClick] = useState(props.exploreClick);
    const [heartClick, setHeartClick] = useState(props.heartClick);

    const homeOnClick = () => {
        setHomeClick(true);
        setMessClick(false);
        setExploreClick(false);
        setHeartClick(false);
    };
    const messOnClick = () => {
        setHomeClick(false);
        setMessClick(true);
        setExploreClick(false);
        setHeartClick(false);
    };
    const exploreOnClick = () => {
        setHomeClick(false);
        setMessClick(false);
        setExploreClick(true);
        setHeartClick(false);
    };
    const heartOnClick = () => {
        setHomeClick(false);
        setMessClick(false);
        setExploreClick(false);
        setHeartClick(true);
    };

    return (
        <div className={cls.header} style={props.style}>
            <div className={cls.header_main}>
                <div className={cls.header_logo}>
                    <img className={cls.header_image} src={logo} />
                </div>

                <div className={cls.header_input}>
                    <input
                        className={cls.input}
                        placeholder="&#xF002; Tìm kiếm"
                        style={{ fontFamily: 'Arial, FontAwesome' }}
                    />
                </div>
                {/* for mobile */}
                <div className={cls.mess_icon}>
                    <Messenger
                        className={cls.mess}
                        onClick={messOnClick}
                        height={25}
                        width={22}
                    />
                </div>

                <nav className={cls.icon}>
                    {homeClick && (
                        <HomeBlackIcon
                            className={cls.icon_item}
                            onClick={homeOnClick}
                            height={25}
                            width={22}
                        />
                    )}
                    {!homeClick && (
                        <HomeIcon
                            className={cls.icon_item}
                            onClick={homeOnClick}
                            height={25}
                            width={22}
                        />
                    )}
                    {messClick && (
                        <MessBlackIcon
                            className={cls.icon_item}
                            onClick={messOnClick}
                            height={25}
                            width={22}
                        />
                    )}
                    {!messClick && (
                        <MessIcon
                            className={cls.icon_item}
                            onClick={messOnClick}
                            height={25}
                            width={22}
                        />
                    )}
                    {exploreClick && (
                        <ExploreBlackIcon
                            className={cls.icon_item}
                            onClick={exploreOnClick}
                            height={25}
                            width={22}
                        />
                    )}
                    {!exploreClick && (
                        <ExploreIcon
                            className={cls.icon_item}
                            onClick={exploreOnClick}
                            height={25}
                            width={22}
                        />
                    )}
                    {heartClick && (
                        <HeartBlackIcon
                            className={cls.icon_item}
                            onClick={heartOnClick}
                            height={25}
                            width={22}
                        />
                    )}
                    {!heartClick && (
                        <HeartIcon
                            className={cls.icon_item}
                            onClick={heartOnClick}
                            height={25}
                            width={22}
                        />
                    )}
                    <Link
                        to="/profile"
                        className={cls.icon_avt}
                        style={{ backgroundImage: `url(${props.avt})` }}
                    />
                </nav>
            </div>
        </div>
    );
};
Header.propTypes = {
    avt: PropTypes.string.isRequired,
    exploreClick: PropTypes.bool.isRequired,
    heartClick: PropTypes.bool.isRequired,
    homeClick: PropTypes.bool.isRequired,
    messClick: PropTypes.bool.isRequired,
    style: PropTypes.any,
};

export default Header;
