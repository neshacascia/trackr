import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function EditInvoiceForm({ updateInvoice, invoiceData }) {
  const router = useRouter();

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
  const paymentTermsInputRef = useRef();
  const descriptionInputRef = useRef();

  const itemNameInputRef = useRef();
  const quantityInputRef = useRef();
  const priceInputRef = useRef();
  const totalInputRef = useRef();

  const [items, setItems] = useState(invoiceData.items);

  function addNewItem() {
    const newItem = {
      id: items.length,
      itemName: '',
      quantity: '',
      price: '',
      total: 0,
    };
    setItems([...items, newItem]);
  }

  function updateItemValue(id, key, value) {
    setItems(
      items.map(item => {
        if (item.id === id) {
          const total = (item.price * item.quantity).toFixed(2);
          return {
            ...item,
            total,
            [key]: value,
          };
        } else {
          return item;
        }
      })
    );
  }

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
      paymentTerms: paymentTermsInputRef.current.value,
      description: descriptionInputRef.current.value,
      items: items.map(item => ({
        itemName: item.itemName,
        quantity: item.quantity,
        price: item.price,
        total: Number(item.price) * Number(item.quantity).toFixed(2),
      })),
    };

    updateInvoice(invoiceData);
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
            defaultValue={invoiceData.street}
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
              defaultValue={invoiceData.city}
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
              defaultValue={invoiceData.postal}
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
            defaultValue={invoiceData.country}
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
            defaultValue={invoiceData.clientName}
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
            defaultValue={invoiceData.clientEmail}
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
            defaultValue={invoiceData.clientStreet}
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
              defaultValue={invoiceData.clientCity}
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
              defaultValue={invoiceData.clientPostal}
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
            defaultValue={invoiceData.clientCountry}
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
            defaultValue={invoiceData.invoiceDate}
            disabled
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
            defaultValue={invoiceData.paymentTerms}
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
            defaultValue={invoiceData.description}
          />
        </label>
      </section>

      <section className="mt-16 mb-12">
        <h3 className="text-boldGrayPurple text-xl font-medium mb-6">
          Item List
        </h3>

        {items.map((item, ind) => (
          <div key={ind} className="w-full mb-12">
            <label
              htmlFor={`item-${item.id}`}
              className="font-light text-grayPurple flex flex-col"
            >
              Item Name
              <input
                type="text"
                id={`item-${item.id}`}
                name="itemName"
                ref={itemNameInputRef}
                value={item.itemName}
                defaultValue={invoiceData.itemName}
                onChange={e =>
                  updateItemValue(item.id, 'itemName', e.target.value)
                }
                className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 px-5 mt-4"
              />
            </label>

            <div className="flex justify-between mt-6">
              <label
                htmlFor={`qty-${item.id}`}
                className="font-light text-grayPurple w-[64px] flex flex-col"
              >
                Qty.
                <input
                  type="number"
                  id={`qty-${item.id}`}
                  name="quantity"
                  placeholder="0"
                  ref={quantityInputRef}
                  value={item.quantity}
                  defaultValue={invoiceData.quantity}
                  onChange={e =>
                    updateItemValue(item.id, 'quantity', Number(e.target.value))
                  }
                  className="text-white bg-mainPurple font-medium w-[100%] border-[1px] border-borderPurple rounded-[4px] py-3 px-5 mt-4"
                />
              </label>

              <label
                htmlFor="price"
                className="font-light text-grayPurple w-[100px] flex flex-col"
              >
                Price
                <input
                  type="number"
                  id={`price-${item.id}`}
                  name="price"
                  placeholder="0"
                  ref={priceInputRef}
                  value={item.price}
                  defaultValue={invoiceData.price}
                  onChange={e =>
                    updateItemValue(item.id, 'price', Number(e.target.value))
                  }
                  className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 px-5 mt-4"
                />
              </label>

              <label className="font-light text-grayPurple flex flex-col">
                Total
                <div>
                  <input
                    type="number"
                    id={`total-${item.id}`}
                    name="total"
                    ref={totalInputRef}
                    value={(item.price * item.quantity).toFixed(2)}
                    onChange={e =>
                      updateItemValue(item.id, 'total', Number(e.target.value))
                    }
                    className="text-grayPurple bg-transparent font-medium py-3 pr-5 mt-4"
                    disabled
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-grayPurple text-lg"
                  ></FontAwesomeIcon>
                </div>
              </label>
            </div>
          </div>
        ))}

        <button
          onClick={addNewItem}
          type="button"
          className="text-grayPurple bg-borderPurple w-full font-medium rounded-3xl py-4 px-[108px] mt-12 mb-16"
        >
          + Add New Item
        </button>
      </section>

      <footer className="bg-mainPurple h-[91px] flex items-center gap-2 px-6 -mx-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-white bg-borderPurple font-medium w-full rounded-3xl py-4 px-[18px]"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={submitHandler}
          className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px]"
        >
          Save Changes
        </button>
      </footer>
    </form>
  );
}
