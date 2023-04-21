import React from 'react'
import "../Styles/Layout.css"
import CardList from './Card';
import Overlay from './Overlay';

const Layout = ({obituaryForm, setObituaryForm, obituaryClick, formSubmitted, setFormSubmitted, addNewCard, cards, editCard, setEditCard}) => {
  return (
    <>
        <div className= "top">

            <div className= "navbar">
                <div></div>
                <h1>The last Show</h1>
                <div className='navbar--obituary'>
                <h4 role='button' onClick={obituaryClick}> + New Obituary</h4>
                    
                </div>
            
            </div>
           {editCard ? (<p>no obi</p>): (
            <CardList />
           )}
                



            



        </div>
        
    



    
    
    
    </>
  )
}

export default Layout