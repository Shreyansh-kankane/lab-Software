'use client'
import React, { useEffect } from 'react'
import PrintBtn from '@/components/PrintBtn';
import { useRef } from 'react';
import styles from "./invoice.module.css"
import Image from 'next/image';
import { useState } from 'react';
import { PathologyDetails} from '@/lib/constants';

function SingleInvoicePage({params}) {
  const id = params.id;
  const componentRef = useRef();

  const [data,setData] = useState({});
  const [paymentDate,setPaymentDate] = useState('');
  const [createdAtDate,setCreatedAtDate] = useState('');

  useEffect(()=>{
    async function getInvoice(){
      const res = await fetch(`/api/invoices`,{
        method: 'POST',
        body: JSON.stringify({id}),
      })
      const data = await res.json();
      console.log(data);
      setData(data);
      setPaymentDate(new Date(data.PaymentDate).toLocaleString());
      setCreatedAtDate(new Date(data.createdAt).toString());
    }
    getInvoice();
  },[id])

  return (
    <div>
      <div ref={componentRef} className={styles.wrapper}>
        {/* header */}
        <div className={styles.header}>
          <div style={{flex:1}}>
            <Image
              src={'/logo.png'}
              alt="logo"
              width={120}
              height={120}
            />
          </div>
          
          <div className={styles.title}>
            <h1>{PathologyDetails.NAME}</h1>
            <h4>Contact {PathologyDetails.CONTACT}</h4>
          </div>

          <address className={styles.pathlogyInfo}>
            <p>Address: {PathologyDetails.ADDRESS}</p>
            <p>Email: {PathologyDetails.EMAIL} </p>
          </address>
        </div>

        {/* patient details */}
        <div className={styles.patientDetailsWrapper}>

          <div className={styles.patientDetails}>
            <h3>Bill Cum Reciept</h3>
            <h3>Name: {data.Patient?.Name}</h3>
            <h3>Bill Date: {createdAtDate} </h3>
            <h3>Referal By: {'NA'}</h3>
          </div>

          <div className={styles.patientDetails}>
            <h3>Invoice Id: {data._id}</h3>
            <h3>Age: {data.Patient?.Age} years</h3>
            <h3> Gender: {data.Patient?.Gender} </h3>
            <h3>Mobile No: {data.Patient?.MobileNo || 'NA'}</h3>
          </div>
        </div>  

        <h2>Tests Registered </h2>
        {/* tests table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Test Name</th>
              <th>Test Code</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.Tests?.map((test,index) => (
              <tr key={test._id}>
                <td>{index + 1}</td>
                <td>{test.Name}</td>
                <td>{test.TestCode}</td>
                <td>1</td>
                <td>₹ {test.Price}</td>
              </tr>
            
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Discount</td>
              <td>₹ {data.Discount}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <th></th>
              <td>Total</td>
              <td>₹ {data.TotalAmount}</td>
            </tr>

          </tbody>
        </table>

        <h2>Payment Detail</h2>
        {/* payment details */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Payment Mode</th>
              <th>Payment Date</th>
              <th>Payment Reference</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>

            <tr className={styles.paymentRow}>
              <td>1</td>
              <td> {data.PaymentMode}  </td>
              <th> {paymentDate} </th>
              <td>{data.PaymentReference || 'NA'}</td>
              <td>₹ {data.PaidAmount}</td>
            </tr>

            <tr className={styles.dueAmountRow}>
              <td></td>
              <td></td>
              <th></th>
              <td>Due Amount</td>
              <td>₹ {data.DueAmount}</td>
            </tr>

          </tbody>
        </table>

        <div className={styles.footer}>
          <h4>Created On { createdAtDate } </h4>
          <h4>Created By: {data.PrintedBy}</h4>
        </div>

      </div> 

      <PrintBtn reference={componentRef} styles={styles.printBtn}/>


    </div>

  )
}

export default SingleInvoicePage