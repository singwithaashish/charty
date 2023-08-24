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
        const index = getElementAtEvent(chartRef.current, e)[0].index;
       if(index <= selectedValues.firstGraph.startIndex){
          setSelectedValues({
            firstGraph: {
              ...selectedValues.firstGraph,
              startIndex: firstGraph[index].x,
            },
            secondGraph: {
              ...selectedValues.secondGraph,
              startIndex: secondGraph[index].x,
            },
          });
        }
        // if firstLength - index < secondLength - secondIndex then secondGraph's end should be secondIndex + (firstLength - index)
        if (
          (selectedValues.firstGraph.endIndex - index) <
          (selectedValues.secondGraph.endIndex -
            selectedValues.secondGraph.startIndex)
        ) {
          setSelectedValues({
            firstGraph: {
              ...selectedValues.firstGraph,
              startIndex: firstGraph[index].x,
            },
            secondGraph: {
              ...selectedValues.secondGraph,
              endIndex: secondGraph[selectedValues.secondGraph.startIndex + (selectedValues.firstGraph.endIndex - index)].x,
            },
          });
        } else {
          setSelectedValues({
            ...selectedValues,
            firstGraph: {
              ...selectedValues.firstGraph,
              startIndex: firstGraph[index].x,
            },
          });
        }
      } else {
        const index = getElementAtEvent(chatRef2.current, e)[0].index;
        if (
          (selectedValues.secondGraph.endIndex - index) <
          selectedValues.firstGraph.endIndex -
            selectedValues.firstGraph.startIndex
        ) {
          setSelectedValues({
            secondGraph: {
              ...selectedValues.secondGraph,
              startIndex: secondGraph[index].x,
            },
            firstGraph: {
              ...selectedValues.firstGraph,
              endIndex: firstGraph[selectedValues.firstGraph.startIndex + (selectedValues.secondGraph.endIndex - index)].x,
            },
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickPoint = (e) => {
    try {
      setFirstGraph(firstGraph.splice(selectedValues.firstGraph.startIndex, selectedValues.firstGraph.endIndex));
      setSecondGraph(secondGraph.splice(selectedValues.secondGraph.startIndex, selectedValues.secondGraph.endIndex));
    //   // when user clicks, set the index as the first index of the graph
    //   if (graph === 1) {
    //     const index = getElementAtEvent(chartRef.current, e)[0].index;

    //     // if lastINdex - index < lastIndexofSecondGraph - indexOfSecondGraph then second Grap's end should be indexOfSecondGraph + (lastIndex - index)
    //     if (
    //       secondGraph.length - index <
    //       selectedValues.secondGraph.endIndex -
    //         selectedValues.secondGraph.startIndex
    //     ) {
    //       setSecondGraph(secondGraph.splice(index, secondGraph.length - index));
    //       setFirstGraph(firstGraph.splice(index, firstGraph.length - index));
    //     }
    //     // else firstGraph's end should be indexOfSecondGraph + (lastIndex - index)
    //     else {
    //       setSecondGraph(
    //         secondGraph.splice(
    //           index,
    //           selectedValues.secondGraph.endIndex -
    //             selectedValues.secondGraph.startIndex
    //         )
    //       );
    //       setFirstGraph(
    //         firstGraph.splice(
    //           index,
    //           selectedValues.secondGraph.endIndex -
    //             selectedValues.secondGraph.startIndex
    //         )
    //       );
    //     }
    //     // setFirstGraph(firstGraph.splice(index, firstGraph.length - index));
    //     // setSecondGraph(secondGraph.splice(index, secondGraph.length - index));
    //   } else {
    //     const index = getElementAtEvent(chatRef2.current, e)[0].index;

    //     if (
    //       firstGraph.length - index <
    //       selectedValues.firstGraph.endIndex -
    //         selectedValues.firstGraph.startIndex
    //     ) {
    //       setSecondGraph(secondGraph.splice(index, secondGraph.length - index));
    //       setFirstGraph(firstGraph.splice(index, firstGraph.length - index));
    //     } else {
    //       setSecondGraph(
    //         secondGraph.splice(
    //           index,
    //           selectedValues.firstGraph.endIndex -
    //             selectedValues.firstGraph.startIndex
    //         )
    //       );
    //       setFirstGraph(
    //         firstGraph.splice(
    //           index,
    //           selectedValues.firstGraph.endIndex -
    //             selectedValues.firstGraph.startIndex
    //         )
    //       );
    //     }

    //     // setSecondGraph(secondGraph.splice(index, secondGraph.length - index));
    //     // setFirstGraph(firstGraph.splice(index, firstGraph.length - index));
    //   }
    } catch (e) {
      console.log(e);
    }
    // console.log(getElementAtEvent(chartRef.current, e));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        // display: 'flex',
        color: "black",
        backgroundColor: "white",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Graph 1</h1>
          <div>
            <h3>Start Index: {selectedValues.firstGraph.startIndex}</h3>
            <h3>End Index: {selectedValues.firstGraph.endIndex}</h3>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Graph 2</h1>
          <div>
            <h3>Start Index: {selectedValues.secondGraph.startIndex}</h3>
            <h3>End Index: {selectedValues.secondGraph.endIndex}</h3>
          </div>
        </div>
      </div>
      <button onClick={(e) => onClickPoint(e)}>
        Align Graphs'
      </button>
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
  );
}
const options = {
  responsive: true,
  tooltips: {
    mode: "x-axis",
    intersect: true,
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export default App;
