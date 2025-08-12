# Vlog.to

Vlog.to é uma plataforma simples de vídeo blog construída com Next.js, Supabase e React.

## Funcionalidades

- Autenticação de usuários (login, cadastro, redefinição de senha)
- Upload de imagens e vídeos
- Feed de posts com interação (curtir)
- Interface responsiva e moderna
- Confirmação de cadastro por e-mail

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [React](https://react.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) para validação de formulários

## Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/vitorqf/vlog-to.git
   cd vlog-to
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**

   - Copie `.env.example` para `.env.local` e preencha com os dados do seu projeto Supabase.
   - Exemplo:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://<sua-instancia>.supabase.co
     NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=<sua-chave-anon>
     ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   pnpm dev
   ```

5. **Acesse em:** [http://localhost:3000](http://localhost:3000)

## Estrutura de Pastas

- `app/` - Páginas e rotas do Next.js
- `components/` - Componentes reutilizáveis da interface
- `lib/` - Utilitários e configuração do Supabase
- `public/` - Arquivos estáticos
- `styles/` - Estilos globais

## Observações

- Para upload de arquivos, configure o bucket `posts` no Supabase Storage.
- O projeto utiliza autenticação por e-mail e senha.
- Após cadastro, o usuário deve confirmar o e-mail para acessar o feed.

## Licença

Este projeto é open-source e pode ser utilizado livremente.

---

Desenvolvido por [Vitor](https://github.com/vitorqf)
