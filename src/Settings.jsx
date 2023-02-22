import React from "react";

export default function Settings(props){
    return(
        <div id="settings">
            <h1>Settings</h1>
            <div>
                <div className="screenMode">
                    <label>Screen Mode :</label>
                    <select>
                        <option value="1">DarkMode</option>
                        <option value="2">LightMode</option>
                    </select>
                </div>
                <div className="language">
                <label>Language :</label>
                    <select>
                        <option value="1">English</option>
                        <option value="2">Arabic</option>
                    </select>
                </div>
            </div>
            <div className="saveP">
                <span className="save">Save</span>
            </div>
        </div>
    )
}