
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "1. Como será o evento da Corrida das Famílias?",
      answer: (
        <>
          <p className="mb-4">
            A Corrida das Famílias é um evento de corrida de rua que vai além de uma simples competição esportiva. A equipe dirigente do ECC do Rosário 2025 tem como proposta promover a integração das famílias, unindo fé, esporte e solidariedade. Além de buscarmos o bem-estar, a qualidade de vida, a fé e muita diversão, também arrecadaremos alimentos que serão doados em um ato de solidariedade a quem mais precisa.
          </p>
          <p>
            A Corrida das Famílias é mais do que uma competição — é um convite para reunir a família em um momento especial de esporte, fé, saúde e alegria. Um evento que promove integração social e o bem-estar de todos. Participe você também, junto com sua família!
          </p>
        </>
      ),
    },
    {
      question: "2. Como será o apoio aos atletas que irão participar?",
      answer: (
        <>
          <p className="mb-4">
            Todos os atletas inscritos e com o pagamento confirmado receberão um kit contendo:
          </p>
          <ol className="list-decimal list-inside mb-4 ml-4">
            <li className="mb-2">Uma camisa oficial do evento;</li>
            <li className="mb-2">Um número de peito, que será adesivado na camisa para identificação do atleta durante a corrida.</li>
          </ol>
          <p className="mb-4">
            Além disso, haverá 5 pontos de apoio espalhados ao longo do percurso (em média a cada 1 km), com distribuição de água para hidratação. Também contaremos com uma ambulância e uma equipe técnica de saúde à disposição, caso haja necessidade de atendimento.
          </p>
          <p>
            Durante o percurso, haverá staffs (apoiadores) incentivando os atletas a completarem os 5 km.
          </p>
        </>
      ),
    },
    {
      question: "3. Como posso realizar a minha inscrição?",
      answer: (
        <>
          <p className="mb-4">
            Acesse a página https://corridadasfamilias.zapyer.io/, clique no botão "Inscrever-se Agora!" ou role até o formulário "Inscreva-se e Participe!".
          </p>
          <p className="mb-4">
            Preencha os campos com suas informações: Nome Completo, CPF, Data de Nascimento, E-mail, Telefone/WhatsApp (certifique-se de inserir um número válido), selecione o percurso de 5 km (opção única), escolha o tamanho da camisa e a forma de pagamento.
          </p>
          <p className="mb-4">
            Ao clicar em "Confirmar Inscrição", você será redirecionado para a página de pagamento da InfinityPay, onde poderá finalizar sua inscrição.
          </p>
          <p>
            Após o pagamento via PIX ou cartão de crédito, envie o comprovante para o nosso WhatsApp (87) 99670-9355 ou clique no link: <a href="http://wa.me/5587996709355" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://wa.me/5587996709355</a> (João Victor Franco) e informe seus dados para que possamos confirmar sua inscrição no sistema. Seguindo esses passos, sua inscrição estará confirmada.
          </p>
        </>
      ),
    },
    {
      question: "4. Como posso realizar a inscrição da minha família?",
      answer: (
        <>
          <p className="mb-4">
            Entre em contato pelo WhatsApp (87) 99670-9355 ou clique no link <a href="http://wa.me/5587996709355" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://wa.me/5587996709355</a> (João Victor Franco) e informe que deseja realizar uma inscrição familiar.
          </p>
          <p className="mb-4">
            Enviaremos os dados necessários para preenchimento. Após preenchê-los, você nos retorna com as informações, e então encaminharemos o link de pagamento. Cada integrante da família deve ser incluído no pagamento (R$ 47,00 por inscrição).
          </p>
          <p>
            Depois de realizar o pagamento, envie o comprovante pelo WhatsApp e confirmaremos as inscrições no sistema. Seguindo esses passos, você e sua família estarão devidamente inscritos e confirmados.
          </p>
        </>
      ),
    },
    {
      question: "5. Como posso confirmar minha inscrição?",
      answer: (
        <p>
          Após preencher o formulário "Inscreva-se e Participe!", envie o comprovante de pagamento para o WhatsApp (87) 99670-9355 ou clique no link <a href="http://wa.me/5587996709355" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://wa.me/5587996709355</a> (João Victor Franco) e informe seus dados. Confirmaremos sua inscrição no sistema após a verificação do pagamento.
        </p>
      ),
    },
    {
      question: "6. Como saber se minha inscrição está confirmada?",
      answer: (
        <>
          <p className="mb-4">
            Você pode acessar sua página pessoal clicando no menu superior do site, que levará à página de login do atleta. Basta inserir seu e-mail cadastrado e os três primeiros dígitos do seu CPF.
          </p>
          <p className="mb-4">
            Ao acessar seu perfil, será exibido o status da inscrição: Pendente ou Confirmada.
            Se estiver como Pendente, clique no botão "Falar com o Suporte" e envie o comprovante de pagamento para o WhatsApp (87) 99670-9355 ou pelo link <a href="http://wa.me/5587996709355" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://wa.me/5587996709355</a> (João Victor Franco), informando seus dados.
          </p>
          <p>
            Dessa forma, sua inscrição será verificada e confirmada.
          </p>
        </>
      ),
    },
  ];

  return (
    <section id="faq" className="py-12 md:py-16 bg-blue-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 font-poppins">
          Perguntas Frequentes <span className="text-orange-400">(FAQ)</span>
        </h2>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-lg">
          <Accordion type="single" collapsible className="w-full divide-y divide-gray-200">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-none">
                <AccordionTrigger className="text-left font-semibold text-blue-800 hover:text-blue-600 py-4 px-2">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 px-2 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
