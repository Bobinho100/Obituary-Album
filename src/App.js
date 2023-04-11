import Overlay from "./Components/Overlay";
import Layout from "./Components/Layout";
import './App.css'
import { useState } from "react";


function App() {


  const [obituaryFrom, setObituaryForm] = useState(false);
  const [ovelayIsVisible, setOverlayIsVisible] = useState(false);

  const obituaryClick = () => {
    setObituaryForm(true)
    setOverlayIsVisible(true)
  };
  const closeObituaryClick = () => {
    setObituaryForm(false)
    setOverlayIsVisible(false)
  };


  return(
    <div>

      <div className={`${ovelayIsVisible ? 'overlay-visible': ''}`}>

        <Layout 
        obituaryFrom = {obituaryFrom}
        setObituaryForm = {setObituaryForm}
        obituaryClick = {obituaryClick}

        
        
        />


      </div>
      <div>

        {obituaryFrom &&(
          <div /*style={{position: 'absolute', top:0}}*/>
        <Overlay
          setObituaryForm={setObituaryForm}
          closeObituaryClick = {closeObituaryClick} 
          
          />
        </div>
        )}


      </div>

      
      
      
      
      

    </div>

    
    
  )

}

export default App;
