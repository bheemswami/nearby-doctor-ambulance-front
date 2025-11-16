interface ModalProps {
  visible: boolean;
  title?: string;
  message?: string;
  type?: "confirm" | "success" | "error";
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ModalBox = ({
  visible,
  title,
  message,
  type = "confirm",
  onConfirm,
  onCancel
}: ModalProps) => {
  if (!visible) return null;

  const isConfirm = type === "confirm";
  const isSuccess = type === "success";
  const isError = type === "error";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">

        <h3
          className={`text-lg font-semibold mb-3 ${
            isSuccess ? "text-green-600" : isError ? "text-red-600" : ""
          }`}
        >
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-6">{message}</p>

        <div className="flex justify-center gap-3">
          {isConfirm && (
            <button
              className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}

          <button
            className={`flex-1 py-2 rounded-lg text-white ${
              isConfirm
                ? "bg-orange-600 hover:bg-orange-700"
                : isSuccess
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={onConfirm}
          >
            {isConfirm ? "Confirm" : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
