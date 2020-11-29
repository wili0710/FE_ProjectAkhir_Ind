import React from 'react';
import './home.css'
import { Header } from '../../components';
import { 
    icon,
    illustration_1
} from '../../assets'


class Home extends React.Component {
    state = {  }
    render() { 
        return ( 
            <>
                <Header/> 
                <section className="banner">
                    <div className="content">
                        <div className="upperContent">
                            <div className="textBx">
                                <div className="imgBx">
                                    <img className="colored-lt-primary"
                                        src={icon}
                                    />
                                </div>
                                <h2>
                                    <span className="primary">DISTANCE </span>
                                    can no longer be the obstacle between you & the one that you 
                                    <span className="tertiary"> CARE.</span>
                                </h2>
                                <h5>
                                    We,<span className="primary"> hearttoheart</span>, are here to help you let them know that you care by giving them your personal <span className="tertiary"> hampers </span> for every occasions out there.
                                </h5>
                            </div>
                            <div className="illustrationBx">
                                <img src={illustration_1}/>
                            </div>
                            
                        </div>
                        <div className="lowerContent">
                            <input type="text" placeholder="Search Package" value=""/> 
                        </div>
                    </div>
                </section>
            </>
         );
    };
};
 
export default Home;