import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { Collapse, Button, CardBody, Card, ButtonGroup } from "reactstrap";

/*
    logLevel: 
    
*/
const LogContents = (props) => {
    const [isHover, setIsHover] = useState(false);
    const [logLevel, setLogLevel] = useState("");
    const [bg, setBg] = useState({ seqBg: "transparent", msgBg: "transparent", seqDarkBg: "transparent", msgDarkBg: "transparent" });

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [rSelected, setRSelected] = useState(1);

    const hoveredSeqBg = "#333";
    const hoveredMsgBg = "#333";

    const maxDateTimeWidth = "150px";

    useEffect(() => {
        switch (props.logLevel) {
            case "ERROR":
                setBg({ seqBg: "#CA0000", msgBg: "#8C0000", seqDarkBg: "#930000", msgDarkBg: "#560000" });
                break;

            case "INFO":
                setBg({ seqBg: "#007A86", msgBg: "#005C65", seqDarkBg: "#004A51", msgDarkBg: "#002A2D" });
                break;

            default:
                setBg({ seqBg: "#007A86", msgBg: "#005C65", seqDarkBg: "#004A51", msgDarkBg: "#002A2D" });
                // setBg({ seqBg: "#444", msgBg: "#333" });
                break;
        }
    }, [props.logLevel]);

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
        maxWidth: maxDateTimeWidth,
        height: props.height ? props.height : "100%",
        alignItems: "center",
        // opacity: "0.5",
        background: isHover ? hoveredSeqBg : bg.seqBg,
        // justifyContent: "end",
        // paddingTop: "5px",
        // paddingBottom: "5px",
        // paddingLeft: "5px",
        // paddingRight: "5px",
        padding: "10px",
        whiteSpace: "pre-line",
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
        // width: props.width ? props.width : "100%",
        // maxWidth: "10%",
        width: "75px",
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
        height: props.height ? props.height : "100%",
        alignItems: "center",
        background: isHover ? hoveredMsgBg : bg.msgBg,
        justifyContent: "start",
        // paddingTop: "5px",
        // paddingBottom: "5px",
        // paddingLeft: "5px",
        // paddingRight: "5px",
        padding: "10px",
        whiteSpace: "pre-line",
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

    // Collapse content
    // Bg
    const style_000050 = {
        display: "flex",
        flexDirection: "row",
        width: props.width ? props.width : "100%",
        boxShadow: "inset 3px 3px 4px black",
    };

    // Message
    const style_000052 = {
        display: "flex",
        flexDirection: "column",
        width: props.width ? props.width : "100%",
        background: bg.msgDarkBg,
        color: "white",
        padding: "10px",
        fontFamily: "D2 Coding",
        fontSize: " 14px",
        wordBreak: "break-word",
        boxShadow: "inset 0px 2px 5px #000",
    };

    // Collapse
    const style_000053 = {
        width: "100%",
    };

    // Tab
    const style_000054 = {
        width: "100%",
        padding: "10px",
    };

    const style_000055 = {
        marginTop: "10px",
        width: "100%",
    };

    return (
        // <Button style={{ display: "flex", padding: "0" }}>
        <div style={style_000040}>
            {/* <div style={style_000041} /> */}
            <div
                style={style_000001}
                onMouseEnter={(e) => {
                    setIsHover(true);
                }}
                onMouseLeave={(e) => {
                    setIsHover(false);
                }}
                onClick={(e) => {
                    toggle();
                }}
            >
                {/* [220920] Log 유형 변경 */}

                {/* Line Nubmer */}
                {/* <div style={style_000010}>{props.seq}</div> */}
                <div style={style_000010}>{props.logDatetime}</div>
                {/* <div style={style_000011}></div> */}
                {/* Log Level */}
                {/* <div style={style_000020}>{props.logLevel}</div> */}
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

            <Collapse style={style_000053} isOpen={isOpen} onClick={(e) => {}}>
                <div style={style_000052}>
                    <div style={style_000054}>
                        <ButtonGroup>
                            <Button color="primary" outline onClick={() => setRSelected(1)} active={rSelected === 1}>
                                JSON
                            </Button>
                            <Button color="primary" outline onClick={() => setRSelected(2)} active={rSelected === 2}>
                                Other
                            </Button>
                        </ButtonGroup>
                        {1 === rSelected && (
                            <div style={style_000055}>
                                {Object.keys(props.rawData).map((v, i) => {
                                    var keyy = Object.keys(props.rawData)[i];
                                    var val = props.rawData[v];
                                    return (
                                        <div key={i} style={{ display: "flex", flexDirection: "row", width: "100%", padding: "5px" }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    minWidth: "150px",
                                                    background: "#666",
                                                    borderRadius: "5px",
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                    marginRight: "10px",
                                                }}
                                            >
                                                {keyy}
                                            </div>
                                            <div style={{ display: "flex" }}>{JSON.stringify(val)}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {2 === rSelected && <div style={style_000055}></div>}
                    </div>
                </div>
            </Collapse>
        </div>
        // </Button>
    );
};

export default LogContents;
