import React, { useEffect, useState } from "react";
import LogContents from "./LogContents";
import InfiniteScroll from "react-infinite-scroll-component";
import BarLoader from "react-spinners/BarLoader";

import "./LogForm.css";

const LogForm = (props) => {
    const [loaded, setLoaded] = useState(true);
    const [searchWords, setSearchWords] = useState(["2018", "a"]);
    const [logJson, setlogJson] = useState([]);
    const [filteredLogs, setfilteredLogs] = useState([]);
    const [page, setPage] = useState(0);
    const [displayLogData, setDisplayLogData] = useState([]);
    const [numOfSearchData, setNumOfSearchData] = useState(50);

    const Filter = (input) => {
        // Log level filter
        console.log("Before filtered: ", logJson);
        var filtered = "";
        if ("" !== input.logLevel) {
            filtered = logJson.filter((e) => e.logLevel === input.logLevel);
        } else {
            filtered = logJson;
        }
        console.log("Loglevel filtered: ", filtered);
        console.log("Input message logs: ", input.message.length);
        if (input.message.length > 0) {
            filtered = filtered.filter((e) => {
                var t = "";
                for (let i = 0; i < input.message.length; i++) {
                    if ("" === input.message[i]) {
                        continue;
                    }
                    t = e.message.toUpperCase().includes(input.message[i].toUpperCase());
                }
                return t;
            });
        } else {
            filtered = filtered;
        }
        console.log("Lovelvel + Message Filtered!", filtered);
        return filtered;
    };

    useEffect(() => {
        if (props.logJson) {
            setlogJson(props.logJson);
        }
    }, [props.logJson]);

    // 전체 로그 취득 setter
    useEffect(() => {
        var filtered = Filter({ logLevel: "", message: searchWords });
        setfilteredLogs(filtered);
    }, [logJson]);
    useEffect(() => {
        fetchMoreData();
    }, [filteredLogs]);

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
                        return <LogContents key={i} seq={i + 1} logLevel={v.logLevel} message={v.message} searchWords={searchWords} />;
                    })}
                </div>
            </InfiniteScroll>
            {/* </div> */}
        </>
    );
};

export default LogForm;
