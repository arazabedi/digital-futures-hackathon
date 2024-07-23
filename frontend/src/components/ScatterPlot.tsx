"use client";

import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { useMemo } from "react";

type DataPoint = {
  x: number;
  y: number;
};

type Group = {
  id: string;
  data: DataPoint[];
};

type DataSet = Group[];

interface QuadrantLayerProps {
    xScale: (value: number) => number;
    yScale: (value: number) => number;
    xDomain: [number, number];
    yDomain: [number, number];
    innerWidth: number;
    innerHeight: number;
}

const QuadrantLayer = ({ xScale, yScale, xDomain, yDomain, innerWidth, innerHeight }: QuadrantLayerProps) => {
    const middleX = xScale((xDomain[1] - xDomain[0]) / 2 + xDomain[0]);
    const middleY = yScale((yDomain[1] - yDomain[0]) / 2 + yDomain[0]);

    return (
        <g>
            {/* Horizontal Line */}
            <line x1={0} y1={middleY} x2={innerWidth} y2={middleY} stroke="black" strokeWidth={1} />
            {/* Vertical Line */}
            <line x1={middleX} y1={0} x2={middleX} y2={innerHeight} stroke="black" strokeWidth={1} />

            {/* Quadrant Labels */}
            <text x={middleX + 140} y={middleY - 255} style={{ fontSize: 15 }}>Proven Excellence</text>
            <text x={middleX - 290} y={middleY - 255} style={{ fontSize: 15 }}>Emerging Prospects</text>
            <text x={middleX - 290} y={middleY + 250} style={{ fontSize: 15 }}>Foundational Merit</text>
            <text x={middleX + 140} y={middleY + 250} style={{ fontSize: 15 }}>Operationally Effective</text>
        </g>
    );
};

const ScatterPlot = ({ data }: { data: DataSet }) => {
    const xDomain = [50, 95];
    const yDomain = [40, 85];

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
                xScale={{ type: "linear", min: 50, max: 95 }}
                xFormat=" >-.2f"
                yScale={{ type: "linear", min: 40, max: 85 }}
                yFormat=">-.2f"
                blendMode="multiply"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Business Readiness",
                    legendPosition: "middle",
                    legendOffset: 46,
                    truncateTickAt: 0,
                }}
                axisLeft={{
                    orient: "left",
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Perceived Business Value",
                    legendPosition: "middle",
                    legendOffset: -60,
                    truncateTickAt: 0,
                }}
                nodeSize={40}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fontSize: '14px',
                            },
                        },
                        legend: {
                            text: {
                                fontSize: '16px',
                            },
                        },
                    },
                }}
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
                layers={['grid', 'axes', 'nodes', 'markers', 'mesh', (props) => (
                    <QuadrantLayer
                        xScale={props.xScale}
                        yScale={props.yScale}
                        xDomain={xDomain}
                        yDomain={yDomain}
                        innerWidth={props.innerWidth}
                        innerHeight={props.innerHeight}
                    />
                )]}
            />
        </main>
    );
};

export default ScatterPlot;
