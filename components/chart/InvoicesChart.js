import Chart from './Chart';

export default function InvoicesChart(props) {
  const chartDataPoints = [
    {
      label: 'Jan',
      value: 0,
    },
    {
      label: 'Feb',
      value: 0,
    },
    {
      label: 'Mar',
      value: 0,
    },
    {
      label: 'Apr',
      value: 0,
    },
    {
      label: 'May',
      value: 0,
    },
    {
      label: 'Jun',
      value: 0,
    },
    {
      label: 'Jul',
      value: 0,
    },
    {
      label: 'Aug',
      value: 0,
    },
    {
      label: 'Sep',
      value: 0,
    },
    {
      label: 'Oct',
      value: 0,
    },
    {
      label: 'Nov',
      value: 0,
    },
    {
      label: 'Dec',
      value: 0,
    },
  ];

  for (const invoice of props.invoices) {
    const dateObj = new Date(invoice.date);
    dateObj.setHours(dateObj.getHours() + dateObj.getTimezoneOffset() / 60);

    const invoiceMonth = dateObj.getMonth();

    const total = invoice.total.reduce((acc, val) => acc + val, 0);

    chartDataPoints[invoiceMonth].value += total;
  }

  return <Chart dataPoints={chartDataPoints} isDarkMode={props.isDarkMode} />;
}
