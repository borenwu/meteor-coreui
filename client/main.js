import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history';


// Containers
import Full from './containers/Full/'
// Views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

const history = createBrowserHistory();

const checkUser = (nextState, replace, next) => {
    console.log('check user start')
    let currentUser = Meteor.user();
    if (currentUser) {
        next()//如果有值直接下一步
    } else {
        replace("/login")//如果token信息为空就直接到登录页面
        next();
    }
}

Meteor.startup(() => {

    render(
        <Router history={history}>
            <Switch>
                <Route exact path="/login" name="Login Page" component={Login}/>
                <Route exact path="/register" name="Register Page" component={Register}/>
                <Route exact path="/404" name="Page 404" component={Page404}/>
                <Route exact path="/500" name="Page 500" component={Page500}/>
                <Route path="/" name="Home" component={Full} onEnter={checkUser}/>
            </Switch>
        </Router>,
        document.getElementById('root'));
});
