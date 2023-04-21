import Overlay from "./Components/Overlay";
import Layout from "./Components/Layout";
import './App.css'
import { useState } from "react";
import CardList from "./Components/CardList";


function App() {


  const [obituaryFrom, setObituaryForm] = useState(false);
  const [ovelayIsVisible, setOverlayIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(true)

  const obituaryClick = () => {
    
    setObituaryForm(true)
    setOverlayIsVisible(true)
    
    setFormSubmitted(false)
      

    
    
    
  };
  const addCard = (card) => {
    setCards((previous) => [...cards, card])
  }
  const closeObituaryClick = () => {
    setObituaryForm(false)
    setOverlayIsVisible(false)
    
  };
  const submitedForm = (formData) => {
    const newCard = {
      id: cards.length + 1,
      name: formData.name,
      born: formData.born,
      died: formData.died,
      obituary_message: formData.obituary_message,
      polly: formData.polly,
    };
    setCards((previousCard) => {
      return [newCard, ...previousCard]
    })
    //addCard(newCard)
    setFormSubmitted(true)
    setOverlayIsVisible(false)
    setObituaryForm(false)
    setEditCard(!editCard)
  }
  


  


  return(
    <div>

      <div className={`${ovelayIsVisible ? 'overlay-visible': ''}`}>

        <Layout 
        obituaryFrom = {obituaryFrom}
        setObituaryForm = {setObituaryForm}
        obituaryClick = {obituaryClick}
        formSubmitted = {formSubmitted}
        setFormSubmitted = {setFormSubmitted}
        cards = {cards}
       
        

        
        
        />


      </div>
      <div>

        {obituaryFrom && (
          <div /*style={{position: 'absolute', top:0}}*/>
        <Overlay
          setObituaryForm={setObituaryForm}
          closeObituaryClick = {closeObituaryClick}
          formSubmitted = {formSubmitted}
          setFormSubmitted = {setFormSubmitted}
          submitedForm = {submitedForm}
          cards = {cards}
          editCard = {editCard}
          setEditCard = {setEditCard}

          
          />
        </div>
        )
      }
        
       

      </div>

      
      
      
      
      

    </div>

    
    
  )

}

export default App;
