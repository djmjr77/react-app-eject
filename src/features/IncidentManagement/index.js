import React, {useEffect, useState, Suspense} from 'react';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import BasicDataTable from '../../components/BasicDataTable/BasicDataTable';

export default function IncidentManagement() {
  
  const [tableData, setTableData] = useState([]);
  const [dataMap, setDataMap] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading is default to true
  const [error, setError] = useState(null); // no errors by default

  const handleNewIncidentClick = () => {
    // implementation details
    //alert("CLICKED")
    socket.emit('myEvt', "TEST REACT");
  };

  // this is just an example of using classes and functionality provided by the Spot Consoles client side code
  //   to show we can build the app as well as show the code splitting
  // the "Detour Management" test module button will emit a socket event which will be replied to by the server
  // this toast message will not be displayed until you have clicked and rendered/loaded js chunks of the Incident Management module
  useEffect(() => {
    socket.on('alertEvent', (data) => {
      EvtManager.emit("warning", {"msg": "Got Event " + data.message})
      spotConsoleLog("React received Test Socket Event from server: ", data);
    });

    return () => {
      spotConsoleLog("React cleaning up / removing Test Socket Event");
      socket.off('alertEvent');
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // set loading true before fetch starts ...
      setError(null);     // clear previous errors ...

      try {
        const response = await fetch('/data/getVehicleData');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();

        // set the columns, could make this more dynamic by parsing the response (just a test)
        setDataMap([
          { "title": 'ID',"data": 'vid' },
          { "title": 'Type',"data": 'type' },
          { "title": 'Capacity',"data": 'capacity' },
          { "title": 'State',"data": 'status' },
          { "title": 'Fuel Type',"data": 'fuelType' }
        ]);

        const tempTableData = responseData.map(item => ({
          vid: item.vid,
          type: item.type,
          capacity: item.capacity,
          status: item.status,
          fuelType: item.fuelType
        }));

        // spotConsoleLog(JSON.stringify(tempTableData));

        setTableData(tempTableData); // update  the table data

      } catch (err) {
        console.error("Error fetching vehicle data:", err);
        setError(err.message);
        setTableData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    }, [])

    // set conent conditionally since the first render will not hav the table data yet
    let content;
    if (isLoading) {
      content = <p>Loading data...</p>;
    } else if (error) {
      content = <p>Error loading data: {error}</p>;
    } else { 
      content = <BasicDataTable tblData={tableData} colMap={dataMap} />;
    }

    return (
      <div>
        <button type="button" class="eta-btn eta-btn-lg eta-btn-primary" onClick={handleNewIncidentClick}>
          <i class="icon-add" /> New Incident
        </button>
        <ErrorBoundary fallback={<p>Error Loading Data Table</p>}>
          {content}
        </ErrorBoundary>
      </div>
    )
}