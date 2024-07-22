"use client"

import Image from "next/image";
import {AmountInEnglishRowLine} from "./components/AmountInEnglish"
import { BillToShipTo, GstRowLine, InvoiceDetails, RowLine, TaxableInfoRowLine} from "./components/PairDetails";
import { Declaration, FooterSign } from "./components/Footer";
import { SaleDetails } from "./components/SaleDetails";
import { HeaderCompanyInfo } from "./components/HeaderCompanyInfo";
import InvoiceNoDetail from "./components/InvoiceNoDetail";
import TransportDetail from "./components/TransportDetail";
import { CompanyInfo as Company }  from "./data/CompanyInfo";
import AllInvoiceInputs from "./components/Inputs/AllInvoiceDetailsForm";


export default function Home() {





  return (

  <>
  <div className="w-full ">
  
  <AllInvoiceInputs/>

  </div>
  </>
  );
}
