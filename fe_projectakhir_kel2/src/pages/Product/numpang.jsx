{
    this.state.buttonMakanan?
    <>
    <BiMinus onClick={()=>this.hapusDataMakanan(val.id)}/>  
    {/* <BiPlus onClick={()=>this.AddDataMakanan(val.id)}/> */}
    </>
    :
    <>
{
    
    total==this.state.dataParcelByIdMakanan.qty ?
    null:
    <>
    <BiPlus onClick={()=>this.AddDataMakanan(val.id)}/>
    </>

}
        <BiMinus onClick={()=>this.hapusDataMakanan(val.id)}/>      
    </>
}