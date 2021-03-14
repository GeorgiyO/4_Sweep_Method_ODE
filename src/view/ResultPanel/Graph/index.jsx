const React = require("react");
const Chart = require("chart.js");

export class Graph extends React.Component {

    color = "rgba(255, 100, 0, 0.8)";
    canvasRef = React.createRef();
    chart;

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
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext("2d");
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Sweep Method graph:',
                    fill: false,
                    backgroundColor: this.color,
                    borderColor: this.color,
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'x'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'y'
                        }
                    }]
                }
            }
        });
        this.updateChart();
    }

    componentDidUpdate() {
        this.updateChart();
    }

    updateChart() {
        this.chart.data.labels = [];
        this.chart.data.datasets[0].data = [];
        for (let xy of this.state.result) {
            this.chart.data.labels.push(xy.x.toFixed(3));
            this.chart.data.datasets[0].data.push({
                x: xy.x.toFixed(3),
                y: xy.y.toFixed(3)
            });
        }
        this.chart.update();
    }

    render() {
        return (
            <div className="Graph">
                <canvas ref={this.canvasRef}/>
            </div>
        );
    }
}