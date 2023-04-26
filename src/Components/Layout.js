import React from 'react'
import "../Styles/Layout.css"
import Card from './Card';
import CardList from './CardList';
import Overlay from './Overlay';

const Layout = ({obituaryForm, setObituaryForm, obituaryClick, formSubmitted, setFormSubmitted, addNewCard, cards, editCard, setEditCard, check}) => {
  return (
    <>
        <div className= "top">

            <div className= "navbar">
                <div></div>
                <h1>The last Show</h1>
                <div className='navbar--obituary'>
                <h4 role='button' onClick={obituaryClick}> + New Obituary </h4>
                    
                </div>
            
            </div>
            <div className='card--container'>

              <div className='default--container'>

              {check && (<p className='default'> No Obituary yet</p>)}


              </div>
              
              
           {editCard ? (<p>no obi</p>): 
           
           
           
           (

            <div className='testing'>
            
                <CardList cards = {cards} />
              
            
              </div>
           
           )
           
           }
              </div>
        </div>
        
    



    
    
    
    </>
  )
}

export default Layout