import React from 'react';
import './home.css'
import { 
    debounce,
    scrollCardToggle
} from '../../helpers'
import { 
    icon,
    illustration_1
} from '../../assets'
import { 
    Header,
    packageCarousel
} from '../../components';

/* data dummy */
const packages = [
    {
        id: 1,
        title: 'Object',
        copy: 'asdasdas'
    },
    {
        id: 2,
        title: 'Object',
        copy: 'asdasdas'
    },
    {
        id: 3,
        title: 'Package',
        copy: 'asdasdas '
    },
    {
        id: 4,
        title: 'Object',
        copy: 'asdasdas',
    },
    {
        id: 5,
        title: 'Object',
        copy: 'asdasdas',
    },
    {
        id: 6,
        title: 'Package',
        copy: 'asdasdas',
    },
    {
        id: 7,
        title: 'Package',
        copy: 'asdasdas',
    },
    {
        id: 8,
        title: 'Package',
        copy: 'asdasdas',
    },
    {
        id: 9,
        title: 'Object',
        copy: 'asdasdas',
    }
];
/* end of data dummy */

class Home extends React.Component {
    state = {
        inputSearch:'',
        listPackage:[],
        filteredPackage:[]
    };

    

    componentDidMount() {
        scrollCardToggle();
        this.setState({listPackage:packages});
    };

    checkLetter() {
        return packages.title.toLowerCase()  
    }

    onSearchInputChange(e) {
        packages.filter((val,index) => {})
    };

    componentDidUpdate() {
        console.log(this.state.inputSearch, this.state.listPackage)
    }

    render() { 
        return ( 
            <>
                <Header/> 
                <section className="banner">
                    <div className="content">
                        <div className="upperContent">
                            <div className="textBx">
                                <div className="imgBx">
                                    <img className="colored-lt-primary" src={icon}/>
                                </div>
                                <h2>
                                    <span className="primary">DISTANCE </span>can no longer be the obstacle between you & the one that you <span className="tertiary"> CARE.</span>
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
                            <input type="text" placeholder="Search Package" onChange={debounce((e)=>this.onSearchInputChange(e), 700)}/> 
                        </div>
                    </div>   
                </section>
                {packageCarousel(this.state.listPackage)}
            </>
        );
    };
};
 
export default Home;