import {useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs4';

import './style.css';

DataTable.use(DT);

export default function BasicDataTable({tblData, colMap}) {  
  
  useEffect(() => {
    spotConsoleLog("SPOTCONSOLELOG - SETDATA", tblData);
    EvtManager.emit("success", {"msg":"Loaded DataTable"})
  }, [])

  return (
    <DataTable
      data={tblData}
      columns={colMap}
      className="display table table-striped table-bordered"
      width="100%"
    />
  );  
}