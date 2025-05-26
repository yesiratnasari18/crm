import React from "react";

const ModalDynamic = ({
  open,
  setOpen,
  forms,
  promises,
  editMode
}: {
  open: boolean;
  setOpen: (params: boolean) => void;
  forms: React.ReactNode;
  promises: () => void;
  editMode?: boolean;
}) => {
  return (
    <div className={`w-screen h-screen place-items-center fixed top-0 left-0 ${open ? "grid" : "hidden"}`}>
        <div className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20" onClick={() => setOpen(false)}></div>
        <div className="md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
          <div className="flex flex-row w-full justify-between items-center mb-3 gap-3">
            <h2 className="text-black text-xl">{editMode ? `Form Edit Lead` : `Form Tambah Leads`}</h2>
            <button type="button" className="flex items-center justify-center bg-red-500 p-3 w-3 h-3 rounded-full float-end" onClick={() => setOpen(false)}>
              <i
                className="fas fa-times text-white cursor-pointer text-[15px]"
              ></i>
            </button>
          </div>
          {forms}
        </div>
    </div>
  )
}
export default ModalDynamic;