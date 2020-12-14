const INITIAL_STATE = {
    Parcel              : [],
    Product             : [],
    Parcel_Category     : [],
    Product_Category    : [],
    init_Parcel         : [],
    ready_Parcel        : [],
    msg_Error           : "",
    isLoading           : false
};

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'LOAD'     :
            return {...state,...action.payload,isLoading:false};
        case 'LOADING'  :
            return {...state,isLoading:true};
        case 'Error'    :
            return {...state,error:action.payload,isLoading:false};
        default         :
            return state;
    };
};