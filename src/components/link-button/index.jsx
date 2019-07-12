import React from 'react'
import './index.less'

/* 外形像链接的按钮 */
export default function LinkButton(props) {
    return <button {...props} className="link-button"></button>//不知道传什么属性进来，{...props}实现把对象里的属性拆开分别使用
}