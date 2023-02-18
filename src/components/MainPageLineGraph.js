import React, { Component } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../Styles/main-page-line-graph.css";
import { ApiCalls } from "../ApiCalls";
import { Button } from "semantic-ui-react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export default class MainPageLineGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionIdx: 0,
      workoutsPerformed: [],
      monthSegments: [],
      setData: [],
      idx: 0,
      data: {
        labels: ["-", "-", "-", "-", "-", "-", "-"],
        datasets: [
          {
            label: "Total Monthly Volume",
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    };
  }

  async componentDidMount() {
    // get daily log volume.
    await this.setMonthlyVolume();
  }

  async setMonthlyVolume() {
    let data = await ApiCalls.getGraphData("volume");
    if (data.status) {
      let labels = Object.keys(data.data).reverse();
      // let momentDates = labels.map(d => moment(d));
      // let minDate = moment.min(momentDates);
      // console.log("Max date", minDate);
      let currMonth = await ApiCalls.getCurrentMonth();
      let monthSegments = [[], []];
      let setData = [[], []];
      let id = 0;
      currMonth.forEach((date) => {
        let idx = 0;
        if (id > 15) {
          idx = 1;
        }
        if (data.data[date]) {
          monthSegments[idx].push(date);
          setData[idx].push(data.data[date]);
        } else {
          setData[idx].push(0);
          monthSegments[idx].push(date);
        }
        id++;
      });

      data.workoutsPerformed=['Total Monthly Volume'].concat(data.workoutsPerformed)
      // data.workoutsPerformed.push("Total Monthly Volume");
      this.setState({
        selectedOptionIdx:0,
        workoutsPerformed: data.workoutsPerformed,
        data: {
          labels: monthSegments[0],
          datasets: [
            {
              label: "Total Monthly Volume",
              data: setData[0],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        },
        monthSegments: monthSegments,
        setData: setData,
      });
    }
  }

  async setworkoutVolume(workoutName) {
    if (workoutName === "Total Monthly Volume") {
      await this.setMonthlyVolume();
      return;
    }
    let data = await ApiCalls.getGraphData("workout-volume", workoutName);
    console.log(data);
    if (data.status) {
      let labels = Object.keys(data.data).reverse();
      let dataOutlet = data.data;
      let currMonth = await ApiCalls.getCurrentMonth();
      let monthSegments = [[], []];

      let obj = {};
      dataOutlet.forEach((entry) => {
        obj[entry.logDate] =
          (obj[entry.logDate] ? obj[entry.logDate] : 0) + entry.totalVolume;
      });
      console.log("setworkoutVolume", obj);
      let setData = [[], []];
      let id = 0;
      currMonth.forEach((date) => {
        let idx = 0;
        if (id > 15) {
          idx = 1;
        }
        if (obj[date]) {
          monthSegments[idx].push(date);
          setData[idx].push(obj[date]);
        } else {
          setData[idx].push(0);
          monthSegments[idx].push(date);
        }
        id++;
      });

      console.log("setData", monthSegments);
      this.setState({
        data: {
          labels: monthSegments[0],
          datasets: [
            {
              label: `${workoutName} Monthly Volume`,
              data: setData[0],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        },
        monthSegments: monthSegments,
        setData: setData,
      });
    }
  }
  toggle(e, type) {
    e.preventDefault();
    const { monthSegments, setData } = this.state;
    let idx = 0;
    type === "prev" ? (idx = 0) : (idx = 1);
    this.setState({
      idx: idx,
      data: {
        labels: monthSegments[idx],
        datasets: [
          {
            label: "Total Monthly Volume",
            data: setData[idx],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    });
  }
  async _onSelect(e) {
    console.log(e);
    const { workoutsPerformed } = this.state;
    let name = e.value;
    let selectedOptionIdx = workoutsPerformed.indexOf(name);
    this.setState({ selectedOptionIdx }, () => {
      console.log(selectedOptionIdx);
    });
    await this.setworkoutVolume(name);
  }
  render() {
    const { data, idx, workoutsPerformed, selectedOptionIdx } = this.state;
    return (
      <div className="main-page-line-graph">
        <Dropdown
          options={workoutsPerformed}
          onChange={(e) => this._onSelect(e)}
          value={workoutsPerformed[selectedOptionIdx]}
          placeholder="Select an option"
        />
        ;
        <Line options={options} data={data} />
        <div className="toggle-chart">
          <Button.Group>
            <Button
              onClick={(e) => this.toggle(e, "prev")}
              disabled={idx === 0}
            >
              Previous
            </Button>
            <Button.Or />
            <Button
              positive
              disabled={idx === 1}
              onClick={(e) => this.toggle(e, "next")}
            >
              Next
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}
