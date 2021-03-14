const React = require("react");

export class Table extends React.Component {

    blockWidth = 60;
    blockHeight = 100;
    width;
    blocksPerLine;

    constructor(props) {
        super(props);
        this.state = {
            result: props.globalState.result.get()
        };
        props.globalState.result.addListener((result) => {
            this.setState({
                result
            });
        });
        this.updateBlocksSizes();
        window.addEventListener("resize", () => {
            this.updateBlocksSizes();
            this.forceUpdate()
        });
    }

    updateBlocksSizes() {
        this.width = window.innerWidth - 200 - 25;
        this.blocksPerLine = Math.floor(this.width / this.blockWidth) - 2;
    }

    render() {
        let table = [];
        let row = new Array(this.blocksPerLine + 1);
        let i = 0;
        for (let xy of this.state.result) {
            row[i % this.blocksPerLine + 1] = (
                <div key={"resultBlock" + i}>
                    <div>{xy.x.toFixed(3)}</div>
                    <div>{xy.y.toFixed(3)}</div>
                </div>
            );
            i++;
            if (i % this.blocksPerLine === 0) {
                table.push(row);
                row = new Array(this.blocksPerLine + 1);
            }
        }
        if (i % this.blocksPerLine !== 0) table.push(row);
        for (let j = 0; j < table.length; j++) {
            table[j][0] = (
                <div key={"resultBlock" + i} className={"Header"}>
                    <div>X:</div>
                    <div>Y:</div>
                </div>
            );
            table[j] = (
                <div key={"resultRow" + j} className={"Row"}>
                    {table[j]}
                </div>
            );
            i++;
        }
        return (
            <div className={"Table"}>
                {table}
            </div>
        );
    }
}
