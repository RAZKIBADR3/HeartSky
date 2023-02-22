import React  from "react";
import { Link } from "react-router-dom";

export default function Home(props){
    return(
        <div id="Home">
            {/*header section*/}
            <header>
                {/*logo*/}
                <img src="img/logo/logo.png" alt=""/>
                {/*nav*/}
                <nav>
                    {/*display the nav items*/}
                    {props.nav.map((e,i)=>
                    <span key={i}>{e}</span>
                    )}
                </nav>
                {/*the menu that display in smallDvices to show and hides the nav*/}
                <div className="Menu" onClick={()=>{document.querySelector('body').classList.toggle('open')}}>
                    <span></span><span></span><span></span>
                </div>
                {/*the rights button*/}
                <div className="btn-parent">
                    <input className="btn login" type='button' value='Login'/>
                    <Link className="btn GetStarted" to="Browse">Get Started</Link>
                </div>
            </header>
            {/*home-body section*/}
            <div className="Home-body-parent">
                <div className="Home-body">
                    <h1>Feed your soul with HeartSky</h1>
                    <p>Music Is Life Itself</p>
                    <div className="btn-parent">
                        <Link className="btn GetStarted" to="Browse">Get Started</Link>
                        <span>Learn More..</span>
                    </div>
                </div>
            </div>
        </div>
    )
}