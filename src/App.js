import { useState } from "react";
import EmpTable from "./Components/EmpTable";


function App() {
  
  return (
    <div className="App">
      <div className="container my-4">
        <h1 className="text-center text-primary border-bottom pb-2">Home</h1>
        <h4 className="text-center text-info mb-4 border-bottom pb-2">Employee</h4>

       

        <EmpTable/>
      </div>
    </div>
  );
}

export default App;
