import React from 'react';
import axios from 'axios';

//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';



function Users() {

    $(function () {

        axios.get('http://localhost:4000/get')
            .then(function (response) {
                let finalData = response.data;
                console.log(finalData)

                let tableData = "";
                finalData.forEach((values) => {
                    tableData += `<tr class='text-center'>`;
                    tableData += `<td>${values.fullName}</td>`;
                    tableData += `<td>${values.age}</td>`;
                    tableData += `<td>${values.sex}</td>`;
                    tableData += `<td>${values.mobile}</td>`;
                    tableData += `<td>${values.address}</td>`;
                    tableData += `<td>${values.govtId}</td>`;
                    tableData += `<td>${values.guardian}</td>`;
                    tableData += `<td>${values.nationality}</td>`;
                    tableData += `</tr>`;
                });
                document.getElementById('tableData').innerHTML = tableData;
                // place the DataTables initialization command here:
                $("#myTable").DataTable();
            })// note how the above command MUST BE INSIDE the "then" function

    
           .catch(function (error) {
            console.log(error);
           })
        });







    //Datatable HTML
    return (

        <div className="MainDiv p-3">
            <div>
                <h2 className='text-center'>Users List</h2>
            </div>
            <div>

                <table id="myTable" className="display">
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Govt ID</th>
                            <th>Guardian Details</th>
                            <th>Nationality</th>

                        </tr>
                    </thead>
                    <tbody id='tableData'>

                        <tr>
                            {/* <td>Balachandran</td>
                            <td>45</td>
                            <td>Male</td>
                            <td>8234561290</td>
                            <td>velachery</td>
                            <td>blpps0104n</td>
                            <td>vishwanath</td>
                            <td>Indian</td> */}
                        </tr>
                        {/* <tr>
                            <td>Ishita Kumari</td>
                            <td>25</td>
                            <td>female</td>
                            <td>8234561223</td>
                            <td>velachery</td>
                            <td>blpr5r5u8n</td>
                            <td>vishwanath</td>
                            <td>Indian</td>
                        </tr>
                        <tr>
                            <td>Raman bhalla</td>
                            <td>25</td>
                            <td>female</td>
                            <td>8234561223</td>
                            <td>velachery</td>
                            <td>blpr5r5u8n</td>
                            <td>Toshi</td>
                            <td>Indian</td>
                        </tr> */}


                    </tbody>
                    <tfoot>
                        <tr>

                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Govt ID</th>
                            <th>Guardian Details</th>
                            <th>Nationality</th>

                        </tr>
                    </tfoot>

                </table>

            </div>
        </div>

    );
}






export default Users
