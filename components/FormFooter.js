export default function FormFooter({
  type,
  isDarkMode,
  router,
  saveAsDraftHandler,
  setShowModal,
}) {
  function cancelNewPaymentHandler() {
    if (type === 'invoices') {
      if (window.innerWidth >= 768) {
        setShowModal(false);
        router.push('/invoices');
      } else {
        router.back();
      }
    } else {
      if (window.innerWidth >= 768) {
        setShowModal(false);
        router.push('/expenses');
      } else {
        router.back();
      }
    }
  }

  return (
    <footer
      className={`${
        isDarkMode ? 'bg-mainPurple' : 'bg-white'
      } h-[91px] flex items-center gap-2 px-6 -mx-6 md:bg-transparent md:justify-end md:-mt-14 md:mb-8`}
    >
      <button
        type="button"
        onClick={cancelNewPaymentHandler}
        className={`${
          isDarkMode
            ? 'text-draft bg-borderPurple hover:text-detailPurple hover:bg-darkPurple'
            : 'text-detailPurple bg-grey hover:text-detailPurple hover:bg-draft'
        } font-medium w-full rounded-3xl py-4 px-[18px] md:w-[96px] md:mr-auto`}
      >
        Discard
      </button>
      {type === 'invoices' ? (
        <button
          type="button"
          onClick={saveAsDraftHandler}
          className="text-white bg-draftBtn font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverGrayPurple md:w-[133px]"
        >
          Save as Draft
        </button>
      ) : (
        ''
      )}
      <button
        type="submit"
        className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverPurple md:w-[128px]"
      >
        {type === 'invoices' ? 'Save & Send' : 'Save'}
      </button>
    </footer>
  );
}
