import axios from 'axios';

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