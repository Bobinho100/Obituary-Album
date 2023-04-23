import React, { useState } from 'react'
import "../Styles/Card.css"

const Card = ({card}) => {
  const [displayObituary, setDisplayObituary] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio, setAudio] = useState(null);


  const handleDisplayObituary = () => {
    setDisplayObituary(!displayObituary)
  }

  const handlePlayAudio = () => {
    if (!audio) {
      const newAudio = new Audio(card.polly_url);
      setAudio(newAudio);
      newAudio.play();
      setAudioPlaying(true);
    } else {
      if (audioPlaying) {
        audio.pause();
        setAudioPlaying(false);
      } else {
        audio.play();
        setAudioPlaying(true);
      }
    }
  };


  return (
    <div className="card">
      <div>
        
        {/*<div className='image'>{card.image}</div>*/}
        <div  onClick={handleDisplayObituary} className='image'>
          <img src={card.image_url}  alt = '' />  
          

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
          {card.obituary_message}
          </p>

        </div>)
        }
       
        <div className='polly'>
          <button onClick={handlePlayAudio}>
            
          {audioPlaying ? 'Pause' : 'Play'} Polly

            </button>
        </div>

        
      </div>

    

        
       
       




    </div>
  )
}

export default Card