import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import moment from 'moment'

import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({ comments, postComment, dishId }) {
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
        <div>
            <h4>Comments</h4>

            <ul className='list-unstyled'>
                {commentList}
            </ul>
            
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
    );
}

const DishDetail = (props) => {
    console.log("chekc props>>>", props)

    if (props.isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    } else if (props.dish != null) {
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
                        {<RenderDish dish={props.dish} />}
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        {<RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId = {props.dish.id}
                        />}
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