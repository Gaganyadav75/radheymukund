


export function Declaration () {
    return(
        <div className="w-full p-2 child:font-bold child:pt-1">
          <p className="text-wrap underline">Declaration</p>
          <p className="text-wrap text-xs">"We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct" TERMS & CONDITIONS</p>
          <p className="text-wrap text-xs">1. All goods returned for replacement must be in salable condition with original packing.</p>
          <p className="text-wrap text-xs">2. We are not responsible for any transit damage loss or leakage.</p>
          <p className="text-wrap text-xs">3. 24% PA Interest will be charged for delayed payment.</p>
        </div>
    )
  }

  


export function FooterSign({Company}){
    return(
      <>
         <div className="flex child:p-1 child:border-black flex-col border-r-2 border-black child:text-sm child:font-bold">
                  <span className="border-b-2">Company’s GST No: {Company.gstin}</span>
                  <span className="border-b-2">Company PAN No: {Company.pan}</span>
                  <span className="border-b-2">Bank Name: YES BANK, A/C No: {Company.account}  </span>
                  <span>IFSC/RTGS/NEFT Code: {Company.ifsc}</span>
                  
                </div>
  
            <div className="flex justify-center items-center">
                    <img src="footerSign.png"/>
            </div>
      </>
    )
  }