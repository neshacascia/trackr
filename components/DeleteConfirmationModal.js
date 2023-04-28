export default function DeleteConfirmationModal({
  id,
  isDarkMode,
  deleteInvoice,
  setDeleteInvoice,
  deleteInvoiceHandler,
}) {
  function cancelDeletion() {
    setDeleteInvoice(false);
  }

  return (
    <>
      {deleteInvoice && (
        <div className="bg-[rgba(0,0,0,0.4)] h-screen flex justify-center items-center fixed inset-0 z-50">
          <div
            className={`${
              isDarkMode ? 'bg-mainPurple' : 'bg-white'
            } flex flex-col rounded-[8px] p-8 mx-6`}
          >
            <div className="text-left mb-6">
              <h1
                className={`${
                  isDarkMode ? 'text-white' : 'text-lightText'
                } text-xl font-bold mb-2`}
              >
                Confirm Deletion
              </h1>
              <p className="text-grayPurple">
                Are you sure you want to delete invoice #
                {id.slice(-6).toUpperCase()}? This action cannot be undone.
              </p>
            </div>

            <div className="text-white flex place-self-end gap-8 ">
              <button
                onClick={cancelDeletion}
                className={`${
                  isDarkMode
                    ? 'text-draft bg-borderPurple hover:text-detailPurple hover:bg-darkPurple'
                    : 'text-detailPurple bg-grey hover:text-detailPurple hover:bg-draft'
                } font-medium w-full rounded-3xl py-4 px-[24px]`}
              >
                Cancel
              </button>
              <button
                onClick={deleteInvoiceHandler}
                className="bg-deleteBtn font-medium w-full rounded-3xl py-4 px-[24px] hover:bg-hoverRed"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
