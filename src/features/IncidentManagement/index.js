import React, {useEffect, useState} from 'react';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import BasicDataTable from '../../components/BasicDataTable/BasicDataTable';

export default function IncidentManagement() {
  const [tableHeaders, setTableHeaders] = useState([])
  const [tableData, setTableData] = useState([])
  const [dataMap, setDataMap] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      fetch('/data/getVehicleData').then(
        response => response.json()
      ).then ((response) =>{
        //console.error("RESPONSE", data);
        //setTableHeaders(["ID", "Type", "Capacity", "State", "Fuel Type!"]);
        setDataMap([
          // { "title": 'ID',"data": 'vid' },
          // { "title": 'Type',"data": 'type' },
          // { "title": 'Capacity',"data": 'capacity' },
          // { "title": 'State',"data": 'status' },
          // { "title": 'Fuel Type!!',"data": 'fuelType' }

          { "title": 'ID'},
          { "title": 'Type' },
          { "title": 'Capacity'},
          { "title": 'State'},
          { "title": 'Fuel Type!!'}
        ]);
        //let tempData = {"data":[]};
        let tempData = [];
        for (let i in response) {
          // tempData.data.push({"vid":response[i].vid,
          //                      "type":response[i].type,
          //                      "capacity":response[i].capacity,
          //                      "status":response[i].status,
          //                      "fuelType":response[i].fuelType})
          tempData.push([response[i].vid,response[i].type,response[i].capacity,response[i].status,response[i].fuelType])
        }

        console.error(JSON.stringify(tempData));
        setTableData(tempData);
      });
    }
    fetchData();
    }, [])
    return (
      <div>
        <ErrorBoundary fallback={<p>Error Loading Data Table</p>}>
          <BasicDataTable tblData={tableData} colMap={dataMap}  />
        </ErrorBoundary>
      </div>
      
    )
}