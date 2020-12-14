getLimitProduct=async()=>{
    try{
        const getLimit = await Axios.get(`${API_URL_SQL}/product/getDataParcelById/${this.props.match.params.id}`)
        const arrlimit = getLimit.data.map((val,index)=>{
            return {
                categoryproduct_id:val.categoryproduct_id,
                category:val.namaProduct,
                limitqty:val.qty
            }
        })
        this.setState({limitProduct:arrlimit})
    }catch(error){
        console.log(error)
    }
}
