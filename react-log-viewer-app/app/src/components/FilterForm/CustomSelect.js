import React from "react";

const CustomSelect = (props) => {
    // Main Frame
    const style_000000 = {
        display: "flex",
        flexDirection: "row",
    };

    // Button Style
    const style_000010 = {
        display: "flex",
        flexDirection: "column",
        color: "white",
        fontWeight: "600",
        padding: "5px",
        borderRadius: "10px",
        background: "red",
    };

    return (
        <>
            <div style={style_000000}>
                <button style={style_000010}>버튼1</button>
            </div>
        </>
    );
};

export default CustomSelect;
