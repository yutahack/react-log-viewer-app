import React, { useEffect, useState } from "react";
import FilterForm from "./FilterForm/FilterForm";
import LogForm from "./LogForm/LogForm";

const MainFrame = (props) => {
    const [logJson, setlogJson] = useState({});
    const [filterCondition, setFilterConditions] = useState({ logLevelConditions: [], wordConditions: [] });
    const [clickedSearch, setClickedSearch] = useState(false);

    useEffect(() => {
        var t = logFormatConverter(props.logJson.hits.hits);
        setlogJson(t);
    }, [props.logJson]);

    useEffect(() => {
        console.log("### Main Frame: Changed values: ", filterCondition);
    }, [filterCondition]);

    useEffect(() => {
        // 로직 두번 타기 방지
        if (!clickedSearch) {
            return;
        }
        setClickedSearch(false);
        console.log("### Main Frame: ClickedSearchButton");
    }, [clickedSearch]);

    // 로그 형식 변환
    const logFormatConverter = (logJson) => {
        var tmp = [];
        for (let i = 0; i < logJson.length; i++) {
            var t = {
                logDatetime: logJson[i]._source.LogDatetime.replace("T", "\n"),
                logLevel: logJson[i]._source.Level.toUpperCase(),
                message:
                    logJson[i]._source.Level.toUpperCase() + " " + logJson[i]._source.ServiceType + " " + logJson[i]._source.Note + "\n" + "Message: " + JSON.stringify(logJson[i]._source.Message),
                rawData: logJson[i]._source,
            };
            tmp.push(t);
        }
        return tmp;
    };

    // Main Frame
    const style_000001 = {
        display: "flex",
        flexDirection: "column",
        width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "100%",
        background: "#000",
        overflow: "visible",
    };

    return (
        <>
            <div style={style_000001}>
                <FilterForm filterConditionsSetter={setFilterConditions} searchEventSetter={setClickedSearch} />
                <LogForm logJsonGetter={logJson} searchEventGetter={clickedSearch} filterConditionGetter={filterCondition} />
            </div>
        </>
    );
};

export default MainFrame;
