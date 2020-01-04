import React, {Component} from 'react';
import {CardTitle, Card, CardBody,CardText,CardImg, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from 'react-router-dom';
import {Modal, ModalBody, ModalHeader, Button, ModalFooter, Row, Col, Label} from 'reactstrap';
import {Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from './../shared/baseUrl';


const required = (val) => val && val.length 
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class SubmitComment extends Component{
    constructor(props){
        super(props)
        this.state = {
            isModalOpen : false
        }
      this.toggleModal = this.toggleModal.bind(this);  
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }
    

    handleSubmit = (values) =>{
        this.props.postComment(this.props.dishID, values.rating, values.name, values.comment);
    }

    render(){
        return(
            <div className = 'container'>
                <Button outline onClick = {this.toggleModal} color = 'primary'>
                    Submit Comments 
                </Button>
                <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                    <ModalHeader toggle = {this.toggleModal}>
                        Submit Comments
                    </ModalHeader >
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row>
                                <Col md = {10}>
                                    <Label htmlFor = 'rating'>Rating</Label>
                                    <Control.select model = '.rating' id = 'rating' name = 'rating'
                                        placeholder = 'rating' className = 'form-control'>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                
                                </Col>
                            </Row>
                            <Row className = 'form-group'>
                                <Col md = {10}>
                                    <Label htmlFor = 'name'>Name</Label>
                                    <Control.text model = '.name' id = 'name' name='name' 
                                        placeholder='Name' className = 'form-control' 
                                        validators = {{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors 
                                        className = 'text-danger'
                                        model = '.name'
                                        show="touched"
                                            messages={{
                                                required: 'Required ',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                    />
                                </Col>
                            </Row>
                            <Row className = 'form-group'>
                                <Col>
                                    <Label htmlFor = 'people'>Comments </Label>
                                    <Control.textarea model = '.comment' id = 'comment' 
                                        name = 'comment' placeholder='Enter your comments' rows = "6" className='form-control' />
                                </Col>
                            </Row>
                            <Row className = 'form-group'>
                                <Col>
                                    <Button type = "submit" color = 'success'>Submit Comment</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                    <ModalFooter>
                        <i>Please do not share your personal details.</i>
                    </ModalFooter>
                </Modal>
            </div>
           
        );
    }
}

const DishDetail = (props) =>{
    var dish = props.dish;
    if(props.isLoading){
        return(
            <div className = 'container'>
                <div className = 'row'>
                    <Loading/>
                </div>
            </div>
        ); 
    }
    else if(props.errMess){
        return(
            <div className = 'container'>
                <div className = 'row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(dish){
        return(
            <div className="container" key={dish.id}>
                <div className = 'row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className = 'col-12'>
                        <h3>Menu</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className = 'row'>
                    <div className="col-md-6">
                        <FadeTransform>
                            <Card>
                                <CardImg width="50%" src={baseUrl + dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle><b>{dish.name}</b></CardTitle>
                                    <CardText> {dish.description} </CardText>
                                </CardBody>
                            </Card>  
                        </FadeTransform>
                    </div>
                    <div className = 'col-md-6 mb-3'>
                        <Comm comment = {props}
                            postComment = {props.postComment}
                            dishID = {props.dish.id}
                        />
                        <SubmitComment dishID = {props.dish.id} postComment = {props.postComment}/>
                    </div>  
                </div>
            </div>
        );
    }
}
  

const Comm = (props) => {
        var commentDish = props.comment.comments;
        
        return(
        <div className="col-md-6">
            <h2>Comments</h2>   
            <div>
                {
                    commentDish.map(comment =>{
                        return(
                            <div key = {comment.id}>
                                
                                <h3>{comment.comment}</h3>
                                <p>-- {comment.author}</p>
                                <p>{
                                new Intl.DateTimeFormat('en-US',{year:'numeric', month:
                                'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))
                                }
                            </p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}





export default DishDetail;
