'use client'
import React from 'react'
import PrintBtn from '@/components/PrintBtn';
import { useRef } from 'react';
import styles from "./invoice.module.css"
import Image from 'next/image';

function SingleInvoicePage({params}) {
  const id = params.id;
  const componentRef = useRef();

  return (
    <div>
      <div ref={componentRef} className={styles.wrapper}>
        {/* header */}
        <div className={styles.header}>
          <div>
            <Image
              src={'/logo.png'}
              alt="logo"
              width={140}
              height={140}
            />
          </div>
          
          <div>
            <h2 style={{fontSize:'50px'}}>MEHER PATHALOGY</h2>
            <h4>Contact 123434343, +91 123435233</h4>
          </div>

          <address>
            <p>Address: 123, XYZ Road, ABC City</p>
            <p>Phone: 1234567890</p>
            <p>Email: abc@emai;.com </p>
          </address>
        </div>

        {/* patient details */}
        <div className={styles.patientDetailsWrapper}>
          <div className={styles.patientDetails}>
            <h3>Bill Cum Reciept</h3>
            <h3>Name: Shreyansh</h3>
            <h3>Bill Date: 09-02-23</h3>
            <h3>Referal By: S.G.P.I</h3>
          </div>
          <div className={styles.patientDetails}>
            <h3>Invoice Id: dekjeor92312</h3>
            <h3>Age: 47 years</h3>
            <h3> Gender: Male </h3>
            <h3>Mobile No: 9123293-232</h3>
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
            <tr>
              <td>1</td>
              <td>Test 1</td>
              <th>123</th>
              <td>2</td>
              <td>₹ 100</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Test 2</td>
              <th>456</th>
              <td>1</td>
              <td>₹ 200</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <th></th>
              <td>Total</td>
              <td>₹ 200</td>
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
              <td> Online  </td>
              <th>02-02-24</th>
              <td>NA</td>
              <td>₹ 2000</td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <th></th>
              <td>Paid Amount</td>
              <td>₹ 1500</td>
            </tr>

            <tr className={styles.dueAmountRow}>
              <td></td>
              <td></td>
              <th></th>
              <td>Due Amount</td>
              <td>₹ 500</td>
            </tr>

          </tbody>
        </table>

        <div className={styles.footer}>
          <h4>Printed On 09-02-24 10.20AM </h4>
          <h4>Printed By: Dr. XYZ</h4>
        </div>

      </div> 

    </div>
  )
}

export default SingleInvoicePage