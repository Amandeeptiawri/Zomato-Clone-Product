import React from 'react';
import '../Style/Home.css';
import navHook from "./nav";

class QuickSearchItems extends React.Component{

    navigateFilterPage = (mealName) => {
        this.props.navigate(`/filter?type=${mealName}`);
    }

    render(){
        const { data } = this.props;

        return(
            <div>
                
                {/* <!--First Line--> */}
                <div className="d-flex flex-wrap">

                    { data.map((meal, index) => {
                        
                        return(
                            <div key={index} onClick={() => this.navigateFilterPage(meal.name)}>
                                <div className="d-flex box mt-4" style={{ border: '1px solid greenyellow' }}>
                                    <div className="l-box">
                                        <img src={`./img/${ meal.image }`} className="img-fluid img-qs" />
                                    </div>
                                    <div className="r-box">
                                        <h4 className="card-title">{ meal.name }</h4>
                                        <p className="card-content">{ meal.content }</p>
                                    </div>
                                </div>
                            </div>
                        )

                    }) }

                    
                        
                        
                </div>
            </div>
        )
    }

}

export default navHook(QuickSearchItems);