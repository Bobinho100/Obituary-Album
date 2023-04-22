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
    setCards((previous) => [...previous, card])
  }
  const closeObituaryClick = () => {
    setObituaryForm(false)
    setOverlayIsVisible(false)
    
  };
  const submitedForm = (formData) => {
    console.log('12formData:', formData)
    const newCard = {
      id: cards.length + 1,
      image:formData.get('file_name'),
      name: formData.get('name'),
      born: formData.get('born'),
      died: formData.get('died'),
      obituary_message: formData.get('obituary_message'),
      polly: formData.get('polly')
    };

    console.log('newCard:', newCard)
    setCards((previousCard) => {
      return [newCard, ...previousCard]
    })
    //addCard(newCard)
    //console.log('form::', formData.get('name'))
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
