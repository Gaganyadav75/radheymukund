
export class InfoClass {

    constructor(state){
      this.companyDetails = state.companyDetails
      this.invoiceDetails = state.invoiceDetails
      this.partyDetails = state.partyDetails
      this.itemsDetails = state.itemsDetails
    };

    getTaxableValue(){
      let itemsvalue = 0
       this.itemsDetails?.forEach(ele=> {
       let amt =  ele.getAmount()
        if (amt) {
          itemsvalue+= +(amt.toFixed(2))
        }
      })
      return itemsvalue
    };

    getPartyCode(){
      return this.partyDetails?.billTo?.gstin.length==15?this.partyDetails?.billTo?.gstin.slice(0,2):this.partyDetails?.billTo.state.length==2?this.partyDetails?.billTo.state:"07"
    }

    getGstValues(){
      let statecode = this.companyDetails.gstin.slice(0,2)
      let gstvalue = {
        igst:0,
        cgst:0,
        sgst:0,
        totalTax:0
      }
      
      let partygstcode = this.getPartyCode()

      this.itemsDetails?.forEach(ele=> {
        let val = (Number(ele.getAmount())*Number(ele.gstrate))/100

        gstvalue.totalTax += val?val:0

        if (partygstcode==statecode ) {
          gstvalue.cgst += +((val/2).toFixed(2))
          gstvalue.sgst += +((val/2).toFixed(2))
        }else{
          gstvalue.igst += +(val.toFixed(2))
        }
        
       })

       return gstvalue

    };

    getInvoiceValue(){
      return this.getTaxableValue() + this.getGstValues().totalTax
    };

    getHsnWiseItems(){
      let hsnwise = {}
      this.itemsDetails?.forEach((item)=>{
        let hsnobj =  hsnwise[String(item.hsn)]
        let statecode = this.companyDetails.gstin.slice(0,2)
        let partygstcode = this.partyDetails?.billTo?.gstin.slice(0,2) 
        let gst = item?.getGstValue(statecode,partygstcode)
        console.log(gst)
        let newobj = {
          hsn:item.hsn,
          taxable:Number(item.getAmount())+(hsnobj?.taxable || 0),
          qty:item.qty?Number(item.qty):0+ (hsnobj?.qty || 0),
          igst: Number(gst.igst) + (hsnobj?.igst || 0),
          cgst: Number(gst.cgst) + (hsnobj?.cgst  || 0),
          sgst: Number(gst.sgst) + (hsnobj?.sgst || 0),
          totalTax:Number(gst.totalTax)+(hsnobj?.totalTax ||0),
          totalValue:function() {
            return Number(this.taxable)+ Number(this.cgst)+ Number(this.sgst)+ Number(this.igst)
          }
        }

        hsnwise[String(item.hsn)] = newobj

      })
      return Object.entries(hsnwise);
    };




}


let Invoice = {
    invoicedetail:{
    type:"TAX INVOICE",
    billno:"24-25/21",
  },

    
    bill:{
      name:"JIWAN PUBLISHING HOUSE PVT LTD",
      address:"nagla charandash phase 2 noida uttarpradesh - 201305",
      gstin:"09DFDDFDFDD9JO",
      pan:"DFDDFDFDD9J",
      email:""
    },
    ship:{
      name:"JIWAN PUBLISHING HOUSE PVT LTD",
      address:"nagla charandash phase 2 noida uttarpradesh bihagar biraul madhubani - 201305",
      gstin:"09DFDDFDFDD9JO",
      pan:"DFDDFDFDD9J",
      email:""
    },
    items:[{
      item:true,
      discline1:"",
      discline2:"",
      qty:0,
      unit:"",
      gstrate:0,
      hsn:"",
      per:0,
      amount:0,
      getamount:function(){
        if (this.item) {
          return Number(this.qty)*Number(this.per) || 0
        }

        return this.amount
        
      }
    }],
    freight:{
      hsn:"9875",
      amount:0
    },




    



  }