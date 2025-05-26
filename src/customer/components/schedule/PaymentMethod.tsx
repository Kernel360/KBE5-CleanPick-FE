import React from 'react';

interface PaymentMethodProps {
  paymentMethod: 'cash' | 'card';
  onMethodChange: (method: 'cash' | 'card') => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  onMethodChange,
}) => {
  return (
    <div className="space-y-3 mb-6">
      <h3 className="font-semibold mb-2">결제 방식</h3>
      <button
        className={`w-full p-4 rounded-lg border bg-white ${
          paymentMethod === 'cash' ? 'border-primary' : 'border-gray-200'
        } flex items-center justify-between`}
        onClick={() => onMethodChange('cash')}
      >
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <path d="M4 8C4 6.89543 4.89543 6 6 6H18C19.1046 6 20 6.89543 20 8V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V8Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <div>
            <p className="font-medium text-left text-black">현금</p>
            <p className="text-sm text-gray-500">Pay in cash after service</p>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border ${
          paymentMethod === 'cash' ? 'bg-primary border-primary' : 'border-gray-300'
        } flex items-center justify-center`}>
          {paymentMethod === 'cash' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </button>

      <button
        className={`w-full p-4 rounded-lg border bg-white ${
          paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'
        } flex items-center justify-between`}
        onClick={() => onMethodChange('card')}
      >
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <div>
            <p className="font-medium text-left text-black">카드</p>
            <p className="text-sm text-gray-500">Pay securely online</p>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border ${
          paymentMethod === 'card' ? 'bg-primary border-primary' : 'border-gray-300'
        } flex items-center justify-center`}>
          {paymentMethod === 'card' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}; 