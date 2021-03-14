const React = require("react");

export class InputPanel extends React.Component {

    parameters;

    constructor(props) {
        super(props);
        this.parameters = {...props.globalState.parameters};
        this.state = {};
        for (let key in this.parameters) {
            this.state[key] = this.parameters[key].get();
            this.parameters[key].addListener((value) => {
                this.setState({
                    [key]: value,
                });
            });
        }
    }

    render() {
        let i = 0;
        let inputs = [];
        for (let key in this.state) {
            inputs.push(
                <div key={"inputPanelField" + i++}>
                    <span>{key}:</span>
                    <input
                        value={this.state[key]}
                        onChange={(e) => {
                            console.log(e.target.value);
                            this.parameters[key].set(e.target.value);
                        }}
                    />
                </div>
            )
        }
        return (
            <div className={"InputPanel"}>
                {inputs}
            </div>
        );
    }

}
