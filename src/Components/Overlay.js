import React, { useState } from 'react'
import '../Styles/Overlay.css';
import CardList from './Card'

import ObituaryImage from '../Styles/obituary_image2.png';

const Overlay = ({setObituaryForm, closeObituaryClick, formSubmitted, setFormSubmitted, submitedForm, cards}) => {


    const [flie_name, setFileSelect] = useState(null);
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');
    const [died, setDied] = useState('')
    

    
    const fileChange =  (event) =>{
        setFileSelect(event.target.files[0]);
    }
    const formHandler = async(event)  => {
        event.preventDefault();
        const data = new FormData();
        data.append("file_name", flie_name)
        data.append("name",name)
        data.append("born",born)
        data.append("died",died)


        /*const promise = await fetch("https://wopiity5iyqkdb6ufndzevh64a0kquuk.lambda-url.ca-central-1.on.aws/", {
            method: "POST",
            
            body: data
        })

        console.log(promise)*/
        //closeObituaryClick()
        //setObituaryForm(false)

        //setFormSubmitted(true)

        //console.log('formData:', data.get('name'))
        submitedForm(data)
        

        
        
    
        
    }


  return (
    <>


      


        <div className='overlay'>
            <div>
            <button className="close" type="button"  onClick={closeObituaryClick}>&#x2715; Close</button>

            </div>
            

            <form onSubmit={formHandler}>
                
                <p>Create a New Obituary</p>


                <label htmlFor='img'className='file-link' >
                    {flie_name ? `Select an image for the deceased (${flie_name})`: `Select an image for the deceased`}
                    
                    </label>
                
                <div>
                    <input type='file' id='img'name = 'img' accept='image/*' className='hidden' onChange={fileChange}></input>

                </div>
                <div className='name--input'>
                    <input type= 'text'  onChange={(e) => setName(e.target.value)} className='name'></input>

                </div>

                

                <div className='date'>
                    <label htmlFor='born'>Born:</label>
                    <input id='born' name='born' onChange={(e)=> setBorn(e.target.value)} type='datetime-local'></input>
                    <label htmlFor='died'>Died:</label>
                    <input id='died' name='died' onChange={(e)=> setDied(e.target.value)} type='datetime-local'></input>

                </div>


                <button>Write Obituary</button>

            




            </form>

            

        
    
        </div>
        
        
    
    </>
  )
}
  
  


export default Overlay;