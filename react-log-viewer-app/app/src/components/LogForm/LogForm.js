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
        if (props.searchEventGetter) {
            return;
        }

        // 화면 삭제
        setfilteredLogs([]);
        setDisplayLogData([]);
        setPage(0);

        console.log("### LogForm: Clicked and got conditions!", props.filterConditionGetter);

        // // 조건 분류하기
        // var tmp1 = [];
        // if (undefined !== props.filterConditionGetter.logLevelConditions) {
        //     var llc = props.filterConditionGetter.logLevelConditions;

        //     for (let i = 0; i < llc.length; i++) {
        //         tmp1.push(llc[i]);
        //     }
        // }
        // setLogLevelConditions(tmp1);
        // var tmp2 = [];
        // if (undefined !== props.filterConditionGetter.wordConditions) {
        //     var wc = props.filterConditionGetter.wordConditions;
        //     for (let i = 0; i < wc.length; i++) {
        //         tmp2.push(wc[i]);
        //     }
        // }
        // setWordConditions(tmp2);

        // 필터링, 조건이 undefined의 경우 수행하지 않음.
        // if (undefined === logLevelConditions || undefined === wordConditions) {
        // var filtered = Filter({ logLevel: logLevelConditions, word: wordConditions });

        // var filtered = Filter(props.filterConditionGetter);
        // setfilteredLogs(filtered);

        // filter(props.filterConditionGetter);

        console.log("SET!");
        var t = filter(props.filterConditionGetter);
        setfilteredLogs(t);
        // } else {
        //     console.log("### LogForm: Some conditions undefined!");
        // }
    }, [props.searchEventGetter]);

    // useEffect(() => {
    //     console.log("SOT!", conditions);
    //     var filtered = filter(conditions);
    //     // setfilteredLogs(filtered);
    // }, [conditions]);

    // useEffect(() => {
    //     // 이중 실행 방지
    //     console.log("LLC", logLevelConditions.length);
    //     console.log("WC", wordConditions.length);
    //     // 필터링, 조건이 undefined의 경우 수행하지 않음.
    //     if (logLevelConditions.length > 0 && wordConditions.length > 0) {
    //         console.log("### LogForm: Filtering...");
    // var filtered = Filter({ logLevel: logLevelConditions, word: wordConditions });
    // setfilteredLogs(filtered);
    //     } else {
    //         console.log("### LogForm: Some conditions undefined!");
    //     }
    // }, [logLevelConditions, wordConditions]);

    // MainFrame으로부터 로그 전체를 넘겨받았을 때 실행
    useEffect(() => {
        if (props.logJsonGetter) {
            setlogJson(props.logJsonGetter);
        }
    }, [props.logJsonGetter]);

    // 전체 로그를 넘겨받고 필터 로직을 실행
    useEffect(() => {
        // var filtered = Filter({ logLevel: logLevelConditions, word: wordConditions });
        // setfilteredLogs(filtered);
    }, [logJson]);
    // 필터가 완료되면 화면에 뿌려주기
    useEffect(() => {
        fetchMoreData();
    }, [filteredLogs]);

    // 필터링 로직
    const filter = (input) => {
        // Log level filter
        console.log("### Log Form: Before filtered: ", logJson);
        console.log("### Log Form: check input:", input);
        // var filtered = "";
        var filtered = logJson;

        // input.logLevelConditions.map((v, i) => {
        //     console.log(v, i);
        // });
        // for (let i = 0; i < input.logLevelConditions.length; i++) {
        //     console.log(i);
        // }

        console.log("1", 0 === input.logLevelConditions.length);
        console.log("2", undefined === input.logLevelConditions[0]);
        if (0 === input.logLevelConditions.length && undefined === input.logLevelConditions[0]) {
            console.log("T");
        } else {
            // filtered = filtered.filter((e) => {
            //     var t = [];
            //     for (let i = 0; i < input.logLevelConditions.length; i++) {
            //         if ("" === input.logLevelConditions[i]) {
            //             continue;
            //         }
            //         if (e.logLevel === input.logLevelConditions[i]) {
            //             console.log("Matched!");
            //             // t.push(e);
            //         }
            //     }
            //     return t;
            // });
            console.log("F", filtered.length);
            console.log("L", input.logLevelConditions.length);
            var t = [];
            for (let i = 0; i < filtered.length; i++) {
                for (let j = 0; j < input.logLevelConditions.length; j++) {
                    if (filtered[i].logLevel === input.logLevelConditions[j].value) {
                        t.push(filtered[i]);
                        break;
                    }
                }
            }
            console.log("t", t);
            filtered = t;
        }
        // if (input.logLevelConditions.length === 1 && undefined ===  input.logLevelConditions[0]) {
        //     filtered = filtered.filter((e) => {
        //         var t = [];
        //         for (let i = 0; i < input.logLevelConditions.length; i++) {
        //             if ("" === input.logLevelConditions[i]) {
        //                 continue;
        //             }
        //             if (e.logLevel === input.logLevelConditions[i]) {
        //                 console.log("Matched!");
        //                 t.push(e);
        //             }
        //         }
        //         return t;
        //     });
        // }

        console.log("Loglevel filtered: ", filtered);
        console.log("Input wordConditions logs: ", input.wordConditions.length);
        //     if (input.wordConditions.length > 0) {
        //         filtered = filtered.filter((e) => {
        //             var t = "";
        //             for (let i = 0; i < input.wordConditions.length; i++) {
        //                 if ("" === input.wordConditions[i]) {
        //                     continue;
        //                 }
        //                 t = e.message.toUpperCase().includes(input.wordConditions[i].toUpperCase());
        //             }
        //             return t;
        //         });
        //     } else {
        //         filtered = filtered;
        //     }
        //     console.log("### Loglevel + Message Filtered!", filtered);
        //     return filtered;
        // };

        if (0 === input.wordConditions.length && undefined === input.wordConditions[0]) {
            console.log("2T");
        } else {
            console.log("2F", filtered.length);
            console.log("2L", input.wordConditions.length);

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

    // // 필터링 로직
    // const Filter = (input) => {
    //     // Log level filter
    //     console.log("Before filtered: ", logJson);
    //     var filtered = "";
    //     if ("" !== input.logLevel) {
    //         filtered = logJson.filter((e) => e.logLevel === input.logLevel);
    //     } else {
    //         filtered = logJson;
    //     }
    //     console.log("Loglevel filtered: ", filtered);
    //     console.log("Input message logs: ", input.message.length);
    //     if (input.message.length > 0) {
    //         filtered = filtered.filter((e) => {
    //             var t = "";
    //             for (let i = 0; i < input.message.length; i++) {
    //                 if ("" === input.message[i]) {
    //                     continue;
    //                 }
    //                 t = e.message.toUpperCase().includes(input.message[i].toUpperCase());
    //             }
    //             return t;
    //         });
    //     } else {
    //         filtered = filtered;
    //     }
    //     console.log("Lovelvel + Message Filtered!", filtered);
    //     return filtered;
    // };

    // debug
    useEffect(() => {
        console.log("### Page: ", page);
    }, [page]);
    // useEffect(() => {
    //     console.log("### DisplayLogDataChanged: ", displayLogData);
    // }, [displayLogData]);

    // 일부 로그 획득 setter
    const fetchMoreData = () => {
        setLoaded(false);
        if (filteredLogs) {
            setTimeout(() => {
                setDisplayLogData([]);
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
