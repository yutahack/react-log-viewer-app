import React, { useEffect, useState } from "react";
import LogContents from "./LogContents";
import InfiniteScroll from "react-infinite-scroll-component";
import BarLoader from "react-spinners/BarLoader";

import "./LogForm.css";

const LogForm = (props) => {
    const [loaded, setLoaded] = useState(true);
    const [conditions, setConditions] = useState();
    const [logLevelConditions, setLogLevelConditions] = useState([]);
    const [wordConditions, setWordConditions] = useState([]);
    const [logJson, setlogJson] = useState([]);
    const [filteredLogs, setfilteredLogs] = useState([]);
    const [page, setPage] = useState(0);
    const [displayLogData, setDisplayLogData] = useState([]);
    const [numOfSearchData, setNumOfSearchData] = useState(50);

    // 검색버튼 이벤트를 넘겨받으면 실행
    useEffect(() => {
        // 이중 실행 방지
        if (!props.searchEventGetter) {
            return;
        }

        // // 화면 삭제
        // setfilteredLogs([]);
        // setDisplayLogData([]);
        setPage(0);

        console.log("### LogForm: Clicked and got conditions!", props.filterConditionGetter);

        var t = filter(props.filterConditionGetter);
        setfilteredLogs(t);

        var w = setWordConditionsforHighlight(props.filterConditionGetter);
        setWordConditions(w);
    }, [props.searchEventGetter]);

    useEffect(() => {
        if (props.logJsonGetter) {
            setlogJson(props.logJsonGetter);
        }
    }, [props.logJsonGetter]);

    useEffect(() => {
        console.log("DLD", displayLogData);
    }, [displayLogData]);

    // 필터가 완료되면 화면에 뿌려주기
    useEffect(() => {
        console.log("fetch");
        setDisplayLogData([]);
        fetchMoreData();
    }, [filteredLogs, props.searchEventGetter]);

    // 필터링 로직
    const filter = (input) => {
        // Log level filter
        console.log("### Log Form: Before filtered: ", logJson);
        console.log("### Log Form: check input:", input);
        // var filtered = "";
        var filtered = logJson;

        if (0 === input.logLevelConditions.length && undefined === input.logLevelConditions[0]) {
        } else {
            var t = [];
            for (let i = 0; i < filtered.length; i++) {
                for (let j = 0; j < input.logLevelConditions.length; j++) {
                    if (filtered[i].logLevel === input.logLevelConditions[j].value) {
                        t.push(filtered[i]);
                        break;
                    }
                }
            }
            filtered = t;
        }

        console.log("Loglevel filtered: ", filtered);
        console.log("Input wordConditions logs: ", input.wordConditions.length);

        if (0 === input.wordConditions.length && undefined === input.wordConditions[0]) {
        } else {
            if (input.wordConditions.length > 0) {
                filtered = filtered.filter((e) => {
                    var t2 = [];
                    for (let i = 0; i < input.wordConditions.length; i++) {
                        if ("" === input.wordConditions[i].value) {
                            continue;
                        }
                        t2 = e.message.toUpperCase().includes(input.wordConditions[i].value.toUpperCase());
                    }
                    return t2;
                });
            } else {
                filtered = filtered;
            }
        }
        console.log("### Loglevel + Message Filtered!", filtered);
        return filtered;
    };

    // 하이라이트를 위한 wordConditions 생성
    const setWordConditionsforHighlight = (input) => {
        var t = [];
        if (0 === input.wordConditions.length && undefined === input.wordConditions[0]) {
        } else {
            if (input.wordConditions.length > 0) {
                for (let i = 0; i < input.wordConditions.length; i++) {
                    if ("" === input.wordConditions[i].value) {
                        continue;
                    } else {
                        t.push(input.wordConditions[i].value);
                    }
                }
            }
        }
        console.log("### LogForm: WordConditionForHighlight:", t);
        return t;
    };

    // debug
    useEffect(() => {
        console.log("### Page: ", page);
    }, [page]);
    // useEffect(() => {
    //     console.log("### DisplayLogDataChanged: ", displayLogData);
    // }, [displayLogData]);

    // 스크롤 시 추가 로그 획득하기
    const fetchMoreData = () => {
        setLoaded(false);
        if (filteredLogs) {
            setTimeout(() => {
                var res = filteredLogs.slice(page * numOfSearchData, page * numOfSearchData + numOfSearchData);
                setDisplayLogData(displayLogData.concat(res));

                if (res.length > 0) {
                    setPage((prev) => prev + 1);
                }
                console.log("DataFetchResult: ", res);

                setLoaded(true);
            }, 500);
        }
    };

    // Main Frame
    const style_000000 = {
        display: "flex",
        flexDirection: "column",
        width: props.width ? props.width : "100%",
        // height: props.height ? props.height : "100%",
        background: "#222",
        overflow: "scroll",
    };

    const Loading = () => {
        const style_010000 = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: props.width ? props.width : "100%",
            height: props.height ? props.height : "30px",
            color: "#fff",
            background: "#222",
            paddingTop: "20px",
        };
        return <div style={style_010000}>{loaded ? <></> : <BarLoader color="#fff" />}</div>;
    };

    return (
        <>
            {/* <div style={style_000000}> */}
            <InfiniteScroll
                style={{ display: "flex", flexDirection: "column", height: "100%" }}
                dataLength={displayLogData.length} //現在のデータの長さ
                next={() => {
                    console.log("### Detected scrolled buttom of page. Run fetch next data");
                    fetchMoreData();
                }} // スクロール位置を監視してコールバック（次のデータを読み込ませる）
                hasMore={true} // さらにスクロールするかどうか（ある一定数のデータ数に達したらfalseを返すことで無限スクロールを回避）
                loader={<Loading />} // ローディング中のコンポーネント
                // height={"100%"} // 高さ（なくても良い）
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div style={style_000000}>
                    {displayLogData.map((v, i) => {
                        return <LogContents key={i} seq={i + 1} logLevel={v.logLevel} message={v.message} wordConditions={wordConditions} />;
                    })}
                </div>
            </InfiniteScroll>
            {/* </div> */}
        </>
    );
};

export default LogForm;
