import React from "react";

const FilterForm = (props) => {
    // Main Frame
    const style_000000 = {
        display: "flex",
        flexDirection: "column",
        width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "50px",
        height: "100px",
        background: "#333",
        position: "-webkit-sticky" /* 사파리 브라우저 지원 */,
        position: "sticky",
        top: "0px",
    };

    //
    const style_000001 = {
        display: "flex",
        width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "100%",
        height: "100px",
        alignItems: "center",
        color: "#fff",
        padding: "10px",
    };

    return (
        <>
            <div style={style_000000}>
                <div style={style_000001}>Log Viewer Ver 1.0.0</div>
            </div>
        </>
    );
};

export default FilterForm;
