# Especificação do Projeto

## Perfis de Usuários

<table>
<tbody>
<tr align=center>
<th colspan="2">Aluno</th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Estudante matriculado na escola de aviação. 

 

Conhecimento pode variar de estudantes com conhecimentos avançados de tecnologia a aqueles que têm experiência limitada. 

Sua experiencia com tecnologia pode variar amplamente, dependendo da idade, formação e experiência tecnológica do aluno.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Deseja obter informações sobre matrícula, horários de aulas, materiais do curso, saldo de aula, notas e comunicar com instrutores. Comunicar com a administração sobre sua disponibilidade para aulas. Desmarcar aulas em caso de imprevistos </td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr align=center>
<th colspan="2">Instrutor de voo</th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Profissional responsável por ministrar aulas, avaliar alunos e fornecer orientações. 

Possui conhecimentos em ensino e treinamento, mas pode ter níveis variados de familiaridade com tecnologia. 

Experiencia com tecnologia pode variar, desde instrutores altamente experientes em tecnologia até aqueles com habilidades básicas de informática. </td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Deseja obter informações atualizadas sobre matrículas, horários de aulas, materiais do curso, registros de alunos, quantidade de aula disponível e se comunicar com o aluno. Registrar informações sobre avaliação do aluno e demais comentários/sugestões pertinentes durante o debriefing. Comunicar com a administração sobre sua disponibilidade para aulas. Desmarcar aulas em caso de imprevistos. Informar mecânicos sobre pontos relevantes percebidos durante voo (a fim de que sejam corrigidos em manutenção). </td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr align=center>
<th colspan="2">Administrador acadêmico</th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Profissional responsável pela gestão dos processos acadêmicos da escola, como gestão do material didático, horários de aulas, avaliações e registros de alunos. 

Conhecimento aprofundado dos processos acadêmicos e do funcionamento dos sistemas da escola. 

Possui conhecimentos de TI suficientes para entender a integração de sistemas e as implicações técnicas.</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Precisa garantir que as aulas estejam acontecendo da maneira como prevista na legislação, normas e programa pedagógico da escola. Realizar a alocação de alunos, instrutores e aeronaves em horários de aula.</td>
</tr>
</tbody>
</table>

## Histórias de Usuários

|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
|aluno| Obter informações sobre matrícula, horários de aulas, materiais do curso, notas| Me manter informado sobre meu progresso no curso|
|Aluno| Obter informações sobre saldo de aulas| Me programar para adquirir mais aulas|
|Aluno| Informar o administrador acadêmico sobre a minha disponibilidade| Ser alocado em aulas futuras|
|Aluno| Desmarcar aulas| Não ser multado por não comparecer em uma aula marcada |
|Aluno| Me comunicar com o instrutor| Tirar dúvidas sobre a instrução de voo|
|Instrutor de voo|Obter informações atualizadas sobre matrículas, horários de aulas, materiais do curso, registros de alunos, quantidade de aula disponível |Me planejar para as instruções  |
|Instrutor de voo|Me comunicar com o aluno |Auxiliá-lo em caso de dúvidas |
|Instrutor de voo|Registrar realização da aula, avaliação do aluno e debriefing|Manter o registro das aulas realizadas |
|Instrutor de voo|Desmarcar aulas em caso de imprevistos|Não ser penalizado por não comparecer em uma aula marcada |
|Administrador acadêmico|Obter informações sobre as aulas  | Garantir que as aulas estejam acontecendo da maneira como prevista na legislação, normas e programa pedagógico da escola |
|Administrador acadêmico|Realizar a alocação de alunos, instrutores e aeronaves em horários de aula |Que as aulas aconteçam |

## Requisitos do Projeto
### Requisitos Funcionais

|ID    | Descrição                | Prioridade |
|-------|---------------------------------|----|
| RF-01 |Possibilidade de gerenciar horários das aulas (alocação aeronave/instrutor/aluno) |Alta| 
| RF-02 |Cadastro de disponibilidade |Alta|
| RF-03  | Possibilidade de ver quadro de horário por aeronave, por instrutor, por aluno |Média|
| RF-04  | Possibilidade de ver alocações  |Média|
| RF-05  | Possibilidade de cadastrar aulas, notas e observações  |Média|
| RF-06  | Possibilidade de alocar automaticamente, baseado na disponibilidade de cada envolvido |Média|
| RF-07  | Possibilidade de alocar manualmente  |Alta|
| RF-08  | Notificações devem ser enviadas manualmente ao e-mail/WhatsApp dos usuários  |Baixa|
| RF-00  | Dar acesso a informações sobre a aula  |Alta|
| RF-10  | Gerenciar saldo de aulas |Baixa|
| RF-11 | Possibilidade de desmarcar aulas |Média|
| RF-12  |  Deve ter uma troca de mensagens entre instrutores e alunos para uma comunicação direta |Baixa|
| RF-13  | Cadastro de usuários |Alta|
| RF-14  | Cadastro de aeronaves |Alta|

**Prioridade: Alta / Média / Baixa. 

### Requisitos não Funcionais

|ID      | Descrição               |Prioridade |
|--------|-------------------------|----|
| RNF-01 | Deve ser acessível e responsivo por qualquer dispositivo |Alta | 
| RNF-02 | Deve seguir as normas WCAG nível A |Baixa| 
| RNF-03 |Assegurar a privacidade dos dados do usuário conforme LGPD |Média| 
| RNF-04 |Deve ser capaz de gerar relatórios que cumpram com as normas da aviação para fins de auditoria e revisão  |Baixa| 
| RNF-05 |O sistema deve ser capaz de lidar com múltiplas solicitações simultâneas sem degradação significativa do desempenho |Média| 
| RNF-06|O tempo de resposta para a geração e exibição das agendas de voos não deve exceder 3 segundos   |Média| 
| RNF-07 |O sistema deve estar disponível 24 horas por dia, 7 dias por semana, com uma taxa de disponibilidade de 99%  |Média| 
| RNF-08 |O tempo de inatividade planejado para manutenção deve ser agendado em horários de menor uso, como a noite |Baixa| 
| RNF-09 |A autenticação de usuários deve ser segura, permitindo apenas o acesso de usuários autorizados através de autenticação |Alta| 
| RNF-10 |O sistema deve ser projetado para acomodar um aumento futuro no número de escolas de aviação, alunos e instrutores, sem grandes alterações na arquitetura|Alta| 


**Prioridade: Alta / Média / Baixa. 

