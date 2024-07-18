"use client"

import appleStock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock"
import useMeasure from "react-use-measure"
import { scaleBand, scaleLinear } from "@visx/scale"
import { Group } from '@visx/group'
import { AxisLeft, AxisBottom } from "@visx/axis"

// data
const data = appleStock.slice(0, 10)

// margins
const margin = 32

// width and height
const defaultWidth = 100
const defaultHeight = 100

// innerWidth and innerHeight

// create the svg
const getXValue = (d: AppleStock) => d.date
const getYValue = (d: AppleStock) => d.close

// define the scales

// create the axis

// group it all

const XYAxes = () => {

	const [ref, bounds] = useMeasure();

	const width = bounds.width || defaultWidth
	const height = bounds.height || defaultHeight

	const innerWidth = width - margin * 2
	const innerHeight = height - margin * 2

	const xScale = scaleBand<string>({
		range: [margin, innerWidth],
		domain: data.map(getXValue),
		padding: 0.2,
	})

	const yScale = scaleLinear<number>({
		range: [innerHeight, margin],
		domain: [
			Math.min(...data.map(getYValue)) - 1,
			Math.max(...data.map(getYValue)) + 1,
		],
	})

	return (
		<>
			<svg ref={ref}
				width="100%"
				height="100%"
				viewBox={`0 0 ${width} ${height}`}>
				<Group>
					BAR
				</Group>
				<Group>
					<AxisBottom top={innerHeight} scale={xScale} />
				</Group>
				<Group>
					<AxisLeft left={margin} scale={yScale} />
				</Group>
			</svg>
		</>);
}

export default XYAxes;
