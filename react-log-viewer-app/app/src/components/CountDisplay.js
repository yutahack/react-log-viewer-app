import React from "react";

export default class CountDisplay extends React.Component {
    render() {
        return (
            <div>カウント:{this.props.count}</div> //追記
        );
    }
}
