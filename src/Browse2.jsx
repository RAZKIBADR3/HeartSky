import { useContext , Fragment } from "react";
import { BrowseContext } from "./App";

export default function Browse2(props){
    const {data,audio,play,convertSeconds} = useContext(BrowseContext)
    
    return(
        <Fragment>
            <div className="slideP">
                <div className="slides">
                    <div className="slide1"></div>
                    <div className="slide2"></div>
                    <div className="slide3"></div>
                    <div className="slide4"></div>
                </div>
            </div>

            <table>
                <thead className="cadrLabels">
                    <tr>
                        <td>#</td>
                        <td>title</td>
                        <td>artiste</td>
                        <td>time</td>
                        <td>playing</td>
                    </tr>   
                </thead>
                <tbody className="cadrP">
                    {data.map((e,i)=>
                    <tr onClick={()=>{play('play',e)}} key={i} className={e.ref===audio.ref?'cadr clk':'cadr'}>
                        <td>
                            <span>{i+1}</span>
                            <img src={e.img} alt="cover"/>
                        </td>
                        <td>{e.title}</td>
                        <td>{e.art}</td>
                        <td>{convertSeconds(e.time)}</td>
                        <td>{e.playing}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </Fragment>
    )
}