<div className="header-dp">
{/* <h1>oioi anjing</h1> */}
<div className="logo-dp">
    {/* <Logo className="logo-dp-ins"/> */}
    <img src={Logo} alt="test" className="logo-dp-ins" />
</div>
<div className="input-content">
        <input type="text" placeholder="Search Parcel" /> 
</div>
<div className="call-number">
    <div className="div-call">
        <HiOutlinePhone className="phone-ic"/>
        <p>021 0001110</p>
    </div>
</div>  
          
<div >
<Dropdown className="big-dd">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="dd-atas">
                    Parcel
                </Dropdown.Toggle>
                <Dropdown.Menu className="dd-bawah">
                    <Zoom clear>
                        <Dropdown.Item href="#/action-1" className="dd-inside">Parcel Buah</Dropdown.Item>
                    </Zoom>
                    <Zoom clear>
                        <Dropdown.Item href="#/action-1"  className="dd-inside">Parcel Bayi</Dropdown.Item>
                    </Zoom>
                    <Zoom clear>
                        <Dropdown.Item href="#/action-1"  className="dd-inside">Parcel Natal</Dropdown.Item>
                    </Zoom>
                    <Zoom clear>
                        <Dropdown.Item href="#/action-1"  className="dd-inside">Parcel Kue Kering</Dropdown.Item>
                    </Zoom>
                    <Zoom clear>
                        <Dropdown.Item href="#/action-1"  className="dd-inside">Parcel Keramik</Dropdown.Item>
                    </Zoom>
                </Dropdown.Menu>
    </Dropdown>
</div>
</div>