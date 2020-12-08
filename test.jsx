var makanan=[
        {
            id:1,
            category:"makanan",
            qty:1
        },
        {
            id:2,
            category:"minuman",
            qty:2
        }
]
var limit=[
    {
        category:"makanan",
        limit:1
    },
    {
        category:"minuman",
        limit:3
    }
]
    
const adadeh=(id,category,operator)=>{
    
    let adaproduct=makanan.findIndex((finding)=>{
      return finding.id==id  
    })

    if(adaproduct!==-1){
        if(operator=="plus"){
            let productcategory=makanan.filter((filtering)=>{
                return filtering.category==category
            })
            let qty=0
            let qtypercategory=productcategory.map((val,index)=>{
                return qty+=val.qty
            })
            let findcategory=limit.findIndex((finding)=>{
                return finding.category==category
            })
            console.log(productcategory)
            console.log(qtypercategory)
            console.log(limit[findcategory])
            if(qty>limit[findcategory].limit){
                makanan[adaproduct].qty=makanan[adaproduct].qty+1
            }else{
                console.log("Limit category ini terpenuhi")
            }
        }else{
            makanan[adaproduct].qty=makanan[adaproduct].qty-1
            if(makanan[adaproduct].qty<=0){
                
            }
        }
    }else{
        // Input push
    }
    console.log(makanan)
}

console.log(adadeh(1,"makanan","minus"))
