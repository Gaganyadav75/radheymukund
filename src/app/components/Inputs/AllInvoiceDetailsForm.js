"use client"
import React from 'react'
import { DateInput, NormalInput, SelectInput } from './Resuables'
import {} from './InvoiceDetails'
import {InvoiceDetailInputs} from './InvoiceDetails'
import { PartyDetailsInputs} from './PartyDetail'
import { ItemsDetails} from './ItemsDetails'
import { SubmitButton} from './SubmitButton'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { RecoilInvoiceState } from '@/app/recoil/formInvoiceState'
import { useRouter } from 'next/navigation'

function AllInvoiceInputs() {

  let router =  useRouter()

  let [formProcessStatus,setFormProcesStatus] = useState()
  let [formInvoiceDetails,setFormInvoiceDetails] = useRecoilState(RecoilInvoiceState)

  useEffect(()=>{
    if (formInvoiceDetails?.invoiceDetails && formInvoiceDetails?.partyDetails && formInvoiceDetails?.itemsDetails && formProcessStatus == "create") {
      console.log(formInvoiceDetails)
      router.push("/invoice")
    }
    


  },[formInvoiceDetails])



  return (

    <div >
      <div class="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 w-full justify-center gap-2">
        {
          formProcessStatus==undefined && <InvoiceDetailInputs setStatus={setFormProcesStatus} setFormData={setFormInvoiceDetails}/>
        }
        {
          formProcessStatus==false && <PartyDetailsInputs setStatus={setFormProcesStatus} setFormData={setFormInvoiceDetails}/>
        }
        {
          formProcessStatus==true && <ItemsDetails setStatus={setFormProcesStatus} setFormData={setFormInvoiceDetails}/>
        }
      </div>
    </div>

  )
}

export default AllInvoiceInputs