import React, { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import { Breadcrumb } from "matx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Icon,
  Fab,
  Tooltip,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import MemberEditorDialog from "./Addsubcategory2";
import url, {  navigatePath } from "../invoice/InvoiceService";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from '@mui/material/LinearProgress';
import {
  IconButton,
  Badge,
  Button,
  Card,
  Grid,
} from "@material-ui/core";

const SimpleMuiTable = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      float: "right",
      background: "blue",
      color: "white",
    },
    input: {
      display: "none",
    },
  }));
 
  const classes = useStyles();
  const [isAlive, setIsAlive] = useState(true);
  // const [ProductList, setProductList] = useState([]);
  const [catList, setcatList] = useState([]);//Category List 
  const [subcatList, setsubcatList] = useState([]);//subCategory List
  const [subcatList2, setsubcatList2] = useState([]);//subCategory List
  const [anchorEl, setAnchorEl] = React.useState(null);//read more arrow
  const [catid, setcatid] = useState(null);//category id
  const [originalList, setOriginalList] = useState([]);//Category List
  const [load, setLoad] = useState(true);
  // const [other, setOtherList] = useState([]);
  // const [list, setList] = useState([]);
  const [oCount, setOCount] = useState("");//Other product category count
  const { id } = useParams();
  const { cat_name } = useParams();
  /*to check the subcategory list when category name is clicked*/
  function handleClick(event, id) {
    url.get("sub-category/" + id).then(({ data }) => {
        console.log("model",data)
      setsubcatList2(data);//set the sub category list details
      setcatid(id);//set the category id
    });
    setAnchorEl(event.currentTarget);//expand the read more arrow icon
  }

  const routerHistory = useHistory();//It lets you access the history instance used by React Router

  /*Close the Category add dialogue box */
  function handleClose() {
    setcatid();//unset the category id
    setAnchorEl(null);//close the read more options
  }
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);//Initialize the Dialogue box state to false

  // const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] =
  //   useState(false);

  useEffect(() => {

    /*Api to list out the Category List,*/
    // url.get("mjrCategory").then(({ data }) => {
    //   setOCount(
    //     data?.unCategorized.filter(
    //       (obj) => obj.div_id == localStorage.getItem("division") && obj.delete != 1
    //     ).length
    //   );

    //   // setProductList(
    //   //   data?.products.filter(
    //   //     (obj) => obj.div_id == localStorage.getItem("division")
    //   //   )
    //   // );

    //   setcatList(
    //     data?.category.filter(
    //       (obj) => obj.div_id == localStorage.getItem("division")
    //     )
    //   );
    //   setOriginalList(
    //     data?.category.filter(
    //       (obj) => obj.div_id == localStorage.getItem("division")
    //     )
    //   );
    //   // setList(
    //   //   data?.category.filter(
    //   //     (obj) => obj.div_id == localStorage.getItem("division")
    //   //   )
    //   // );
    // });
    url.get("sub-category/" + id).then(({ data }) => {
        console.log("datssssa",id)
        setOriginalList(
                data?.filter(
                  (obj) => obj.div_id == localStorage.getItem("division")
                )
              );

      setsubcatList2(data);//set the sub category list details
      setcatid(id);//set the category id
      setLoad(false);
    });

    return () => setIsAlive(false);
  }, [isAlive]);
  // const [count, setCount] = useState(0);

  

  

  // const [click, setClick] = useState([]);

  /* Close the Dialog Box Category */
  const handleDialogClose = () => {
    setcatid(null);//Unset the category id
    setShouldOpenEditorDialog(false);//unset the Dialog box state to false
    setIsAlive(false)
  };

 
  
 /* Subcategory wise  product view  */
  const selectcategory = (user,sub_cat_name) => {
    console.log("user",user)
    console.log("sub_cat_name",sub_cat_name)
    routerHistory.push(navigatePath + `/product/viewproduct/${user}/${cat_name}/${sub_cat_name}/${id}`);//navigation to product page

    setAnchorEl(null);//rest the read more option (Shrink the category List)
  };

   /* maincategory wise  product view  */
   const selectmaincategory = (user) => {
    routerHistory.push(navigatePath + `/product/viewmainproduct/${user}`);//navigation to product page

    setAnchorEl(null);//rest the read more option (Shrink the category List)
  };

 
/*Search the Category */
  const search = useMemo(
    () =>
      debounce((query) => {
        let tempList = originalList.filter((item) =>
          item.name.toLowerCase().match(query.toLowerCase())
        );//Filter the Category List based on the category searched
        setsubcatList2([...tempList]);//set the filtered category List
      }, 200),
    [originalList]
  );
  /*handle change for the item searched */
  const handleInputChange = (event) => {
    let { value } = event.target;
    search(value);
  };
/*navigation to other product */
  const productUpdate = () => {
    routerHistory.push(navigatePath + "/product/other");//navigation to other Product list
  };
  
  // const [col,setCol] = useState('')

  // const getColor = () => {
  //   if(col == 'green'){
  //     setCol('red')
  //   }else{
  //     setCol('black')
  //   }
  // }

  // setInterval(() => {
  //     getColor()
  // }, 1000);

  return (
    <div className="">
       {/* <div style={{color:col}}>ss</div> */}
       {/* //m-sm-30 */}
       {load && (
        <div className={classes.loading}>
          {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
          <LinearProgress  sx={{
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgb(37 44 71)',
                        color:'rgb(37 44 71)',
                    }
}} />

        </div>
      )}
      <br />
      
      <div className="mb-sm-30">
        <div className="flex flex-wrap justify-between mb-6">
          <Breadcrumb
            routeSegments={[
              { name: "PRODUCT CATEGORY", path: navigatePath + "/product/viewsubcategory" },
              { name: cat_name },
            ]}
          />
          <div className="flex justify-end pr-4">
            <TextField
              className="mt-4"
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <Button
              className="py-2 ml-4"
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => {
                        setShouldOpenEditorDialog(true);
                        setAnchorEl(null);
                      }}
            >
              <Icon>add</Icon>
              ADD NEW
            </Button>
           
          </div>
        </div>
      </div>
      
      <div className="viewer_actions px-4 flex justify-end"></div>
      <div className="viewer_actions px-4 flex justify-between">
        <div className="mb-6">
          <Grid container spacing={3}>
            {subcatList2.map((item, ind) => (
              <Grid key={ind} item xs>
              {console.log("cat",item)}
                <Card
                  elevation={20}
                  style={{ minWidth: 300, whiteSpace: "pre-line" }}
                  className="p-2"
                  
                >
                  <div className="text-right">
                    <IconButton
                      size="small"
                      aria-owns={anchorEl ? "simple-menu" : undefined}
                      aria-haspopup="true"
                      
                    >
                      
                    </IconButton>
                  </div>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setShouldOpenEditorDialog(true);
                        setAnchorEl(null);
                      }}
                    >
                      
                      <Fab
                        aria-label="Add"
                        size="small"
                        className={classes.button}
                      >
                        <Icon>add</Icon>
                      </Fab>
                      Sub Category
                    </MenuItem>
                    {/* {subcatList.map((item) => (
                      <>
                      {console.log("sub",item)}
                        <MenuItem
                          value={item.id}
                          key={item.id}
                          onClick={() => selectcategory(item.id,item.name)}
                          style={{ textAlign: "center" }}
                          className="pl-4"
                        >
                          

                          {item.name}
                          <div>
                            <Badge
                              badgeContent="1"
                              style={{ paddingRight: 15 }}
                              color="primary"
                            />
                          </div>
                        </MenuItem>
                      </>
                    ))} */}
                  </Menu>
                  <div className="pb-5 flex justify-center">
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "0.5rem",
                        textAlign: "center",
                      }}
                    >
                      <strong>
                        <h6
                          align="center"
                          style={{
                            display: "inline-block",
                            textAlign: "center",
                            cursor:'pointer'
                          }}
                        //   onClick={() => selectmaincategory(item.id)}
                        onClick={() => selectcategory(item.id,item.name)}
                        >
                        {/* <h6 style={{fontSize: "0.875"}} onClick={() => selectmaincategory(item.id)}> </h6> */} {item.name.toUpperCase()}
                          <Badge
                            badgeContent={item?.product}
                            style={{
                              paddingRight: 8,
                              position: "relative",
                              left: 6,
                              top: "-10px",
                              cursor:'pointer'
                            }}
                            color="primary"
                          />
                        </h6>
                      </strong>
                    </div>
                    <div className="px-4"></div>
                  </div>
                </Card>
              </Grid>
            ))}

            {/* <Grid onClick={productUpdate} item xs>
              <Card
                elevation={20}
                style={{
                  minWidth: 300,
                  whiteSpace: "pre-line",
                  cursor: "pointer",
                }}
                className="p-2"
              >
                <div className="text-right">
                  <Badge
                    badgeContent={oCount}
                    style={{ paddingRight: 12, position: "relative", left: 20 }}
                    color="primary"
                  />

                  <IconButton
                    size="small"
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                  >
                    <Tooltip title="Other">
                      <Icon color="primary" style={{ paddingRight: 12 }}></Icon>
                    </Tooltip>
                  </IconButton>
                </div>
                <div className="pb-5 flex justify-center">
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "0.5rem",
                      textAlign: "center",
                    }}
                  >
                    <strong>
                      <h6
                        align="center"
                        style={{ display: "inline-block", textAlign: "center" }}
                      >
                        OTHER
                      </h6>
                    </strong>
                  </div>
                  <div className="px-4"></div>
                </div>
              </Card>
            </Grid> */}
          </Grid>
        </div>

        <Link to={"Addproduct"}></Link>
      </div>

      {shouldOpenEditorDialog && (
        <MemberEditorDialog
          handleClose={handleDialogClose}
          open={shouldOpenEditorDialog}
          catid={catid}
          catid2={id}
          catList={setsubcatList2}
        />
      )}
   

      <div className="mb-sm-30"></div>
    </div>
  );
};

export default SimpleMuiTable;
