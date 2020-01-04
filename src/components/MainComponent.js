import React from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from "./AboutusComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, withRouter} from 'react-router-dom';
import DishDetail from './DishDetailComponent';
import ExampleSearchbox from './GoogleMapApiComponent';
import Error from './ErrorPageComponent';
import {connect} from 'react-redux';
import {fetchDishes,fetchComments,fetchPromos, postComment} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = (state) =>{
  return({
    dishes : state.dishes,
    comments : state.comments,
    leaders : state.leaders,
    promotions : state.promotions
  })
}

const mapDispatchToProps = (dispatch) =>({
  postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () => {dispatch(fetchPromos())},
  // fetchLeaders : () => {dispatch(fetchLeaders())},
});

class Main extends React.Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    // this.props.fetchLeaders()
  }

  render() {
    const HomePage = () => {

      return(
        <Home dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMess = {this.props.dishes.errMess}
          promotions = {this.props.promotions.promotions.filter((promotions) => promotions.featured)[0]}
          promosLoading = {this.props.promotions.isLoading}
          promosErrMess = {this.props.promotions.errMess}
          // add for leaders as well 
          leaders = {this.props.leaders.filter((leaders) => leaders.featured)[0]}
        />
      );
    }

    const DishWithId = ({match}) =>{
      return( 
        <DishDetail dish = {this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading = {this.props.dishes.isLoading}
          errMess = {this.props.dishes.errMess}
          comments = {this.props.comments.comments.filter((comment) => comment.dishId ===parseInt(match.params.dishId,10))}
          commentserrMess = {this.props.comments.errMess}
          postComment = {this.props.postComment}
          // {console.log(this.props.addComment)}
        />
      );
    }
    return(
      
      <div>
        <Header/>
        <TransitionGroup>
          <CSSTransition key = {this.props.location.key} classNames = 'page' timeout = {300}>
            <Switch>
              <Route exact path = '/' component = {HomePage}/>
              <Route exact path = '/home' component = {HomePage}/>
              <Route exact path = '/menu/:dishId' component = {DishWithId}/>
              <Route exact path = '/menu' component ={ () => <Menu dishes = {this.props.dishes} />}/>
              <Route exact path = '/contactus' component = { () => <Contact resetFeedbackForm = {this.resetFeedbackForm}/>}/>
              <Route exact path = '/aboutus' component = { () => <About lol = {this.props.leaders}/> }/>
              <Route exact path = '/maps' component = { ExampleSearchbox}/>
              <Route path = '*' component = { Error }/> 
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
  