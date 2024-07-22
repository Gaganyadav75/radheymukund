import React from 'react'
import { InvoiceDetails } from './PairDetails'

function TransportDetail({Info}) {
  return (
    <div className=" p-[2px]">
    <InvoiceDetails name={"GR/RR NO."} value={Info?.invoiceDetails?.grrrNo}/>
    <InvoiceDetails name={"TRANSPORT"} value={Info?.invoiceDetails?.transport}/>
    <InvoiceDetails name={"TERMS"} value={Info?.invoiceDetails?.getTerms()}/>
    <InvoiceDetails name={"VEHICLE NO."} value={Info?.invoiceDetails?.vehicleNo}/>
    </div>
  )
}

export default TransportDetail