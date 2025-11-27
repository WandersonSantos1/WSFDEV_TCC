# 📦 Tech Asset Manager

> Solução integrada para Gestão do Ciclo de Vida de Ativos de TI, desenvolvida na plataforma Microsoft Power Platform com extensibilidade pro-code.

![Power Platform](https://img.shields.io/badge/Power%20Platform-Microsoft-blue)
![C#](https://img.shields.io/badge/Backend-C%23%20Plugin-green)
![JavaScript](https://img.shields.io/badge/Frontend-JavaScript-yellow)
![Status](https://img.shields.io/badge/Status-Concluído-success)

## 🎯 Sobre o Projeto

O **Tech Asset Manager** é um sistema desenvolvido para resolver o problema de controle de estoque e requisições de equipamentos de TI. O objetivo principal é garantir a integridade transacional do inventário, automatizar a comunicação entre solicitantes e o setor de compras, e oferecer uma interface de gestão robusta.

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) no **AlfaPeople Academy**, demonstrando o uso de arquitetura híbrida (Low-Code + Pro-Code).

## 🛠️ Tecnologias Utilizadas

* **Microsoft Dataverse:** Modelagem de dados relacional.
* **Model-Driven App:** Interface de gestão e operação.
* **Power Automate:** Orquestração de processos e notificações automáticas.
* **C# (.NET Framework 4.6.2):** Desenvolvimento de Plugins (Server-Side) para regras de negócio críticas.
* **JavaScript:** Scripting Client-Side para usabilidade (UX) e validações.
* **Copilot Studio:** Agente de IA Generativa para consultas de dados.
* **Ribbon Workbench / Command Bar:** Customização de botões e chamadas WebAPI.

---

## ⚙️ Funcionalidades & Arquitetura

### 1. Backend Transacional (Plugin C#)
A lógica pesada de negócios foi implementada via código C# rodando de forma síncrona (`Pre-Operation`) no servidor para garantir a integridade dos dados.

* **Validação de Estoque:** Ao criar ou aprovar uma requisição, o sistema verifica o saldo atual. Se `Quantidade Pedida > Estoque`, o sistema **não gera erro**, mas altera automaticamente o status para **"Em Cotação"**.
* **Gestão de Movimentação:**
    * **Aprovação:** Baixa automática do saldo na tabela de dispositivos.
    * **Estorno (Rejeição):** Devolve a quantidade ao estoque caso um pedido aprovado seja cancelado.
* **Autonumber Híbrido:** Lógica para preenchimento automático de campos obrigatórios legados enquanto utiliza numeração moderna.

### 2. Automação (Power Automate)
Fluxos inteligentes para comunicação proativa:

* **Notificações de Status:** Envio de e-mails personalizados para cada etapa do ciclo de vida (Aprovado, Rejeitado, Concluído) utilizando expressões OData para busca de dados relacional.
* **Monitoramento Proativo:** Um fluxo "sentinela" que monitora a tabela de produtos e dispara um alerta para o setor de compras sempre que `Estoque Atual <= Estoque Mínimo`.
* **Gestão de Ruptura:** Alerta automático quando o Plugin define um pedido como "Em Cotação".

### 3. Frontend & UX (JavaScript)
Melhorias na interface nativa do Dynamics:

* **Filtro em Cascata (Dependent Lookup):** Script que filtra dinamicamente a lista de "Modelos" baseado no "Tipo" escolhido (ex: Selecionou 'Monitor', a lupa só traz monitores).
* **Máscaras de Input:** Formatação automática de CNPJ e Telefone nos formulários.
* **Auto-Preenchimento:** Identificação do usuário logado via API para preenchimento automático do solicitante.
* **Bloqueio de Segurança:** Script que trava todo o formulário para leitura caso o status seja "Concluído" ou "Rejeitado".
* **Botões Customizados (Ribbon):** Botões de ação rápida (Aprovar/Rejeitar) que utilizam `Xrm.WebApi` para interagir com o servidor, bypassando bloqueios de interface e exigindo justificativas.

### 4. Inteligência Artificial (Copilot)
* Integração com **Microsoft Copilot Studio**.
* Agente configurado com **Respostas Generativas** conectadas ao Dataverse, permitindo que gestores façam perguntas em linguagem natural como *"Quantos notebooks Dell temos em estoque?"* ou *"Qual o contato do fornecedor Kabum?"*.

---

## 🗂️ Estrutura de Dados

O projeto baseia-se em 3 tabelas principais customizadas:

1.  **`wsf_fornecedores`:** Cadastro de parceiros com validação de dados.
2.  **`wsf_dispositivos`:** Catálogo de produtos com controle de saldo e ponto de pedido.
3.  **`wsf_requisicao`:** Tabela transacional de pedidos com máquina de estados (Status Reason).

---

## 🚀 Como Executar

Este projeto é uma Solução do Power Platform. Para utilizá-lo:

1.  Importe o arquivo `.zip` da solução no seu ambiente (make.powerapps.com).
2.  Publique todas as personalizações.
3.  Certifique-se de que os passos do Plugin (Assembly) estejam registrados via *Plugin Registration Tool*.

---

**Autor:** Wanderson dos Santos Ferreira

**Wanderson dos Santos Ferreira**
*Projeto desenvolvido para o AlfaPeople Academy.*
