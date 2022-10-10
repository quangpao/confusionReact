import React, { Component} from 'react'
import { Card , CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'
import moment from 'moment'

class DishDetail extends Component {
    constructor(props) {
        super(props)
    }

    renderDish(dish) {
            return (
                <Card> 
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
    }

    renderComments(dish) {
        let comments = dish.comments.map(value => (
            <li key={value.id}>
                <p>{value.comment}</p>
                <p>-- {value.author}, {moment(value.date).format("MMM DD, YYYY")}</p>
            </li>
        )) 
        return (
            <ul className='list-unstyled'>
                {comments}
            </ul>
        );
    }

    render() {
        if (this.props.dish != null) {
            return (
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <h4>Comments</h4>
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
        
    }
}

export default DishDetail;