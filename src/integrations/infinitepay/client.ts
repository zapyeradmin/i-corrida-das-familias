
// InfinitePay API integration
// Documentation: https://www.infinitepay.io/desenvolvedores

import { supabase } from "@/integrations/supabase/client";

// InfinitePay API endpoints
const INFINITE_PAY_API_URL = "https://api.infinitepay.io";

// Interface for the payment request data
export interface InfinitePaymentRequest {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  amount: number;
  description: string;
  reference: string;
}

/**
 * Creates a payment request to InfinitePay and returns the payment URL
 * @param paymentData Payment data to be sent to InfinitePay
 * @returns The URL where the user should be redirected to complete payment
 */
export const createPaymentRequest = async (paymentData: InfinitePaymentRequest): Promise<string> => {
  try {
    // In a production environment, this API key should be stored as a secret in Supabase
    // For now, we'll retrieve it from an edge function that would securely handle the API call
    const { data, error } = await supabase.functions.invoke("create-infinitepay-request", {
      body: JSON.stringify(paymentData)
    });

    if (error) throw new Error(`Error creating payment: ${error.message}`);
    if (!data || !data.paymentUrl) throw new Error('Failed to generate payment URL');

    return data.paymentUrl;
  } catch (error: any) {
    console.error('Error creating InfinitePay payment:', error);
    throw new Error(`Failed to create payment: ${error.message}`);
  }
};

/**
 * Redirects the user to the InfinitePay payment page
 * @param paymentUrl The URL returned by the createPaymentRequest function
 */
export const redirectToPayment = (paymentUrl: string): void => {
  window.location.href = paymentUrl;
};
