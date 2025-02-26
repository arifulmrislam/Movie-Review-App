import { X, AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    message,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold flex items-center gap-2'>
                        <AlertTriangle className='w-6 h-6 text-yellow-500' />
                        Confirm Action
                    </h2>
                    <button
                        onClick={onClose}
                        className='text-gray-500 hover:text-gray-700'
                    >
                        <X className='w-6 h-6' />
                    </button>
                </div>
                <p className='text-gray-700 mb-6'>{message}</p>
                <div className='flex justify-end gap-4'>
                    <button
                        onClick={onClose}
                        className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors'
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
