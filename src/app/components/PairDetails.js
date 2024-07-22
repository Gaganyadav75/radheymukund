import React from 'react'
import { gstinStateCodes } from '../data/gstinStateCode'






export function InvoiceDetails({name,value}) {
  return (
    <div className="grid grid-cols-[4fr,1fr,7fr] mt-1">
                <span>{name && name.toUpperCase()}</span>
                <span>:</span>
                <span>{value && value.toUpperCase()}</span>
    </div>
  )
}


export function BillToShipTo({border,type,partyDetails}) {

  const getStateCode = () =>{
    if (partyDetails?.gstin) {
      let stcode = partyDetails.gstin.slice(0,2)
      let stc = gstinStateCodes[stcode]
      return stc?.state?stc?.state +" ("+ stcode+")":"" 
    }else{
      return partyDetails?.state
    }
    
  }



  return (
    <div className={`${border} border-black p-[2px] flex flex-col justify-between`}>

      <div className="">
        <h3 className="underline italic">{type}</h3>
        <div className="mt-1 mb-2">
          <p>{partyDetails?.name && partyDetails?.name.toUpperCase()}</p>
          <p className="text-wrap text-[12px]">{partyDetails?.address && partyDetails?.address.toUpperCase()}</p>
        </div>
      </div>
        <div className="">
          <InvoiceDetails name={"PAN"} value={partyDetails?.pan}/>
          <InvoiceDetails name={"GSTIN"} value={partyDetails?.gstin?partyDetails?.gstin:""}/>
          <InvoiceDetails name={"STATE"} value={partyDetails?.getState()}/>
          <InvoiceDetails name={"EMAIL"} value={partyDetails?.email?partyDetails.email:""}/>
        </div>
    </div>
  )
}





export function RowLine({name,value,align}) {
  return (
    <div className="grid child:p-1 child:flex child:flex-col child:justify-center  child:text-wrap grid-cols-[1fr,8fr,2fr] border-b-2 border-black ">
            <div className="border-r-2 border-black ">

            </div>
          <div className={`text-${align?align:"right"} border-r-2 border-black`}>
              {name}
          </div>
        
          <div className="text-right">
              {value}
          </div>

    </div>
  )
}



export function GstRowLine({name,value,align}) {
  return (
    <div className="grid child:p-1 child:flex child:flex-col child:justify-center  child:text-wrap grid-cols-[1fr,7fr,1fr,2fr] border-b-2 border-black ">
       <div className="border-r-2 border-black ">

      </div>
          <div>

          </div>
          <div className={`text-${align?align:"right"} border-l-2 border-r-2 border-black`}>
              {name}
          </div>
        
          <div className="text-right">
              {value}
          </div>

    </div>
  )
}






export function TaxableInfoRowLine({hsn,taxable,qty,igst,cgst,sgst,totalTax,heading = false}) {


  return (
    <div className="grid child:p-1 child:flex child:flex-col child:justify-center  child:text-wrap grid-cols-[2fr,2fr,1.5fr,1.5fr,1fr,1fr,2fr] border-b-2 border-black ">
       <div className="border-r-2 border-black text-center ">
        {heading?"HSN/SAC":hsn?hsn:""}
      </div>
      <div className="border-r-2 border-black text-center ">
       {heading?"TAXABLE VALUE":taxable?taxable:""}
      </div>
      <div className="border-r-2 border-black text-center ">
        {heading?"TOTAL QTY":qty?qty:""}
      </div>
      <div className="border-r-2 border-black text-center ">
        {heading?"IGST":igst?igst:""}
      </div>
      <div className="border-r-2 border-black text-center ">
        {heading?"CGST":cgst?cgst:""}
      </div>
      <div className="border-r-2 border-black text-center ">
        {heading?"SGST":sgst?sgst:""}
      </div>
        
      <div className="text-right">
      {heading?"TAX AMOUNT":totalTax?totalTax:""}
      </div>

    </div>
  )
}







