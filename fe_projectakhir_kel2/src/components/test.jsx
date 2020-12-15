import React from "react";

const parcel = [
    {
        category:1, qty: 2 
    },
    {
        category:2, qty: 2 
    },
    {
        category:3, qty: 1 
    }
]

export default class Test extends React.Component {
  state = {
    item: [{ category: "", qty: "" }],
    isLoading : true,
    parcel : []
  };

  componentDidMount() {
    console.log(this.state)
    this.setState({parcel})
  }

  componentDidUpdate(prevState) {
      console.log(this.state)
  }



  // to add more input from item.map
  addItem = e => {
      this.setState((prevState)=>({
          item:[...prevState.item,{category:"",qty:""}]
      }));
      // kenapa engga this.setState(item:[...this.state.item,{category:"",qty:""}]) ?
  };

  handleChange = (e) => {
    console.log(e.target.dataset.id)
    console.log("category".includes(e.target.className))
    console.log("qty".includes(e.target.className))
    //--> if there is already the state
    if (["category", "qty"].includes(e.target.className)) {
        console.log(e.target.dataset.id, e.target.className)
        let parcel = [...this.state.parcel]
        console.log(parcel)
        console.log(parcel[e.target.dataset.id][e.target.className])
        parcel[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
        this.setState({parcel}, ()=>console.log(this.state.parcel))
    } else {
    //--> generate new state
        this.setState({[e.target.name]:e.target.value})
    }
  };

  handleSubmit = e => {e.preventDefault()}
  


  render() {
    const { parcel, isLoading } = this.state;
    return (
      <form>
        <div
          style={{
            display         : "flex",
            justifyContent  : "space-around",
            alignItems      : "center",
            width           : "100%",
            padding         : 30,
            border          : "1px dashed tomato"
          }}
        >
          <label htmlFor="parcel">parcel</label>
          <input type="text" name="parcel" id="parcel" />
          <label htmlFor="harga">harga</label>
          <input type="number" name="harga" id="harga" />
          <button>Add new item</button>
        </div>
        {/* <div
            style={{
                display         : "flex",
                justifyContent  : "space-around",
                alignItems      : "center",
                width           : "100%",
                padding         : 30,
                border          : "1px dashed tomato"
            }}
        >
        {item.map((val, index) => {
          let categoryId = `cate-${index}`;
          let qtyId = `qty-${index}`;
          return (
            <div key={index}
                 style={{
                     display         : "flex",
                     justifyContent  : "space-around",
                     alignItems      : "center",
                     width           : "100%",
                     padding         : 30,
                     border          : "1px solid gray"
                 }}
            >
              <label htmlFor={categoryId}>{`Category #${index + 1}`} </label>
              <input
                type="text"
                name={categoryId}
                id={categoryId}
                value={item[index].category}
                className="category"
              />
              <label htmlFor={categoryId}>{`Quantity #${index + 1}`} </label>
              <input
                type="number"
                name={qtyId}
                id={qtyId}
                value={item[index].qty}
                className="qty"
              />
            </div>
          );
        })}
        </div> */}
        {parcel.length!==0?
        <div
            style = {{
                display         : "flex",
                justifyContent  : "space-around",
                alignItems      : "center",
                width           : "100%",
                padding         : 30,
                border          : "1px dashed tomato"
            }}
            onChange = {this.handleChange}
            onSubmit = {this.handleSubmit}
        >
        {parcel.map((val, index) => {
          let categoryId = `cate-${index}`;
          let qtyId = `qty-${index}`;
          return (
            <div key={index}
                 style={{
                     display         : "flex",
                     justifyContent  : "space-around",
                     alignItems      : "center",
                     width           : "100%",
                     padding         : 30,
                     border          : "1px solid gray"
                 }}
            >
              <label htmlFor={categoryId}>{`Category #${index + 1}`} </label>
              <input
                type        = "text"
                name        = {categoryId}
                id          = {categoryId}
                data-id     = {index}
                value       = {parcel[index].category}
                className   = "category"
              />
              <label htmlFor={categoryId}>{`Quantity #${index + 1}`} </label>
              <input
                type        = "number"
                name        = {qtyId}
                id          = {qtyId}
                data-id     = {index}
                value       = {parcel[index].qty}
                className   = "qty"
              />
            </div>
          );
        })}
        </div>
        :
        null
        }
        <input type="submit" value="submit" />
      </form>
    );
  }
}
