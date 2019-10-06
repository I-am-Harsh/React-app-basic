import React from  'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { CardImg } from 'reactstrap';
let i = 1
//why this shit {}
const RenderCard = ({item}) =>{
    console.log("Item name:",item);
    console.log(i);
    i = i + 1;
    return(
        <Card>
            <CardImg src = {item.image} alt = {item.image} />
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


const Home = (props) =>{
    console.log(props.dish.description);
    return(
        <div className = 'container'>
            <div className = 'row'>
                <div className = 'row align-items-start'>
                    <div className = 'col-12 col-md m-1'>
                        <RenderCard item = {props.dish}/>
                    </div>
                    <div className = 'col-12 col-md m-1'>
                        <RenderCard item = {props.promotions}/>
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