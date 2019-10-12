import React, {Component} from 'react';
import ActivitiesNav from "../../components/ActivitiesNav/ActivitiesNav";
import {Redirect, Route, Switch,Prompt} from 'react-router-dom';
import Recommended from "./recommended/Recommended";
import All from "./all/All";
import Articles from "./articles/Articles";
import Pins from "./pins/Pins";

import './style.css'

class Activities extends Component {

    render() {
        return (
            <div className='activities'>
                <ActivitiesNav/>
                {/*询问用户是否离开*/}
                <Prompt message={(location)=>{
                    if (!location.pathname.includes('/activities')){
                        return  window.confirm('确定要离开吗？');
                    }
                    return true;
                }}/>
                <div className='content'>
                    <Switch>
                        {/*<Route path="/activities" component={Recommended} exact />*/}
                        <Route path="/activities/recommended" component={Recommended}/>
                        <Route path="/activities/all" component={All}/>
                        <Route path="/activities/articles" component={Articles}/>
                        <Route path="/activities/pins" component={Pins}/>
                        <Redirect to='/activities/recommended'/>
                    </Switch>
                </div>

            </div>
        )
    }

}

export default Activities;
