export const steps = [
  { number: "01", title: "Cadastre seu veículo", text: "Adicione seu carro e deixe a VEKKO organizar tudo por veículo.", icon: "bi-car-front" },
  { number: "02", title: "Escolha um plano", text: "Selecione a frequência ideal para a sua rotina.", icon: "bi-card-checklist" },
  { number: "03", title: "Encontre um parceiro", text: "Veja os estabelecimentos credenciados perto de você.", icon: "bi-geo-alt" },
  { number: "04", title: "Autorize pelo QR Code", text: "Gere o acesso no app e valide diretamente no parceiro.", icon: "bi-qr-code-scan" },
] as const;

export const benefits = [
  {
    className: "benefit-wide",
    icon: "bi-calendar2-check",
    eyebrow: "Rotina simples",
    title: "Seu carro organizado em um só lugar.",
    text: "Plano, saldo, histórico, à mão quando precisar.",
    stat: "1 APP",
  },
  {
    className: "benefit-dark",
    icon: "bi-qr-code-scan",
    eyebrow: "Uso seguro",
    title: "Autorização segura para cada atendimento.",
    text: "O QR Code conecta motorista, veículo e parceiro antes do serviço começar.",
    stat: "QR",
  },
  {
    className: "benefit-blue",
    icon: "bi-eye",
    eyebrow: "Tudo transparente",
    title: "Você acompanha cada benefício utilizado.",
    text: "Sem surpresa: frequência, elegibilidade e saldo sempre visíveis.",
    stat: "100%",
  },
  {
    className: "benefit-network",
    icon: "bi-buildings",
    eyebrow: "Rede credenciada",
    title: "Liberdade para escolher onde cuidar do veículo.",
    text: "A VEKKO conecta você aos melhores parceiros da sua região.",
    stat: "UDI",
  },
] as const;

export const benefitNetworkNodes = [
  { label: "Operação inicial", icon: "bi-geo-alt", className: "node-one" },
  { label: "Parceiro credenciado", icon: "bi-buildings", className: "node-two" },
  { label: "Novo parceiro", icon: "bi-shop", className: "node-three" },
  { label: "Atendimento VEKKO", icon: "bi-car-front", className: "node-four" },
] as const;

export const plans = [
  { name: "Basic", price: "79,90", washes: "2 lavagens por ciclo", description: "Para manter o cuidado em dia sem complicar a rotina.", eligibility: "Hatch e Sedan", accent: false },
  { name: "Essential", price: "119,90", washes: "4 lavagens por ciclo", description: "A frequência certa para quem usa o carro todos os dias.", eligibility: "Hatch, Sedan, SUV e Pickup", accent: true },
  { name: "Premium", price: "179,90", washes: "8 lavagens por ciclo", description: "Mais cuidado para quem quer o carro sempre pronto.", eligibility: "Hatch, Sedan, SUV e Pickup", accent: false },
  { name: "Ilimitado", price: "379,90", washes: "Até 1 lavagem por dia", description: "Para uma rotina intensa, sem saldo mensal de lavagens.", eligibility: "Hatch, Sedan, SUV e Pickup", accent: false },
] as const;

export const questions = [
  { question: "A assinatura pertence ao cliente ou ao veículo?", answer: "Ao veículo. Cada carro cadastrado tem sua própria assinatura, benefícios e histórico de utilização." },
  { question: "Quantos veículos posso cadastrar?", answer: "Cada pessoa pode cadastrar até cinco veículos. Cada um pode ter uma assinatura ativa individual." },
  { question: "Posso utilizar em qualquer estabelecimento?", answer: "Os benefícios são utilizados nos estabelecimentos credenciados que aparecem como disponíveis no aplicativo VEKKO." },
  { question: "Como funciona o QR Code?", answer: "Você gera uma autorização no aplicativo. O parceiro lê o QR Code, confere o veículo e valida o atendimento antes do serviço." },
  { question: "Os benefícios acumulam?", answer: "Não. Cada plano segue o próprio ciclo e os benefícios não utilizados não passam para o ciclo seguinte." },
  { question: "Quais veículos podem contratar cada plano?", answer: "Hatch e Sedan podem contratar qualquer plano. SUV e Pickup podem escolher Essential, Premium ou Ilimitado." },
] as const;
