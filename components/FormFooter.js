export default function FormFooter() {
  return (
    <footer className="bg-mainPurple h-[91px] flex items-center gap-2 px-6 -mx-6">
      <button
        type="button"
        className="text-white bg-borderPurple font-medium w-full rounded-3xl py-4 px-[18px]"
      >
        Discard
      </button>
      <button
        type="button"
        className="text-white bg-draftBtn font-medium w-full rounded-3xl py-4 px-[18px]"
      >
        Save as Draft
      </button>
      <button
        type="submit"
        className="text-white bg-brightPurple font-medium w-full rounded-3xl py-4 px-[18px]"
      >
        Save & Send
      </button>
    </footer>
  );
}
