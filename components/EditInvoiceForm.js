import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function EditInvoiceForm({
  updateInvoice,
  invoiceData,
  isDarkMode,
  showModal,
  setShowModal,
}) {
  const router = useRouter();

  const [streetInputValidation, setStreetInputValidation] = useState(false);
  const [streetInputTouched, setStreetInputTouched] = useState(false);

  const [cityInputValidation, setCityInputValidation] = useState(false);
  const [cityInputTouched, setCityInputTouched] = useState(false);

  const [postalInputValidation, setPostalInputValidation] = useState(false);
  const [postalInputTouched, setPostalInputTouched] = useState(false);

  const [countryInputValidation, setCountryInputValidation] = useState(false);
  const [countryInputTouched, setCountryInputTouched] = useState(false);

  const [clientNameInputValidation, setClientNameInputValidation] =
    useState(false);
  const [clientNameInputTouched, setClientNameInputTouched] = useState(false);

  const [clientEmailInputValidation, setClientEmailInputValidation] =
    useState(false);
  const [clientEmailInputTouched, setClientEmailInputTouched] = useState(false);

  const [paymentTermsInputValidation, setPaymentTermsInputValidation] =
    useState(false);
  const [paymentTermsInputTouched, setPaymentTermsInputTouched] =
    useState(false);

  const [descriptionInputValidation, setDescriptionInputValidation] =
    useState(false);
  const [descriptionInputTouched, setDescriptionInputTouched] = useState(false);

  const [itemNameInputValidation, setItemNameInputValidation] = useState(false);
  const [itemNameInputTouched, setItemNameInputTouched] = useState(false);

  const [quantityInputValidation, setQuantityInputValidation] = useState(false);
  const [quantityInputTouched, setQuantityInputTouched] = useState(false);

  const [priceInputValidation, setPriceInputValidation] = useState(false);
  const [priceInputTouched, setPriceInputTouched] = useState(false);

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

  function deleteItem(id) {
    setItems(items.filter(item => item.id !== id));
  }

  function inputBlurHandler(setInputTouched, inputRef, setInputValidation) {
    setInputTouched(true);

    if (typeof inputRef === 'number' && inputRef === '') {
      setInputValidation(false);
      return;
    } else if (inputRef.current.value.trim() === '') {
      setInputValidation(false);
      return;
    } else {
      setInputTouched(false);
    }
  }

  function changeHandler(e, setInputValidation) {
    if (e.target.value.trim() !== '') {
      setInputValidation(true);
    }
  }

  function itemChangeHandler(id, key, value, setInputValidation) {
    if (typeof value === 'number') {
      setInputValidation(true);
    } else if (value.trim() !== '') {
      setInputValidation(true);
    }
    updateItemValue(id, key, value);
  }

  function submitHandler(e) {
    e.preventDefault();

    setStreetInputTouched(true);
    setCityInputTouched(true);
    setPostalInputTouched(true);
    setCountryInputTouched(true);
    setClientNameInputTouched(true);
    setClientEmailInputTouched(true);
    setPaymentTermsInputTouched(true);
    setDescriptionInputTouched(true);
    setItemNameInputTouched(true);
    setQuantityInputTouched(true);
    setPriceInputTouched(true);

    if (streetInputRef.current.value.trim() === '') {
      setStreetInputValidation(false);
      return;
    } else if (cityInputRef.current.value.trim() === '') {
      setCityInputValidation(false);
      return;
    } else if (postalInputRef.current.value.trim() === '') {
      setPostalInputValidation(false);
      return;
    } else if (countryInputRef.current.value.trim() === '') {
      setCountryInputValidation(false);
      return;
    } else if (clientNameInputRef.current.value.trim() === '') {
      setClientNameInputValidation(false);
      return;
    } else if (clientEmailInputRef.current.value.trim() === '') {
      setClientEmailInputValidation(false);
      return;
    } else if (paymentTermsInputRef.current.value.trim() === '') {
      setPaymentTermsInputValidation(false);
      return;
    } else if (descriptionInputRef.current.value.trim() === '') {
      setDescriptionInputValidation(false);
      return;
    } else if (itemNameInputRef.current.value.trim() === '') {
      setItemNameInputValidation(false);
      return;
    } else if (quantityInputRef.current.value.trim() === '') {
      setQuantityInputValidation(false);
      return;
    } else if (priceInputRef.current.value.trim() === '') {
      setPriceInputValidation(false);
      return;
    } else {
      setStreetInputValidation(true);
      setCityInputValidation(true);
      setPostalInputValidation(true);
      setCountryInputValidation(true);
      setClientNameInputValidation(true);
      setClientEmailInputValidation(true);
      setPaymentTermsInputValidation(true);
      setDescriptionInputValidation(true);
      setItemNameInputValidation(true);
      setQuantityInputValidation(true);
      setPriceInputValidation(true);

      const data = {
        id: invoiceData.id,
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

      updateInvoice(data);

      if (window.innerWidth >= 768) {
        setShowModal(false);
      }
    }
  }

  function cancelEditsHandler() {
    if (window.innerWidth >= 768) {
      setShowModal(false);
    } else {
      router.back();
    }
  }

  return (
    <form
      className={`text-white invoice ${showModal ? 'px-6' : ''}`}
      onSubmit={submitHandler}
    >
      <section className="flex flex-col gap-6 mb-10">
        <h4 className="text-brightPurple font-medium">Bill From</h4>
        <label
          htmlFor="address"
          className={`${
            !streetInputValidation && streetInputTouched
              ? 'text-deleteBtn'
              : 'text-grayPurple'
          } font-light flex flex-col`}
        >
          <div className="flex justify-between">
            Street Address
            {!streetInputValidation && streetInputTouched && (
              <p className="text-deleteBtn">can't be empty</p>
            )}
          </div>
          <input
            type="text"
            id="address"
            className={`${
              isDarkMode
                ? 'text-white bg-mainPurple border-borderPurple'
                : 'text-lightText bg-white border-draft'
            }  font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
              !streetInputValidation && streetInputTouched
                ? 'border-deleteBtn'
                : ''
            }`}
            ref={streetInputRef}
            defaultValue={invoiceData.street}
            onBlur={e =>
              inputBlurHandler(
                setStreetInputTouched,
                streetInputRef,
                setStreetInputValidation
              )
            }
            onChange={e => changeHandler(e, setStreetInputValidation)}
          />
        </label>

        <div className="md:flex gap-6">
          <div className="flex gap-6 mb-6 md:-mb-6">
            <label
              htmlFor="city"
              className={`${
                !cityInputValidation && cityInputTouched
                  ? 'text-deleteBtn'
                  : 'text-grayPurple'
              } font-light flex flex-col`}
            >
              <div className="flex justify-between">
                City
                {!cityInputValidation && cityInputTouched && (
                  <p className="text-deleteBtn">can't be empty</p>
                )}
              </div>
              <input
                type="text"
                id="city"
                className={`${
                  isDarkMode
                    ? 'text-white bg-mainPurple border-borderPurple'
                    : 'text-lightText bg-white border-draft'
                }  font-medium w-full border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
                  !cityInputValidation && cityInputTouched
                    ? 'border-deleteBtn'
                    : ''
                }`}
                ref={cityInputRef}
                defaultValue={invoiceData.city}
                onBlur={e =>
                  inputBlurHandler(
                    setCityInputTouched,
                    cityInputRef,
                    setCityInputValidation
                  )
                }
                onChange={e => changeHandler(e, setCityInputValidation)}
              />
            </label>

            <label
              htmlFor="postal-code"
              className={`${
                !postalInputValidation && postalInputTouched
                  ? 'text-deleteBtn'
                  : 'text-grayPurple'
              } font-light flex flex-col`}
            >
              <div className="flex justify-between">
                Postal Code
                {!postalInputValidation && postalInputTouched && (
                  <p className="text-deleteBtn">can't be empty</p>
                )}
              </div>
              <input
                type="text"
                id="postal-code"
                className={`${
                  isDarkMode
                    ? 'text-white bg-mainPurple border-borderPurple'
                    : 'text-lightText bg-white border-draft'
                }  font-medium w-full border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
                  !postalInputValidation && postalInputTouched
                    ? 'border-deleteBtn'
                    : ''
                }`}
                ref={postalInputRef}
                defaultValue={invoiceData.postal}
                onBlur={e =>
                  inputBlurHandler(
                    setPostalInputTouched,
                    postalInputRef,
                    setPostalInputValidation
                  )
                }
                onChange={e => changeHandler(e, setPostalInputValidation)}
              />
            </label>
          </div>

          <label
            htmlFor="country"
            className={`${
              !countryInputValidation && countryInputTouched
                ? 'text-deleteBtn'
                : 'text-grayPurple'
            } font-light flex flex-col`}
          >
            <div className="flex justify-between">
              Country
              {!countryInputValidation && countryInputTouched && (
                <p className="text-deleteBtn">can't be empty</p>
              )}
            </div>
            <input
              type="text"
              id="country"
              className={`${
                isDarkMode
                  ? 'text-white bg-mainPurple border-borderPurple'
                  : 'text-lightText bg-white border-draft'
              }  font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
                !countryInputValidation && countryInputTouched
                  ? 'border-deleteBtn'
                  : ''
              }`}
              ref={countryInputRef}
              defaultValue={invoiceData.country}
              onBlur={e =>
                inputBlurHandler(
                  setCountryInputTouched,
                  countryInputRef,
                  setCountryInputValidation
                )
              }
              onChange={e => changeHandler(e, setCountryInputValidation)}
            />
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h4 className="text-brightPurple font-medium">Bill To</h4>
        <label
          htmlFor="name"
          className={`${
            !clientNameInputValidation && clientNameInputTouched
              ? 'text-deleteBtn'
              : 'text-grayPurple'
          } font-light flex flex-col`}
        >
          <div className="flex justify-between">
            Client's Name
            {!clientNameInputValidation && clientNameInputTouched && (
              <p className="text-deleteBtn">can't be empty</p>
            )}
          </div>
          <input
            type="text"
            id="name"
            className={`${
              isDarkMode
                ? 'text-white bg-mainPurple border-borderPurple'
                : 'text-lightText bg-white border-draft'
            } font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
              !clientNameInputValidation && clientNameInputTouched
                ? 'border-deleteBtn'
                : ''
            }`}
            ref={clientNameInputRef}
            defaultValue={invoiceData.clientName}
            onBlur={e =>
              inputBlurHandler(
                setClientNameInputTouched,
                clientNameInputRef,
                setClientNameInputValidation
              )
            }
            onChange={e => changeHandler(e, setClientNameInputValidation)}
          />
        </label>

        <label
          htmlFor="email"
          className={`${
            !clientEmailInputValidation && clientEmailInputTouched
              ? 'text-deleteBtn'
              : 'text-grayPurple'
          } font-light flex flex-col`}
        >
          <div className="flex justify-between">
            Client's Email
            {!clientEmailInputValidation && clientEmailInputTouched && (
              <p className="text-deleteBtn">can't be empty</p>
            )}
          </div>
          <input
            type="email"
            id="email"
            className={`${
              isDarkMode
                ? 'text-white bg-mainPurple border-borderPurple'
                : 'text-lightText bg-white border-draft'
            }  font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
              !clientEmailInputValidation && clientEmailInputTouched
                ? 'border-deleteBtn'
                : ''
            }`}
            ref={clientEmailInputRef}
            defaultValue={invoiceData.clientEmail}
            onBlur={e =>
              inputBlurHandler(
                setClientEmailInputTouched,
                clientEmailInputRef,
                setClientEmailInputValidation
              )
            }
            onChange={e => changeHandler(e, setClientEmailInputValidation)}
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
            className={`${
              isDarkMode
                ? 'text-white bg-mainPurple border-borderPurple'
                : 'text-lightText bg-white border-draft'
            }  font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple`}
            ref={clientStreetInputRef}
            defaultValue={invoiceData.clientStreet}
          />
        </label>

        <div className="md:flex gap-6">
          <div className="flex gap-6 mb-6 md:-mb-6">
            <label
              htmlFor="city"
              className="font-light text-grayPurple flex flex-col"
            >
              City
              <input
                type="text"
                id="city"
                className={`${
                  isDarkMode
                    ? 'text-white bg-mainPurple border-borderPurple'
                    : 'text-lightText bg-white border-draft'
                }  font-medium w-full border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple`}
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
                className={`${
                  isDarkMode
                    ? 'text-white bg-mainPurple border-borderPurple'
                    : 'text-lightText bg-white border-draft'
                } font-medium w-full border-[1px] border-borderPurple rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple`}
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
              className={`${
                isDarkMode
                  ? 'text-white bg-mainPurple border-borderPurple'
                  : 'text-lightText bg-white border-draft'
              }  font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple`}
              ref={clientCountryInputRef}
              defaultValue={invoiceData.clientCountry}
            />
          </label>
        </div>

        <div className="md:flex justify-between gap-6 md:-mb-6">
          <label
            htmlFor="invoice-date"
            className="font-light text-grayPurple flex flex-col opacity-50 mb-6 md:w-full"
          >
            Invoice Date
            <input
              type="date"
              id="invoice-date"
              className="text-white bg-mainPurple font-medium border-[1px] border-borderPurple rounded-[4px] py-3 px-5 mt-4 cursor-not-allowed"
              defaultValue={invoiceData.invoiceDate}
              disabled
            />
          </label>

          <label
            htmlFor="terms"
            className={`${
              !paymentTermsInputValidation && paymentTermsInputTouched
                ? 'text-deleteBtn'
                : 'text-grayPurple'
            } font-light w-full flex flex-col`}
          >
            <div className="flex justify-between">
              Payment Terms
              {!paymentTermsInputValidation && paymentTermsInputTouched && (
                <p className="text-deleteBtn">can't be empty</p>
              )}
            </div>
            <div className="text-brightPurple text-xl font-extrabold relative flex items-center after:top-[26px] after:right-[22px] after:absolute after:content-['⌄'] align-middle">
              <select
                id="terms"
                className={`${
                  isDarkMode
                    ? 'text-white bg-mainPurple border-borderPurple'
                    : 'text-lightText bg-white border-draft'
                } text-base font-medium w-full border-[1px] rounded-[4px] pt-4 pb-3 pl-5 mt-4 cursor-pointer appearance-none focus:outline-none focus:ring focus:ring-brightPurple ${
                  !paymentTermsInputValidation && paymentTermsInputTouched
                    ? 'border-deleteBtn'
                    : ''
                }`}
                ref={paymentTermsInputRef}
                defaultValue={invoiceData.paymentTerms}
                onBlur={e =>
                  inputBlurHandler(
                    setPaymentTermsInputTouched,
                    paymentTermsInputRef,
                    setPaymentTermsInputValidation
                  )
                }
                onChange={e => changeHandler(e, setPaymentTermsInputValidation)}
              >
                <option>Net 1 Day</option>
                <option>Net 7 Days</option>
                <option>Net 14 Days</option>
                <option>Net 30 Days</option>
              </select>
            </div>
          </label>
        </div>

        <label
          htmlFor="desc"
          className={`${
            !descriptionInputValidation && descriptionInputTouched
              ? 'text-deleteBtn'
              : 'text-grayPurple'
          } font-light flex flex-col`}
        >
          <div className="flex justify-between">
            Project Description
            {!descriptionInputValidation && descriptionInputTouched && (
              <p className="text-deleteBtn">can't be empty</p>
            )}
          </div>
          <input
            type="text"
            id="desc"
            className={`${
              isDarkMode
                ? 'text-white bg-mainPurple border-borderPurple'
                : 'text-lightText bg-white border-draft'
            } font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
              !descriptionInputValidation && descriptionInputTouched
                ? 'border-deleteBtn'
                : ''
            }`}
            ref={descriptionInputRef}
            defaultValue={invoiceData.description}
            onBlur={e =>
              inputBlurHandler(
                setDescriptionInputTouched,
                descriptionInputRef,
                setDescriptionInputValidation
              )
            }
            onChange={e => changeHandler(e, setDescriptionInputValidation)}
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
              className={`${
                !itemNameInputValidation && itemNameInputTouched
                  ? 'text-deleteBtn'
                  : 'text-grayPurple'
              } font-light flex flex-col`}
            >
              <div className="flex justify-between">
                Item Name
                {!itemNameInputValidation && itemNameInputTouched && (
                  <p className="text-deleteBtn">can't be empty</p>
                )}
              </div>
              <input
                type="text"
                id={`item-${item.id}`}
                name="itemName"
                ref={itemNameInputRef}
                value={item.itemName}
                defaultValue={invoiceData.itemName}
                className={`${
                  isDarkMode
                    ? 'text-white bg-mainPurple border-borderPurple'
                    : 'text-lightText bg-white border-draft'
                } font-medium border-[1px] rounded-[4px] py-3 px-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
                  !itemNameInputValidation && itemNameInputTouched
                    ? 'border-deleteBtn'
                    : ''
                }`}
                onBlur={e =>
                  inputBlurHandler(
                    setItemNameInputTouched,
                    itemNameInputRef,
                    setItemNameInputValidation
                  )
                }
                onChange={e =>
                  itemChangeHandler(
                    item.id,
                    'itemName',
                    e.target.value,
                    setItemNameInputValidation
                  )
                }
              />
            </label>

            <div className="flex justify-between mt-6">
              <label
                htmlFor={`qty-${item.id}`}
                className={`${
                  !quantityInputValidation && quantityInputTouched
                    ? 'text-deleteBtn'
                    : 'text-grayPurple'
                } font-light w-[64px] flex flex-col`}
              >
                <div className="flex flex-col">
                  Qty.
                  {!quantityInputValidation && quantityInputTouched && (
                    <p className="text-deleteBtn">can't be empty</p>
                  )}
                </div>
                <input
                  type="number"
                  id={`qty-${item.id}`}
                  name="quantity"
                  placeholder="0"
                  ref={quantityInputRef}
                  value={item.quantity}
                  defaultValue={invoiceData.quantity}
                  className={`${
                    isDarkMode
                      ? 'text-white bg-mainPurple border-borderPurple'
                      : 'text-lightText bg-white border-draft'
                  } font-medium w-[100%] border-[1px] rounded-[4px] py-3 px-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
                    !quantityInputValidation && quantityInputTouched
                      ? 'border-deleteBtn'
                      : ''
                  }`}
                  onBlur={e =>
                    inputBlurHandler(
                      setQuantityInputTouched,
                      quantityInputRef,
                      setQuantityInputValidation
                    )
                  }
                  onChange={e =>
                    itemChangeHandler(
                      item.id,
                      'quantity',
                      Number(e.target.value),
                      setQuantityInputValidation
                    )
                  }
                />
              </label>

              <label
                htmlFor="price"
                className={`${
                  !priceInputValidation && priceInputTouched
                    ? 'text-deleteBtn'
                    : 'text-grayPurple'
                } font-light w-[100px] flex flex-col`}
              >
                <div className="flex flex-col">
                  Price
                  {!priceInputValidation && priceInputTouched && (
                    <p className="text-deleteBtn">can't be empty</p>
                  )}
                </div>
                <input
                  type="number"
                  id={`price-${item.id}`}
                  name="price"
                  placeholder="0"
                  ref={priceInputRef}
                  value={item.price}
                  defaultValue={invoiceData.price}
                  className={`${
                    isDarkMode
                      ? 'text-white bg-mainPurple border-borderPurple'
                      : 'text-lightText bg-white border-draft'
                  } font-medium border-[1px] rounded-[4px] py-3 px-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
                    !priceInputValidation && priceInputTouched
                      ? 'border-deleteBtn'
                      : ''
                  }`}
                  onBlur={e =>
                    inputBlurHandler(
                      setPriceInputTouched,
                      priceInputRef,
                      setPriceInputValidation
                    )
                  }
                  onChange={e =>
                    itemChangeHandler(
                      item.id,
                      'price',
                      Number(e.target.value),
                      setPriceInputValidation
                    )
                  }
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
                    onClick={() => deleteItem(item.id)}
                    icon={faTrash}
                    className="text-grayPurple text-lg cursor-pointer hover:text-deleteBtn"
                  ></FontAwesomeIcon>
                </div>
              </label>
            </div>
          </div>
        ))}

        <button
          onClick={addNewItem}
          type="button"
          className={`${
            isDarkMode
              ? 'text-grayPurple bg-borderPurple'
              : 'text-detailPurple bg-grey'
          } w-full font-medium rounded-3xl py-4 px-[108px] mt-12 mb-16 hover:bg-draft`}
        >
          + Add New Item
        </button>
      </section>

      <footer
        className={`${isDarkMode ? 'bg-mainPurple' : 'bg-white'} ${
          showModal ? 'bg-transparent' : ''
        } h-[91px] flex items-center gap-2 px-6 -mx-6 md:justify-end md:-mt-14 md:mb-8`}
      >
        <button
          type="button"
          onClick={cancelEditsHandler}
          className={`${
            isDarkMode
              ? 'text-draft bg-borderPurple hover:text-detailPurple hover:bg-darkPurple'
              : 'text-detailPurple bg-grey hover:text-detailPurple hover:bg-draft'
          } font-medium w-full rounded-3xl py-4 px-[18px] md:w-[96px]`}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={submitHandler}
          className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverPurple md:w-[138px]"
        >
          Save Changes
        </button>
      </footer>
    </form>
  );
}
