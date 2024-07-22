

export function HeaderCompanyInfo({Info}){
    return(
      <div className=" z-[2]">
      <h1 className="text-blue-500 w-full text-sm text-center  z-[2]">"JAI SHREE KRISHNA"</h1> 
        <h2 className="text-center font-bold underline">{Info?.invoiceDetails?.invoiceType}</h2>
  
        <p className="text-center text-xl font-bold mt-1">{Info?.companyDetails?.name}</p>
   
        <div className="translate-x-[40%] child:pl-5 child:text-xs flex flex-col gap-[2px] child:font-bold">
        <p className="">{Info?.companyDetails?.address}</p>
        <p className="">{Info?.companyDetails?.addressline2}</p>
        <p className="">{Info?.companyDetails?.name}</p>
        <p className="flex gap-5">
          <span>{`GSTIN: ${Info?.companyDetails?.gstin}`}</span>
          <span>{`PAN: ${Info?.companyDetails?.pan}`}</span>
        </p>
        <p className="flex gap-4">
          <span>{`MOB: ${Info?.companyDetails?.mobile}`}</span>
          <span>{`EMAIL: ${Info?.companyDetails?.email}`}</span>
        </p>
        </div>
  
        </div>
    )
  }