import React, { useState, useEffect,useRef } from "react";
import {
  Grid,
  Card,
  Avatar,
  Divider,
  Button,
  Icon,
  Tab,
  Tabs,
  TablePagination,
  IconButton,
  Fab
} from "@material-ui/core";
import { Breadcrumb } from "matx";
import Axios from "axios";
import logo from "../../../matx/components/logo.png"
// import ProfileCard2 from "./ProfileCard2";
import Bank_Account from "./bankaccount";
import CompanyInfo from "./companyInfo";
import useAuth from "../../../app/hooks/useAuth";
import Division from "./divisionview";
import url from "../invoice/InvoiceService";
import { makeStyles } from "@material-ui/styles";
import MemberEditorDialog from "./useradd";
import Signature from "./Signature";

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    },
    input: {
      display: "none"
    }
  }));

const UserList4 = () => {
  const [IsAlive, setIsAlive] = useState(false);
  const [userList, setUserList] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [userid, setuserid] = useState(null);
  const {classes}=useStyles()
  const {
    isAuthenticated,
     user
  } = useAuth();
  const el = useRef();
  

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false);
  const [page, setPage] = useState(0);
  const formData=new FormData();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleTabChange = (e, value) => {
    setTabIndex(value);
  };
  
  
  const handleDialogClose = () => {
    setShouldOpenEditorDialog(false);
    setIsAlive(false)
   
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleFileSelect = (event) => {
    
   
    let files = event.target.files[0];
    formData.append('profile',files);
    formData.append('id',user.id);
    url.post("Usersprofile", formData)
        .then(function (response) {
          
          setIsAlive(false)
        })
    
       
   
  };


  useEffect(() => {
  url.get('users/'+user.id).then(({ data }) => {
       setUserList(data);
      
        setuserid(user.id)
    });

  
    return setIsAlive(true)  
    
  },[IsAlive]);

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            // { name: "Pages", path: "/pages" },
            { name: "PROFILE" },
          ]}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item md={4} sm={12} xs={12}>
          <Card className="pb-8" elevation={6}>
            <div className="pt-3 pl-8 pr-0 pb-8 flex-column" style={{backgroundColor:"#222a45f5"}}>
              <div className="flex justify-end">
            <label htmlFor="upload-multiple-file">
                  <Button
                      className="capitalize py-2"
                      // className="py-2"
                      style={{backgroundColor:"transparent",}}
                      component="span"
                      variant="contained"
                      size="small"
                    >
          <Icon type="submit" style={{color:'white'}}>mode_edit</Icon>
         
        </Button>
        </label>
        <input
                    className="hidden"
                    onChange={handleFileSelect}
                    id="upload-multiple-file"
                    
                    ref={el}
                    type="file"
                    multiple
                    name="profile[]"
                  />
                  </div>
       
              <Avatar
                className="h-100 w-100 mb-1"
                align="flex-column center"
                
              >
                   <img src={userList?.img} width={200} height={200}></img> 
                  </Avatar>
                  <div className="flex justify-end">
                  
            </div>
              </div>
              {/* <img src={logo} width={200} height={200}></img> */}
              
            <Divider className="mb-8" />
            <div className="mb-8">
              
            <div className="px-4 flex justify-start">
            <div className="flex " >
             
           
       
          
         
              {/* <div variant="text" className="w-full justify-start px-5"> */}
              <div className="pr-12">
              
                
               <p className="ml-2">Name:</p>
               {userList.nick_name&&<p className="ml-2">Nick Name:</p>}
              
              
                
              <p className="ml-2">Email:</p>
              
              
                
              <p className="ml-2">Contact:</p>
              <Button  onClick={e=>setShouldOpenEditorDialog(true)} className="mr-4 py-2" variant="outlined" color="primary" type="submit" aignItem="right">
          <Icon>edit</Icon>
          <span className="pl-2 capitalize">USER</span>
        </Button>
              
             </div>
             </div>
             <div className="pr-12">
              
                
               <p className="ml-2"><strong>{userList?.name}</strong></p>
               <p className="ml-2"><strong>{userList?.nick_name}</strong></p>
              
              
                
              <p className="ml-2"><strong>{userList?.email}</strong></p>
              
              
                
              <p className="ml-2"><strong>{userList?.contact}</strong></p>
              
             </div>
             <div className="pr-1" >
            
            
             </div>
             </div>
              
              
            </div>
            
          </Card>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          {/* {userList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, ind) => (
              <ProfileCard2 key={user.id} user={user} />
            ))} */}
        
            <Card elevation={3}>
              {/* <div className="flex"> */}
            <Tabs
        // className="mt-4"
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        {tabList.map((item, ind) => (
          <Tab className="capitalize"   value={ind} label={item} key={ind} />
        ))}
         {/* <Button className="pl-52">hi</Button> */}
      </Tabs>
      
      <Divider className="mb-0" />

       {tabIndex === 0 && <CompanyInfo />}
      {tabIndex === 1 && <Bank_Account />}
      {tabIndex === 2 && <Division />}
      {tabIndex === 3 && <Signature />}
     {/* </div> */}
            </Card>
         
        </Grid>
      </Grid>
      {shouldOpenEditorDialog && (
          <MemberEditorDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
            userid={userid}
            userList={setUserList}
          />
        )}
       
    </div>
  );
};

export default UserList4;
const tabList = ["COMPANY", "BANK ACCOUNT","DIVISION",'DIGITAL SIGNATURE'];