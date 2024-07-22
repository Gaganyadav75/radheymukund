import { useEffect, useState } from "react";
import { NormalInput, SelectInput, setCookie } from "./Resuables"
import { SubmitButton } from "./SubmitButton";
import { getCookie } from "cookies-next";

export function ItemsDetails({setStatus,setFormData}) {

    let [freight,setFreight] = useState(false)

    let [disab,setDisab] = useState(true)
    let [listofitems,setListofItems] = useState([])
    let [sno,setSno] = useState([1])



    useEffect(()=>{
        let fr = freight?1:0;
        console.log(sno.length + fr)
        console.log(listofitems.length)
        if (sno.length + fr==listofitems.length) {
            setDisab(false)
        }else(
            setDisab(true)
        )
       
    },[listofitems,sno])


  
    // useEffect(()=>{
    //   let invdail = getCookie("itemsDetails")
    //   if (invdail) {
    //     setListofItems(JSON.parse(invdail))
    //   }
     
    // },[])


    let HandleSubmit = (e) => {
        e.preventDefault();
   

    console.log("ceated sucessfully")
        setFormData((data) =>{
          if (data) {
            return {...data,itemsDetails:listofitems}
          }else{
            return {itemsDetails:listofitems}
          }
        })
    
        setStatus("create")
    
      }

      let HandleAddItem = () =>{
        let fr = freight?1:0;
        if (listofitems.length>=sno.length+fr) {
            setSno(sno=>[...sno,sno.length+1])
        }
        
      }


      let HandlePrevSubmit = () =>{
        setStatus(false)
    }




    return (
      <div>
        <div className="flex justify-between">
            <h2 className="font-bold mb-1">ITEMS DETAILS</h2>
            <div className="flex">
            <SubmitButton value={"FREIGHT"} type="button" disabled={false} HandleSubmit={()=>{setFreight(!freight)}}/>
            <SubmitButton value={"Add Items"} HandleSubmit={HandleAddItem}/>
            </div>
            

        </div>
        <div className="flex flex-col gap-2">
        {
            sno.map((ele,ind)=>{
                return <EachItemsDetailsInput sno={ind+1} setList={setListofItems} />
            
            
            })
        }
       {
        freight && <FreightInputs sno={sno.length+1}  setList={setListofItems}/>
       }
       </div>

       <br/>
        <div className="flex gap-2 justify-between">
        
        <SubmitButton type="button" value={"PREV"} HandleSubmit={HandlePrevSubmit}/>
        <SubmitButton type="button" disabled={disab} value={"CREATE INVOICE"} HandleSubmit={HandleSubmit}/>

        </div>
      </div>
    )
  }
  
  
  export function EachItemsDetailsInput({sno,setList}){

    let [disabled,setDisabled] = useState(true)
    let [item,setItem] = useState({
        item:true,
        discline1:"",
        discline2:"",
        qty:0,
        unit:"",
        gstrate:0,
        hsn:"",
        per:0,
       
    })

    


    let onChangeHandler = (e) =>{
        setItem((item)=>{
            return {...item,[e.target.name]:e.target.value}
        })
    }

    const HandleSubmit = () => {
        let itm = item
        itm.getAmount = function(){
            return +(Number(this.qty)*Number(this.per)).toFixed(2) || 0
        }
        itm.getGstValue = function(statecode,partygstcode){
           
            let gstvalue = {
              igst:0,
              cgst:0,
              sgst:0,
              totalTax:0
            }
              let val = (Number(this.getAmount())*Number(this.gstrate))/100
      
              gstvalue.totalTax = val
      
              if (partygstcode==statecode) {
                gstvalue.cgst += +((val/2).toFixed(2))
                gstvalue.sgst += +((val/2).toFixed(2))
              }else{
                gstvalue.igst += +(val.toFixed(2))
              }

      
             return gstvalue
      
          };
        if (item.per==0 || item.qty==0) {
            return
        }
        setList((list) =>{
            let items = [...list]
            items[sno-1] = itm
            return items
        })

        alert("item added successfully")
    }



    
    useEffect(()=>{

       
        if (!item.discline1 || !item.qty || !item.gstrate || !item.unit || !item.hsn || !item.per || item.per==0 || item.qty==0) {
            setDisabled(true)
        }else{
            setDisabled(false)
        }


    },[item])


  
    return(
      <>
  
        <h2 className="font-bold mb-1">{sno||""}. ITEM </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr,0.2fr,0.3fr,0.2fr] gap-6">
            <NormalInput name={"discline1"} placeholder={"DESCRIPTION LINE 1"} required={true} onChange={onChangeHandler} value={item.discline1}/>
            <NormalInput type={"number"} name={"qty"} placeholder={"QTY"} required={true} onChange={onChangeHandler} value={item.qty}/>

            <div className="flex gap-x-2">
                <SelectInput name={"unit"} disabled={0}  options={["UNIT","KGS","PACKS","SETS"]} onChange={onChangeHandler} value={item.unit}/>

                <SelectInput name={"gstrate"} disabled={0}  options={["GST RATE","0","5","12","18","12"]} onChange={onChangeHandler} value={item.gstrate}/>
            </div>
         
            <NormalInput name={"hsn"} placeholder={"HSN"} required={true} listitems={[48025790,985765]} onChange={onChangeHandler} value={item.hsn}/>

           

            <NormalInput name={"discline2"} placeholder={"(DESCRIPTION LINE 2)"} required={true} onChange={onChangeHandler} value={item.discline2}/>
            <NormalInput type={"number"} name={"per"} placeholder={"PER"} required={true} onChange={onChangeHandler} value={item.per}/>

            <NormalInput type={"text"} name={"taxable"} placeholder={"Taxabel Value"} disabled={false} onChange={onChangeHandler} value={"Taxable : "+(Number(item.per||0)*Number(item.qty||0))}/>
           
            <div>

            <SubmitButton bgColor="bg-green-500" value={"ok"} type="button" disabled={disabled} HandleSubmit={HandleSubmit}/>
            
            </div>
         
        </div>

    </>
    )
  }
  
  
  
  
  export function FreightInputs({sno,setList}){

    let [disable,setDisable] = useState(true)
    let [item,setItem] = useState({
        item:false,
        discline1:"FREIGHT",
        hsn:"",
        gstrate:0,
        amount:0,
        getAmount:function(){
            return Number(this.amount)
        },
        getGstValue:function(statecode,partygstcode){
           
            let gstvalue = {
              igst:0,
              cgst:0,
              sgst:0,
              totalTax:0
            }
              let val = (Number(this.getAmount())*Number(this.gstrate))/100
      
              gstvalue.totalTax = val
      
              if (partygstcode==statecode) {
                gstvalue.cgst += val/2
                gstvalue.sgst += val/2
              }else{
                gstvalue.igst += val
              }

      
             return gstvalue
      
          }
    })

    


    let onChangeHandler = (e) =>{
        setItem((item)=>{
            return {...item,[e.target.name]:e.target.value}
        })
    }

    const HandleSubmit = () => {
        if (item.amount==0 || !item.hsn || !item.gstrate) {
            return
        }
        setList((list) =>{
            let items = [...list]
            items[sno-1] = item
            return items
        })
        alert("freight added")
    }


    
    useEffect(()=>{

       
        if (item.amount==0 || !item.hsn || !item.gstrate) {
            setDisable(true)
        }else{
            setDisable(false)
        }


    },[item])

    
  
    return(
      <div className="">
      <h2 className="font-bold mb-1">{sno||1}. FREIGHT </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[0.3fr,0.2fr,0.2fr,0.2fr,0.2fr] gap-x-6">
            <NormalInput name={"discline1"} listitems={["FREIGHT"]} placeholder={"DESCRIPTION LINE 1"} required={true} onChange={onChangeHandler} value={item.discline1}/>
            <NormalInput name={"hsn"} placeholder={"HSN"} required={true} listitems={[48025790,985765]} onChange={onChangeHandler} value={item.hsn}/>
       
            <NormalInput name={"amount"} type={"number"} placeholder={"AMOUNT"} required={true} onChange={onChangeHandler} value={item.amount}/>
            <SelectInput name={"gstrate"} disabled={0}  options={["GST RATE","0","5","12","18","12"]}
            onChange={onChangeHandler} value={item.gstrate}
            /> 
            <SubmitButton value={"ok"} type="button" disabled={disable} HandleSubmit={HandleSubmit}/>
        </div>
   
    </div>
    )
  }
  
  