# Registro de Testes de Software

Relatório com as evidências dos testes de software realizados na aplicação pela equipe, baseado no plano de testes pré-definido.

Os resultados dos testes funcionais realizados na aplicação são descritos a seguir. [Utilize a estrutura abaixo para cada caso de teste executado]

| Caso de Teste 01                             | CT-01 - Cadastro de usuário   |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e o usuário foi cadastrado. As informações do usuário foram armazendas no Local Storage. |
| Responsável pela execução do caso de Teste | Andryel  |
![Cadastro](/documentos/img/CRIAR%20CONTA.gif)
![Cadastro](/documentos/img/LocalStoragedelogin.png)


| Caso de Teste 02                             | CT-02 - Efetuar Login do Usuário   |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e o usuário foi direcionado para a homepage logada.|
| Responsável pela execução do caso de Teste | Andryel  |
![Cadastro](/documentos/img/LOGIN.gif)


| Caso de Teste 03                             | CT 03 – Área restrita do usuário  |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e o o usuário foi direcionado para as páginas "meus voos" e "disponibilidade". |
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/Area%20restrita%2003.png)

| Caso de Teste 04                             |CT04 – Área do instrutor (Turma)|
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e o instrutor poderá ver a disponibilidade do aluno e filtrá-la . |
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/ct04.png)
![Cadastro](/documentos/img/ct04ii.png)

| Caso de Teste 05a                             |CT05a – Manipulação de Aulas  |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e as aulas foram cadastradas. |
| Responsável pela execução do caso de Teste | Andryel  |
![Cadastro](/documentos/img/ct-5a.png)
![Cadastro](/documentos/img/ct-5aii.png)
![Cadastro](/documentos/img/TurnaCadastro.png)

| Caso de Teste 05b                             |CT05b – Manipulação de Aulas – Verificação do aluno  |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e o dados foram cadastrados. |
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/CT05b.png)


| Caso de Teste 06a                             |CT 06a – Desmarcação de aulas  |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e as aulas foram removidas. |
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/CT6a.gif)

| Caso de Teste 06b                             |CT 06b – Desmarcação de aulas – Verificação do aluno  |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e a aula já foi removida. |
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/Area%20restrita%2003.png)

| Caso de Teste 07a                             |CT 07a – Cadastro de disponibilidade  |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e as aulas serão exibidas na tela "meus voos". |
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/CT7A.gif)

| Caso de Teste 07b                             | CT 07b – Cadastro de disponibilidade  |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e as aulas serão exibidas na tela "meus voos".  |
| Responsável pela execução do caso de Teste | Andryel |
![Cadastro](/documentos/img/CT-7b.gif)
![Cadastro](/documentos/img/CT-7b.png)
![Cadastro](/documentos/img/LocalStorageDisponib.png)

| Caso de Teste 08a                             | CT 08a – Tela de Cadastro - Cenários negativos – Campos em branco |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e a mensagem “O campo \[nome do campo\] é obrigatório” é mostrado abaixo de cada campo . |
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/ct-08a.png)


| Caso de Teste 08b                             |  CT 08b – Tela de Cadastro - Cenários negativos – Email |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e a mensagem “O e-mail inserido é invalido” é mostrado abaixo do campo e-mail. |
| Responsável pela execução do caso de Teste | Andryel  |
![Cadastro](/documentos/img/ct-8b.png)


| Caso de Teste 08c                             |  CT 08c – Tela de Cadastro - Cenários negativos – Senha Curta |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         | O Teste foi executado e a mensagem “A senha deve ter no mínimo 8 caracteres” é mostrada abaixo do campo senha.|
| Responsável pela execução do caso de Teste | Andryel  |
![Cadastro](/documentos/img/ct-8c.png)


| Caso de Teste 08d                             | CT 08d – Tela de Cadastro - Cenários negativos – Senha Longa |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         |O Teste foi executado e a mensagem “A senha deve ter no máximo 15 caracteres” é mostrada abaixo do campo senha  . |
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/ct-8d.png)


| Caso de Teste 08e                             | CT 08e – Tela de Cadastro - Cenários negativos – Senha composta apenas por letras minúsculas |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         |O Teste foi executado e a mensagem “A senha deve ter pelo menos uma letra maiúscula” é mostrada abaixo do campo senha.|
| Responsável pela execução do caso de Teste | Andryel  |
![Cadastro](/documentos/img/ct-8e.png)


| Caso de Teste 08f                             | CT 08f – Tela de Cadastro - Cenários negativos – Senha composta apenas por letras |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         |O Teste foi executado e a mensagem “A senha deve ter pelo menos um número” é mostrada abaixo do campo senha.|
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/CT-8f.png)


| Caso de Teste 08g                             | CT 08g – Tela de Cadastro - Cenários negativos – Senha composta apenas por letras e números |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         |O Teste foi executado e a mensagem “A senha deve ter pelo menos um caractere especial” é mostrada abaixo do campo senha.|
| Responsável pela execução do caso de Teste | Andryel  |
![Cadastro](/documentos/img/CT-8g.png)


| Caso de Teste 08h                             | CT 08h – Tela de Cadastro - Cenários negativos – Senhas não coincidem |
| :----------------------------------------- | :---------------------------- |
| Resultados obtidos                         |O Teste foi executado e a mensagem “As senhas não coincidem” é mostrada abaixo do campo “Repita a senha”.|
| Responsável pela execução do caso de Teste | Felipe  |
![Cadastro](/documentos/img/CT-8h.png)
