import React from 'react'
import { GstRowLine, RowLine, TaxableInfoRowLine } from './PairDetails'
import { AmountInEnglishRowLine } from './AmountInEnglish'

function AmountDetailsSection({Info}) {
    let gst = Info.getGstValues()
    let hsnwisedetails = Info.getHsnWiseItems()


  return (
    <>
    <RowLine name={"TOTAL"} value={Info.getTaxableValue()} align={"center"}/>
    <GstRowLine name={"IGST"} value={gst.igst} align={"center"}/>
    <GstRowLine name={"CGST"} value={gst.cgst} align={"center"}/>
    <GstRowLine name={"SGST"} value={gst.sgst} align={"center"}/>
    <RowLine name={"GRAND TOTAL"} value={Info.getInvoiceValue()}/>
    <AmountInEnglishRowLine amount={Math.round(Number(Info.getInvoiceValue()))} />
    <TaxableInfoRowLine heading={true}/>
    {
        hsnwisedetails.map(ele=>{
            let hsndetail = ele[1]
            return  <TaxableInfoRowLine hsn={hsndetail.hsn} igst={hsndetail.igst} cgst={hsndetail.cgst} sgst={hsndetail.sgst} taxable={hsndetail.taxable} qty={hsndetail.qty} totalTax={hsndetail.totalTax}/>
        })
    }
     <RowLine name={"TOTAL TAX"} value={Info.getGstValues().totalTax}/>
    <AmountInEnglishRowLine type={"TAX"} amount={Math.round(Info.getGstValues().totalTax)} />
    </>
  )
}

export default AmountDetailsSection