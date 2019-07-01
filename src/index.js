/*入口js*/
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';/* 自定义模块一定要先加点 */
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils';
import * as serviceWorker from './serviceWorker';

//读取local中保存的user， 关闭浏览器再打开，内存中就没有数据了，所以内存中也要有保存
const user = storageUtils.getUsers()
memoryUtils.user = user

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

