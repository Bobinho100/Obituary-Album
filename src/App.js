import Overlay from "./Components/Overlay";
import Layout from "./Components/Layout";
import { useState } from "react";


function App() {


  const [obituaryFrom, setObituaryForm] = useState(false);

  const obituaryClick = () => setObituaryForm(true);


  return(
    <div>

      <Layout 
      obituaryFrom = {obituaryFrom}
      setObituaryForm = {setObituaryForm}
      obituaryClick = {obituaryClick}

      
      
      />
      
      
      {obituaryFrom && <Overlay 
      
      
      />}

    </div>

    
    
  )

}

export default App;
