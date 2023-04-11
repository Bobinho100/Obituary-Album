import React, { useState } from 'react'
import '../Styles/Overlay.css';
import ObituaryImage from '../Styles/obituary_image2.png';

const Overlay = ({setObituaryForm, closeObituaryClick}) => {


    const [flieSelect, setFileSelect] = useState(null);
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');
    const [died, setDied] = useState('')

    const fileChange = (event) =>{
        setFileSelect(event.target.files[0].name);
    }
    const formHandler = (event) => {
        event.preventDefault();
        
    }


  return (
    <>

        <div className='overlay'>
            <div>
            <button class="close" type="button"  onClick={closeObituaryClick}>&#x2715; Close</button>

            </div>
            

            <form onSubmit={formHandler}>
                
                <p>Create a New Obituary</p>


                <label htmlFor='img'className='file-link' >
                    {flieSelect ? `Select an image for the deceased (${flieSelect})`: `Select an image for the deceased`}
                    
                    </label>
                
                <div>
                    <input type='file' id='img'name = 'img' accept='image/*' className='hidden' onChange={fileChange}></input>

                </div>
                <div className='name--input'>
                    <input type= 'text' className='name'></input>

                </div>

                

                <div className='date'>
                    <label htmlFor='born'>Born:</label>
                    <input id='born' name='born' type='datetime-local'></input>
                    <label htmlFor='died'>Died:</label>
                    <input id='died' name='died' type='datetime-local'></input>

                </div>


                <button>Write Obituary</button>

            




            </form>

        
    
        </div>
    
    </>
  )
}

export default Overlay;