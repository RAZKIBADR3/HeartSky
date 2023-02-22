import React, {useState , useEffect} from "react";
import './Css/style.css';
import Home from "./Home";
import Spon from "./Spon";
import Browse from "./Browse";
import {BrowserRouter as Router, HashRouter, Route , Routes} from 'react-router-dom';
import Browse2 from "./Browse2";
import Library from "./Library";
import Settings from "./Settings";
import data from "./Data/data";

/*array contain Home navs*/
const navH = ['Home','About','Discover','Premium'];
/*array contain images-url of sponsers*/
const imgs = [
    {id:0,src:'img/Spon/vevo.png'},
    {id:1,src:'img/Spon/Spotify.png'},
    {id:2,src:'img/Spon/soundCloud.png'},
    {id:3,src:'img/Spon/Dezeer.png'},
    {id:4,src:'img/Spon/shamzam.png'}
]
/*array contain objects each object have the className from fontAwsome and a name*/
const navB = [
    {cls:'fa-solid fa-house',name:'Home'},
    {cls:'fa-regular fa-window-maximize',name:'Browse'},
    {cls:'fa-solid fa-music',name:'Library'},
    {cls:'fa-solid fa-gear',name:'Settings'}
]
export const BrowseContext = React.createContext()
/*create app component*/
export default function App() {
/*the State which have the audio object that we work on it*/
const [audio,setAudio] = useState(new Audio())
/*the State that have the audios objects which recently played*/
const [audios,setAudios] = useState([])
/*the State to know if audio played or not*/
const [isplayed,setIsplayed] = useState(false)
/*the State to know if music has started or not*/
const [cmp,setCmp] = useState(0)
/*the State that have the volume level*/
const [volume,setVolume] = useState(1)
/*the State that have the timeCurrent of audio*/
const [time,setTime] = useState(0)
/*the State that have the value of loop : true or false*/
const [repeat,setRepeat] = useState(false)
/*the State that have value for random-switch : true or false*/
const [random,setRandom] = useState(false)

/*if we don't have a recently played music make an empty array*/
let Taudio = []
if(audios.length > 0){
    Taudio = [audios[0]]
}

/*function that call in play and pause event*/
function play(etat='',e=''){
    /*when call as play event*/
    if(etat==='play' && e!==''){
        /*make an array that contain the recently music played*/
        setAudios([e,...audios.filter(ee=>ee!==e)])
        /*change IsplayedState to true that mean music has start to play '_'*/
        setIsplayed(true)
        /*change CmpState to 1 that mean music has started and we have a recently music played*/
        setCmp(1)
        /*pause the previous music*/
        audio.pause()
        /*create a new audio object and pass the volume level and ref,timer,loopValue atrributs */
        let a = new Audio(e.src)
        a.volume = volume
        a['ref']=e.ref
        a['timer']=e.time
        a.loop = repeat
        /*play the audio*/
        changeTime(0)
        a.play()
        /*pass the audio object to audioState*/
        setAudio(a)
    }/*when call as pause event*/
    else if(etat==='stop'){
        /*pause music*/
        audio.pause()
        setIsplayed(false)
    }/*when call as playEgain event*/
    else if(etat==='' && cmp===1){
        /*playMusic Egain music*/
        setIsplayed(true)
        audio.play()
    }
}

function playPreNext(etat){
    /*make sure that we have a recently played music*/
    if(cmp>0){
        /*find the music that playing now and get his index from data table*/
        let length = data.length
        let obj = data.find(e=>e.ref===audio.ref)
        let i = data.indexOf(obj)
        /*switch music depending on the case*/
        if(etat==='next'){
            if(random && repeat){
                play('play',data[i])
            }else if(random){
                let i2 = Math.floor(Math.random()*data.length)
                while(i===i2){
                    i2 = Math.floor(Math.random()*data.length)
                }
                play('play',data[i2])
            }else if(repeat){
                play('play',data[i])
            }else if(i<length-1){
                play('play',data[i+1])
            }
        }else if(etat==='prev' && i>0){
            play('play',data[i-1])
        }
    }
}

/*function to change volume level of audio object*/
function changeVolume(vol){
    audio.volume=vol
    setVolume(audio.volume)
}

/*function to change timeCurrent of audio object*/
function changeTime(t){
    audio.currentTime = t
    setTime(t)
}

/*function convert seconds('Float') to timer('String')*/
function convertSeconds(s){
    let restM = Math.floor(s/60)
    let restS = Math.floor(s - restM*60)
    // if(restM <= 10){
    //     restM = `0${restM}`
    // }
    // if(restS < 10){
    //     restS = `0${restS}`
    // }
    return `${restM.toString().padStart(2,'0')}:${restS.toString().padStart(2,'0')}`
}

/*function change ReapetState by passing bolean value to make a loop music*/
function changeRepeat(bol){
    setRepeat(bol)
    audio.loop = bol
}

/*function to make a randomSwitch music*/
function makeRandom(bol){
    setRandom(bol)
}

useEffect(() => {
    if(isplayed===true){
        if(audio.currentTime>=audio.timer && !repeat){
            audio.currentTime = 0;
            /*after each render if music ended and repeat=false
            find the music that playing now and get his index from data table*/
            let obj = data.find(e=>e.ref===audio.ref)
            let i = data.indexOf(obj)
            /*if random=true make a switch random*/
            if(random){
                let i2 = Math.floor(Math.random()*data.length)
                while(i===i2){
                    i2 = Math.floor(Math.random()*data.length)
                }
                play('play',data[i2])
            }/*if audio not the last audio in the table make a NextSwitch*/
            else if(i < data.length-1){
                playPreNext('next')
            }/*if audio the last audio in the table Call play('stop') to change isplayedState to false*/
            else if(i === data.length-1){
                play('stop')
            }
        }else{
            /*this code to change the time of audio object that playing now after each second*/
            setTimeout(()=>{
                setTime(audio.currentTime)
            },1000)
        }
    }
})

    return(
        <HashRouter>
            <BrowseContext.Provider value={{navB,data,play,audio,Taudio,audios,makeRandom,random,playPreNext,isplayed,changeRepeat,repeat,convertSeconds,time,changeTime,cmp,changeVolume,volume}}>
            <Routes>
                <Route path="/" element={
                    <>
                        <Home nav={navH}/>
                        <Spon imgs={imgs}/>
                    </>
                }/>
                <Route path="Browse" element={<Browse/>}>
                    <Route path='/Browse' element={<Browse2/>}/>
                    <Route path='Library' element={<Library/>}/>
                    <Route path='Settings' element={<Settings/>}/>
                </Route>
            </Routes>
            </BrowseContext.Provider>
        </HashRouter>
    )
}