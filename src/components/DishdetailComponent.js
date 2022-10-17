import React, { Component   } from 'react'
import { Card , CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import moment from 'moment'

import { Link } from 'react-router-dom';

function RenderDish({dish}) {
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

function RenderComments({comments}) {
    console.log("comment>>>", comments)
    if (comments == null) {
        return (
            <div></div>
        )
    }
    const commentList = comments.map((value) => (
        <li key={value.id}>
            <p>{value.comment}</p>
            <p>-- {value.author}, {moment(value.date).format("MMM DD, YYYY")}</p>
        </li>
    )) 
    return (
        <ul className='list-unstyled'>
            {commentList}
        </ul>
    );
}

const DishDetail = (props) => {
    console.log("chekc props>>>" ,props)
    if (props.dish != null) {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        {<RenderDish dish = {props.dish} />}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <h4>Comments</h4>
                        {<RenderComments comments = {props.comment}/>}
                    </div>
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
}
// class DishDetail extends Component {
//     constructor(props) {
//         super(props)
//     }

//     renderDish(dish) {
//             return (
//                 <Card> 
//                     <CardImg top src={dish.image} alt={dish.name} />
//                     <CardBody>
//                         <CardTitle>{dish.name}</CardTitle>
//                         <CardText>{dish.description}</CardText>
//                     </CardBody>
//                 </Card>
//             )
//     }

//     renderComments(dish) {
//         let comments = dish.comments.map(value => (
//             <li key={value.id}>
//                 <p>{value.comment}</p>
//                 <p>-- {value.author}, {moment(value.date).format("MMM DD, YYYY")}</p>
//             </li>
//         )) 
//         return (
//             <ul className='list-unstyled'>
//                 {comments}
//             </ul>
//         );
//     }

//     render() {
//         if (this.props.dish != null) {
//             return (
//                 <div className='container'>
//                     <div className='row'>
//                         <div className='col-12 col-md-5 m-1'>
//                             {this.renderDish(this.props.dish)}
//                         </div>
//                         <div className='col-12 col-md-5 m-1'>
//                             <h4>Comments</h4>
//                             {this.renderComments(this.props.dish)}
//                         </div>
//                     </div>
//                 </div>
//             )
//         } else {
//             return (<div></div>)
//         }
        
//     }
// }

export default DishDetail;