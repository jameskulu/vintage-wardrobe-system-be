import { Component } from "react";


class Header extends Component{
    render(){
        return(
            <div>
                <a class="btn btn-primary" href="/login" role="button">Login</a>

                <a class="btn btn-primary" href="/signup" role="button">SignUp</a>
            
            </div>


        )
    }

}

export default Header