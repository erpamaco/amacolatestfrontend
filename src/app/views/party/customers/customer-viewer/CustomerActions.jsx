import React,{useEffect,useState} from "react";
import { Button, Card, Divider, Icon } from "@material-ui/core";
// import { GetApp } from "@material-ui/icons";
import Swal from "sweetalert2";
import history from "history.js"
// import Axios from "axios";
import url, { navigatePath, urlphp } from "../../../invoice/InvoiceService"
import { useHistory } from 'react-router';


const CustomerActions = ({ ids,setVerif }) => {
  const routerHistory = useHistory();

  let search = window.location.search;
  let params = new URLSearchParams(search);
  const foo = parseInt(params.get('id'));
  const pushdata = (id) => {
    routerHistory.push(navigatePath + `/party/updateparty/${id}`)

  }

  const removeData = (id) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Will Not Be Able To Recover This Company Details!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`parties/${id}`)
          .then(res => {

            Swal.fire(
              'Deleted!',
              'Your Company Details Has Been Deleted.',
              'success'
            )
            routerHistory.push(navigatePath + '/party/viewparty')

          })


        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Company Details Are Safe :)',
          'error'
        )
      }
    })

  }

  const verifyParty = (id) => {
    url.put(`verifyParty/${id}`)
    .then(res => {

      Swal.fire(
        'Verified!',
        'Party Has Been Verified.',
        'success'
      )
      setVerify(1)
      setVerif(true)
      // routerHistory.push(navigatePath + '/pages/view-customer/'+ids)

    })
  }

  const [verify,setVerify] = useState(0)

  useEffect(()=>{
    url.get(`checkVerifyParty/${ids}`).then(({ data }) => {
    
      setVerify(parseInt(data))
    });
  },[])

  return (
    <Card elevation={3}>
      <h5 className="p-4 m-0">ACTIONS</h5>

      <Divider className="mb-4" />

      <div className="flex-column items-start px-4 mb-4">
        <div className="flex items-center mb-4">
          <Icon className="mr-2" fontSize="small" color="error">
            info
          </Icon>
          <small className="text-muted">
            Once You Delete Party, Data Will Be Lost Forever.
          </small>
        </div>

        <span>
          <Button className="mr-4 py-2" variant="outlined" style={{ border: '1px solid #379c60', color: '#379c60' }} onClick={() => pushdata(ids)}>
            <Icon className="mr-2" fontSize="small">
              edit
            </Icon>{" "}
            EDIT PARTY
          </Button>

          {localStorage.getItem('role') == 'SA' && (  verify ? <>
            {/* <Button className="mr-4 py-2" variant="outlined" style={{ border: '1px solid #379c60', color: '#379c60' }}>
            <Icon className="mr-2" fontSize="small">
              done
            </Icon>{" "}
            VERIFYED
          </Button> */}
          </> : <>
          <Button className="mr-4 py-2" variant="outlined" style={{ border: '1px solid #379c60', color: '#379c60' }} onClick={() => verifyParty(ids)}>
            <Icon className="mr-2" fontSize="small">
              done
            </Icon>{" "}
            VERIFY PARTY
          </Button>
          </> )}
          
          <Button className="py-2 " variant="outlined" onClick={() => removeData(ids)} style={{ border: '1px solid #ff3d57', color: '#ff3d57' }}>
            <Icon className="mr-2" fontSize="small">
              delete
            </Icon>{" "}
            DELETE PARTY
          </Button>
        </span>

      </div>
    </Card>
  );
};

export default CustomerActions;
