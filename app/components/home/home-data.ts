/** Copy da landing. Texto aprovado — não reescrever. */

/**
 * Passos. `before` + chip de ícone + `after` formam a copy aprovada (ex.: "Cadastre seu [ícone] carro.").
 * `glue`: quantas palavras de `after` ficam presas ao chip (padrão 1).
 * `support` é a linha de apoio, reaproveitada do "Como funciona" da versão anterior do site.
 */
export const steps = [
  { before: "Cadastre seu", icon: "car", after: "carro.", support: "Adicione seu carro e deixe a VEKKO organizar tudo por veículo." },
  { before: "Escolha seu", icon: "plan", after: "plano.", support: "Selecione a frequência ideal para a sua rotina." },
  { before: "Ache um", icon: "pin", after: "parceiro perto.", support: "Veja os estabelecimentos credenciados perto de você." },
  { before: "Mostre o", icon: "qr", after: "QR Code e lave.", glue: 2, support: "Gere o acesso no app e valide diretamente no parceiro." },
] as const;

export const plans = [
  { name: "Basic", price: "99,90", washes: "2 lavagens", description: "Pra manter o carro em dia.", featured: false },
  { name: "Essential", price: "179,90", washes: "4 lavagens", description: "O equilíbrio entre uso e preço.", featured: true },
  { name: "Premium", price: "349,90", washes: "8 lavagens", description: "Pra quem vive de carro limpo.", featured: false },
] as const;

export const questions = [
  {
    question: "O plano é meu ou do meu carro?",
    answer: "Do carro. Cada veículo tem seu plano e seu histórico, e você pode cadastrar até cinco.",
  },
  {
    question: "As lavagens acumulam?",
    answer: "Não. O saldo vale dentro do mês, então vale escolher o plano que você realmente vai usar.",
  },
  {
    question: "Preciso esperar entre uma lavagem e outra?",
    answer: "Não. Dá pra usar duas no mesmo fim de semana, se quiser.",
  },
  {
    question: "Onde posso lavar?",
    answer: "Nos parceiros cadastrados da VEKKO. O app mostra os mais próximos de você.",
  },
] as const;
