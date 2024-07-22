import numberToText from "number-to-text" 
import "number-to-text/converters/en-us"




export function AmountInEnglishRowLine({type,amount}) {

    let amt =  numberToText.convertToText(amount,{case:"upperCase",})
    return (
      <div className="grid child:p-1 child:flex child:flex-col child:justify-center  child:text-wrap grid-cols-[1fr,10fr] border-b-2 border-black ">
         <div className="border-r-2 border-black ">
  
        </div>
          
            <div className="text-left">
            {`${type?type:""} AMOUNT (IN WORDS): INR ${amt} ONLY /-`}
            </div>
  
      </div>
    )
  }
  