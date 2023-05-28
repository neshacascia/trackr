export default function ChartBar(props) {
  let invoiceBarFillHeight = '0%';
  let expenseBarFillHeight = '0%';

  if (props.invoiceMaxValue > 0) {
    invoiceBarFillHeight =
      Math.round((props.invoiceValue / props.invoiceMaxValue) * 100) + '%';
  }

  if (props.expenseMaxValue > 0) {
    expenseBarFillHeight =
      Math.round((props.expenseValue / props.expenseMaxValue) * 100) + '%';
  }

  return (
    <div className="h-full flex flex-col items-center gap-2">
      <div className="h-full flex gap-1 md:gap-2">
        <div
          className={`${
            props.isDarkMode
              ? 'bg-borderPurple border-borderPurple'
              : 'bg-[#ededf1] border-[#ededf1]'
          } h-full w-[10px] flex flex-col justify-end border-[1px] rounded-md overflow-hidden md:w-4`}
        >
          <div
            className="chart-bar bg-brightPurple w-full inline-block"
            style={{ height: invoiceBarFillHeight }}
          >
            <span className="tooltiptext text-white bg-darkPurple text-sm text-center max-w-full absolute rounded-md p-2 ml-1 z-50">
              {`$${props.invoiceValue.toFixed(2)}`}
            </span>
          </div>
        </div>
        <div
          className={`${
            props.isDarkMode
              ? 'bg-borderPurple border-borderPurple'
              : 'bg-[#ededf1] border-[#ededf1]'
          } h-full w-[10px] flex flex-col justify-end border-[1px] rounded-md overflow-hidden md:w-4`}
        >
          <div
            className="chart-bar bg-[#3b278b] w-full inline-block"
            style={{ height: expenseBarFillHeight }}
          >
            <span className="tooltiptext text-white bg-darkPurple text-sm text-center max-w-full absolute rounded-md p-2 ml-1 z-50">
              {`$${props.expenseValue.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
      <div className="font-bold text-sm text-center">{props.label}</div>
    </div>
  );
}
