import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
    {
        title: '首页',
        icon: 'home',
        key: '/home'
    },
    {
        title: '关于',
        icon: 'info-circle-o',
        key: '/about'
    }
]


class SiderNav_auth_1 extends React.Component {
    render() {

        return (
            <div style={{height: '100vh',overflowY:'scroll'}}>
                // TODO 添加 logo
                <div style={styles.logo}></div>
                <CustomMenu menus={menus}/>
            </div>
        )
    }
}

const styles = {
    logo: {
        height: '32px',
        // background: 'rgba(255, 255, 255, .2)',
        margin: '16px'
    }
}

export default SiderNav_auth_1