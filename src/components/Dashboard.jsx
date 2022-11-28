import { Box, Flex, Image, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useStatStyles,} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import {BsFillSkipBackwardFill, BsFillSkipForwardFill, BsPauseFill, BsPlayFill} from "react-icons/bs";
import song1 from "../Assets/Song3.mp3";
import song2 from "../Assets/Song2.mp3";
import song3 from "../Assets/Song1.mp3";
let newAudio = new Audio(song3)

let arr = [
    {songTitle:"Reason To Kill You", audioSrc:song3 ,imgSrc:"https://play-lh.googleusercontent.com/ISSpyeMde6MqPGYcrFN5tQyRUtPX903MDuwiQuLqXGOVNDX9Bt0a34iwnkK16b2lFxU",artist:"Noxious Beats"},
    {songTitle:"Anamoly", audioSrc:song1 ,imgSrc:"https://wallpapercave.com/wp/wp8297104.jpg",artist:"Noxious Beats"},
    {songTitle:"Ignite-Guitar Type Beat", audioSrc:song2 ,imgSrc:"https://w0.peakpx.com/wallpaper/322/439/HD-wallpaper-x-xten-blue-cool-design-rap-rapper-red.jpg",artist:"Noxious Beats"},

]
let i =0 
const fixTime = (time) => {
    if(!time){
        return `00`
    }
    return time > 10 ? time : "0" + time;
  };
  
  const formatTime = (time) => {
    const seconds = time % 60;
    const min = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / (60 * 60));
    return `${fixTime(min)}:${fixTime(seconds)}`;
  };
const Dashboard = () => {

    let time = formatTime(Math.floor(newAudio.duration)) || `0:00`
    const [Currtime , setCurrTime] = useState(time)
    const [playState , setPlayState] = useState(false)
    const [progressValue , setProgressValue] = useState(0/100)
    const [title,setTitle] = useState(arr[0].songTitle)
    const [artist,setArtist] = useState(arr[0].artist)
    const [image ,setImage] = useState(arr[0].imgSrc)


    newAudio.addEventListener("timeupdate",()=>{
        let progress = Math.floor((newAudio.currentTime/newAudio.duration)*100)
        setProgressValue(progress)
        let timeZone = formatTime(Math.floor(newAudio.currentTime)) || `0:00`
        setCurrTime(timeZone)
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

    const handleForward =()=>{
        if(i==arr.length-1){
            i=0
        }else{
            i++
        }
        newAudio.pause();
        setPlayState(false)
        newAudio = new Audio(arr[i].audioSrc);
        setTimeout(()=>{
            setTitle(arr[i].songTitle)
            setArtist(arr[i].artist)
            setImage(arr[i].imgSrc)
            newAudio.play()
            setPlayState(true)
        },500)

    }

        const handleBackward =()=>{
            if(i==0){
                i = arr.length
            }
            i--
            newAudio.pause()
            setPlayState(false)
            newAudio = new Audio(arr[i].audioSrc);
            setTimeout(()=>{
                setArtist(arr[i].artist)
                setTitle(arr[i].songTitle)
                setImage(arr[i].imgSrc)
                newAudio.play()
                setPlayState(true)
            },500)

        }

  return (
    <div className='main'>
    <div className="player-container">
        <div className="img-container">
            <img src={image} alt="Album Art"/>
        </div>
        <div className="data">
            <Text className="title">{title}</Text>
            <Text className="artist">{artist}</Text>
        </div>
        <div className="progress-container" id="progress-container">
            <Slider aria-label='slider-ex-4' defaultValue={0} value={progressValue} onChange={(val) => {handleProgressChange(val)}}>
                <SliderMark value={0} mt='1' mr='-3.5' fontSize='sm'>{Currtime}</SliderMark>
                <SliderMark value={95} mt='1' ml='-3.5' fontSize='sm'>{time}</SliderMark>
                <SliderTrack bg='red.100'>
                    <SliderFilledTrack bg='tomato' />
                </SliderTrack>
                <SliderThumb boxSize={3}>
                    <Box color='tomato'  />
                </SliderThumb>
            </Slider>
        </div>
        
        <div className="player-controls" border="1px solid red">
            <BsFillSkipBackwardFill className='fas' onClick={handleBackward} />
            {!playState ? <BsPlayFill className='fas' onClick={handlePlaySong}/>:<BsPauseFill className='fas' onClick={handlePauseSong}/>}
            <BsFillSkipForwardFill className='fas' onClick={handleForward}/>
        </div>
    </div>
    </div>
  )
}

export default Dashboard
