import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponents';
import DishDetail from './DishdetailComponent';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent'

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import { Route, Routes, useParams, withRouter, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const withRouterMe = (Component) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes : DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        }
    }
    

    onDishSelect(dishId) {
        this.setState({selectedDish : dishId});
    }

    render() {

        const HomePage = () => {
            return (
                <Home 
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        }

        const DishWithId = () => {
            const params = useParams();
            return (
                <DishDetail 
                dish={this.props.dishes.filter((dish) => dish.id === parseInt(params.dishId,10))[0]}
                comment={this.props.comments.filter((comment) => comment.dishId === parseInt(params.dishId, 10))}

                />
            )
        }

        return (
            
            <div>
                
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route exact path='/menu' element={<Menu dishes={this.props.dishes} />} />
                    {/* Ex30 from here */}
                    <Route exact path='/contactus' element={<Contact />} />
                    <Route path='/menu/:dishId' element={<DishWithId />} />
                    <Route exact path='/aboutus' element={<About leaders={this.props.leaders} />} />
                </Routes>
                {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
                {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
                <Footer />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Main);