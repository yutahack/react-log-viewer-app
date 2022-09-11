import React, { useEffect, useState } from "react";
import FilterForm from "./FilterForm/FilterForm";
import LogForm from "./LogForm/LogForm";

const MainFrame = (props) => {
    const [logJson, setlogJson] = useState({});
    const [filterCondition, setFilterConditions] = useState({ logLevelConditions: [], wordConditions: [] });
    const [clickedSearch, setClickedSearch] = useState(false);

    useEffect(() => {
        setlogJson(props.logJson);
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
