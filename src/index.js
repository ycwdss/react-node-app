import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import reducer from './redux'
import './config'
import './index.css'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/AuthRoute'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Test from './container/test/test'


const store = createStore(reducer, compose(
    //异步处理
    applyMiddleware(thunk),
    //浏览器调试 redux
    window.devToolsExtension ? window.devToolsExtension() : f => f
))
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                    <Route path="/test" component={Test}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

