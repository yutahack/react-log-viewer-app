import React from "react";
import CountDisplay from "../components/CountDisplay";
import MainFrame from "../components/MainFrame";

import example_logs from "../example-logs.json";

export default class TopPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }
    render() {
        return (
            <div>
                <div style={{ display: "flex", width: "500px", height: "100%" }}>
                    <MainFrame logJson={example_logs} />
                </div>
            </div>
        );
    }
}
