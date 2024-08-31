# Bem-vindo ao projeto Chatfolio Conversation

## Informações do Projeto

**Projeto**: chatfolio-conversation

## Como posso editar este código?

Existem várias maneiras de editar sua aplicação.

**Use seu IDE preferido**

Se você quiser trabalhar localmente usando seu próprio IDE, você pode clonar este repositório e fazer push das mudanças. As mudanças feitas serão refletidas no repositório.

O único requisito é ter Node.js & npm instalados - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
git clone https://github.com/SeuUsuario/chatfolio-conversation.git
cd chatfolio-conversation
npm i

# Isso irá rodar um servidor de desenvolvimento com recarregamento automático e uma pré-visualização instantânea.
npm run dev
```

**Edite um arquivo diretamente no GitHub**

- Navegue até o(s) arquivo(s) desejado(s).
- Clique no botão "Edit" (ícone de lápis) no canto superior direito da visualização do arquivo.
- Faça suas alterações e comite as mudanças.

**Use GitHub Codespaces**

- Navegue até a página principal do seu repositório.
- Clique no botão "Code" (botão verde) perto do canto superior direito.
- Selecione a aba "Codespaces".
- Clique em "New codespace" para lançar um novo ambiente Codespace.
- Edite os arquivos diretamente dentro do Codespace e comite e faça push das suas mudanças quando terminar.

## Quais tecnologias são usadas neste projeto?

Este projeto é construído com:

- Vite
- React
- shadcn-ui
- Tailwind CSS

## Como posso configurar o EmailJS?

Para configurar o EmailJS, siga os passos abaixo:

1. Crie uma conta no [EmailJS](https://www.emailjs.com/).
2. Crie um novo serviço de email e uma nova template de email.
3. Adicione as credenciais do EmailJS no arquivo de configuração do seu projeto.

Copie o arquivo `.env.example` para `.env` e defina as seguintes variáveis:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
VITE_ABOUT_URL=https://example.com
VITE_GITHUB_USERNAME=luandro
```

## Como posso conectar ao GitHub?

Para conectar ao GitHub, siga os passos abaixo:

1. Crie um repositório no GitHub.
2. Adicione o repositório remoto ao seu projeto local:
    ```sh
    git remote add origin https://github.com/SeuUsuario/chatfolio-conversation.git
    ```
3. Faça commit e push das suas mudanças:
    ```sh
    git add .
    git commit -m "Initial commit"
    git push -u origin main
    ```

## Como posso adicionar uma página "aboutme" do meu site?

Para adicionar uma página "aboutme", siga os passos abaixo:

1. Crie um novo componente React para a página "aboutme".
2. Adicione o conteúdo da página "aboutme" do seu site.
3. Importe e use o componente na sua aplicação.

## Documentação em Inglês

Para documentação em inglês, consulte [README.md](./README.md).
