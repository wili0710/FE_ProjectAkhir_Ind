import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { addparcel, manageparcel, deployparcel } from './parcels';
import { connect } from 'react-redux';
import { loadCategories } from '../../redux/Actions';
import  HeaderAdmin  from '../../components/header/headerAdmin'

const mapStatetoProps = (state) => {
    return {
        Parcel:state.Parcel
    };
};

export default connect(mapStatetoProps,{loadCategories}) (class Parcel extends React.Component {
    componentDidMount() {
        this.props.loadCategories();
    };

    render() {
        // console.log(this.props.Parcel)
        return (
            <>
            <HeaderAdmin/>
            <Switch>
                <Route exact path = '/adminpanel/parcel'         component = { addparcel }    />
                <Route exact path = '/adminpanel/parcel/manage'  component = { manageparcel } />
                <Route exact path = '/adminpanel/parcel/deploy'  component = { deployparcel } />
            </Switch>
            </>
        );
    };
});