

import React from 'react'
import { InvoiceDetails } from './PairDetails'
import { getDate } from './Inputs/Resuables'

function InvoiceNoDetail({Info}) {
  let dt = Info?.invoiceDetails?.invoiceDate?getDate("dd-mm-yyyy",0,new Date(Info?.invoiceDetails?.invoiceDate)):""
  return (
    <div className=" border-r-2 border-black p-[2px]">
    <InvoiceDetails name={"INVOICE NO."} value={Info?.invoiceDetails?.invoiceNo}/>
    <InvoiceDetails name={"INVOICE DATE"} value={dt}/>
    <InvoiceDetails name={"PLACE OF SUPPLY"} value={Info?.companyDetails?.state}/>
    <InvoiceDetails name={"DUE DATE"} value={Info?.invoiceDetails?.getDueDate()}/>
</div>
  )
}

export default InvoiceNoDetail