import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";

/*
    logLevel: 
    
*/
const LogContents = (props) => {
    const [isHover, setIsHover] = useState(false);
    const [logLevel, setLogLevel] = useState("");
    const [bg, setBg] = useState({ seqBg: "#transparent", msgBg: "#transparent" });

    const hoveredSeqBg = "#333";
    const hoveredMsgBg = "#333";

    useEffect(() => {
        switch (props.logLevel) {
            case "ERROR":
                setBg({ seqBg: "#CA0000", msgBg: "#8C0000" });
                break;

            case "INFO":
                setBg({ seqBg: "#007A86", msgBg: "#005C65" });
                break;

            default:
                setBg({ seqBg: "#444", msgBg: "#333" });
                break;
        }
    }, [logLevel]);

    const style_000001 = {
        display: "flex",
        flexDirection: "row",
        width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "100%",
        alignItems: "center",
        // background: "#ddd",
        color: "#fff",
        fontFamily: "D2 Coding",
        fontSize: " 14px",
        wordBreak: "break-word",
    };

    // Line Number
    const style_000010 = {
        display: "flex",
        flexDirection: "row",
        width: props.width ? props.width : "100%",
        maxWidth: "15%",
        height: props.height ? props.height : "100%",
        alignItems: "center",
        // opacity: "0.5",
        background: isHover ? hoveredSeqBg : bg.seqBg,
        justifyContent: "end",
        paddingRight: "10px",
    };
    // Between Line-LogLevel space
    const style_000011 = {
        display: "flex",
        width: "20px",
        height: "100%",
        background: isHover ? hoveredMsgBg : bg.msgBg,
    };

    // LogLevel
    const style_000020 = {
        display: "flex",
        flexDirection: "row",
        width: props.width ? props.width : "100%",
        maxWidth: "10%",
        height: props.height ? props.height : "100%",
        alignItems: "center",
        background: isHover ? hoveredMsgBg : bg.msgBg,
        justifyContent: "start",
        paddingLeft: "10px",
    };

    // Between LogLevel-Message space
    const style_000021 = {
        display: "flex",
        width: "20px",
        height: "100%",
        background: isHover ? hoveredMsgBg : bg.msgBg,
    };

    // Message
    const style_000030 = {
        display: "flex",
        flexDirection: "row",
        width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "100%",
        alignItems: "center",
        background: isHover ? hoveredMsgBg : bg.msgBg,
        justifyContent: "start",
    };

    // Content Top Space
    const style_000040 = {
        display: "flex",
        flexDirection: "column",
        width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "100%",
        alignItems: "center",
        justifyContent: "start",
    };
    const style_000041 = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "2px",
        background: "#111",
    };

    return (
        <div style={style_000040}>
            <div style={style_000041} />
            <div
                style={style_000001}
                onMouseEnter={(e) => {
                    setIsHover(true);
                }}
                onMouseLeave={(e) => {
                    setIsHover(false);
                }}
            >
                {/* Line Nubmer */}
                <div style={style_000010}>{props.seq}</div>
                {/* <div style={style_000011}></div> */}
                {/* Log Level */}
                <div style={style_000020}>{props.logLevel}</div>
                {/* <div style={style_000021} /> */}
                {/* Message */}
                {/* <div style={style_000030}>{props.message}</div> */}
                <div style={style_000030}>
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        highlightStyle={{ borderRadius: "2.5px" }}
                        searchWords={props.wordConditions}
                        autoEscape={true}
                        textToHighlight={props.message}
                    />
                </div>
            </div>
        </div>
    );
};

export default LogContents;
