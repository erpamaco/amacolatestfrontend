import axios from "axios";
import useSettings from "../../hooks/useSettings";

export const getAllInvoice = () => {
  return url.get("/api/invoices/all");
};
export const getInvoiceById = (id) => {
  return url.get("/api/invoices", { data: id });
};
export const deleteInvoice = (invoice) => {
  return url.post("/api/invoices/delete", invoice);
};
export const addInvoice = (invoice) => {
  return url.post("/api/invoices/add", invoice);
};
export const updateInvoice = (invoice) => {
  return url.post("/api/invoices/update", invoice);
};

export const salesTax = () => {
  return url.get("salesTax");
};

export const expensePaid = () => {
  return url.get("expense-paid");
};
export const receipts = () => {
  return url.get("receipts");
};
// const perDashboard = localStorage?.getItem("permissiondata");
//  export  const compPer = JSON.parse(perDashboard)?.filter(obj => obj?.type == "Component")?.map((item) => {
//     return item?.module
//  })

export const getInvoice = () => {
  return url.get(
    "http://dataqueuesystems.com/amaco/amaco/public/api/parties/1"
  );
};

const url = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/", //local connection
  baseURL: "https://www.amacoerp.com/test/amaco_test/public/api/", //vps test production
  //  baseURL: "https://www.amacoerp.com/amaco/public/api/", //vps production
  //  baseURL: "http://18.210.239.86/test/amaco/public/api/",  // ec2 test connection
  //  baseURL: "http://18.210.239.86/amaco/public/api/",  // ec2 production connection
 
  //  timeout: 1000,
  // headers: {'Authorization': 'Bearer '+localStorage.getItem('rememberMe')}
});

// export const basePath = "http://127.0.0.1:8000/";
//  export const basePath = "http://18.210.239.86/amaco/public/";
export const basePath = "https://www.amacoerp.com/test/amaco_test/public/";
// export const basePath = "https://www.amacoerp.com/amaco/public/";
//   const url = axios.create({
// baseURL: 'https://www.amacoerp.com/amaco/public/api/',

//     // timeout: 1000,

//     // headers: {'Authorization': 'Bearer '+localStorage.getItem('rememberMe')}
//   });
export const navigatePath = "";

export const urlphp = "/amaco_test";
export const divisionId = 24;
export const GDIV = localStorage.getItem("division")
  ? localStorage.getItem("division")
  : 1;

export const version = "";
// export const version = "Test Version";

export const ApiKey = "";
const role = localStorage.getItem("role");

// const  url = "http://dataqueuesystems.com/amaco/amaco/public/api/";
// const phpurl = "https://www.amacoerp.com/test/amaco_test/public/api/";
// const  phpurl = "http://dataqueuesystems.com/amaco/amaco/public/api/";
export const getparties = () => {
  return url.get(url + "parties");
};
export const getcategories = () => {
  return url.get("categories");
};
export const getrfq = () => {
  return url.get("rfq");
};
export const getProductList = () => {
  return url.get("products");
};
export const getVendorList = () => {
  return url.get(`parties-vendor/${localStorage.getItem("division")}`);
};
export const getCustomerList = () => {
  return url.get(`customer-list/${localStorage.getItem("division")}`);
};

export const getmanufacturer = () => {
  return url.get("manufacturer");
};
export const getpaymentaccount = () => {
  return url.get("payment-account");
};
export const getpaymentaccountcategory = () => {
  return url.get("account-categories");
};
export const getdivisions = () => {
  return url.get("division");
};
export const getcompanybank = () => {
  return url.get("company-bank");
};
export const getusers = () => {
  return url.get("users");
};
export const getpaidDivision = () => {
  return url.get("paidDivision");
};
export const getEmployee = () => {
  return url.get("getEmp");
};

export const getUnitOfMeasure = () => {
  return url.get("uom");
};
//asd

export const data = [
  {
    value: "TON",
    label: "TON-TONNES",
  },
  {
    value: "TUB",
    label: "TUB-TUBES",
  },
  {
    value: "UNT",
    label: "UNT-UNITS",
  },

  {
    value: "YDS",
    label: "YDS-YARDS",
  },
  {
    value: "SET",
    label: "SET-SETS",
  },
  {
    value: "SQUARE FEET",
    label: "SQF-SQUARE FEET",
  },
  {
    value: "SQUARE YARDS",
    label: "SQY-SQUARE YARDS",
  },
  {
    value: "THD",
    label: "THD-THOUSANDS",
  },

  {
    value: "KLR",
    label: "KLR-KILOLITER",
  },
  {
    value: "KG",
    label: "KG-KILOGRAM",
  },
  {
    value: "KME",
    label: "KME-KILOMETER",
  },
  {
    value: "MLT",
    label: "MLT-MILLILITER",
  },
  {
    value: "MTR",
    label: "MTR-METERS",
  },
  {
    value: "NOS",
    label: "NOS-NUMBERS",
  },
  {
    value: "PAC",
    label: "PAC-PACKS",
  },
  {
    value: "PCS",
    label: "PCS-PIECES",
  },
  {
    value: "PAIRS",
    label: "PAIRS",
  },
  {
    value: "QTL",
    label: "QTL-QUINTAL",
  },
  {
    value: "ROLLS",
    label: "ROLLS",
  },
  {
    value: "CENTIMETER",
    label: "CENTIMETER",
  },
  {
    value: "CTN",
    label: "CTN-CARTONS",
  },
  {
    value: "DOZ",
    label: "DOZ-DOZEN",
  },
  {
    value: "DRM",
    label: "DRM-DRUM",
  },
  {
    value: "GM",
    label: "GRAMS",
  },

  {
    value: "GRS",
    label: "GRS-GROSS",
  },
  {
    value: "EA",
    label: "EA-EACH",
  },
  {
    value: "PER DAY",
    label: "PER DAY",
  },
  {
    value: "BX",
    label: "BOXES",
  },
  {
    value: "GAL",
    label: "GALLON",
  },
].sort((a, b) => (a.value > b.value ? 1 : -1));
export const currency = [
  {
    name: "SAR",
    value: "SAR",
  },
  {
    name: "USD",
    value: "USD",
  },
  {
    name: "AED",
    value: "AED",
  },
  {
    name: "EUR",
    value: "EUR",
  },
 
];

export const CUR_RENCY = [
  {
    name: "SAR",
    value: "SAR",
  },
  {
    name: "USD",
    value: "USD",
  },
  {
    name: "AED",
    value: "AED",
  },
  {
    name: "EUR",
    value: "EUR",
  },
];

export const capitalize_arr = (value) => {
  let wordsArray = value.split(" ");
  let capsArray = [];

  wordsArray.forEach((word) => {
    capsArray.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
  });

  return capsArray.join(" ");
};

export default url;
