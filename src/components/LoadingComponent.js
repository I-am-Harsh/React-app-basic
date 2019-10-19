import React from 'react';

export const Loading = () =>{
    return(
        <React.Fragment>
            <div className='col-12'>
                <span className = 'fa fa-spinner fa-pulse fa-3x fa-fw text-success'></span>
                <p>Loading</p>
            </div>
        </React.Fragment>
    )
}