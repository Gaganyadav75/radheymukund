import { atom } from "recoil";

export const RecoilInvoiceState = atom({
    key: "InvoiceAtomState", // unique ID (with respect to other atoms/selectors)
    default:null, // default value (aka initial value)
  });