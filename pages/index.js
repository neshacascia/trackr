import Head from 'next/head';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>trackr</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white w-screen h-full flex flex-col px-6 pt-[72px] pb-8 md:h-screen md:px-12">
        <section className="w-full h-full flex flex-col justify-center items-center gap-4 pt-[72px] md:mt-8 lg:-mt-4 lg:flex-row">
          <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-10">
            <h1 className="text-3xl font-medium text-center md:text-5xl lg:text-left">
              Simplify your finances so you can focus on what matters most.
            </h1>
            <p className="text-lg font-light text-center md:text-2xl lg:text-left">
              Whether you&apos;re an individual, small business owner, or
              freelancer, Trackr puts you in total control, allowing you to
              manage your invoices and expenses all in one place.
            </p>

            <button className="text-white text-lg bg-brightPurple rounded-3xl py-4 px-10 hover:bg-hoverPurple md:text-xl">
              Sign up now
            </button>
          </div>

          <Image
            src="/assets/finances-illustration.jpg"
            alt=""
            width={600}
            height={500}
            className="mb-10"
          />
        </section>
        <p className="text-xs text-center">
          <a href="https://www.freepik.com/free-vector/investor-with-laptop-monitoring-growth-dividends-trader-sitting-stack-money-investing-capital-analyzing-profit-graphs-vector-illustration-finance-stock-trading-investment_10173124.htm#query=finances&position=1&from_view=search&track=sph">
            Image by pch.vector
          </a>{' '}
          on Freepik
        </p>
      </main>
    </>
  );
}
