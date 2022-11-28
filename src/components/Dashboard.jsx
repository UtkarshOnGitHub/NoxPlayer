import { Box, Flex, Image, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useStatStyles,} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import {BsFillSkipBackwardFill, BsFillSkipForwardFill, BsPauseFill, BsPlayFill} from "react-icons/bs";
import song1 from "../Assets/Song3.mp3";
import song2 from "../Assets/Song2.wav";
import song3 from "../Assets/Song1.wav";
let newAudio = new Audio(song1)

let arr = [
    {songTitle:"Anamoly", audioSrc:song1 ,imgSrc:"",artist:"Noxious"},
    {songTitle:"Anamoly", audioSrc:song2 ,imgSrc:"",artist:"Noxious"},
    {songTitle:"Anamoly", audioSrc:song3 ,imgSrc:"",artist:"Noxious"},
]

const Dashboard = () => {
    
    const [playState , setPlayState] = useState(false)
    const [progressValue , setProgressValue] = useState(0/100)

    newAudio.addEventListener("timeupdate",()=>{
        let progress = Math.floor((newAudio.currentTime/newAudio.duration)*100)
        setProgressValue(progress)
        if(newAudio.currentTime===newAudio.duration){
            setPlayState(!playState)
        }
        
    })
    const handlePlaySong =()=>{
        newAudio.play()
        setPlayState(!playState)
    }
    const handlePauseSong =()=>{
        newAudio.pause();
        setPlayState(!playState)
    }

    const handleProgressChange=(e)=>{
        newAudio.currentTime = (e * newAudio.duration)/100

    }

  return (
    <div className="player-container">
        <div className="img-container">
            <img src="https://www.whoa.in/download/cool-trending-mobile-wallpapers-hd-wallpapers-images" alt="Album Art"/>
        </div>
        <div className="data">
            <Text className="title">White Linens</Text>
            <Text className="artist">Vangard</Text>
        </div>
        <div className="progress-container" id="progress-container">
            <Slider aria-label='slider-ex-4' defaultValue={0} value={progressValue} onChange={(val) => {handleProgressChange(val)}}>
                <SliderTrack bg='red.100'>
                    <SliderFilledTrack bg='tomato' />
                </SliderTrack>
                <SliderThumb boxSize={3}>
                    <Box color='tomato'  />
                </SliderThumb>
            </Slider>
        </div>
        
        <div className="player-controls">
            <BsFillSkipBackwardFill className='fas' />
            {!playState ? <BsPlayFill className='fas' onClick={handlePlaySong}/>:<BsPauseFill className='fas' onClick={handlePauseSong}/>}
            <BsFillSkipForwardFill className='fas' onClick={handleForward}/>
        </div>
    </div>
  )
}

export default Dashboard
