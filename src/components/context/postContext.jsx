import React, { useState } from "react";
export const postContext = React.createContext();

export default function PostProvider(props) {

    const [model, setModel] = useState("");

    const state = {
        model: model,
        setModel: setModel,
    }
    return (

        <postContext.Provider value={state}>
            {props.children}
        </postContext.Provider>

    )
}