


export function SaleDetails({sno,desc,qty,unit,gstrate,hsn,per,amt}) {



    return (
      <div className="grid child:p-1 child:flex child:flex-col child:justify-center  child:text-wrap grid-cols-[1fr,3fr,1.5fr,1fr,1.5fr,1fr,2fr]  border-b border-black ">
                  <span className="text-center border-r-2 border-black">{sno?sno.toString().toUpperCase():""}</span>
                  <span className="text-center align-middle border-r-2 border-black">
                    {desc&&desc.line1?desc.line1.toUpperCase():""}{desc&&desc.line2?<br/>:""}{desc&&desc.line2?desc.line2:""}
                    </span>
                  <span className="text-center align-middle border-r-2 border-black">{qty?qty.toString().toUpperCase()+" "+(unit?unit.toUpperCase():""):""}</span>
                  <span className="text-center border-r-2 border-black">{gstrate?gstrate.toString().toUpperCase():""}</span>
                  <span className="text-center border-r-2 border-black">{hsn?hsn.toString().toUpperCase():""}</span>
                  <span className="text-center border-r-2 border-black">{per?per.toString().toUpperCase():""}</span>
                  <span className="text-right">{amt?amt.toString().toUpperCase():""}</span>
               
      </div>
    )
  }