import React from  'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { CardImg } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from './../shared/baseUrl';
//why this shit {}
const RenderCard = ({item, isLoading, errMess}) =>{
    console.log('This is item :',item)
    if(isLoading){
        return(
            <Loading/>
        );
    }

    else if(errMess){
        return(
            <h4>
                There has been an error : {errMess}
            </h4>
        );
    }
    else{
        return(
            <Card>
                <CardImg src = { baseUrl + item.image} alt = {item.image} />
                <CardBody>
                    <CardTitle><b>{item.name}</b></CardTitle>
                    {item.designation ? <CardSubtitle> {item.designation} </CardSubtitle> : null}
                    <CardText>
                        {item.description}
                    </CardText>
                </CardBody>
            </Card>
        );  
    }
}


const Home = (props) =>{
    return(
        <div className = 'container'>
            <div className = 'row'>
                <div className = 'row align-items-start'>
                    <div className = 'col-12 col-md m-1'>
                        <RenderCard item = {props.dish} 
                            isLoading = {props.dishesLoading} 
                            errMess = {props.dishesErrMess} />
                    </div>
                    <div className = 'col-12 col-md m-1'>
                        <RenderCard item = {props.promotions}
                            isLoading = {props.promosLoading}
                            errMess = {props.promosErrMess}

                        />
                    </div>
                    <div className = 'col-12 col-md m-1'>
                        <RenderCard item = {props.leaders}/>
                    </div>
                </div>
            </div>
        </div>
    );

} 
export default Home;