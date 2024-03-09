'use client'
import React from 'react'
import ReactToPrint from 'react-to-print'

function PrintBtn({reference,styles}) {
  return (
   <ReactToPrint
    trigger={() => <button className={styles}>Print</button>}
    content={() => reference.current}
   />

  )
}

export default PrintBtn