import Chart from './Chart';

export default function PaymentsChart(props) {
  const chartDataPoints = [
    {
      label: 'Jan',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Feb',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Mar',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Apr',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'May',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Jun',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Jul',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Aug',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Sep',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Oct',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Nov',
      invoiceValue: 0,
      expenseValue: 0,
    },
    {
      label: 'Dec',
      invoiceValue: 0,
      expenseValue: 0,
    },
  ];

  for (const invoice of props.invoices) {
    const dateObj = new Date(invoice.date);
    dateObj.setHours(dateObj.getHours() + dateObj.getTimezoneOffset() / 60);

    const invoiceMonth = dateObj.getMonth();

    const total = invoice.total.reduce((acc, val) => acc + val, 0);

    chartDataPoints[invoiceMonth].invoiceValue += total;
  }

  for (const expense of props.expenses) {
    const dateObj = new Date(expense.date);
    dateObj.setHours(dateObj.getHours() + dateObj.getTimezoneOffset() / 60);

    const expenseMonth = dateObj.getMonth();

    chartDataPoints[expenseMonth].expenseValue += Number(expense.amount);
  }

  return <Chart dataPoints={chartDataPoints} isDarkMode={props.isDarkMode} />;
}
