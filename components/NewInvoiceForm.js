import { useRef } from 'react';
import FormFooter from './FormFooter';

export default function NewInvoiceForm({ addInvoice }) {
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();
  const countryInputRef = useRef();
  const clientNameInputRef = useRef();
  const clientEmailInputRef = useRef();
  const clientStreetInputRef = useRef();
  const clientCityInputRef = useRef();
  const clientPostalInputRef = useRef();
  const clientCountryInputRef = useRef();
  const invoiceDateInputRef = useRef();
  const paymentTermsInputRef = useRef();
  const descriptionInputRef = useRef();
  const statusInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const invoiceData = {
      street: streetInputRef.current.value,
      city: cityInputRef.current.value,
      postal: postalInputRef.current.value,
      country: countryInputRef.current.value,
      clientName: clientNameInputRef.current.value,
      clientEmail: clientEmailInputRef.current.value,
      clientStreet: clientStreetInputRef.current.value,
      clientCity: clientCityInputRef.current.value,
      clientPostal: clientPostalInputRef.current.value,
      clientCountry: clientCountryInputRef.current.value,
      invoiceDate: invoiceDateInputRef.current.value,
      paymentTerms: paymentTermsInputRef.current.value,
      description: descriptionInputRef.current.value,
    };

    addInvoice(invoiceData);
  }

  return (
    <form className="text-white" onSubmit={submitHandler}>
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
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
            ref={streetInputRef}
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
              className="text-white bg-mainPurple font-medium w-full border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
              ref={cityInputRef}
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
              className="text-white bg-mainPurple font-medium w-full border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
              ref={postalInputRef}
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
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
            ref={countryInputRef}
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
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
            ref={clientNameInputRef}
          />
        </label>

        <label
          htmlFor="email"
          className="font-light text-grayPurple flex flex-col"
        >
          Client's Email
          <input
            type="email"
            id="email"
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
            ref={clientEmailInputRef}
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
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
            ref={clientStreetInputRef}
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
              className="text-white bg-mainPurple font-medium w-full border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
              ref={clientCityInputRef}
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
              className="text-white bg-mainPurple font-medium w-full border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
              ref={clientPostalInputRef}
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
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
            ref={clientCountryInputRef}
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
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 px-5 mt-4"
            ref={invoiceDateInputRef}
          />
        </label>

        <label
          htmlFor="terms"
          className="font-light text-grayPurple flex flex-col"
        >
          Payment Terms
          <select
            id="terms"
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-4 pl-5 mt-4"
            ref={paymentTermsInputRef}
          >
            <option>Net 1 Day</option>
            <option>Net 7 Days</option>
            <option>Net 14 Days</option>
            <option>Net 30 Days</option>
          </select>
        </label>

        <label
          htmlFor="desc"
          className="font-light text-grayPurple flex flex-col"
        >
          Project Description
          <input
            type="text"
            id="desc"
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4"
            ref={descriptionInputRef}
          />
        </label>

        <label
          htmlFor="status"
          className="font-light text-grayPurple flex flex-col"
        >
          Status
          <select
            id="status"
            className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-4 pl-5 mt-4"
            ref={statusInputRef}
          >
            <option>Pending</option>
            <option>Paid</option>
          </select>
        </label>
      </section>

      <FormFooter />
    </form>
  );
}
