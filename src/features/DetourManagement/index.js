import React, {useEffect, useState} from 'react';
import ETAButton from '../../components/ETAButton';

export default function DetourManagement() {
  const [backendData, setBackendData] = useState([{}])
  
    useEffect(() => {
      fetch('/data/getVehicleData').then(
        response => response.json()
      ).then (
        data => {
          setBackendData(data)
        }
      )
    }, [])
    return (
      <div>
        <div> Detour Management</div>
        <ETAButton />
        {(typeof backendData == "undefined") ? (
          <p>Loading Detours ....</p>
        ) : (
          backendData.map((vehicle, i) => (
            <p key={i}>ID: {vehicle.vid}</p>
          ))
        )}
      </div>
      
    )
}