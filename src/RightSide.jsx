

export default function RightSide(props){
    /*if we don't have a recently played music make an empty array*/
    let audio = []
    if(props.audios.length > 0){
        audio = [props.audios[0]]
    }

    return(
        <div className="rightSide">
            <span>Recent Played</span>
            <div className="cadrP">
                {props.audios.map((e,i)=>
                    <div key={i} onClick={()=>{props.play('play',e)}} className={e.ref===props.audio.ref?'cadr clk':'cadr'}>
                        <img src={e.img} alt="cover" />
                        <div>
                            <p className="title">{e.title}</p>
                            <p className="art">{e.art}</p>
                        </div>
                    </div>
                )}
            </div>
            
            {audio.map((e,i)=>
            <div key={i} className="musicPlayed">
                <img src={e.img} alt="cover"/>
                <span className="title">{e.title}</span>
                <span className="art">{e.art}</span>
            </div>)}
        </div>
    )
}