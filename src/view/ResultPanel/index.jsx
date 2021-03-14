const React = require("react");

const {Table} = require("./Table");
const {Graph} = require("./Graph");

export class ResultPanel extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        let _ = this.props.globalState;
        return (
            <div className={"ResultPanel"}>
                <Graph globalState={_}/>
                <Table globalState={_}/>
            </div>
        );
    }
}
