import { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min";
import * as d3 from "d3";
import "./UniversityStockPlot.css";
const UniversityStockPlot = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    d3.csv(
      "https://raw.githubusercontent.com/plotly/datasets/master/Mining-BTC-180.csv"
    ).then((rows) => {
      const unpack = (rows, key) => rows.map((row) => row[key]);

      // Line plot traces
      const trace1 = {
        x: unpack(rows, "Date"),
        y: unpack(rows, "Hash-rate"),
        xaxis: "x1",
        yaxis: "y1",
        mode: "lines",
        line: { width: 2, color: "#9748a1" },
        name: " Growth over time",
      };
      const trace2 = {
        x: unpack(rows, "Date"),
        y: unpack(rows, "Mining-revenue-USD"),
        xaxis: "x2",
        yaxis: "y2",
        mode: "lines",
        line: { width: 2, color: "#b04553" },
        name: "Last 6 months",
      };
      const trace3 = {
        x: unpack(rows, "Date"),
        y: unpack(rows, "Transaction-fees-BTC"),
        xaxis: "x3",
        yaxis: "y3",
        mode: "lines",
        line: { width: 2, color: "#af7bbd" },
        name: "Transactions",
      };

      const axis = {
        showline: true,
        zeroline: false,
        showgrid: true,
        mirror: true,
        ticklen: 4,
        gridcolor: "#ffffff",
        tickfont: { size: 10 },
      };

      const layout = {
        title: { text: "Apple stock over 180 days" },
        plot_bgcolor: "rgba(228, 222, 249, 0.65)",
        showlegend: false,
        xaxis1: Object.assign(
          { domain: [0.5, 1], anchor: "y1", showticklabels: false },
          axis
        ),
        xaxis2: Object.assign(
          { domain: [0.5, 1], anchor: "y2", showticklabels: false },
          axis
        ),
        xaxis3: Object.assign({ domain: [0.5, 1], anchor: "y3" }, axis),
        yaxis1: Object.assign(
          { domain: [0.66, 0.98], anchor: "x1", hoverformat: ".2f" },
          axis
        ),
        yaxis2: Object.assign(
          {
            domain: [0.34, 0.64],
            anchor: "x2",
            tickprefix: "$",
            hoverformat: ".2f",
          },
          axis
        ),
        yaxis3: Object.assign(
          {
            domain: [0.0, 0.32],
            anchor: "x3",
            tickprefix: "\u20BF",
            hoverformat: ".2f",
          },
          axis
        ),
      };

      Plotly.newPlot(chartRef.current, [trace1, trace2, trace3], layout);
    });
  }, []);

  return (
    <div className="center-plot">
      <div ref={chartRef} />
    </div>
  );
};

export default UniversityStockPlot;
