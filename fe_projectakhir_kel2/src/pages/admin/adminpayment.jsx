import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import { API_URL_SQL } from '../../helpers/apiUrl';
import moment from 'moment';
import numeral from 'numeral'
import ReactImageMagnify from 'react-image-magnify';
import HeaderAdmin from '../../components/header/headerAdmin';
import {FaUserCog,FaMoneyCheckAlt} from 'react-icons/fa'
import './user.css'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  subcontainer:{
      height:200
  }
});

const AdminPayment=()=>{
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [paymentInWaiting,setPaymentInWaiting]=useState([])

  useEffect(()=>{
    Axios.get(`${API_URL_SQL}/payment/getpaymentwaiting`)
    .then((res)=>{
        console.log(res)
        setPaymentInWaiting(res.data)
    })
  },[])

  const onConfirmClick=(payment_id,transaksi_id)=>{
    Axios.post(`${API_URL_SQL}/payment/confirmpayment`,{payment_id:payment_id,transaksi_id:transaksi_id})
    .then((res)=>{
        console.log(res)
        setPaymentInWaiting(res.data)
    })
  }

  const renderTable=()=>{
    return paymentInWaiting.map((val,index)=>{
      return(
        <TableRow key={val.id} className={classes.subcontainer}>
            <TableCell style={{width:130}} align="center">{val.payment_id}</TableCell>
            <TableCell style={{width:130}} align="center">{val.transaksi_id}</TableCell>
            <TableCell style={{width:200}}>
              <div style={{maxWidth:'200px'}}>
                <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Payment',
                            isFluidWidth: true,
                            src: val.image
                        },
                        largeImage: {
                            src: val.image,
                            width: 600,
                            height: 600
                        },
                        enlargedImageContainerDimensions:{
                            width:"300%",
                            height:"130%"
                        }
                    }} />
                {/* <img width='100%' height='100%' src={val.image} alt={val.namatrip}/> */}
              </div>
            </TableCell>
            <TableCell style={{width:170}} align="center">{moment(val.tanggaltransaksi).format('Do MMMM YYYY')}</TableCell>
            <TableCell style={{width:170}} align="center">{moment(val.tglexp).format('Do MMMM YYYY')}</TableCell>
            <TableCell style={{width:160}} align="center">{numeral(val.totaltransaksi).format('0,0.0')}</TableCell>
            <TableCell style={{width:110}} align="center">
              <button onClick={()=>onConfirmClick(val.payment_id,val.transaksi_id)}>Confirm</button>
            </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <>
      <div className="user-container">
      <HeaderAdmin/>
          <div className="user-right">
              <div className="header-user">
                  <div className="icon-group">
                      <FaMoneyCheckAlt className="icon-size" color="black"/>
                      <p style={{fontWeight:'600'}}>Payment</p>
                  </div>
              </div>
              <div className="container-data">

              
                {/* <Paper className={classes.root}> */}
                    <TableContainer>
                        <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Payment Id</TableCell>
                                <TableCell align="center">Transaksi Id</TableCell>
                                <TableCell align="center">Bukti Transfer</TableCell>
                                <TableCell align="center">Tgl Transaksi</TableCell>
                                <TableCell align="center">Tgl Expired</TableCell>
                                <TableCell align="center">Total Harus Dibayar</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderTable()}
                        </TableBody>
                        </Table>
                    </TableContainer>
                {/* </Paper> */}
              </div>
          </div>
      </div>
      </>
    

  );
}
 
export default AdminPayment;