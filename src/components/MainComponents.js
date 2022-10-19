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

import { Route, Routes, useParams } from 'react-router-dom';

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
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        }

        const DishWithId = () => {
            const params = useParams();
            return (
                <DishDetail 
                dish={this.state.dishes.filter((dish) => dish.id === parseInt(params.dishId,10))[0]}
                comment={this.state.comments.filter((comment) => comment.dishId === parseInt(params.dishId, 10))}

                />
            )
        }

        return (
            
            <div>
                
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route exact path='/menu' element={<Menu dishes={this.state.dishes} />} />
                    {/* Ex30 from here */}
                    <Route exact path='/contactus' element={<Contact />} />
                    <Route path='/menu/:dishId' element={<DishWithId />} />
                    <Route exact path='/aboutus' element={<About leaders={this.state.leaders} />} />
                </Routes>
                {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
                {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
                <Footer />
            </div>
        )
    }
}

export default Main;