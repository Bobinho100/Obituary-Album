import React, { useState } from 'react'
import "../Styles/Card.css"

const Card = ({card}) => {
  const [displayObituary, setDisplayObituary] = useState(false);

  const handleDisplayObituary = () => {
    setDisplayObituary(!displayObituary)
  }

  return (
    <div className="card">
      <div>
        
        {/*<div className='image'>{card.image}</div>*/}
        <div  onClick={handleDisplayObituary} className='image'>
          <img src={card.file_name}  alt = '' />  
          

        </div>
        
        <div>{card.name}</div>
        <div className='date1'>
          <span>{card.born}</span>
          <span>{card.died}</span>

        </div>
      

      </div>
      <div>
        {displayObituary && (
        <div className='obituarymessage'>
          <p>
          DynamoDB is a fully managed, 
          high-performance, NoSQL database service provided by 
          AWS. It is designed to provide fast and predictable
           performance with seamless
           scalability. DynamoDB is a non-relational
            database that allows users to store and 
            retrieve data, while maintaining low latency and high 
            availability. DynamoDB is a schema-less database, which 
            means that users can store data in any format
             without defining a schema beforehand.
          </p>

        </div>)
        }
       
        <div className='polly'>
          <button>polly</button>
        </div>

        
      </div>

    

        
       
       




    </div>
  )
}

export default Card