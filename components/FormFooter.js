export default function FormFooter({
  type,
  isDarkMode,
  router,
  saveAsDraftHandler,
}) {
  return (
    <footer
      className={`${
        isDarkMode ? 'bg-mainPurple' : 'bg-white'
      } h-[91px] flex items-center gap-2 px-6 -mx-6`}
    >
      <button
        type="button"
        onClick={() => router.back()}
        className={`${
          isDarkMode
            ? 'text-draft bg-borderPurple hover:text-detailPurple hover:bg-darkPurple'
            : 'text-detailPurple bg-grey hover:text-detailPurple hover:bg-draft'
        } font-medium w-full rounded-3xl py-4 px-[18px]`}
      >
        Discard
      </button>
      {type === 'invoices' ? (
        <button
          type="button"
          onClick={saveAsDraftHandler}
          className="text-white bg-draftBtn font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverGrayPurple"
        >
          Save as Draft
        </button>
      ) : (
        ''
      )}
      <button
        type="submit"
        className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverPurple"
      >
        {type === 'invoices' ? 'Save & Send' : 'Save'}
      </button>
    </footer>
  );
}
