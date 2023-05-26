import ChartBar from './ChartBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

export default function Chart(props) {
  const dataPointValues = props.dataPoints.map(
    dataPoint => dataPoint.invoiceValue
  );
  const totalMax = Math.max(...dataPointValues);

  const expenseDataPointValues = props.dataPoints.map(
    expenseDataPoint => expenseDataPoint.expenseValue
  );
  const expenseTotalMax = Math.max(...expenseDataPointValues);

  return (
    <div
      className={`${
        props.isDarkMode
          ? 'text-draft bg-mainPurple'
          : 'text-grayerPurple bg-[#fdfdfd]'
      } text-center w-full h-72 flex flex-col gap-4 rounded-lg px-4 py-6`}
    >
      <div className="flex justify-end gap-4 px-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faSquare}
            className="text-brightPurple"
          ></FontAwesomeIcon>
          <p className="text-[#bac0e1] text-xs">Invoices</p>
        </div>

        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faSquare}
            className="text-[#3b278b]"
          ></FontAwesomeIcon>
          <p className="text-[#bac0e1] text-xs">Expenses</p>
        </div>
      </div>

      <div className="h-full flex justify-around">
        {props.dataPoints.map(dataPoint => (
          <ChartBar
            key={dataPoint.label}
            value={dataPoint.invoiceValue}
            expenseValue={dataPoint.expenseValue}
            maxValue={totalMax}
            expenseMaxValue={expenseTotalMax}
            label={dataPoint.label}
            isDarkMode={props.isDarkMode}
          />
        ))}
      </div>
    </div>
  );
}
