import React, {Component} from 'react';



class Error extends Component {
    render(){
        return(
            <div className = 'container'>
                <div className = 'row justify-content-center mt-5'>
                    <h1>Excuse me What the puck</h1>
                </div>
                <div className = 'row justify-content-center'>
                    <p>Please choose a link from above or below.</p>
                </div>
            </div>
        );
    }
}



export default Error;