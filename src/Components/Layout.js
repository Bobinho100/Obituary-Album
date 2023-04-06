import React from 'react'
import "../Styles/Layout.css"

const Layout = ({obituaryForm, setObituaryForm, obituaryClick}) => {
  return (
    <>
        <div className= "">

            <div className= {`navbar  ${obituaryForm ? 'overlay-active': ''}`}>
                <div></div>
                <h1>The last Show</h1>
                <div className='navbar--obituary'>
                <h4 role='button' onClick={obituaryClick}> + New Obituary</h4>
                    
                </div>
            
            </div>

            <div className='obituary--not-yet'>
                <p>No Obituary Yet</p>
            </div>



        </div>
        
    



    
    
    
    </>
  )
}

export default Layout