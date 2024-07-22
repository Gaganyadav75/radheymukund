"use client"
import React from 'react'
import { BillToShipTo, GstRowLine, RowLine, TaxableInfoRowLine } from '../components/PairDetails'
import TransportDetail from '../components/TransportDetail'
import { HeaderCompanyInfo } from '../components/HeaderCompanyInfo'
import Image from 'next/image'
import { SaleDetails } from '../components/SaleDetails'
import { AmountInEnglishRowLine } from '../components/AmountInEnglish'
import { Declaration, FooterSign } from '../components/Footer'
import { CompanyInfo } from '../data/CompanyInfo'
import InvoiceNoDetail from '../components/InvoiceNoDetail'
import { useRecoilState } from 'recoil'
import { RecoilInvoiceState } from '../recoil/formInvoiceState'
import { InfoClass } from '../data/InvoiceClass'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AmountDetailsSection from '../components/AmountDetailsSection'
import { useRef } from 'react'
import jsPDF from 'jspdf'
import { SubmitButton } from '../components/Inputs/SubmitButton'



function page() {

  let [State,setState] = useRecoilState(RecoilInvoiceState)
  let router = useRouter()

  useEffect(()=>{

    console.log(State)

    if (!State) {
      router.push("/")
    }

  },[State])


  let Info = new InfoClass ({...State,companyDetails:CompanyInfo})



  let handlePrint = () =>{
    let originalContents = document.body.innerHTML;

    let printContents = document.getElementById("print").innerHTML

    document.body.innerHTML = printContents;
  
    window.print();
  
    document.body.innerHTML = originalContents;
  }

  let handlePrev = () => {
    router.push("/")
  }



  return (

<>
<SubmitButton type='button' value={"PRINT"} HandleSubmit={handlePrint} addClass='absolute top-1 right-0 printbtn '/>
<SubmitButton type='button' value={"PREV"} HandleSubmit={handlePrev} addClass='absolute top-1 left-0 printbtn '/>

    <div  className=" w-[1000px] p-10 border bg-white border-black flex justify-center">
    <div className="w-full " >


    <header className="relative flex justify-center w-full p-1" >

      
  

        <span className="absolute top-6 left-1 z-[1] w-fit">
            <img src="/logo.png" width={"250px"} height={"200px"} alt="company's logo"/>
            <img/>
            {/* https://i.imgur.com/dwPBeiN.png className="z-[-1]"*/}
        </span>



     <HeaderCompanyInfo Info={Info}/>

    </header>


    <p className="text-right text-xs mt-2 font-bold">(ORIGINAL FOR RECIPIENT)</p>


    <main className=" ">

      {/* Invoice details Invoice no. and vichle no. */}
      <section className="grid w-full grid-cols-2 child:text-sm child:font-bold border-2 border-black">
        {/* INVOICE NO */}

          <InvoiceNoDetail Info={Info}/>

        {/* TANSPORT */}

          <TransportDetail Info={Info}/>

      </section>

      {/* bill to ship to party details */}
      <section className="grid w-full grid-cols-2 child:text-sm child:font-bold border-t-0 border-2 border-black">
        {/* Bill To */}
        <BillToShipTo
        border={"border-r-2"}
        type={"BILLED TO"} 
        partyDetails={Info?.partyDetails?.billTo}
        />
        {/* Ship To */}
        <BillToShipTo
        border={""}
        type={"SHIP TO"} 
        partyDetails={Info?.partyDetails?.shipTo}
        />
      </section>


      {/* Main Product Sale Details  */}
      <section className="grid w-full child:text-sm child:font-bold border-r-2 border-l-2 border-t-0  border-black">
        {/* heading of the product details */}
        <SaleDetails sno={"S NO."} 
        desc={{line1:"Description of Goods",line2:""}} 
        qty={"qty"} 
        gstrate={"gst rate"} 
        hsn={"hsn/sac"} 
        per={"Per"} 
        amt={"amount"}/>


         {/* all list of procuct sold */}

        {
          Info?.itemsDetails?.map((item,ind)=>{
             return <SaleDetails sno={ind+1} 
              desc={{line1:item.discline1,line2:item.discline2}} 
              qty={Number(item.qty) ||""} 
              unit={item.unit||""}
              gstrate={item.gstrate+"%"} 
              hsn={item.hsn} 
              per={Number(item.per) || ""}
              amt={item.getAmount()}
              />
            
          })
        }

       

      </section>


        {/* Total And Gst calculation */}
      <section className="grid w-full child:text-sm child:font-bold border-r-2 border-l-2 border-t-0 border-black">


          <AmountDetailsSection Info={Info}/>
      



      </section>

   
    </main>


    <footer>

      <section className="border-r-2 border-l-2 border-black">
        <Declaration/>
      </section>

      <section className="grid grid-cols-2 border-2 border-black">
         <FooterSign Company={Info.companyDetails}/>
      </section>

      <div className="text-center text-sm font-bold mt-2">
        THIS IS COMPUTER GENERATED INVOICE
      </div>


    </footer>
 
   
    </div>

    </div>

    </>

  )
}

export default page