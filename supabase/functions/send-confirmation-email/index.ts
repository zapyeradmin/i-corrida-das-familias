
import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailData {
  name: string;
  email: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Email function invoked, processing request");
    const { name, email } = await req.json() as EmailData;

    if (!name || !email) {
      console.error("Missing required fields: name or email");
      return new Response(
        JSON.stringify({ error: "Nome e email são obrigatórios" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Attempting to send email to: ${email} for user: ${name}`);

    const password = Deno.env.get("GMAIL_APP_PASSWORD");
    if (!password) {
      console.error("GMAIL_APP_PASSWORD environment variable not set");
      return new Response(
        JSON.stringify({ error: "Configuration error: Missing email password" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Configure SMTP client
    console.log("Configuring SMTP client");
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: "corridadasfamiliaseccrosario@gmail.com",
          password,
        },
      },
    });

    // Send email
    console.log("Attempting to send email");
    await client.send({
      from: "Corrida das Famílias <corridadasfamiliaseccrosario@gmail.com>",
      to: email,
      subject: "ESTAMOS QUASE LÁ!! SUA INSCRIÇÃO FOI REALIZADA COM SUCESSO!",
      html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Confirmação de Inscrição - Corrida das Famílias</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
    <tr>
      <td align="center" style="padding-bottom: 20px;">
        <h2 style="color: #2E86C1;">🎉 Confirmação de Inscrição</h2>
        <p style="font-size: 18px;"><strong>1ª Corrida das Famílias: Correndo Juntos no Rosário</strong></p>
      </td>
    </tr>
    <tr>
      <td>
        <p>Olá, ${name}! 🏃‍♀️🏃‍♂️</p>
        <p>É com grande alegria que confirmamos o recebimento da sua inscrição na <strong>1ª Corrida das Famílias: Correndo Juntos no Rosário</strong>!</p>
        <p>Sua inscrição agora passará pelo processo de <strong>análise e aprovação do pagamento</strong>.</p>
        <p>Deseja <strong>antecipar a confirmação</strong>? Envie o <strong>comprovante de pagamento</strong> com seu <strong>nome completo e CPF</strong> para o nosso WhatsApp:</p>
        <p style="font-size: 16px;"><strong>📱 (87) 99670-9355</strong></p>
        <p>Ou clique aqui para conversar diretamente:  
          <a href="http://wa.me/5587996709355" style="color: #2E86C1;">http://wa.me/5587996709355</a>
        </p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

        <h3 style="color: #2E86C1;">📅 Informações da Corrida</h3>
        <ul>
          <li><strong>Data:</strong> 15 de junho de 2025</li>
          <li><strong>Concentração:</strong> 05h00</li>
          <li><strong>Largada (5Km):</strong> 06h00</li>
          <li><strong>Local:</strong> Igreja Matriz do Rosário – Serra Talhada/PE</li>
        </ul>

        <h3 style="color: #2E86C1;">🎽 Entrega dos Kits</h3>
        <ul>
          <li><strong>Datas:</strong> 12 e 13 de junho de 2025</li>
          <li><strong>Horário:</strong> Das 19h30 às 22h00</li>
          <li><strong>Local:</strong> Centro Pastoral da Igreja de N. Sra. da Conceição</li>
        </ul>
        <p><strong>Atenção!</strong> Para quem mora fora de Serra Talhada e vai retirar o kit no dia da corrida, a entrega será realizada até as <strong>5h30</strong>, antes da largada.</p>

        <h3 style="color: #2E86C1;">❤️ Um Gesto de Solidariedade</h3>
        <p>Não se esqueça do mais importante: <strong>ajudar o próximo!</strong></p>
        <p>Traga <strong>1kg de alimento não perecível</strong> no dia da corrida.</p>

        <h3 style="color: #2E86C1;">📞 Dúvidas ou Informações</h3>
        <p><strong>Equipe Dirigente do ECC do Rosário 2025</strong></p>
        <p><strong>WhatsApp/Telefone:</strong> (87) 99670-9355</p>
        <p><strong>E-mail:</strong> <a href="mailto:corridadasfamiliaseccrosario@gmail.com" style="color: #2E86C1;">corridadasfamiliaseccrosario@gmail.com</a></p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

        <p style="text-align: center; font-size: 16px;">
          Aguardamos você nesse momento especial de <strong>esporte, fé, saúde e diversão</strong>!  
          <br>Um evento que promove a <strong>integração social</strong> e o <strong>bem-estar de todos</strong>. 💛
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    // Close the connection
    console.log("Email sent successfully, closing connection");
    await client.close();

    return new Response(
      JSON.stringify({ success: true, message: "E-mail enviado com sucesso!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Erro detalhado ao enviar e-mail:", error);
    return new Response(
      JSON.stringify({ 
        error: `Erro ao enviar e-mail: ${error.message}`, 
        details: error.toString(),
        stack: error.stack
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
