import React from 'react'

export default function table() {

    const studentDetail = [
        {
          id:1,
          name: "Rahul",
          roll_no: 10,
          class: "1st",
          school: "ABC"
        },
        {
          id:2,
          name: "Karthik",
          roll_no: 11,
          class: "2st",
          school: "ABC"
        },
        {
          id:3,
          name: "Karthik",
          roll_no: 11,
          class: "2st",
          school: "ABC"
        },
        {
          id:4,
          name: "Karthik",
          roll_no: 11,
          class: "2st",
          school: "ABC"
        }
    
      ];

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Sl No.</th>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Class </th>
                    <th>School</th>
                </tr>
            </thead>
            <tbody>
                {studentDetail.map((item,index)=>{return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.roll_no}</td>
                    <td>{item.class}</td>
                    <td>{item.school}</td>
                    
                  </tr>
                )})}
            </tbody>
        </table>
    </div>
  )
}
