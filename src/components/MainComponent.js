import React from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from "./AboutusComponent";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { HashRouter,Switch, Route, withRouter} from 'react-router-dom';
import DishDetail from './DishDetailComponent';
import ExampleSearchbox from './GoogleMapApiComponent';
import Error from './ErrorPageComponent';
import {connect} from 'react-redux';
import {addComment} from '../redux/ActionCreators';

const mapStateToProps = (state) =>{
  return({
    dishes : state.dishes,
    comments : state.comments,
    leaders : state.leaders,
    promotions : state.promotions
  })
}

const mapDispatchToProps = (dispatch) =>({
  addComment : (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment))
})

class Main extends React.Component {


  render() {
    const HomePage = () => {

      return(
        <Home dish = {this.props.dishes.filter((dish) => dish.featured)[0]}
          promotions = {this.props.promotions.filter((promotions) => promotions.featured)[0]}
          leaders = {this.props.leaders.filter((leaders) => leaders.featured)[0]}
        />
      );
    }

    const DishWithId = ({match}) =>{
      return( 
        <DishDetail dish = {this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          comments = {this.props.comments.filter((comment) => comment.dishId ===parseInt(match.params.dishId,10))}
          addComment = {this.props.addComment}
          // {console.log(this.props.addComment)}
        />
      );
    }
    return(
      
      <div>
        <Header/>
        <Switch>
          <Route exact path = '/' component = {HomePage}/>
          <Route exact path = '/home' component = {HomePage}/>
          <Route exact path = '/menu/:dishId' component = {DishWithId}/>
          <Route exact path = '/menu' component ={ () => <Menu dishes = {this.props.dishes} />}/>
          <Route exact path = '/contactus' component = {Contact}/>
          <Route exact path = '/aboutus' component = { () => <About lol = {this.props.leaders}/> }/>
          <Route exact path = '/maps' component = { ExampleSearchbox}/>
          {/* <Route exact path = '/comments/test' component = {SubmitComment}/> */}
          <Route path = '*' component = { Error }/> 
        </Switch>
        <Footer/>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
  