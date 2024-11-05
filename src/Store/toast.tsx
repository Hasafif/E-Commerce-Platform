// utils/toast.ts
import toast from 'react-hot-toast';

interface ToastMessage {
  message: string;
  duration?: number;
}

export const showToast = {
  success: ({ message, duration }: ToastMessage) => {
    toast.success(message, { duration });
  },
  error: ({ message, duration }: ToastMessage) => {
    toast.error(message, { duration });
  },
  loading: ({ message, duration }: ToastMessage) => {
    toast.loading(message, { duration });
  },
  custom: ({ message, duration }: ToastMessage) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ),
      { duration }
    );
  },
  promise: async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  },
  dismiss: () => {
    toast.dismiss();
  },
};