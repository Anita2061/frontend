import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p>Thank you for your order. We are processing it now.</p>
      <a href="/" className="mt-4 bg-orange-600 text-white px-4 py-2 rounded">Go Home</a>
    </div>
  );
};

export default PaymentSuccess;