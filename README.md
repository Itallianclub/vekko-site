# VEKKO — Site Institucional

Site institucional e comercial da VEKKO, uma plataforma de assinatura e
benefícios automotivos por veículo conectada a uma rede de estabelecimentos
parceiros.

## Tecnologias

- React 19 e TypeScript
- Vinext e Vite
- Tailwind CSS
- GSAP com ScrollTrigger
- Bootstrap Icons

## Requisitos

- Node.js 22.13 ou superior
- npm

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run build
npm run lint
npm test
```

## Rotas

- `/` — página institucional
- `/seja-parceiro` — apresentação e cadastro de parceiros
- `/privacidade` — política de privacidade
- `/termos` — termos de uso

## Estrutura principal

- `app/` — páginas, componentes e estilos
- `public/` — identidade visual e imagem de compartilhamento
- `tests/` — testes das rotas renderizadas

O projeto não utiliza banco de dados, armazenamento de arquivos ou serviços de
infraestrutura externos para funcionar.
