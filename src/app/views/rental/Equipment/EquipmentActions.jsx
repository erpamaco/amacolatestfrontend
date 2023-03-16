import React from "react";
import { Button, Card, Divider, Icon } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import Swal from "sweetalert2";
import Axios from "axios";

import { useHistory, useParams } from 'react-router';

import url, { navigatePath } from "../../invoice/InvoiceService"

const EquipmentActions = () => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const routerHistory = useHistory();

  const { id } = useParams();

  const foo = parseInt(params.get('id'));
  const pushdata = (idd) => {
    routerHistory.push(navigatePath + `/product/updateproduct/${idd}`)

  }

  const removeData = (idd) => {
    // alert(id)
    // let url = `https://jsonplaceholder.typicode.com/users/${id}`
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this equipment details!',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        url.delete(`rental_equipment/${idd}`)
          .then(res => {


            Swal.fire(
              'Deleted!',
              ' equipment has been deleted.',
              'success'
            )
            routerHistory.push(navigatePath + `/rental/equipment/viewequipment`)

          })


        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your equipment is safe :)',
          'error'
        )
      }
    })

  }
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
            Once You Delete the Equipment, Data Will Be Lost Forever.
          </small>
        </div>

        <span>
          <Button className="mr-4 py-2" variant="outlined" style={{ border: '1px solid #379c60', color: '#379c60' }} onClick={() => pushdata(id)}>
            <Icon className="mr-2" fontSize="small">
              edit
            </Icon>{" "}
            EDIT EQUIPMENT
          </Button>
          <Button className="py-2" variant="outlined" onClick={() => removeData(id)} style={{ border: '1px solid #ff3d57', color: '#ff3d57' }}>
            <Icon className="mr-2" fontSize="small">
              delete
            </Icon>{" "}
            DELETE EQUIPMENT
          </Button>
        </span>

      </div>
    </Card>
  );
};

export default EquipmentActions;
