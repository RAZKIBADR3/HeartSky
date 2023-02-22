import React , { useContext } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import {Outlet} from 'react-router-dom';
import { BrowseContext } from "./App";

export default function Browse(){
    const {play,audio,Taudio,audios,makeRandom,random,playPreNext,isplayed,changeRepeat,repeat,convertSeconds,time,changeTime,cmp,changeVolume,volume} = useContext(BrowseContext)
    return(
        <div id="Browse">
            <LeftSide/>
            <div className="middleSide">
                <header>
                    <img src="img/logo/logo2.png" alt=""/>
                    <div className="inputP">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Search"/>
                    </div>
                </header>
                <Outlet/>
                <div className="musicPlayer">
                    <div className="cadrP">
                        {Taudio.map((e,i)=>
                        <div key={i} className="cadr">
                            <img src={e.img} alt="cover" />
                            <div>
                                <p className="title">{e.title}</p>
                                <p className="art">{e.art}</p>
                            </div>
                        </div>)}
                    </div>
                    <div className="controlP">
                        <div className="control1">
                            <i onClick={()=>makeRandom(!random)} className={random===false?'fa-solid fa-shuffle':'fa-solid fa-shuffle shuffle-1'}><span></span></i>
                            <i onClick={()=>playPreNext('prev')} className="fa-solid fa-backward-step"></i>
                            <i id='play' onClick={()=>{play(isplayed===true?'stop':'')}} className={isplayed===true?'fa-solid fa-pause':'fa-solid fa-play'}></i>
                            <i onClick={()=>playPreNext('next')} className="fa-solid fa-forward-step"></i>
                            <i onClick={()=>changeRepeat(!repeat)} className={repeat===false?'fa-solid fa-repeat':'fa-solid fa-repeat repeat-1'}><span></span></i>
                        </div>
                        <div className="control2">
                            <span>{convertSeconds(time)}</span>
                            <input type="range" value={time} min='0' max={audio.timer} step='1' onChange={(event)=>{changeTime(event.target.value)}}/>
                            <span>{cmp===0?'00:00':convertSeconds(audio.timer)}</span>
                        </div>
                    </div>
                    <div className="volumeP">
                        <i onClick={()=>{volume>0?changeVolume(0):changeVolume(1)}} className={volume===0?'fa-solid fa-volume-xmark':'fa-solid fa-volume-high'}></i>
                        <input type="range" min='0' value={volume} max='1' step='0.1' onChange={(event)=>{changeVolume(event.target.value)}} />
                    </div>
                </div>
            </div>
            <RightSide play={play} audio={audio} audios={audios}/>
        </div>
    )
}