"use client";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { useState } from "react";

type DataPoint = {
  x: number;
  y: number;
};

type Group = {
  id: string;
  data: DataPoint[];
};

type DataSet = Group[];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ScatterPlot = ({ data }: { data: DataSet }) => {
  return (
    <main className="h-3/6 w-3/6">
      <ResponsiveScatterPlot
        data={data}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        useMesh={true}
        tooltip={({ node }) => (
          <div
            style={{
              background: "white",
              padding: "10px",
              border: "1px solid #ccc",
              textAlign: "center",
            }}
          >
            <strong>{node.serieId}</strong>
            <br />
            Business readiness: {node.data.x}
            <br />
            Perceived business value: {node.data.y}
          </div>
        )}
        annotations={[
          // {
          //   type: "circle",
          //   match: {
          //     index: 10,
          //   },
          //   noteX: 10,
          //   noteY: 10,
          //   offset: 10,
          //   note: "Node at index: 100",
          // },
          // {
          //   type: "rect",
          //   match: {
          //     index: 50,
          //   },
          //   noteX: -40,
          //   noteY: -40,
          //   offset: 4,
          //   note: "Node at index: 50",
          // },
          {
            type: "dot",
            // match: {
            //   index: 20,
            // },
            noteX: 0,
            noteY: {
              abs: -20,
            },
            size: 6,
            note: "Node at index: 20",
          },
        ]}
        xScale={{ type: "linear", min: 0, max: 100 }}
        xFormat=" >-.2f"
        yScale={{ type: "linear", min: 0, max: 100 }}
        yFormat=">-.2f"
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "business readiness",
          legendPosition: "middle",
          legendOffset: 46,
          truncateTickAt: 0,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "perceived business value",
          legendPosition: "middle",
          legendOffset: -60,
          truncateTickAt: 0,
        }}
        gridXValues={[50]}
        gridYValues={[50]}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: "left-to-right",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </main>
  );
};
export default ScatterPlot;
