import { notification } from "antd";


const openNotificationWithIcon = (type: string, message: string, err: string): void => {
    if(type === 'success' || type === 'warning' || type === 'error')
        notification[type]({ message, description: err})       
};

export default openNotificationWithIcon;
