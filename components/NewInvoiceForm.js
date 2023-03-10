import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function NewInvoiceForm() {
  return (
    <form className="text-white ">
      <section className="flex flex-col gap-6 mb-10">
        <h4 className="text-brightPurple">Bill From</h4>
        <label
          htmlFor="address"
          className="font-light text-grayPurple flex flex-col"
        >
          Street Address
          <input
            type="text"
            id="address"
            className="text-white bg-mainPurple border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
          />
        </label>

        <div className="flex gap-6">
          <label
            htmlFor="city"
            className="font-light text-grayPurple flex flex-col"
          >
            City
            <input
              type="text"
              id="city"
              className="text-white bg-mainPurple w-full border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
            />
          </label>

          <label
            htmlFor="postal-code"
            className="font-light text-grayPurple flex flex-col"
          >
            Postal Code
            <input
              type="text"
              id="postal-code"
              className="text-white bg-mainPurple w-full border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
            />
          </label>
        </div>

        <label
          htmlFor="country"
          className="font-light text-grayPurple flex flex-col"
        >
          Country
          <input
            type="text"
            id="country"
            className="text-white bg-mainPurple border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
          />
        </label>
      </section>

      <section className="flex flex-col gap-6">
        <h4 className="text-brightPurple">Bill To</h4>
        <label
          htmlFor="name"
          className="font-light text-grayPurple flex flex-col"
        >
          Client's Name
          <input
            type="text"
            id="name"
            className="text-white bg-mainPurple border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
          />
        </label>

        <label
          htmlFor="email"
          className="font-light text-grayPurple flex flex-col"
        >
          Client's Email
          <input
            type="text"
            id="email"
            className="text-white bg-mainPurple border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
          />
        </label>

        <label
          htmlFor="address"
          className="font-light text-grayPurple flex flex-col"
        >
          Street Address
          <input
            type="text"
            id="address"
            className="text-white bg-mainPurple border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
          />
        </label>

        <div className="flex gap-6">
          <label
            htmlFor="city"
            className="font-light text-grayPurple flex flex-col"
          >
            City
            <input
              type="text"
              id="city"
              className="text-white bg-mainPurple w-full border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
            />
          </label>

          <label
            htmlFor="postal-code"
            className="font-light text-grayPurple flex flex-col"
          >
            Postal Code
            <input
              type="text"
              id="postal-code"
              className="text-white bg-mainPurple w-full border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
            />
          </label>
        </div>

        <label
          htmlFor="country"
          className="font-light text-grayPurple flex flex-col"
        >
          Country
          <input
            type="text"
            id="country"
            className="text-white bg-mainPurple border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
          />
        </label>

        <label
          htmlFor="invoice-date"
          className="font-light text-grayPurple flex flex-col"
        >
          Invoice Date
          <input
            type="date"
            id="invoice-date"
            className="text-white bg-mainPurple border-[1px] border-borderPurple rounded-[4px] py-3 px-5"
          />
        </label>

        <label
          htmlFor="terms"
          className="font-light text-grayPurple flex flex-col"
        >
          Payment Terms
          <input
            type="text"
            id="terms"
            className="text-white bg-mainPurple border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
          />
        </label>

        <label
          htmlFor="desc"
          className="font-light text-grayPurple flex flex-col"
        >
          Project Description
          <input
            type="text"
            id="desc"
            className="text-white bg-mainPurple border-[1px] border-borderPurple rounded-[4px] py-3 pl-5"
          />
        </label>
      </section>

      <section>
        <h3>Item List</h3>

        <label htmlFor="item"></label>
        <input type="text" id="item" />

        <div>
          <label htmlFor="qty">
            Quantity
            <input type="number" id="qty" />
          </label>

          <label htmlFor="price">
            City
            <input type="number" id="price" />
          </label>

          <label>
            Total
            <span></span>
          </label>
        </div>
      </section>
    </form>
  );
}
