export default function FormFooter({ isDarkMode, router, saveAsDraftHandler }) {
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
            ? 'text-white bg-borderPurple'
            : 'text-detailPurple bg-grey'
        } font-medium w-full rounded-3xl py-4 px-[18px]`}
      >
        Discard
      </button>
      <button
        type="button"
        onClick={saveAsDraftHandler}
        className="text-white bg-draftBtn font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverGrayPurple"
      >
        Save as Draft
      </button>
      <button
        type="submit"
        className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px] hover:bg-hoverPurple"
      >
        Save & Send
      </button>
    </footer>
  );
}
