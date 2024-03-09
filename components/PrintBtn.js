'use client'
import React from 'react'
import ReactToPrint from 'react-to-print'

function PrintBtn({ref}) {
  return (
   <ReactToPrint
    trigger={() => <button>Print</button>}
    content={() => ref.current}
   />

  )
}

export default PrintBtn