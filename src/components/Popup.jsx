import { createContext, useContext } from "react";

const popup_styles = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#1dc6dd'
}

export const PopupContext = createContext('')

export default function Popup() {

    const {commentState} = useContext(PopupContext)

    return (
        <div style={popup_styles}>
            <h3 style={{color:'white',backgroundColor:'#1dc6dd',textAlign:'center'}}>
                {commentState}
            </h3>
        </div>
    )
}
