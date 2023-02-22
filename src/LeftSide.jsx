import { Fragment , useContext} from "react";
import {Link} from "react-router-dom";
import { BrowseContext } from "./App";

export default function LeftSide(){
    const {navB} = useContext(BrowseContext)
    return(
        <div className="leftSide">
            <nav>
                {navB.map((e,i)=>
                    <Fragment key={i}>
                        {e.name==='Settings'?<hr />:''}
                        <div>
                            <i className={e.cls}></i>
                            {e.name==='Home'?<a href='/'>{e.name}</a>:<Link to={e.name!=='Browse'?e.name:'/Browse'}>{e.name}</Link>}
                        </div>
                    </Fragment>
                )}
            </nav>
        </div>
    )
}