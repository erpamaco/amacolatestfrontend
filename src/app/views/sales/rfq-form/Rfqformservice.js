import axios from "axios";
import url from "../../../../app/views/invoice/InvoiceService"


export const calculateAmount = (item) => {
  if (!item.discount) return item.price * item.quantity || 0;

  if (item.discountType === "$") {
    let total = item.price * item.quantity;
    return total - item.discount || 0;
  } else {
    let total = item.price * item.quantity;
    return total - (total * item.discount) / 100 || 0;
  }
};
export const getAllInvoice = () => {
  return axios.get("http://www.dataqueuesystems.com/amaco/amaco/public/api/products")
}
export const getInvoiceById = (id) => {
  return axios.get("/api/invoices", { data: id })
}
export const deleteInvoice = (invoice) => {
  return axios.post("/api/invoices/delete", invoice)
}
export const addInvoice = (invoice) => {
  return axios.post("/api/invoices/add", invoice)
}
export const updateInvoice = (invoice) => {
  return axios.post("/api/invoices/update", invoice)
}

export const getProductList = () => {
  return axios.get("http://www.dataqueuesystems.com/amaco/amaco/public/api/products");
};
export const getCustomerList = () => {
  return axios.get("http://dataqueuesystems.com/amaco/amaco/public/api/parties");
};
export const getVendorList = () => {
  return axios.get("http://dataqueuesystems.com/amaco/amaco/public/api/parties-vendor");
};
