import React, { useState, useEffect } from "react";
import CreatableFilter from "./CreatableFilter";
import Filter from "./Filter";

import { logLevelOptions, testOptions } from "./FilterData";

const FilterForm = (props) => {
    const [logLevelConditions, setLogLevelConditions] = useState();
    const [wordConditions, setWordConditions] = useState();

    const [filterConditions, setFilterConditions] = useState();

    useEffect(() => {
        // 초기값(undefined)은 MainFrame에게 전달하지 않음
        // if (undefined === logLevelConditions && undefined === wordConditions) {
        //     console.log("### Filter Form: both undefined!");
        //     return;
        // }
        var c = {
            logLevelConditions: logLevelConditions,
            wordConditions: wordConditions,
        };
        console.log("FilterForm Changed values: ", c);
        setFilterConditions(c);
        props.filterConditionsSetter(c);
    }, [logLevelConditions, wordConditions]);

    // Main Frame
    const style_000000 = {
        display: "flex",
        flexDirection: "column",
        width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "50px",
        // height: "250px",
        background: "#333",
        // position: "-webkit-sticky" /* 사파리 브라우저 지원 */,
        // position: "sticky", /* 공간을 너무 많이 차지해서 스띠끼는 뺌 */
        // top: "0px",
    };

    //
    const style_000001 = {
        display: "flex",
        flexDirection: "column",
        // width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "100%",
        // height: "100px",
        alignItems: "start",
        fontSize: "20px",
        color: "#fff",
        padding: "10px",
        paddingBottom: "20px",
    };

    const style_000002 = {
        display: "flex",
        flexDirection: "column",
        // width: props.width ? props.width : "100%",
        // width: "100%",
    };

    const style_000003 = {
        display: "flex",
        flexDirection: "row",
        // width: props.width ? props.width : "100%",
        // width: "100%",
        minWidth: "500px",
        padding: "10px",
    };

    // Select Title
    const style_000010 = {
        display: "flex",
        // width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "100%",
        fontSize: "14px",
        fontWeight: "600",
        alignItems: "center",
        color: "#fff",
        paddingLeft: "10px",
        paddingRight: "10px",
    };

    // Search Button
    const style_000020 = {
        display: "flex",
        // width: props.width ? props.width : "100%",
        height: props.height ? props.height : "50px",
        fontWeight: "600",
        alignItems: "center",
        color: "#000",
        paddingLeft: "10px",
        paddingRight: "10px",
        margin: "10px",
    };

    return (
        <>
            <div style={style_000000}>
                <div style={style_000001}>Log Viewer Ver 1.0.0</div>
                <div style={style_000002}>
                    <div style={style_000010}>Log level filter</div>
                    <div style={style_000003}>
                        <Filter
                            filterName={"LogLevel"}
                            options={logLevelOptions}
                            defaultValue={() => {
                                // var tmp = [];
                                // logLevelOptions.forEach((v, i) => {
                                //     tmp.push(v);
                                // });
                                // return tmp;
                                return [logLevelOptions[0], logLevelOptions[1], logLevelOptions[2], logLevelOptions[3], logLevelOptions[4]];
                            }}
                            conditionsSetter={setLogLevelConditions}
                        />
                    </div>
                </div>
                <div style={style_000002}>
                    <div style={style_000010}>Keyword filter</div>
                    <div style={style_000003}>
                        <CreatableFilter filterName={"Words"} conditionsSetter={setWordConditions} />
                    </div>
                </div>
                <div style={style_000002}>
                    <button
                        style={style_000020}
                        onClick={(e) => {
                            console.log("### FilterFrom: conditions: ", filterConditions);
                            props.searchEventSetter(true);
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterForm;
