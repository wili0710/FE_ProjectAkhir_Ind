const INITIAL_STATE = {
    transaksi: [],
    transaksidetailsatuan: [],
    transaksiparcel: [],
    transaksidetailparcel: [],
    isLoading: false
};

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'LOADTRANSAKSILIST'     :
            return {...state,...action.payload,isLoading:false};
        case 'LOADINGTRANSAKSILIST'  :
            return {...state,isLoading:true};
        default         :
            return state;
    };
};