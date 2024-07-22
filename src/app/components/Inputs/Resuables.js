
import React from 'react'
import { useState } from 'react';


// export function NormalInput({type,name,required,placeholder,listitems,width,disabled,onChange,value,minLength,maxLength,pattern}) {
//     return (
//       <div className={"mb-6 md:mb-0 "+width }>
//         <input disabled={disabled||false} minLength={minLength|| undefined} maxLength={maxLength || undefined} pattern={pattern||undefined} onChange={onChange||undefined} value={value||undefined} required={required} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" list={"list"+name} id={name} name={name || placeholder.toLowerCase()} type={type||"text"} placeholder={placeholder}/>
//               <datalist id={"list"+name}>
//                   {listitems?listitems.map(ele=> <option value={ele}/>):""}
//               </datalist>
//       </div>
//     )
//   }

// export function NormalInput({type,name,required,placeholder,listitems,width,disabled,onChange,value,minLength,maxLength,pattern}) {
//     return (
//       <div className={"mb-4 md:mb-0 "+width }>
//         <div className="relative w-full ">
//           <input
//           className="p-6 peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 disabled:bg-blue-gray-50"
//           placeholder=" " 
//           disabled={disabled||false} 
//           minlength={minLength} 
//           maxLength={maxLength}
//           pattern={pattern} 
//           onChange={onChange} 
//           value={value||undefined} 
//           required={required} 
//           list={"list"+name} id={name} name={name || placeholder.toLowerCase()} 
//           type={type||"text"}
//           />
//           <label
//           className=" flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">{placeholder||name}
//       </label>
//             <datalist id={"list"+name}>
//                   {listitems?listitems.map(ele=> <option value={ele}/>):""}
//             </datalist>
//   </div>
       
              
//       </div>
//     )
//   }


  export function NormalInput({
    type = 'text',
    name = '',
    required = false,
    placeholder = '',
    listitems = [],
    width = '',
    disabled = false,
    onChange,
    value = '',
    minLength,
    maxLength,
    pattern,
    len=false
  }) {

    let hidden = disabled?" hidden ":""


    return (
      <div className={`mb-4 md:mb-0 ${width} `}>
        <div className={"relative w-full "+hidden}>
          <input
            className="p-6 peer w-full h-full bg-gray-50 text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 disabled:bg-blue-gray-50"
            disabled={disabled}
            minLength={minLength}
            maxLength={maxLength}
            pattern={pattern}
            onChange={onChange}
            value={value}
            required={required}
            list={`list${name}`}
            id={name}
            name={name || placeholder.toLowerCase()}
            type={type}
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
          >
            {`${placeholder || name}${len?" ("+value.length+")":""}`}
          </label>
          <span className="absolute top-0 right-0">
            {}
          </span>
          <datalist id={`list${name}`}>
            {listitems.map((ele, index) => (
              <option key={index} value={ele} />
            ))}
          </datalist>
        </div>
      </div>
    );
  }
  




export function DateInput({required,name,placeholder,width,onChange,value}) {
    let [datevalue,setDateValue] = useState("")

  return (
    <div className={"mb-4 md:mb-0 "+width}>
      <div className="relative w-full ">
      <input id={name} required={required}  onChange={onChange} value={value} 
      className=" peer w-full h-full bg-gay-50 text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
      name={name ||placeholder.toLowerCase()} type="date" placeholder={placeholder}/>
      <label
          className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent  after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 before:!border-gray-900 after:border-blue-gray-200 after:!border-gray-900">{placeholder.toUpperCase()}
      </label>
      </div>
    </div>
  )
}




export function SelectInput({name,options,disabled,onChange,value}) {
    return (
      <div className=" mb-4 relative w-fit">
      <select onChange={onChange} value={value} name={name} 
      className="p-6 peer w-full h-full bg-gray-50 text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900" id={name}>
          {
              options.map((ele,index)=><option value={index==disabled? "":ele}>{ele}</option>)
          }
       
      </select>
      <label
          className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent  after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 before:!border-gray-900 after:border-blue-gray-200 after:!border-gray-900">{name.toUpperCase()}
      </label>
      {/* <div className="pointer-events-none absolute right-0 top-[50%] -translate-y-1/2 flex items-center px-2 text-grey-darker">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div> */}
    </div>
    )
  }




export function getDate(format, days = 0,currentDate= new Date()) {
    // Add or subtract days
    currentDate.setDate(currentDate.getDate() + Number(days));
  
    // Extract the day, month, and year from the date
    let day = String(currentDate.getDate()).padStart(2, '0');
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let year = String(currentDate.getFullYear());
  
    // Replace placeholders in the format string with actual date values
    let formattedDate = format
      .replace('dd', day)
      .replace('mm', month)
      .replace('yyyy', year);
  
    return formattedDate;
  }



export let CheckBox = ({label,onChange,labelAlign="left"}) =>{
    return (
        <label className="inline-flex items-center gap-2 mr-2">
            {
                labelAlign=="left" && <span className="ml-2 text-gray-700">{label}</span>
            }
            
            <input name="checked" type="checkbox" className="form-checkbox h-5 w-5 text-gray-600"  onChange={onChange}/>

            {
                labelAlign!="left" && <span className=" text-gray-700">{label}</span>
            }
                 
        </label>
    )
}



/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export function PartyGstInput({type,name,required,placeholder,listitems,width,disabled,onChange,value,minLength,maxLength,pattern,switchlist,onSwtichChange,len}) {
  let hidden = disabled?"hidden":""
  return (
    <div>
      <div className={"relative mt-2 rounded-md shadow-sm "+hidden} >
  
          <NormalInput 
          type={type}
          name={name} placeholder={placeholder}
          disabled={disabled}
          required={required} pattern={pattern}
          minLength={minLength} maxLength={maxLength} 
          onChange={onChange} 
          value={value}
          listitems={listitems}
          width={width}
          len={len}
          />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <select
            id="switch"
            name={name}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            onChange={onSwtichChange}
            
          >
            {switchlist?.map(ele=>{
              return <option value={ele.toLowerCase()}>{ele.toUpperCase()}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  )
}




export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}