"use client"

import { AnimatedAxis } from '@visx/react-spring';
import { scaleTime, scaleLinear } from '@visx/scale';

const data = [
	{ date: new Date(2024, 0, 1), weight: 80 },
	{ date: new Date(2024, 0, 2), weight: 79.9 },
	{ date: new Date(2024, 0, 3), weight: 79.8 },
	{ date: new Date(2024, 0, 4), weight: 79.7 },
	{ date: new Date(2024, 0, 5), weight: 79.6 },
	{ date: new Date(2024, 0, 6), weight: 79.5 },
	{ date: new Date(2024, 0, 7), weight: 79.4 },
	{ date: new Date(2024, 0, 8), weight: 79.3 },
	{ date: new Date(2024, 0, 9), weight: 79.2 },
	{ date: new Date(2024, 0, 10), weight: 79.1 },
	{ date: new Date(2024, 0, 11), weight: 79 },
	{ date: new Date(2024, 0, 12), weight: 78.9 },
	{ date: new Date(2024, 0, 13), weight: 78.8 },
	{ date: new Date(2024, 0, 14), weight: 78.7 },
	{ date: new Date(2024, 0, 15), weight: 78.6 },
	{ date: new Date(2024, 0, 16), weight: 78.5 },
	{ date: new Date(2024, 0, 17), weight: 78.4 },
	{ date: new Date(2024, 0, 18), weight: 78.3 },
	{ date: new Date(2024, 0, 19), weight: 78.2 },
	{ date: new Date(2024, 0, 20), weight: 78.1 }
];

// const graphWidth = 5;
// const graphHeight = 5;

const axesColor = '#6e0fca';

const earliestDate = Math.min(...data.map(item => item.date.getTime()));
const latestDate = Math.max(...data.map(item => item.date.getTime()));

const timeScale = scaleTime<number>({
	domain: [earliestDate, latestDate],
	range: [0, 0],
	round: true,
	nice: true,
})

const lowestWeight = Math.min(...data.map(item => item.weight));
const highestWeight = Math.max(...data.map(item => item.weight));

const weightScale = scaleLinear<number>({
	domain: [lowestWeight, highestWeight],
	range: [0, 0],
	round: true,
	nice: true,
})

const WeightLossGraph = () => {
	return (
		<>
			<AnimatedAxis scale={weightScale} orientation="left" label="Weight" stroke={axesColor} numTicks={data.length} />
			<AnimatedAxis scale={timeScale} orientation="bottom" label="Date" stroke={axesColor} numTicks={data.length} />
		</>
	);
};



export default WeightLossGraph;
