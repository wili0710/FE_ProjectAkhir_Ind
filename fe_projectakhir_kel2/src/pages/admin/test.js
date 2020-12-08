var arr=[
    {
        parcelid:1,
        qty:2
    },
    {
        parcelid:2,
        qty:1
    },
    {parcelid:3,
    qty:1
}
]

var a = arr.map((Val)=>Val.parcelid)
var b =arr.map((val)=>val.qty)

console.log(a)
console.log(b)

var parcelid2 = 1;
var findindex = arr
var find= findindex.findIndex((val)=>{
    return val.parcelid == parcelid2
})
if(find<0){
    findindex.push({parcelid:4,qty:1})
}else{
    if( findindex[find].qty-1 == 0){
        findindex.splice(find,1)
    }else {
        findindex[find]={...findindex[find],qty:findindex[find].qty-1}
    }
}
console.log(findindex)
console.log(find)




