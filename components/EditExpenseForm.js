import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function EditExpenseForm({
  updateExpense,
  data,
  isDarkMode,
  setShowModal,
}) {
  const router = useRouter();

  const [merchantInputValidation, setMerchantInputValidation] = useState(false);
  const [merchantInputTouched, setMerchantInputTouched] = useState(false);

  const [expenseAmountInputValidation, setExpenseAmountInputValidation] =
    useState(false);
  const [expenseAmountInputTouched, setExpenseAmountInputTouched] =
    useState(false);

  const [expenseDueDateInputValidation, setExpenseDueDateInputValidation] =
    useState(false);
  const [expenseDueDateInputTouched, setExpenseDueDateInputTouched] =
    useState(false);

  const merchantInputRef = useRef();
  const accountTypeInputRef = useRef();
  const accountNumberInputRef = useRef();
  const referenceNumberInputRef = useRef();
  const expenseDueDateInputRef = useRef();
  const expenseAmountInputRef = useRef();
  const expenseCategoryInputRef = useRef();
  const notesInputRef = useRef();

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

  function submitHandler(e) {
    e.preventDefault();

    setMerchantInputTouched(true);
    setExpenseDueDateInputTouched(true);
    setExpenseAmountInputTouched(true);

    if (merchantInputRef.current.value.trim() === '') {
      setMerchantInputValidation(false);
      return;
    } else if (expenseDueDateInputRef.current.value.trim() === '') {
      setExpenseDueDateInputValidation(false);
      return;
    } else if (expenseAmountInputRef.current.value.trim() === '') {
      setExpenseAmountInputValidation(false);
      return;
    } else {
      setMerchantInputValidation(true);
      setExpenseDueDateInputValidation(true);
      setExpenseAmountInputValidation(true);

      const expenseData = {
        id: data.id,
        merchant: merchantInputRef.current.value,
        referenceNo: referenceNumberInputRef.current.value,
        accountNo: accountNumberInputRef.current.value,
        accountType: accountTypeInputRef.current.value,
        expenseAmount: expenseAmountInputRef.current.value,
        expenseDueDate: expenseDueDateInputRef.current.value,
        expenseCategory: expenseCategoryInputRef.current.value,
        notes: notesInputRef.current.value,
      };

      updateExpense(expenseData);

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
    <form className="text-white md:px-6" onSubmit={submitHandler}>
      <section className="flex flex-col gap-6 mb-10">
        <h4 className="text-brightPurple font-medium">Bill From</h4>
        <label
          htmlFor="merchant"
          className={`${
            !merchantInputValidation && merchantInputTouched
              ? 'text-deleteBtn'
              : isDarkMode
              ? 'text-grayPurple'
              : 'text-detailPurple'
          } font-light flex flex-col`}
        >
          <div className="flex justify-between">
            Merchant
            {!merchantInputValidation && merchantInputTouched && (
              <p className="text-deleteBtn">can&apos;t be empty</p>
            )}
          </div>
          <input
            type="text"
            id="merchant"
            className={`${
              isDarkMode
                ? 'text-white bg-mainPurple border-borderPurple'
                : 'text-lightText bg-white border-draft'
            } font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
              !merchantInputValidation && merchantInputTouched
                ? 'border-deleteBtn'
                : ''
            }`}
            ref={merchantInputRef}
            defaultValue={data.merchant}
            onBlur={e =>
              inputBlurHandler(
                setMerchantInputTouched,
                merchantInputRef,
                setMerchantInputValidation
              )
            }
            onChange={e => changeHandler(e, setMerchantInputValidation)}
          />
        </label>

        <div className="flex gap-6">
          <label
            htmlFor="reference-no"
            className={`font-light ${
              isDarkMode ? 'text-grayPurple' : 'text-detailPurple'
            } flex flex-col`}
          >
            Reference No.
            <input
              type="text"
              id="reference-no"
              className={`${
                isDarkMode
                  ? 'text-white bg-mainPurple border-borderPurple'
                  : 'text-lightText bg-white border-draft'
              } font-medium w-full border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple`}
              ref={referenceNumberInputRef}
              defaultValue={data.referenceNo}
            />
          </label>

          <label
            htmlFor="account-no"
            className={`font-light ${
              isDarkMode ? 'text-grayPurple' : 'text-detailPurple'
            } flex flex-col`}
          >
            Account No.
            <input
              type="text"
              id="account-no"
              className={`${
                isDarkMode
                  ? 'text-white bg-mainPurple border-borderPurple'
                  : 'text-lightText bg-white border-draft'
              } font-medium w-full border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple`}
              ref={accountNumberInputRef}
              defaultValue={data.accountNo}
            />
          </label>
        </div>

        <label
          htmlFor="account-type"
          className={`${
            isDarkMode ? 'text-grayPurple' : 'text-detailPurple'
          } font-light flex flex-col`}
        >
          Account Type
          <div className="text-brightPurple text-xl font-extrabold relative flex items-center after:top-[28px] after:right-[22px] after:absolute after:content-['⌄'] align-middle">
            <select
              id="account-type"
              className={`${
                isDarkMode
                  ? 'text-white bg-mainPurple border-borderPurple'
                  : 'text-lightText bg-white border-draft'
              } text-base font-medium w-full border-[1px] rounded-[4px] py-4 pl-5 mt-4 cursor-pointer appearance-none focus:outline-none focus:ring focus:ring-brightPurple`}
              ref={accountTypeInputRef}
              defaultValue={data.accountType}
            >
              <option>Cash</option>
              <option>Debit Card</option>
              <option>Credit Card</option>
              <option>Cheque</option>
            </select>
          </div>
        </label>

        <label
          htmlFor="expense-amount"
          className={`${
            !expenseAmountInputValidation && expenseAmountInputTouched
              ? 'text-deleteBtn'
              : isDarkMode
              ? 'text-grayPurple'
              : 'text-detailPurple'
          } font-light flex flex-col`}
        >
          <div className="flex justify-between">
            Amount
            {!expenseAmountInputValidation && expenseAmountInputTouched && (
              <p className="text-deleteBtn">can&apos;t be empty</p>
            )}
          </div>
          <input
            type="number"
            id="expense-amount"
            className={`${
              isDarkMode
                ? 'text-white bg-mainPurple border-borderPurple'
                : 'text-lightText bg-white border-draft'
            } font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple ${
              !expenseAmountInputValidation && expenseAmountInputTouched
                ? 'border-deleteBtn'
                : ''
            }`}
            ref={expenseAmountInputRef}
            defaultValue={data.expenseAmount}
            onBlur={e =>
              inputBlurHandler(
                setExpenseAmountInputTouched,
                expenseAmountInputRef,
                setExpenseAmountInputValidation
              )
            }
            onChange={e => changeHandler(e, setExpenseAmountInputValidation)}
          />
        </label>

        <label
          htmlFor="due-date"
          className={`${
            !expenseDueDateInputValidation && expenseDueDateInputTouched
              ? 'text-deleteBtn'
              : isDarkMode
              ? 'text-grayPurple'
              : 'text-detailPurple'
          } font-light flex flex-col`}
        >
          <div className="flex justify-between">
            Due Date
            {!expenseDueDateInputValidation && expenseDueDateInputTouched && (
              <p className="text-deleteBtn">can&apos;t be empty</p>
            )}
          </div>
          <input
            type="date"
            id="due-date"
            className={`${
              isDarkMode
                ? 'text-white bg-mainPurple border-borderPurple'
                : 'text-lightText bg-white border-draft'
            } font-medium h-[50px] border-[1px] rounded-[4px] py-3 px-5 mt-4 cursor-pointer focus:outline-none focus:ring focus:ring-brightPurple ${
              !expenseDueDateInputValidation && expenseDueDateInputTouched
                ? 'border-deleteBtn'
                : ''
            }`}
            ref={expenseDueDateInputRef}
            defaultValue={data.expenseDueDate}
            onBlur={e =>
              inputBlurHandler(
                setExpenseDueDateInputTouched,
                expenseDueDateInputRef,
                setExpenseDueDateInputValidation
              )
            }
            onChange={e => changeHandler(e, setExpenseDueDateInputValidation)}
          />
        </label>

        <label
          htmlFor="category"
          className={`${
            isDarkMode ? 'text-grayPurple' : 'text-detailPurple'
          } font-light flex flex-col`}
        >
          Category Type
          <div className="text-brightPurple text-xl font-extrabold relative flex items-center after:top-[28px] after:right-[22px] after:absolute after:content-['⌄'] align-middle">
            <select
              id="category"
              className={`${
                isDarkMode
                  ? 'text-white bg-mainPurple border-borderPurple'
                  : 'text-lightText bg-white border-draft'
              } text-base font-medium w-full border-[1px] rounded-[4px] py-4 pl-5 mt-4 cursor-pointer appearance-none focus:outline-none focus:ring focus:ring-brightPurple`}
              ref={expenseCategoryInputRef}
              defaultValue={data.expenseCategory}
            >
              <option>Miscellaneous</option>
              <option>Entertainment</option>
              <option>Fees</option>
              <option>Food</option>
              <option>Other</option>
              <option>Rent</option>
              <option>Subscription</option>
              <option>Taxes</option>
              <option>Transportation</option>
              <option>Travel</option>
              <option>Utilties</option>
            </select>
          </div>
        </label>

        <label
          htmlFor="notes"
          className={`font-light ${
            isDarkMode ? 'text-grayPurple' : 'text-detailPurple'
          } flex flex-col`}
        >
          Notes
          <textarea
            type="text"
            id="notes"
            className={`${
              isDarkMode
                ? 'text-white bg-mainPurple border-borderPurple'
                : 'text-lightText bg-white border-draft'
            } font-medium border-[1px] rounded-[4px] py-3 pl-5 mt-4 focus:outline-none focus:ring focus:ring-brightPurple`}
            ref={notesInputRef}
            defaultValue={data.notes}
          ></textarea>
        </label>
      </section>

      <footer
        className={`${
          isDarkMode ? 'bg-mainPurple' : 'bg-white'
        } h-[91px] flex items-center gap-2 px-6 -mx-6 md:bg-transparent md:justify-end md:mb-8`}
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
