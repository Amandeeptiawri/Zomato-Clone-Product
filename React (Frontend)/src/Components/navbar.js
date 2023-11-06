import React, { useState } from 'react';
import '../Style/Filter.css';
import Modal from 'react-modal';
import axios from "axios";

{/* Custom Styles for Modal */}
const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.9)"
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
    },
};

class Navbar extends React.Component{

    constructor() {
        super();

        this.state = {
            loginModal : false,
            registrationModal : false,
            email: undefined, 
            password: undefined, 
            name: undefined,
            users: undefined
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value })
    }

    google = () => {
        window.open("http://localhost:5500/auth/google", "_self");
    };

    logout = () => {
        window.open("http://localhost:5500/auth/logout", "_self");
    };

    // Insert to Name
    setName = (i) => {
        this.setState({ name: i.target.value });
    }

    // Insert to Mail
    setMail = (i) => {
        this.setState({ email: i.target.value });
    }

    // Insert to Password
    setPassword = (i) => {
        this.setState({ password: i.target.value });
    }

    // Registration details
    registration = () => {
        const { email, password, name } = this.state;

        const regObj = {
            email: email, 
            password: password, 
            name: name
        }

        axios({
            url: 'http://localhost:5500/sighnup',
            method: 'POST',
            headers: { 'Content-Type': 'application/JSON' },
            data: regObj
        })
            .then(res => {
            this.setState({ users: res.data.details._id })
            })
            .catch(err => console.log(err))
    }

    render(){
        const { loginModal, registrationModal, users } = this.state;
        const { user } = this.props;
        return(
            <div>
                {/* <!--Navbar--> 
                <nav className="navbar">*/}
                    <div className="container">
                        {console.log(users)}
                        <div className="position-absolute float-end" style={{ marginLeft: "50em" }}>
                            { !user ? (
                                <form className="d-flex mt-3">
                                    <button type="button" className="btn btn-link text-light" onClick={() => {
                                            this.handleModal('loginModal', true);}} style={{ textDecoration: "none" }}>Login</button>
                                    <button type="button" className="btn btn-outline-light" onClick={() => {
                                            this.handleModal('registrationModal', true);}}>Create an account</button>
                                </form>
                            ) : (
                                <form className="d-flex mt-2">
                                    
                                    <img className='img-fluid img-thumbnail circle' src={user.photos[0].value} />
                                    <p className='text-light fw-3 fs-5 mx-3 pt-2'>{user.displayName}</p>
                                    <button type="button" className="btn btn-outline-light px-3" onClick={this.logout}>Logout</button>
                                    
                                </form>
                            )}
                        </div>                       
                    </div>{/*
                </nav>*/}
                
                {/* Login Page */}
                <Modal
                    isOpen={loginModal}
                    style={customStyles}
                >   
                    <div onClick={() => this.handleModal('loginModal', false)} className='bi bi-x-lg me-3 modal_cross'></div>
                    <h2 className='fw-bolder ms-3 mt-3'> Login Page </h2>
                    
                    <div>
                        <img src='https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png' className='logo_google' />
                        <button type='button' className='btn btn-outline-primary btn-lg ps-5 m-5' onClick={this.google}>Login with Google</button>
                    </div>          
                </Modal>

                {/* Registration Page */}
                <Modal
                    isOpen={registrationModal}
                    style={customStyles}
                >   
                    <div onClick={() => this.handleModal('loginModal', false)} className='bi bi-x-lg me-3 modal_cross'></div>
                    <h2 className='fw-bolder ms-3 mt-3'> Registration Page </h2>
                    
                    <div style={{"width": "28em"}} className='px-3'>

                        <form  onSubmit={this.registration}>

                            <div class="form-group mt-4">
                                <label className='mb-2' for="name">Name</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter your name" onChange={this.setName} value={this.state.name} style={{borderRadius: '0px'}} />
                            </div>
                        
                            <div class="form-group mt-4">
                                <label className='mb-2' for="email">Email Id</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter Email Id" onChange={this.setMail} value={this.state.email} style={{borderRadius: '0px'}} />
                            </div>

                            <div class="form-group mt-4">
                                <label className='mb-2' for="password">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Enter Password" onChange={this.setPassword} value={this.state.password} style={{borderRadius: '0px'}} />
                            </div>

                            <div className='next_box' style={{ backgroundColor: "#F5F8FF"}}>
                                <button type='submit' value='submit' className="btn btn-danger" style={{ float: 'right', marginTop: '20px' }} > Sighn Up </button>
                            </div>

                        </form> 
                        
                    </div>          
                </Modal>
            </div>
        )
    }
}

export default Navbar;