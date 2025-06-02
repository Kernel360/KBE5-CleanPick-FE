import React, { useEffect, useState } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import { Button } from '@/customer/components/ui/button';

declare global {
  interface Window {
    PaymentWidget: any;
  }
}

interface TossPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const TossPaymentModal = ({ isOpen, onClose, amount }: TossPaymentModalProps) => {
  const { profile } = useAuthStore();
  const [paymentWidget, setPaymentWidget] = useState<any>(null);
  const [paymentMethodWidget, setPaymentMethodWidget] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) return;

    // PaymentWidget SDK 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/payment-widget';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const widgetClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
      const customerKey = 'ANONYMOUS'; // 비회원으로 처리
      
      const widget = window.PaymentWidget(widgetClientKey, customerKey);
      setPaymentWidget(widget);

      // 결제 UI 렌더링
      const methodWidget = widget.renderPaymentMethods(
        '#payment-method',
        { value: amount },
        { variantKey: 'DEFAULT' }
      );
      setPaymentMethodWidget(methodWidget);

      // 이용약관 UI 렌더링
      widget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isOpen, amount]);

  // 결제 요청 핸들러
  const handlePayment = () => {
    if (paymentWidget) {
      paymentWidget.requestPayment({
        orderId: `order-${Date.now()}cleanpick`, // 주문 ID는 실제 서비스에서는 서버에서 생성해야 합니다
        orderName: '청소 서비스 결제',
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerName: profile?.name || '',
        customerMobilePhone: '01012345678',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">결제하기</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 결제 수단 UI */}
        <div id="payment-method" className="mb-4"></div>
        
        {/* 이용약관 UI */}
        <div id="agreement" className="mb-4"></div>

        <Button
          className="w-full"
          onClick={handlePayment}
        >
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default TossPaymentModal;
