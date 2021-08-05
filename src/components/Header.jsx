import React from "react";
import Switch from "./Switch";

export default function Header(props) {
    return <div className="header">
        <Switch isOn={props.value}
            handleToggle={() => props.setValue(!props.value)}
        />
        Digital Human
    </div>;
}
