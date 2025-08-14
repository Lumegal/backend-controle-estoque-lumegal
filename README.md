<h1 align="center">Controle de Estoque Lumegal</h1>
<h2 align="center">Backend</h2>

<p>
  Este projeto é uma aplicação multiplataforma desenvolvida para o gerenciamento eficiente de estoque, 
  visando atender às necessidades da empresa Lumegal. A ferramenta permite o controle de produtos, entradas e saídas de mercadorias, além de fornecer relatórios detalhados para auxiliar na tomada de decisões estratégicas.
</p>

<p>
  Frontend da aplicação: https://github.com/ThiagoRaia1/ControleEstoqueLumegal
</p>


---

### 📦 Funcionalidades:

* Cadastro de Produtos: Adicione e edite informações sobre os produtos disponíveis no estoque.

* Controle de Entradas e Saídas: Registre movimentações de mercadorias, mantendo o estoque sempre atualizado.

* Relatórios Gerenciais: Gere relatórios sobre o status do estoque, facilitando o planejamento e a análise de desempenho.

* Interface Intuitiva: Navegação simples e objetiva, com foco na experiência do usuário.

---

<div align="center">
  <table>
    <thead>
      <tr>
        <th align="center">Linguagens</th>
        <th align="center">Frameworks</th>
        <th align="center">Ferramentas & Tecnologias</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">
          <div>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=ts&theme=dark" />
              <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=ts&theme=light" />
              <img src="https://skillicons.dev/icons?i=ts&theme=light" alt="TypeScript" />
            </picture>
          </div>
        </td>
        <td align="center">
          <div>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=nestjs&theme=dark" />
              <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=nestjs&theme=light" />
              <img src="https://skillicons.dev/icons?i=nestjs&theme=light" alt="TypeScript" />
            </picture>
          </div>
        </td>
        <td align="center">
          <div>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=nodejs&theme=dark" />
              <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=nodejs&theme=light" />
              <img src="https://skillicons.dev/icons?i=nodejs&theme=light" alt="Node.js" />
            </picture>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=git&theme=dark" />
              <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=git&theme=light" />
              <img src="https://skillicons.dev/icons?i=git&theme=light" alt="Git" />
            </picture>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=supabase&theme=dark" />
              <source media="(prefers-color-scheme: light)" srcset="https://skillicons.dev/icons?i=supabase&theme=light" />
              <img src="https://skillicons.dev/icons?i=supabase&theme=light" alt="Supabase" />
            </picture>
          </div>
          <div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

---

## Executando o projeto

1.  Clone o repositório:

    ```bash
    git clone https://github.com/ThiagoRaia1/backend-controle-estoque-lumegal
    ```

2. Vá para o diretório
   
   ```bash
   cd backend-controle-estoque-lumegal
   ```

3. Crie um arquivo .env na raíz do projeto para se conectar ao banco de dados do projeto

   ```bash
   DB_URL=*sua URL provida pelo Supabase*
   DB_HOST=*seu host provido pelo Supabase*
   DB_NAME=postgres
   DB_USER=*seu user provido pelo Supabase*
   DB_PASS=*sua senha no Supabase*
   JWT_SECRET=*sua-chave-secreta*
   ```
   
4. Instale as dependências

   ```bash
   npm i
   ```

5. Inicie o projeto

   ```bash
   npm run start
   ```
