
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface InfinitePaymentRequest {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  amount: number;
  description: string;
  reference: string;
}

interface InfinitePayResponse {
  paymentUrl: string;
  referenceId: string;
  status: string;
}

serve(async (req) => {
  try {
    // Get InfinitePay API credentials from environment variables
    const INFINITE_PAY_API_KEY = Deno.env.get("INFINITE_PAY_API_KEY");
    const INFINITE_PAY_SELLER_ID = Deno.env.get("INFINITE_PAY_SELLER_ID");

    if (!INFINITE_PAY_API_KEY || !INFINITE_PAY_SELLER_ID) {
      return new Response(
        JSON.stringify({ error: "InfinitePay credentials not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse the request body
    const paymentData: InfinitePaymentRequest = await req.json();
    const { 
      fullName, 
      cpf, 
      email, 
      phone, 
      amount, 
      description, 
      reference 
    } = paymentData;

    // Format phone number (remove non-numeric characters)
    const formattedPhone = phone.replace(/\D/g, '');

    // Format CPF (remove non-numeric characters)
    const formattedCPF = cpf.replace(/\D/g, '');

    // Build the payload for InfinitePay API
    const payload = {
      seller_id: INFINITE_PAY_SELLER_ID,
      amount: amount * 100, // Convert to cents
      currency: "BRL",
      description: description,
      payment_methods: ["credit_card", "pix"], // Allow both credit card and PIX
      reference_id: reference,
      customer: {
        name: fullName,
        tax_id: formattedCPF, // CPF
        email: email,
        phone: formattedPhone
      },
      notification_url: Deno.env.get("INFINITE_PAY_WEBHOOK_URL") || null,
      expires_in: 3600 // Link expires in 1 hour
    };

    // Make the request to InfinitePay API
    const response = await fetch("https://api.infinitepay.io/v1/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${INFINITE_PAY_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("InfinitePay API error:", data);
      return new Response(
        JSON.stringify({ error: data.message || "Failed to create payment" }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the payment URL to the client
    return new Response(
      JSON.stringify({ 
        paymentUrl: data.checkout_url,
        referenceId: data.reference_id,
        status: "created"
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing payment request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
