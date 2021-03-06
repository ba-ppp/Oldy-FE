import React from 'react';
import Header from 'components/Header';
import { useSelector } from 'app/reducers/type';

const Profile: React.FC = () => {
    const state = useSelector((state) => state.profile);
    const avt = state.avt;
    return (
        <div>
            <Header
                avt={avt}
                exploreClick={false}
                homeClick={false}
                heartClick={false}
                messClick={false}
            />
        </div>
    );
};

export default Profile;
