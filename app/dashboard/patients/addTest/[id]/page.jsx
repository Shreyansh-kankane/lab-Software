'use client'
import React,{useEffect, useState} from 'react'
import { useRef } from 'react';
import styles from "@/app/ui/dashboard/addTest/addTest.module.css"
import { createInvoice } from '@/lib/actions';
import { useSession } from 'next-auth/react';

function page({params}) {

  const {data:session} = useSession();
  const inputRef = useRef();

  const [tests,setTests] = useState([]);
  const [selectedTests,setSelectedTests] = useState([]);
  const [searchTest,setSearchTest] = useState("");
  const [discount,setDiscount] = useState(0); 
  const [totalAmount,setTotalAmount] = useState(0);

  const id = params.id;

  useEffect(()=>{
    async function getAllTests(){
      const res = await fetch(`/api/tests`,{
        method: 'GET'
      })
      const data = await res.json();
      setTests(data.tests);
    }
    getAllTests();
  },[])

  const handleChange = (e) => {
    setSearchTest(e.target.value);
  }

  const handleAddTest = () => {
    for(let i=0;i<tests.length;i++){
      if(tests[i].Name == searchTest || tests[i].TestCode == searchTest ){
        if(selectedTests.indexOf(tests[i]) == -1){
          setSelectedTests([...selectedTests,tests[i]]);
          setTotalAmount(totalAmount + tests[i].Price);
        }
      }
    }
    setSearchTest({})
    inputRef.current.value = "";
  }

  const handleDeleteTest = (id) => {
    setSelectedTests(selectedTests.filter((test)=> test._id !== id))
    setTotalAmount(totalAmount - selectedTests.find((test)=> test._id == id).Price);
  }

  const handleSubmit = async (formData)=>{
    const data = {
      Patient: id,
      Tests: selectedTests.map((test)=> test._id),
      TotalAmount: totalAmount,
      Discount: discount,
      PaymentMode: formData.get('PaymentMode'),
      PaidAmount: parseInt(formData.get('PaidAmount')) || 0,
      PaymentReference: formData.get('PaymentReference'),
      Remarks: formData.get('Remarks'),
      PrintedBy: session.user.name
    }
    await createInvoice(data);
    
  }   

  return (
    
      <div className={styles.wrapper}>

        <div className={styles.container}>

          <input list='Tests' placeholder='Test Name' className={styles.input} name='Test' onChange={handleChange} ref={inputRef} />
          <datalist id="Tests">
            {tests.map((test) => (
              <option key={test._id} value={test.Name} />
            ))}
          </datalist>

          <button className={styles.addButton}
            onClick={handleAddTest}
          > Add Test 
          </button>

          <table className={styles.table}>
              <thead>
                <tr>
                  <td>S.No</td>
                  <td>Test Code</td>
                  <td>Test Name</td>
                  <td>Price</td>
                  <td>Lab Name</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {selectedTests.map((test,index) => (
                  <tr key={test._id}>
                    <td>{index + 1}</td>
                    <td>{test.TestCode}</td>
                    <td>{test.Name}</td>
                    <td>₹ {test.Price}</td>
                    <td>{test.LabName}</td>
                    <td>
                      <div className="">
                      <button
                        onClick={()=> handleDeleteTest(test._id) 
                        }
                        className={`${styles.addButton} ${styles.delete}`}
                      >
                        Delete
                      </button>
                      </div>
                    </td>
                  </tr>
                ))}
              
                {selectedTests.length>0 && <tr>
                  <td></td>
                  <td>Total</td>
                  <td></td>
                  <td> 
                    ₹ {totalAmount}
                  </td>
                </tr>}

                {selectedTests.length>0 && <tr>
                  <td></td>
                  <td>Discount</td>
                  <td></td>
                  <td> 
                      ₹ {discount}
                  </td>
                </tr>}

                {selectedTests.length>0 && <tr>
                  <td></td>
                  <td>Net Total</td>
                  <td></td>
                  <td> 
                    ₹ {totalAmount - discount}
                  </td>
                </tr>}

              </tbody>
          </table>

        </div>

        <div className={styles.container}>

          <form action={handleSubmit}
            className={styles.formWrapper}
            >

            <h3>Payment Details</h3>
            <div className={styles.formContainer}>

              <select name="PaymentMode" id="" defaultValue={"Cash"}>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Online">Online</option>
                <option value="Cheque">Cheque</option>
              </select>

              <input type="number" name='PaidAmount' placeholder='Payment Amount in INR'/>
              <input type="text" name='PaymentReference' placeholder='Payment Reference'/>

            </div>
                
            <h4>Discount if any </h4>

            <div className={styles.formContainer}>
              <input type="number" name='Discount' placeholder='Discount Amount in INR' min={0} onChange={(e)=> e.target.value<=0 ? setDiscount(0) : setDiscount(e.target.value) }/>
              <input type="text" name='Remarks' placeholder='Remarks'/>
            </div>

            <button className={`${styles.createButton}`}>
              Create Invoice
            </button>
          </form> 

        </div>
      </div>
  )
}

export default page