import React from 'react';
import animate from 'assets/images/loading/loading-animate.gif';

import cls from './_loading.module.scss';

const Loading:React.FC = () => (
    <div className={cls.main}>
        <img src={animate} alt='animate' className={cls.animate} />
    </div>
);


export default Loading;