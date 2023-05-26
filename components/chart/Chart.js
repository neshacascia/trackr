import ChartBar from './ChartBar';

export default function Chart(props) {
  const dataPointValues = props.dataPoints.map(
    dataPoint => dataPoint.invoiceValue
  );
  const totalMax = Math.max(...dataPointValues);

  return (
    <div
      className={`${
        props.isDarkMode
          ? 'text-draft bg-mainPurple'
          : 'text-grayerPurple bg-[#fdfdfd]'
      } text-center w-full h-72 flex justify-around rounded-lg px-4 py-6`}
    >
      {props.dataPoints.map(dataPoint => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.invoiceValue}
          maxValue={totalMax}
          label={dataPoint.label}
          isDarkMode={props.isDarkMode}
        />
      ))}
    </div>
  );
}
