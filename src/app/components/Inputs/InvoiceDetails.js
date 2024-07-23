import React from 'react'
import { CheckBox, DateInput, getDate, NormalInput, SelectInput, setCookie } from './Resuables'
import { useState } from 'react'
import { SubmitButton } from './SubmitButton';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';

export function InvoiceDetailInputs({setStatus,setFormData}) {


  let [pcd,setPcd] = useState(false)
  let [disabled,setDisabled] = useState(true)

  let [invoiceDetailState,setInvoiceDetailState] = useState({
      invoicetype:"TAX INVOICE",
      invoiceno:"",
      invoicedate:getDate("dd-mm-yyyy"),
      grrrno:"",
      transport:"",
      terms:"",
      vehicleno:"",
      pcd,
  })



  useEffect(()=>{
  

     
      if (!invoiceDetailState.invoicedate || !invoiceDetailState.invoiceno || !invoiceDetailState.invoicetype) {
       
          setDisabled(true)
      }else{
        // console.log(invoiceDetailState)
          setDisabled(false)
      }

  },[invoiceDetailState])



  useEffect(()=>{
    let invdail = getCookie("invoiceDetails")
    if (invdail) {
      setInvoiceDetailState(JSON.parse(invdail))
    }
   
  },[])




  let onChangeHandler = (e) =>{
      setInvoiceDetailState((detail)=>{
          return {...detail,[e.target.name]:e.target.value}
      })
  }


  let HandleSubmit = () => {
        
    
    setFormData((data) =>{
     
      let inv = invoiceDetailState
      let invoiceDetails = {
        invoiceType:inv.invoicetype,
        invoiceDate:inv.invoicedate,
        invoiceNo:inv.invoiceno,
        vehicleNo:inv.vehicleno,
        grrrno:inv.grrrno,
        transport:inv.transport,
        terms:inv.terms,
        pcd:inv.terms,
        getDueDate:function(){
          let trm = Number(this.terms)||0
          return getDate("dd-mm-yyyy",trm)
        },
        getTerms:function(){
          if (!this.terms) {
            return ""
          }else if (Number(this.terms)==NaN) {
            return this.terms
           
          }else if (this.pcd) {
             return this.terms + " DAYS "+ "(PCD)"
          }
          else {
            return Numberthis.terms + " DAYS"
          }
        }
      }
      if (data) {
  
        return {...data,invoiceDetails}
      }else{
        return {invoiceDetails}
      }
    })


    setCookie("invoiceDetails",JSON.stringify(invoiceDetailState),30)

    setStatus(false)

  }


  

  return (
    <div>
        
        <div className="flex justify-center ">
          <SelectInput name={"invoicetype"} placeholder="INVOICE TYPE" disabled={-1}  options={["TAX INVOICE","DEBIT NOTE","CREDIT NOTE","PERFORMA INVOICE"]} onChange={onChangeHandler} value={invoiceDetailState.invoicetype}/>
        </div>
        <h2 className="font-bold mb-1">INVOICE DETAILS</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4">
          <NormalInput name={"invoiceno"} placeholder={"INVOICE NO."} required={true} onChange={onChangeHandler} value={invoiceDetailState.invoiceno}/>
          <NormalInput name={"grrrno"} placeholder={"GR/RR NO"} required={false}  onChange={onChangeHandler} value={invoiceDetailState.grrrno}/>
          <DateInput name={"invoicedate"} placeholder={"INVOICE DATE"} required={true}  onChange={onChangeHandler} value={invoiceDetailState.invoicedate}/>
          <NormalInput name={"transport"} disabled={0}  onChange={onChangeHandler} value={invoiceDetailState.transport}/>
          <div className="flex justify-between">
          <NormalInput type={"text"} name={"terms"} placeholder={"TERMS"} required={false}  onChange={onChangeHandler} value={invoiceDetailState.terms}/>
          <CheckBox label={"PCD"} onChange={()=>{setPcd(true)}} labelAlign='right'/>
          </div>

          
          <NormalInput name={"vehicleno"} placeholder={"VEHICLE"} required={false}  onChange={onChangeHandler} value={invoiceDetailState.vehicleno}/>
        </div>
        <div className="flex justify-end">
        <SubmitButton value={"NEXT"} disabled={disabled} HandleSubmit={HandleSubmit}/>
        </div>
    </div>
  )
}










