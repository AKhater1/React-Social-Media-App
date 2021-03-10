import React, {useContext} from "react";

import StateContext from "../StateContext";

function FlashMessages (props) {
    const appState = useContext(StateContext)
  return (
    <div className="floating-alerts">
        {appState.flashMessages.map((msg, index) => (
                <div key={index} className="alert alert-success floating-alert text-center shadow-sm">{msg}</div>
            )
        )}
    </div>
  )
}

export default FlashMessages;
