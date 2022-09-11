import React, { useState, useEffect } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const Filter = (props) => {
    const [values, setValues] = useState(props.defaultValue);
    const animatedComponents = makeAnimated();

    useEffect(() => {
        console.log("### Filter: Somthing changed");
    }, []);

    useEffect(() => {
        // console.log("### Filter: Selected values[" + props.filterName + "]", values);
        props.conditionsSetter(values);
    }, [values]);

    return (
        <>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={props.options}
                defaultValue={props.defaultValue}
                theme={(theme) => ({
                    ...theme,
                    // borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        neutral0: "#ddd", // 내부색상

                        neutral10: "#676767", // 선택 라벨 색상

                        neutral20: "#434343", // X, V 버튼 색상
                        neutral80: "#fff", // 선택 라벨 색상
                        primary25: "#00B5DA", // 드롭다운 항목 선택 시 색상
                        primary: "#222", // 드롭다운 선택 시 틀 색상
                    },
                })}
                onChange={(value) => {
                    // setValues(value);
                    props.conditionsSetter(value);
                    console.log("!!!!!!!!Changed", values);
                }}
            />
        </>
    );
};

export default Filter;
