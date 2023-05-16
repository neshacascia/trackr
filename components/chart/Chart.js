import ChartBar from './ChartBar';

export default function Chart(props) {
  const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
  const totalMax = Math.max(...dataPointValues);

  return (
    <div className="chart text-draft bg-mainPurple text-center w-full h-72 flex justify-around rounded-lg px-4 py-6">
      {props.dataPoints.map(dataPoint => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMax}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
}
