import { useState } from "react"
import { CheckBox, NormalInput, PartyGstInput, SelectInput, setCookie } from "./Resuables"
import { SubmitButton } from "./SubmitButton";
import { useEffect } from "react";
import { gstinStateCodes } from "@/app/data/gstinStateCode";
import { getCookie } from "cookies-next";

export function PartyDetailsInputs({setStatus,setFormData}) {

    let [disabled,setDisabled] = useState(true)
    let [checked,setChecked] = useState(true)
    let [billToRegistered,setBillToRegistered] = useState(true)
    let [shipToRegistered,setShipToRegistered] = useState(true)

    let [partyDetailState,setPartyDetailState] = useState({
        billTo:{
            name:"",
            address:"",
            pan:"",
            gstin:"",
            email:"",
            getState:function(){
                let stc = ""
                if (this?.gstin.length==15) {
                    stc =this?.gstin.slice(0,2) 
                }else if (this.state.length==2) {
                    stc = this.state.toString()
                }else{
                    return ""
                }
                let obj = gstinStateCodes[stc.toString()]
                // console.log(obj)
                return obj.state?obj?.state+" ("+stc+")":""
            }
        },
        shipTo:{
            name:"",
            address:"",
            pan:"",
            gstin:"",
            email:"",
            getState:function(){
                let stc = ""
                if (this?.gstin.length==15) {
                    stc =this?.gstin.slice(0,2) 
                }else if (this.state.length==2) {
                    stc = this.state.toString()
                }else{
                    return ""
                }
                let obj = gstinStateCodes[this?.gstin.slice(0,2)]
                // console.log(obj)
                return obj.state?obj?.state+" ("+stc+")":""
            }
        }
    })


    let getPartyDetails = (billTo) =>{
        if (billTo) {
            console.log("Requesting bill to party details ....")
        }else{
            console.log("Requesting ship to party details ....")
        }
    }


    useEffect(()=>{
        let dtl = partyDetailState.billTo

        if (!dtl.name || !dtl.address || (!dtl.gstin && partyDetailState.partyType=="REGISTERED") ) {
            setDisabled(true)
        }else{
            setDisabled(false)
        }

    

    },[partyDetailState])


    // useEffect(()=>{

    //     let timeout = setTimeout(()=>getPartyDetails(true), 500);

    //     return()=>{
    //         clearTimeout(timeout)
    //     }

    // },[partyDetailState.billTo.gstin,partyDetailState.billTo.name])


    // useEffect(()=>{

    //     let timeout = setTimeout(()=>getPartyDetails(false), 500);

    //     return()=>{
    //         clearTimeout(timeout)
    //     }

    // },[partyDetailState.shipTo.gstin,partyDetailState.shipTo.name])


    useEffect(()=>{
        let invdail = getCookie("partyDetails")
        if (invdail) {
          setPartyDetailState(JSON.parse(invdail))
        }
       
      },[])



    let onChangeHandler = (e,billto,space=true) =>{
        let mxlen = e.target?.getAttribute("maxlength")
        if (!mxlen ||e.target?.value.length<=Number(mxlen)) {

            setPartyDetailState((detail)=>{
                if (billto) {
                    let billTo = detail.billTo
                    billTo[e.target.name] = space?e.target.value:e.target.value.replace(/\s+/g, '');
                    return {
                        ...detail,
                        billTo
                    }
                }else{
                    let shipTo = detail.shipTo
                    shipTo[e.target.name] = space?e.target.value:e.target.value.replace(/\s+/g, '');
                    return {
                        ...detail,
                        shipTo
                    }
                }
               
            })
        }
       
    }



    let HandleSubmit = () => {
        
    
        setFormData((data) =>{
          if (data) {   
            let st = partyDetailState
            let statecodebillto = st.billTo?.gstin.length==15?gstinStateCodes[st.billTo?.gstin.slice(0,2)].state+" ("+st.billTo?.gstin.slice(0,2)+")":st?.billTo?.state.length==2?gstinStateCodes[st.billTo?.state].state+" ("+st.billTo?.state+")":""
            
            let billTo = {
                ...st.billTo,
                pan: st.billTo?.pan.length==10 ?  st.billTo?.pan : st?.billTo?.gstin.length==15 ? st.billTo?.gstin.slice(2,12) : "",
                state:st.billTo?.gstin.length==15?"":st?.billTo?.state,
                getState:statecodebillto
                
            }

            let fun = ()=>{
                let statecodeshipto = st.shipTo?.gstin.length==15?gstinStateCodes[st.shipTo?.gstin.slice(0,2)].state+" ("+st.shipTo?.gstin.slice(0,2)+")":st?.shipTo?.state.length==2?gstinStateCodes[st.shipTo?.state].state+" ("+st.shipTo?.state+")":""
               
              return{
              ...st.shipTo,
             pan: st.shipTo?.pan ?  st.shipTo?.pan : st?.shipTo?.gstin ? st.shipTo?.gstin.slice(2,12) : "",
             state:st.shipTo?.gstin.length==15?"":st?.shipTo?.state,
             getState:statecodeshipto
          }}
            let partyDetails = {
                billTo,
                shipTo:!checked?fun():billTo
            }
            return {...data,partyDetails}
          }
        })
    
        setCookie("partyDetails",JSON.stringify(partyDetailState),30)
    
        setStatus(true)
    
      }


    let SwitchChagneHandler = (bilto) =>{
        if (bilto) {
            setBillToRegistered(!billToRegistered)
        }else{
            setShipToRegistered(!shipToRegistered)
        }
       
    }

    let HandlePrevSubmit = () =>{
        setStatus(undefined)
    }



  
    return (
      <div>
          <div className="flex justify-between">
            <div className="flex items-center">
            {/* <SelectInput name={"partytype"} disabled={-1}  options={["REGISTERED","UNREGISTERED"]}  onChange={(e)=>setPartyDetailState((data)=>{return {...data,partyType:e.target.value}})} value={partyDetailState.partyType}/> */}
                <h2 className="font-bold mb-5 ml-2">PARTY DETAILS</h2>
            </div>
           
            <CheckBox label={"SHIP TO"} onChange={()=>{setChecked(!checked)}}/>
          </div>
           
          <div className="sm:grid-cols-1 md:grid-cols-1 grid lg:grid-cols-2 gap-6 my-4">

            {/* PARTY NAME */}
                <NormalInput name={"name"} placeholder={"BILL TO PARTY NAME"} required={true} onChange={(e)=>{onChangeHandler(e,true)}} value={partyDetailState.billTo.name} />

                <NormalInput disabled={checked} name={"name"} placeholder={"SHIP TO PARTY NAME"} required={false}  onChange={(e)=>{onChangeHandler(e,false)}} value={partyDetailState.shipTo.name}/>

            {/* PARTY ADDRESS */}
                <NormalInput name={"address"} placeholder={"BILL TO ADDRESS"} required={true}  onChange={(e)=>{onChangeHandler(e,true)}} value={partyDetailState.billTo.address}/>

                <NormalInput disabled={checked} name={"address"} placeholder={"SHIP TO ADDRESS"} required={true}  onChange={(e)=>{onChangeHandler(e,false)}} value={partyDetailState.shipTo.address}/>

            {/* PARTY PAN */}
            <div>
            <NormalInput len={true} name={"pan"} placeholder={"BILL TO PAN"} required={true} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"  onChange={(e)=>{onChangeHandler(e,true,false)}} value={partyDetailState.billTo.pan}/>
            {/* <SelectInput name={"statecode"} disabled={-1}  
            options={}  
            onChange={(e)=>setPartyDetailState((data)=>{return {...data,partyType:e.target.value}})} 
            value={partyDetailState.partyType}/>   */}
            </div>

            <div>

            <NormalInput len={true} disabled={checked} name={"pan"} placeholder={"SHIP TO PAN"} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" minlength="10" maxlength="10"  required={true}  onChange={(e)=>{onChangeHandler(e,false,false)}} value={partyDetailState.shipTo.pan}/>

                
            </div>


            {/* PARTY GSTIN */}
                {
                   <PartyGstInput len={true}  switchlist={["GSTIN","STATE"]} name={billToRegistered?"gstin":"state"} disabled={false} placeholder={billToRegistered?"BILL TO GSTIN":"STATE(CODE)"} type={billToRegistered?"text":"number"} required={false} pattern={billToRegistered ||"\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{1}[A-Z\d]{1}"}
                    minLength={billToRegistered?15:2} maxLength={billToRegistered?15:2} onSwtichChange={()=>{SwitchChagneHandler(true)}}  onChange={(e)=>{onChangeHandler(e,true,!billToRegistered)}} value={billToRegistered?partyDetailState.billTo.gstin:partyDetailState.billTo.state}/>
                }
                
                {
                     <PartyGstInput len={true} switchlist={["GSTIN","STATE"]} type={shipToRegistered?"text":"number"}  name={shipToRegistered?"gstin":"state"} disabled={checked} placeholder={shipToRegistered?"SHIP TO GSTIN":"STATE(CODE)"} required={false} pattern={shipToRegistered && "\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{1}[A-Z\d]{1}"}
                     minLength={shipToRegistered?15:2} maxLength={shipToRegistered?15:2} onSwtichChange={()=>{SwitchChagneHandler(false)}}  onChange={(e)=>{onChangeHandler(e,false,!shipToRegistered)}} value={shipToRegistered?partyDetailState.shipTo.gstin:partyDetailState.shipTo.state} switchDisabled={checked}/>

                // <NormalInput disabled={checked} name={"gstin"} placeholder={"SHIP TO GSTIN"} required={false}  onChange={(e)=>{onChangeHandler(e,false,false)}} value={partyDetailState.shipTo.gstin}/>
                }
        
               
          


            {/* PARTY EMAIL */}
                <NormalInput type={"email"} name={"email"} placeholder={"BILL TO EMAIL"} required={false}  onChange={(e)=>{onChangeHandler(e,true)}} value={partyDetailState.billTo.email}/>

                <NormalInput disabled={checked} type={"email"} name={"email"} placeholder={"SHIP TO EMAIL"} required={false}  onChange={(e)=>{onChangeHandler(e,false)}} value={partyDetailState.shipTo.email}/>

            {/* SUBMIT */}
               
                

          </div>
                <div className="flex justify-between">
                    <SubmitButton value={"PREV"} HandleSubmit={HandlePrevSubmit} />
                    <SubmitButton value={"NEXT"} HandleSubmit={HandleSubmit} disabled={disabled}/>
                </div>
      </div>
    )
  }