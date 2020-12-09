import React from 'react';
import './home.scss'
import { 
    debounce,
    draggableCard
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
        draggableCard(".cardBx","left",2);
        this.setState({listPackage:packages});
    };

    checkLetter() {
        return packages.title.toLowerCase()  
    }

    onSearchInputChange(e) {
        //* temporary code *// 
        let newArr = [];
        for (let i = 0; i < packages.length; i++) {
            if(packages[i].title.toLowerCase().includes(e.target.value)) {
                newArr.push(packages[i])
            };
        };
        this.setState({filteredPackage:newArr})
    };

    componentDidUpdate() {
        // console.log(this.state.listPackage);
        // console.log(this.state.filteredPackage);
    };

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
                <section className="packages">
                    <div className="bg">
                {
                    this.state.filteredPackage.length?
                    packageCarousel(this.state.filteredPackage)
                    :
                    packageCarousel(this.state.listPackage)
                }
                    </div>
                </section>
                <section className="products">
                    <div className="content">
                        <p>
                            We also provide you with items you need to show the closest one for you your love.
                            Single product to help you give them your best cook or giving them things their like to 
                            let them know that you always be there for theme. 
                            <br/> 
                            Don't worry all you need to do is choose and wait for them to be arrived in front of your house!
                        </p>
                        <div className="productBx">
                            <div className="leftBx">
                                Select Category: 
                                <label>
                                    Syrup
                                    <input type="checkbox" name=""/>
                                </label>
                                <label>
                                    Snack
                                    <input type="checkbox" name=""/>
                                </label>
                                <label>
                                    Chocolate
                                    <input type="checkbox" name=""/>
                                </label>
                                <label>
                                    Breads
                                    <input type="checkbox" name=""/>
                                </label>
                            </div>
                            <div className="rightBx">
                                <div className="border">
                                    <div className="search">
                                        <div className="cat">
                                            Sirup
                                        </div>
                                        <input type="text" name="search" placeholder="insert product's name you want to search"/>
                                    </div>
                                    <div className="list">
                                        <div className="cardlist">
                                            <div className="card">
                                                a
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <div className="search">
                                        <div className="cat">
                                            Snack
                                        </div>
                                        <input type="text" name="search" placeholder="insert product's name you want to search"/>
                                    </div>
                                    <div className="list">
                                        <div className="cardlist">
                                            <div className="card">
                                                a
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <div className="search">
                                        <div className="cat">
                                            Chocolate
                                        </div>
                                        <input type="text" name="search" placeholder="insert product's name you want to search"/>
                                    </div>
                                    <div className="list">
                                        <div className="cardlist">
                                            <div className="card">
                                                a
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <div className="search">
                                        <div className="cat">
                                            Breads
                                        </div>
                                        <input type="text" name="search" placeholder="insert product's name you want to search"/>
                                    </div>
                                    <div className="list">
                                        <div className="cardlist">
                                            <div className="card">
                                                a
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    };
};
 
export default Home;