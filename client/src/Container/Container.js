import {Component} from "react";
import { Route } from "react-router";
import Login from "./Login";
import Register from "./Register";
class Container extends Component{
    render(){
        return(
            <div>
                <Route exact path ="/login" component = {Login}/>
                <Route exact path ="/signup" component = {Register}/>
            </div>
        )
    }

    
}

export default Container;