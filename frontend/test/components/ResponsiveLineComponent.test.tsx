import { render, screen } from '@testing-library/react';
import { describe, it, expect, test } from 'vitest';
import ResponsiveLineComponent from '@/components/ResponsiveLineComponent';

interface DataPoint {
  x: string;
  y: number;
}

interface CountryData {
  id: string;
  color: string;
  data: DataPoint[];
}

type LineDataArray = CountryData[];

const mockData: LineDataArray = [
  {
    id: 'country1',
    color: 'hsl(348, 70%, 50%)',
    data: [
      { x: '2021-01', y: 30 },
      { x: '2021-02', y: 20 },
      { x: '2021-03', y: 50 },
    ],
  },
  {
    id: 'country2',
    color: 'hsl(208, 70%, 50%)',
    data: [
      { x: '2021-01', y: 40 },
      { x: '2021-02', y: 35 },
      { x: '2021-03', y: 60 },
    ],
  },
];

// test('Page', () => {
//   render(<Page />)
//   expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
// })

describe('ResponsiveLineComponent', () => {
  it('renders without crashing', () => {
    render(<ResponsiveLineComponent data={mockData} xTitle="Month" yTitle="Value" />);
    // const xAxisLabel = screen.getByText(/month/i);
    // const yAxisLabel = screen.getByText(/value/i);

    // expect(xAxisLabel).toBeInTheDocument();
    // expect(yAxisLabel).toBeInTheDocument();
  });

  // it('displays the correct legends', () => {
  //   render(<ResponsiveLineComponent data={mockData} xTitle="Month" yTitle="Value" />);
  //   const legendCountry1 = screen.getByText(/country1/i);
  //   const legendCountry2 = screen.getByText(/country2/i);

  //   expect(legendCountry1).toBeInTheDocument();
  //   expect(legendCountry2).toBeInTheDocument();
  // });

  // it('correctly applies xTitle and yTitle props', () => {
  //   const { container } = render(<ResponsiveLineComponent data={mockData} xTitle="Month" yTitle="Value" />);
  //   const xAxisLegend = container.querySelector('.axis-bottom text');
  //   const yAxisLegend = container.querySelector('.axis-left text');

  //   expect(xAxisLegend).toHaveTextContent('Month');
  //   expect(yAxisLegend).toHaveTextContent('Value');
  // });

  // it('renders data points correctly', () => {
  //   const { container } = render(<ResponsiveLineComponent data={mockData} xTitle="Month" yTitle="Value" />);
  //   const points = container.querySelectorAll('.nivo_point');

  //   expect(points.length).toBe(6); // 3 points for each of the 2 countries
  // });
});
