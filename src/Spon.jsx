import React  from "react";

export default function Spon(props){
    return(
        <div className="Spon">
            {/*display the images of sponsores*/}
            {props.imgs.map(e=><img key={e.id} src={e.src} alt="sponsore"/>)}
        </div>
    )
}