import React, {Component} from 'react';
import {CardTitle, Card, CardBody,CardText,CardImg, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from 'react-router-dom';
import {Modal, ModalBody, ModalHeader, Button, ModalFooter, Row, Col, Label} from 'reactstrap';
import {Control, LocalForm, Errors } from 'react-redux-form';
// import SubmitComment from './SubmitCommentComponent';

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
        // alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishID, values.rating, values.name, values.comment);
        // console.log(values.author)
        // console.log(values.comment)
        // this.toggleModal();
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
    if(dish){
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
                        <Card>
                            <CardImg width="50%" src={dish.image} alt={dish.image} />
                            <CardBody>
                                <CardTitle><b>{dish.name}</b></CardTitle>
                                <CardText> {dish.description} </CardText>
                            </CardBody>
                        </Card>  
                    </div>
                    <div className = 'col-md-6 mb-3'>
                        <Comm comment = {props}
                            addComment = {props.addComment}
                            dishID = {props.dish.id}
                        />
                        {console.log(props.dish.id)}
                        <SubmitComment dishID = {props.dish.id} addComment = {props.addComment}/>
                    </div>  
                </div>
            </div>
        );
    }
    else{ 
        return(
            <div>
            </div>);
        }
    }
  

    const Comm = (props, addComment, dishID) => {
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
