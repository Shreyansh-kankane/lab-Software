'use client'
import React from 'react'
import { useState,useEffect } from 'react'

function UpdateTest({params}) {

    const inputRef = useRef();
    const router = useRouter();

    const [tests,setTests] = useState([]);
    const [selectedTests,setSelectedTests] = useState([]);
    const [searchTest,setSearchTest] = useState("");

    const id = params.id;

    const handleDeleteTest = (id) => {
        setSelectedTests(selectedTests.filter((test)=> test._id !== id))
    }
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
  return (
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

        </tbody>
    </table>

  </div>
  )
}

export default UpdateTest