const INITIAL_STATE = {
    transaksi: [],
    transaksidetailsatuan: [],
    transaksiparcel: [],
    transaksidetailparcel: [],
    belumDibayar:[],
    menungguKonfirmasi:[],
    pesananDiproses:[],
    pesananDikirim:[],
    pesananSelesai:[],
    menungguKomentar:[],
    isLoading: false
};

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case 'LOADTRANSAKSILIST'     :
            return {...state,...action.payload,isLoading:false};
        case 'LOADINGTRANSAKSILIST'  :
            return {...state,isLoading:true};
        case 'FILTERTRANSAKSI':
            return {...state,...action.payload}
        default         :
            return state;
    };
};