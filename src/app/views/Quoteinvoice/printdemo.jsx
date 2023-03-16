import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Typography, Grid, TextField,Icon } from "@material-ui/core";
import url from "../invoice/InvoiceService";

import NestedMenuItem from "material-ui-nested-menu-item";

export const NestedMenu = () => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [cat, setcat] = useState([]);
  const [subcat, setsubcat] = useState([]);
  const [catid, setcatid] = useState('');
  const [status, setstatus] = useState(false);
  
//   const data = [
//     {
//       title: "Top level 1",
//       slug: "top-level-1",
//       children: [
//         {
//           title: "Sub level 1",
//           slug: "sub-level-1",
//           children: [
//             {
//               title: "Sub Sub Level 1",
//               slug: "sub-sub-level-1",
//               children: [
//                 {
//                   title: "Sub Sub sub Level 1",
//                   slug: "Sub Sub sub Level 1",
//                   children: [
//                     {
//                       title: "Sub Sub sub  sub Level 1",
//                       slug: "Sub Sub sub  sub Level 1",
//                       children: [
//                         {
//                           title: "Sub Sub sub  sub sub Level 1",
//                           slug: "sSub Sub sub  sub sub Level 1",
//                           children: [
//                             {
//                               title: "Sub Sub Level 2",
//                               slug: "sub-sub-level-2"
//                             }
//                           ]
//                         }
//                       ]
//                     },
                    
//                   ]
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           title: "Sub level 2",
//           slug: "sub-level-2"
//         }
//       ]
//     },
//     {
//       title: "Top level 2",
//       slug: "top-level 2"
//     }
//   ];
 
useEffect(() => {
  url.get("account-categories").then(({ data }) => {
    
    data.map((m,ind) => {
       setcat(data)
    })
    setstatus(false)
   

   
  }) 
  
},[])
  const handleRightClick = (event: React.MouseEvent) => {
    // url.get("account-categories").then(({ data }) => {
  
    //   setcat(data)
    // })
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
  };
  // const NestedMenu = ({cat}) => {
  //   url.get("account-categories").then(({ data }) => {
  //     return (
  //      <Menu>
  //     {data.map(m => {
        
      
  //       return (
  //          <NestedMenuItem data={m.category} label="abcde">
  //            </NestedMenuItem>
  //       );
  //     })
  //   }
  //   </Menu>
  //     )
  //   })
  //   }
  const data1 = [
    {
      title: "Top level 1",
      slug: "top-level-1",
      children: [
        {
          title: "Sub level 1",
          slug: "sub-level-1",
          children: [
            {
              title: "Sub Sub level 1",
              slug: "sub-Sub-level-1",
              
            },
            
            
          ]
        },
        
        
      ]
    },
    {
        title: "Top level 2",
        slug: "top-level-2",
        children: [
          {
            title: "Sub level 2",
            slug: "sub-level-2",
          }
        ]
      }
];
  const Menu1 = ({data}) => {
      
    return (<li>
        
        
          {/* <NestedMenuItem
            label={data[0].title}
            parentMenuOpen={handleItem}
            value="1"
            onClick={e => handleItem(e.target.value)}
          > */}
          {/* <Icon align="left" >add</Icon> */}
         
        {data.map((m,ind) => {
          setstatus(true)
         
         
          return (
             <NestedMenuItem
            label={m.category.name}
            parentMenuOpen={handleItem}
            value={m.category.id}
            onClick={e => handleItem(e.target.value)}
          >
            <Icon align="left" onClick={e => handleItem(m.category.id)} >add</Icon> Add New  
                
                 
                    
                        
            {m.sub_categories.length >0 && <Menu1 data={m.sub_categories} />}
                    
                       
                   
                  
                  
                  
            
           
         </NestedMenuItem>
         
         
          );
         
         
      })}
      </li>
    );
  }

  const handleItemClick = (event: React.MouseEvent) => {
    setMenuPosition(null);
  };
  const handleItem = (e) => {

    // setMenuPosition(null);
    alert(e)

  };


  return (
    <div onClick={handleRightClick}>
      <Typography>Right click to open menu</Typography>

      <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}

      >
        {/* <MenuItem onClick={handleItemClick}>+ Add New</MenuItem>
        {data.map((item, ind) => (
          <NestedMenuItem
            label={item.title}
            parentMenuOpen={handleItem}
            value="1"
            onClick={e => handleItem(e.target.value)}
          >
            <MenuItem onClick={e => handleItem(item.category.id)}>+ Add New</MenuItem>
            <MenuItem data={data}></MenuItem>
            {item.children.map((items, ind) =>
            ( */}
            {/* <MenuItem onClick={e => handleItem(item.category.id)}> */}
                <Icon align="left" >add</Icon>new
                <Menu1 data={cat} n={catid}></Menu1>
            {/* </MenuItem> */}
            {/* )
            )
            }
             
          </NestedMenuItem> */}
        {/* ))} */}


      </Menu>
      {/* </TextField> */}
      <div className="px-4 flex justify-center">

        <div className="flex " >
        {/* <Menu
        open={!!menuPosition}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}

      > 
        <NestedMenuItem data={cat} 
        label={cat.name}
            parentMenuOpen={handleItem}
         >
           <Menu>{cat.name}</Menu>
           </NestedMenuItem>
           
        </Menu> */}
          
                  </div>
                 
        <div>
        </div>
      </div>
    </div>


  );
};

export default NestedMenu;
