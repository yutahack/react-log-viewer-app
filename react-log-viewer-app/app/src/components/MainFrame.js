import React, { useEffect, useState } from "react";
import FilterForm from "./FilterForm";
import LogForm from "./LogForm/LogForm";

const MainFrame = (props) => {
    const [logJson, setlogJson] = useState();
    useEffect(() => {
        setlogJson(props.logJson);
    }, [props.logJson]);

    // Main Frame
    const style_000001 = {
        display: "flex",
        flexDirection: "column",
        width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "100%",
        background: "#000",
        overflow: "scroll",
    };

    return (
        <>
            <div style={style_000001}>
                <FilterForm />
                <LogForm logJson={logJson} />
            </div>
        </>
    );
};

export default MainFrame;
