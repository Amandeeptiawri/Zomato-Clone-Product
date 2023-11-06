import React from 'react';
import queryString from "query-string";
import axios from "axios";
import '../Style/Details.css';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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

class Details extends React.Component{

    constructor() {
        super();
        this.state = {
            restaurant: {},
            resId: undefined,
            menuItems: [],
            menuModalOpen: false
        }
    }

    componentDidMount() {
        const qs = queryString.parse(window.location.search);
        const { restaurant } = qs;
        
        axios({
            url: `http://localhost:5500/restaurant/${restaurant}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/JSON' }
        })

            .then(res => {
                this.setState({ restaurant: res.data.restaurants, resId: restaurant })
            })
            .catch(err => console.log(err))
    }

    handleModal = (state, value) => {
        const { resId } = this.state;

        if (state == "menuModalOpen" && value == true) {
            axios({
                url: `http://localhost:5500/menu/${resId}`,
                method: 'GET',
                headers: { 'Content-Type': 'application/JSON' }
            })
            .then(res => {
                this.setState({ menuItems: res.data.menu })
            })
            .catch(err => console.log(err))
        }
        this.setState({ [state]: value })
    }

    addItems = (index, operationType) => {
        let total = 0;
        const items = [...this.state.menuItems];
        const item = items[index];

        if (operationType == 'add'){
            item.qty += 1;      //  item.qty = item.qty + 1
        }else{
            item.qty -= 1;      //  item.qty = item.qty - 1
        }

        items[index] = item;

        items.map((x) => {
            total += x.qty * x.price;   // total = total + (x.qty * x.price)
        })
        this.setState({ menuItems: items, subtotal: total})
    }

    // Payment Part
    initPayment = (data) => {
        const options = {
            key: "rzp_test_fknJCRKVBhMdMo",      // Key value from RazorPay
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,
            handler: async(response) => {
                try {
                    const verifyUrl = "http://localhost:5500/api/payment/verify";
                    const { data } = await axios.post(verifyUrl, response);
                }catch(error) {
                    console.log(error);
                }
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    handlePayment = async () => {
        const { subtotal } = this.state;

        try{
            const orderUrl = "http://localhost:5500/api/payment/orders";
            const { data } = await axios.post(orderUrl, { amount: subtotal });
            console.log(data.data);
            this.initPayment(data.data);
        }catch(error) {
            console.log(error);
        }
    }

    render(){
        const { restaurant, menuModalOpen, menuItems, subtotal, galleryModal, formModal } = this.state;
        return(
            <div>
                {/* <!--Navbar--> */}
                <nav className="navbar bg-danger position-static" style={{ "top": "0", "width": "100%", "z-index": "-1" }} data-bs-theme="">
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>{/*
                        <form className="d-flex nav-form">
                            <button type="button" className="btn btn-danger">Login</button>
                            <button type="button" className="btn btn-outline-light">Create an account</button>
                        </form> */}
                    </div>
                </nav> 

                <div className='container'>

                    { /* Gallery */}
                    <div className='m-5'>
                        <img src={ restaurant.thumb } alt='No Image' width="100%" height="350" />
                        <button className='gallery_button' onClick={() => this.handleModal('galleryModal', true)}>Click to see Image Gallery</button>
                    </div>

                
                    <div className='Restaurant_Name ms-5'> {restaurant.name} </div>

                    <button className='btn btn-danger me-5 order_btn' onClick={() => this.handleModal('menuModalOpen', true)}>Place Online Order</button>

                    {/* Body Part */}
                    <div className='tabs'>
                        <div className="tab">
                            <input type="radio" id='tab-1' name='tab_group' checked />
                            <label className='px-4 fw-bold' for="tab-1">Overview</label>
                            
                            <div className='content'>
                                <div className='fw-bolder fs-5 mb-4'> About this place </div>
                                
                                <div className='fw-bold mb-1'>Cuisine</div>
                                <div>Bakery, Fast-food</div>

                                <div className='fw-bold mt-4 mb-1'>Average Cost</div>
                                <div>₹700 for two people (approx.)</div>
                            </div>

                        </div>

                        <div className="tab ms-4">
                            <input type="radio" id='tab-2' name='tab_group' />
                            <label className='px-4 fw-bold' for="tab-2">Contact</label>

                            <div className='content'>

                                <div>Phone Number</div>
                                <div className='text-danger mt-1 mb-4'>+91 114004566</div>

                                <div className='fw-bolder mb-1'>The Big Chill Cakery</div>
                                <div>Shop 1, Plot D, Samruddhi Complex, Chincholi, Mumbai-400002, Maharashtra</div>
                            </div>
                        </div>
                    </div>


                </div>

                { /* Menu Modal Part */ }
                <Modal
                    isOpen={menuModalOpen}
                    style={customStyles}
                >

                    <div onClick={() => this.handleModal('menuModalOpen', false)} className='bi bi-x-lg me-3 modal_cross'></div>
                    <h2 className='fw-bolder ms-3 mt-3'>{restaurant.name}</h2>
                    
                    <div>
                        {menuItems.map((item, index) => {
                            return(
                                <div className='container overflow-auto mt-4'>
                                    <div className='d-inline-block col-9'>
                                        <span className='fw-bold ms-1'>{item.name}</span><br />
                                        <span className='ms-1'>₹{item.price}</span><br />
                                        <p className='ms-1 modal_subtitle'>{item.description}</p>
                                    </div>
                                    <div className='d-inline-block col-3'>
                                        <img src={`./img/${item.image}`} className='me-3 modal_image' />
                                        { item.qty == 0 ? 
                                            <div>
                                                <button className='btn btn-light text-success shadow-sm bg-white rounded add' onClick={() => this.addItems(index, 'add')}>Add</button>
                                            </div> : <div className='qty_set btn-group' role="group">
                                                <button className='btn btn-light text-success shadow-sm bg-white' onClick={() => this.addItems(index, 'substract')}> - </button>
                                                <span className='quantity text-success shadow-sm bg-white qty'>{ item.qty }</span>
                                                <button className='btn btn-light text-success shadow-sm bg-white' onClick={() => this.addItems(index, 'add')}> + </button>
                                            </div> }
                                    </div>

                                    <hr />
                                </div>
                            );
                        })}
                        
                    </div>
                    <div className='price_box' style={{ backgroundColor: "#F5F8FF"}}>
                            <div className='d-inline-block col-9'>
                                {
                                    subtotal ?
                                    <h3 className="item-total fw-bolder">SubTotal : ₹{subtotal}  </h3> :
                                    <h3 className="item-total fw-bolder">SubTotal :</h3>
                                }
                                
                            </div>
                            
                            <div className='d-inline-block col-3'>
                                { subtotal == undefined ? (
                                    <button className="btn btn-danger order-button pay" disabled > Pay Now</button>
                                ):(
                                    <button className="btn btn-danger order-button pay"onClick={() => {
                                        this.handleModal('menuModalOpen', false);
                                        this.handleModal('formModal', true);
                                    }}> Pay Now</button>
                                )}
                                
                            </div>
                            
                    </div>
                    
                </Modal>

                { /* Gallery Modal Part */ }
                <Modal
                    isOpen={galleryModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('galleryModal', false)} className='bi bi-x-lg me-3 modal_cross'></div>

                    <Carousel showThumbs={false} showStatus={false}>
                        <div>
                            <img src={restaurant.thumb} className="bannerImg" />
                        </div>
                    </Carousel>
                        
                </Modal>

                {/* Customer Details Modal Part */}
                <Modal
                    isOpen={formModal}
                    style={customStyles}
                >
                    
                    
                    <div className='container' style={{ width: "35em" }}>
                        <div onClick={() => this.handleModal('formModal', false)} className='bi bi-x-lg me-3 modal_cross'></div>
                        <h2>{restaurant.name}</h2>
                        <form>
                            <div class="form-group mt-4">
                                <label className='mb-2' for="name">Name</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter your name" style={{borderRadius: '0px'}} />
                            </div>
                        
                            <div class="form-group mt-4">
                                <label className='mb-2' for="mobile">Mobile Number</label>
                                <input type="tel" class="form-control" id="mobile" placeholder="Enter mobile number" style={{borderRadius: '0px'}} />
                            </div>

                            <div class="form-group mt-4">
                                <label className='mb-2' for="address">Address</label>
                                <textarea class="form-control" id="address" rows="3" placeholder="Enter your address" style={{borderRadius: '0px'}}></textarea>
                            </div>
                        </form> 
                        
                        <div className='next_box' style={{ backgroundColor: "#F5F8FF"}}>
                            <button className="btn btn-danger" style={{ float: 'right', marginTop: '20px' }} onClick={this.handlePayment}>Proceed</button>
                        </div>
                        
                    </div>
                         
                </Modal>


            </div>
        )
    }

}

export default Details;