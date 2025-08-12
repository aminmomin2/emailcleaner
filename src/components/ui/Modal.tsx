'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Modal {
  id: string;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: 'danger' | 'warning' | 'info';
}

interface ModalContextType {
  modals: Modal[];
  showModal: (modal: Omit<Modal, 'id'>) => void;
  hideModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<Modal[]>([]);

  const showModal = useCallback((modal: Omit<Modal, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newModal = { ...modal, id };
    setModals(prev => [...prev, newModal]);
  }, []);

  const hideModal = useCallback((id: string) => {
    setModals(prev => prev.filter(modal => modal.id !== id));
  }, []);

  return (
    <ModalContext.Provider value={{ modals, showModal, hideModal }}>
      {children}
      <ModalContainer modals={modals} hideModal={hideModal} />
    </ModalContext.Provider>
  );
}

interface ModalContainerProps {
  modals: Modal[];
  hideModal: (id: string) => void;
}

function ModalContainer({ modals, hideModal }: ModalContainerProps) {
  if (modals.length === 0) return null;

  return (
    <>
      {modals.map((modal) => (
        <ModalItem key={modal.id} modal={modal} hideModal={hideModal} />
      ))}
    </>
  );
}

interface ModalItemProps {
  modal: Modal;
  hideModal: (id: string) => void;
}

function ModalItem({ modal, hideModal }: ModalItemProps) {
  const handleConfirm = () => {
    modal.onConfirm();
    hideModal(modal.id);
  };

  const handleCancel = () => {
    if (modal.onCancel) {
      modal.onCancel();
    }
    hideModal(modal.id);
  };

  const getIcon = () => {
    switch (modal.type) {
      case 'danger':
        return (
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getButtonClasses = () => {
    switch (modal.type) {
      case 'danger':
        return {
          confirm: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          cancel: 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        };
      case 'warning':
        return {
          confirm: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
          cancel: 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        };
      default:
        return {
          confirm: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          cancel: 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        };
    }
  };

  const buttonClasses = getButtonClasses();

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleCancel}
        ></div>

        {/* Modal */}
        <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border border-gray-200">
          {/* Close button */}
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex items-center mb-4 pr-8">
            <div className="flex-shrink-0 mr-3">
              {getIcon()}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {modal.title}
            </h3>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-gray-600 leading-relaxed">
              {modal.message}
            </p>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${buttonClasses.cancel}`}
              onClick={handleCancel}
            >
              {modal.cancelText || 'Cancel'}
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${buttonClasses.confirm}`}
              onClick={handleConfirm}
            >
              {modal.confirmText || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
