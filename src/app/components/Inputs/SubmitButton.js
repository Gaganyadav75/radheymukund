
export function SubmitButton({value,type="button",disabled,HandleSubmit,addClass="",bgColor="bg-blue-500"}){
    return(
      <div className={"flex justify-center "+addClass}>
      <button
      class={"w-fit h-fit middle none center mr-4 rounded-lg "+bgColor+" py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"}
      data-ripple-light="true"
      disabled={disabled||false}
      type={type}
      onClick={HandleSubmit}
      >
        {value}
      </button>
    </div>
    )
  }
  