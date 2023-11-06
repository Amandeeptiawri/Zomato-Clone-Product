import React from 'react';
import '../Style/Home.css';

import QuickSearchItems from './QuickSearchItems';

class QuickSearch extends React.Component{

    render(){
        const { mealtypeData } = this.props;

        return(
            <div>

                {/* <!--Quick Searches Part (lower)--> */}

                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div>
                            <h3 className="heading">Quick Searches</h3>
                            <p className="subheading">Discover restaurants by type of meal</p>
                        </div>
                    </div>
                        
                        <QuickSearchItems data = { mealtypeData } />
                    
                </div>

            </div>
        )
    }

}

export default QuickSearch;