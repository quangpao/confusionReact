import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponents';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';

import { Route, Routes, useParams } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes : DISHES,
            selectedDish : null
        }
    }

    onDishSelect(dishId) {
        this.setState({selectedDish : dishId});
    }

    render() {

        const HomePage = () => {
            return (
                <Home />
            )
        }

        return (
            
            <div>
                
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route exact path='/menu' element={<Menu dishes={this.state.dishes} />} />
                </Routes>
                {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
                {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
                <Footer />
            </div>
        )
    }
}

export default Main;