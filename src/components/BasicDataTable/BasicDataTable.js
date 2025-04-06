import {useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs4';

import './style.css';

DataTable.use(DT);

export default function BasicDataTable({headers, tblData, colMap}) {
  //console.error("BASIC DATATABLE INPUT:", headers, tblData, colMap)
  
  
  // const [cols, setHeaders] = useState({headers})
  const [data, setData] = useState({tblData})
  //const [dataMap, setDataMap] = useState({colMap})

  useEffect(() => {
    console.error("SETDATA", tblData)
    //setData({tblData});
  }, [])

  //var dataSet = [["TEST0","Bus","20","0","0"],["DJM MMC 111","Bus","23","0","0"]];
  //var dataSet = [{"vid":"TEST0","type":"Bus","capacity":"20","status":"0","fuelType":"0"},{"vid":"DJM MMC 111","type":"Bus","capacity":"23","status":"0","fuelType":"0"}];
  //var dataSet = [["TEST0","Bus",20,0,0],["DJM MMC 111","Bus",23,0,0],["6750","Bus",22,0,null],["DJM MMC 222","Bus",23,0,0],["TEST1","Bus",20,0,0],["TEST2","Bus",20,0,0],["TEST3","Bus",20,0,0],["TEST4","Bus",20,0,0],["TEST5","Bus",20,0,0],["TEST6","Bus",20,0,0],["TEST7","Bus",20,0,0],["TEST8","Bus",20,0,0],["TEST9","Bus",20,0,0]];
  return (
    <DataTable data={data} columns={colMap} className="display">
        <thead>
            <tr>
            {colMap.map((data,index) => (
              <th key={index}>{data.title}</th>
            ))}
            </tr>
        </thead>
    </DataTable>
  );  
}