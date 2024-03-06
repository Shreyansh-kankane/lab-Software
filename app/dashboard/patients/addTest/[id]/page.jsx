'use client'
import React,{useEffect, useState} from 'react'
import { useRef } from 'react';
import styles from "@/app/ui/dashboard/addTest/addTest.module.css"
function page() {

  const inputRef = useRef();
  const discountRef = useRef();
  const [tests,setTests] = useState([]);
  const [selectedTests,setSelectedTests] = useState([]);
  const [searchTest,setSearchTest] = useState("");
  const [discount,setDiscount] = useState(0); 
  // const [total,setTotal] = useState(0);
  // const [netAmount,setNetAmount] = useState(0);

  useEffect(()=>{
    async function getAllTests(){
      const res = await fetch('/api/tests',{
        method: 'GET'
      })
      const data = await res.json();
      setTests(data.tests);
    }
    getAllTests();
  },[])

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchTest(e.target.value);
  }

  const handleAddTest = () => {
    for(let i=0;i<tests.length;i++){
      if(tests[i].Name == searchTest || tests[i].TestCode == searchTest ){
        if(selectedTests.indexOf(tests[i]) == -1){
          setSelectedTests([...selectedTests,tests[i]]);
          
        }
      }
    }
    // console.log(selectedTests);
    setSearchTest({})
    inputRef.current.value = "";
  }

  const handleDeleteTest = (id) => {
    setSelectedTests(selectedTests.filter((test)=> test._id !== id))
  }

  const handleSubmit = (e)=>{
    
  }   

  return (
    
      <div className={styles.wrapper}>

        <div className={styles.container}>
          <input list='Tests' placeholder='Test Name' className={styles.input} name='Test' onChange={handleChange} ref={inputRef} />
          <datalist id="Tests">
              {tests && tests.map((test) => (
                  <option value={test.Name} key={test._id} />
              ))}
          </datalist>
          <button className={styles.addButton}
            onClick={handleAddTest}
          > Add Test 
          </button>

          <div>
            <table className={styles.table}>
                <thead>
                  <tr>
                    <td>Test Code</td>
                    <td>Test Name</td>
                    <td>Price</td>
                    <td>Lab Name</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {selectedTests.map((test) => (
                    <tr key={test.id}>
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

                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td> 
                      ₹ {selectedTests.reduce((acc,curr) => acc + curr.Price,0)}
                    </td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td></td>
                    <td> 
                       ₹ {discount}
                    </td>
                  </tr>

                  <tr>
                    <td>Net Total</td>
                    <td></td>
                    <td> 
                      ₹ {selectedTests.reduce((acc,curr) => acc + curr.Price,0) - discount}
                    </td>
                  </tr>
                </tbody>
              </table>

          </div>
  

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

                <input type="text" name='PaymentAmount' placeholder='Payment Amount in INR'/>
                <input type="text" name='PaymentReference' placeholder='Payment Reference'/>

              </div>
                  
              <h4>Discount if any </h4>
              <div className={styles.formContainer}>
                <input type="number" name='Discount' placeholder='Payment Amount in INR' onChange={(e)=> e.target.value==""?setDiscount(0):setDiscount(e.target.value) }/>
                <input type="text" name='Remarks' placeholder='Remarks'/>
              </div>
            <button
              className={`${styles.createButton}`}
            >
              Create Invoice
            </button>
            </form> 

          </div>
      </div>
  )
}

export default page