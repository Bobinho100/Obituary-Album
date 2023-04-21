import React, { useEffect, useState } from 'react'
import Card from './Card'

const CardList = ({cards}) => {
    const[card, setCard] = useState([]);
    //const [error, setError] = useState(false);

    /*const getCards = async () => {
        try{
            const promise = await fetch("https://ufgwofspyiqnxbwk5fxwjlighe0delab.lambda-url.ca-central-1.on.aws/",{
            method: "GET",
            })
            //if (promise.status === 200){
                console.log(promise)
                const note = await promise.json();

                console.log(note)
                setCard(note);
              
        } catch (e) {
            setError(true)
        }
            

    }
       
        
       
    useEffect(()=> {
        getCards();
    }, [])*/

    


  return (
    <div>
        {cards.length > 0 ? (
            <div className='page'>
                {cards.map((card) => (
                    <Card key = {card.id} item = {card}/>
                ))}
            </div>

        ):
        (
            <div className='obituary--not-yet'>
              <p>No Obituary Yet</p>
            </div>

          )
        
        }
    </div>

  )
}

export default CardList