// import './App.css'
import graph1 from "./Graph_Data/500_data_1.json";
import graph2 from "./Graph_Data/500_data_2.json";
import { Line, getElementAtEvent } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useRef, useState } from "react";
// import { BarElement, CategoryScale, Chart, LinearScale } from "chart.js";

// Chart.register(Line);

function App() {
  const [firstGraph, setFirstGraph] = useState(graph1);
  const [secondGraph, setSecondGraph] = useState(graph2);

  const [selectedValues, setSelectedValues] = useState({
    firstGraph: {
      startIndex: 0,
      endIndex: firstGraph.length - 1,
    },
    secondGraph: {
      startIndex: 0,
      endIndex: secondGraph.length - 1,
    },
  });
  const data1 = {
    labels: firstGraph.map((item) => item.x),
    datasets: [
      {
        label: "Y value",
        data: firstGraph.map((item) => item.y),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const data2 = {
    labels: secondGraph.map((item) => item.x),
    datasets: [
      {
        label: "Y value",
        data: secondGraph.map((item) => item.y),
        fill: false,
        borderColor: "rgb(75, 0, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartRef = useRef(null);
  const chatRef2 = useRef(null);

  const saveValues = (e, graph) => {
    try {
      // if((selectedValues.firstGraph.endIndex - selectedValues.firstGraph.startIndex) > (selectedValues.secondGraph.endIndex - selectedValues.secondGraph.startIndex)){

      if (graph === 1) {
        const index = getElementAtEvent(chartRef.current, e)[0].index; // start index
        setSelectedValues({
          ...selectedValues,
          firstGraph: {
            ...selectedValues.firstGraph,
            startIndex: firstGraph[index].x,
          },
        });
      } else {
        const index = getElementAtEvent(chatRef2.current, e)[0].index; // start index
        setSelectedValues({
          ...selectedValues,
          secondGraph: {
            ...selectedValues.secondGraph,
            startIndex: secondGraph[index].x,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickPoint = (e) => {
   
      if (
        selectedValues.secondGraph.endIndex -
          selectedValues.secondGraph.startIndex <
        selectedValues.firstGraph.endIndex -
          selectedValues.firstGraph.startIndex
      ) {
        setSelectedValues({
          ...selectedValues,
          firstGraph: {
            ...selectedValues.firstGraph,
            endIndex:
              selectedValues.firstGraph.startIndex +
              (selectedValues.secondGraph.endIndex -
                selectedValues.secondGraph.startIndex),
          },
        });
      } else {
        setSelectedValues({
          ...selectedValues,
          secondGraph: {
            ...selectedValues.secondGraph,
            endIndex:
              selectedValues.secondGraph.startIndex +
              (selectedValues.firstGraph.endIndex -
                selectedValues.firstGraph.startIndex),
          },
        });
      }
      setFirstGraph(
        firstGraph.slice(
          firstGraph.findIndex(
            (item) => item.x === selectedValues.firstGraph.startIndex
          ),
          firstGraph.findIndex(
            (item) => item.x === selectedValues.firstGraph.endIndex
          )
        )
      );
      setSecondGraph(
        secondGraph.slice(
          secondGraph.findIndex(
            (item) => item.x === selectedValues.secondGraph.startIndex
          ),
          secondGraph.findIndex(
            (item) => item.x === selectedValues.secondGraph.endIndex
          )
        )
      );
    
    // console.log(getElementAtEvent(chartRef.current, e));
  };


  const reset = () => {
    setFirstGraph(graph1);
    setSecondGraph(graph2);
    setSelectedValues({
      firstGraph: {
        startIndex: 0,
        endIndex: firstGraph.length - 1,
      },
      secondGraph: {
        startIndex: 0,
        endIndex: secondGraph.length - 1,
      },
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        // display: 'flex',
        color: "black",
        backgroundColor: "white",//"rgb(229, 231, 235)",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "100",
          color: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backdropFilter: 'blur(10px)',
          backdropFilter: "blur(3px)",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "rgb(229, 231, 235)",
        }}
      >
        <h3>
          A ({selectedValues.firstGraph.startIndex},{" "}
          {selectedValues.firstGraph.endIndex})
        </h3>
        <h3>
          B ({selectedValues.secondGraph.startIndex},{" "}
          {selectedValues.secondGraph.endIndex})
        </h3>

        <button onClick={onClickPoint} style={{
          marginBottom: '10px'
        }}>Update</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
        <div style={{ height: "50%", width: "99%", display: "flex", justifyContent: "center" }}>
          <Line
            data={{
              labels: firstGraph.map((item) => item.x),
              datasets: [
                {
                  label: "Y value",
                  data: firstGraph.map((item) => item.y),
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
            options={options}
            ref={chartRef}
            onClick={(e) => saveValues(e, 1)}
          />
        </div>
        <div style={{ height: "50%", width: "100%",  display: "flex", justifyContent: "center"  }}>
          <Line
            data={{
              labels: secondGraph.map((item) => item.x),
              datasets: [
                {
                  label: "Y value",
                  data: secondGraph.map((item) => item.y),
                  fill: false,
                  borderColor: "rgb(75, 0, 192)",
                  tension: 0.1,
                },
              ],
            }}
            options={options}
            ref={chatRef2}
            onClick={(e) => saveValues(e, 2)}
          />
        </div>
      </div>
    </div>
  );
}

// draw a vertical line on cursor hover
const options = {
  responsive: true,
  tooltips: {
    mode: "x-axis",
    // intersect: true,
  },
  // interaction: {
  //   intersect: false,
  //   mode: "index",
  // },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    corsair: {
        dash: [2, 2],
        color: 'red',
        width: 3
      }
  },
};

export default App;
