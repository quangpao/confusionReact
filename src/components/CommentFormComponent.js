import React from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCommentModalOpen: false
        }
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
    }

    toggleCommentModal() {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleCommentModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <React.Fragment>
                <Button outline color="secondary" onClick={this.toggleCommentModal}>
                    <i className='fa fa-solid fa-pencil'></i> Submit Comment
                </Button>
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row>
                                <Label htmlFor='rating' md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select
                                        model='.rating'
                                        className='form-control'
                                        name='rating'
                                        id='rating'
                                        // validators={{
                                        //     required
                                        //     }}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row>
                                <Label htmlFor='author' md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text
                                        model='.author'
                                        className='form-control'
                                        name='author'
                                        id='author'
                                        placeholder='Enter your name'
                                        validators={{
                                            required, maxLength: maxLength(15), minLength: minLength(3)
                                        }}
                                    />
                                    <Errors 
                                        className='text-danger'
                                        model='.author'
                                        show='touched'
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Label htmlFor='comment' md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea
                                        model='.comment'
                                        className='form-control'
                                        name='comment'
                                        id='comment'
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{ size: 12}}>
                                    <Button type='submit' color='primary'>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }

}

export default CommentForm;