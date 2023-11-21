# Plano de Testes de Software


| **Caso de Teste 01**                       | CT01 – Cadastro de Usuário                                                                                                                                                       |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                      | RF-13. O sistema deve ter o campo para cadastro do usuário, onde será registrado o seu nome, e-mail e senha                                                                      |
| Objetivo do Teste                          | Validar possibilidade de criar usuários                                                                                                                                          |
| Pré-requisitos                             | Usuário não está logado                                                                                                                                                         |
| Passos                                     | 1. Clicar no botão “Entrar”;<br>2. Selecionar o botão “Cadastre-se”;<br>3. Preencher todos os campos da tela de cadastro de forma correta;<br>4. Selecionar o botão “Cadastrar”. |
| Critérios de êxito                         | O sistema será direcionado para a homepage logada com as informações do usuário.                                                                                                 |
| Responsável pela elaborar do caso de Teste |                                                                                                                                                                                  |

| **Caso de Teste 02**                       | CT02 – Efetuar Login do Usuário                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Requisitos Associados                      | RF-18. Sistema deve permitir que o usuário realize o login utilizando o e-mail e senha.              |
| Objetivo do Teste                          | Verificar se a função de cadastro do usuário está operando corretamente.                             |
| Pré-requisitos                             | Usuário não estar logado                                                                             |
| Passos                                     | 1. Clicar em “Entrar”;<br>2. Informar e-mail e senha cadastrados;<br>3. Clicar no botão de “Entrar”. |
| Critérios de êxito                         | O sistema será direcionado para a homepage logada com as informações do usuário.                     |
| Responsável pela elaborar do caso de Teste |                                                                                                      |

| **Caso de Teste 03**                       | CT03 – Área restrita do usuário                                                                    |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| Requisitos Associados                      | RF-17. Na área restrita deve haver um layout padrão de dashboard compartilhado por todas as telas. |
| Objetivo do Teste                          | Verificar dashboard e suas subpáginas.                                                             |
| Pré-requisitos                             | Estar logado como “Aluno”.                                                                         |
| Passos                                     | 1. Clicar em “Meus Voos”;<br>2. Clicar em “Avisos”;<br>3. Clicar em “Disponibilidade”.             |
| Critérios de êxito                         | O usuário será direcionado para as respectivas páginas: “Meus Voos”, “Avisos” e “Disponibilidade”. |
| Responsável pela elaborar do caso de Teste |                                                                                                    |

| **Caso de Teste 04**                       | CT04 – Área do instrutor (Turma)                                                                                                                           |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                      | RF-03. Possibilidade de ver quadro horário por aeronave, por instrutor e por aluno                                                                         |
| Objetivo do Teste                          | Verificar se o quadro de horário do instrutor e do aluno está funcionando.<br>Verificar a possibilidade de desmarcação de aula.                            |
| Pré-requisito                              | Estar logado como “Instrutor”.                                                                                                                             |
| Passos                                     | 1. Clicar no menu “Turma” (FALTA FAZER XXXXX)                                                                                                              |
| Critérios de êxito                         | O sistema será direcionado para a área restrita do usuário e aparecerá a tela “Calendário”;<br>O sistema permite filtrar, por aeronave, instrutor e aluno. |
| Responsável pela elaborar do caso de Teste |                                                                                                                                                            |


| **Caso de Teste 05a**                      | CT05a – Manipulação de Aulas                                                                                                                                                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                      | RF-07. Possibilidade de alocar aulas manualmente.                                                                                                                                                                                                                                             |
| Objetivo do Teste                          | Verificar se as funcionalidades foram atendidas.                                                                                                                                                                                                                                              |
| Pré-requisitos                             | Estar logado como “Instrutor”.                                                                                                                                                                                                                                                                |
| Passos                                     | 1. Clicar em “Turma”;<br>2. No calendário clique em algum “slot”;<br>3. Adicione aluno;<br>4. No campo “instrutor” selecione o usuário atual<br>5. Selecione uma aeronave;<br>6. Selecionar botão “Salvar”;<br>7. Clicar em “Salvar Alterações”;<br>8. Selecione o botão voltar ao dashboard. |
| Critérios de êxito                         | O sistema será direcionado para tela de “Disponibilidade”.                                                                                                                                                                                                                                    |
| Responsável pela elaborar do caso de Teste |                                                                                                                                                                                                                                                                                               |

| **Caso de Teste 05b**                      | CT05b – Manipulação de Aulas – Verificação do aluno                                                                    |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                      | RF-07. Possibilidade de alocar aulas manualmente.                                                                      |
| Objetivo do Teste                          | Verificar se as aulas foram marcadas corretamente.                                                                     |
| Pré-requisitos                             | Ter completado o “Caso de Teste 05ª”                                                                                   |
| Passos                                     | 1. Fazer o login como o aluno selecionado no CT-5a passo 3.                                                            |
| Critérios de êxito                         | O aluno será direcionado para a página “Meus Voos”;<br>O voo criado durante o CT-05ª é mostrado na tabela “Meus Voos”. |
| Responsável pela elaborar do caso de Teste |                                                                                                                        |

| **Caso de Teste 06a**                      | CT 06a – Desmarcação de aulas                                                                                                       |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                      | RF-11. Possibilidade de desmarcar aula.                                                                                             |
| Objetivo do Teste                          | Verificar se o Administrador da escola tem o total controle da plataforma.                                                          |
| Pré-requisito                              | Estar logado como instrutor;<br>As aulas devem ser previamente adicionadas.                                                         |
| Passos                                     | 1. Clicar em “Turmas”;<br>2. Selecione uma aula;<br>3. Selecione o botão “Remover”.<br>4. Selecionar o botão “Voltar ao Dashboard”. |
| Critérios de êxito                         | A aula será removida do calendário e cancelada.<br>Aula removida da lista.                                                          |
| Responsável pela elaborar do caso de Teste |                                                                                                                                     |

| **Caso de Teste 06b**                      | CT 06b – Desmarcação de aulas – Verificação do aluno                       |
| ------------------------------------------ | -------------------------------------------------------------------------- |
| Requisitos Associados                      | RF-11. Possibilidade de desmarcar aula.                                    |
| Objetivo do Teste                          | Verificar se o Administrador da escola tem o total controle da plataforma. |
| Pré-requisito                              | Estar logado como aluno;<br>Ter completado o “Caso de Teste 06a”.          |
| Passos                                     | 1. Clicar em “Meus Voos”.                                                  |
| Critérios de êxito                         | Aula removida da lista.                                                    |
| Responsável pela elaborar do caso de Teste |                                                                            |

| **Caso de Teste 07a**                      | CT 07a – Cadastro de disponibilidade                                                                                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Requisitos Associados                      | RF-02 Cadastro de disponibilidade Aluno/Instrutor.                                                                                                                             |
| Objetivo do Teste                          | Verificar se o Aluno/Instrutor tem disponibilidade de horário para a aula.                                                                                                     |
| Pré-requisito                              | Estar logado como Instrutor;                                                                                                                                                   |
| Passos                                     | 1. Clicar em “Disponibilidade”;<br>2. Escolher quantidade de voos por semana;<br>3. Escolher os horários dos voos nos dias de sua preferência;<br>4. Clicar no botão “Salvar”. |
| Critérios de êxito                         | Os horários cadastrados devem ser disponibilizados para o usuário/instrutor na Tela “Meus Voos”.                                                                               |
| Responsável pela elaborar do caso de Teste |                                                                                                                                                                                |