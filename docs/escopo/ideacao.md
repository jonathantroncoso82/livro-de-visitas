# Ideação — Visão de Produto

## Ideia principal

Sistema digital de livro de visitas para museu que substitui o registro físico em papel, permitindo que visitantes informem nome completo, e-mail, telefone de contato e data da visita por meio de um formulário simples, com armazenamento seguro e imutável dos registros para consulta pela equipe administrativa.

## Valor para o negócio

Substituição do livro físico por registro digital das visitas ao museu, eliminando perda de dados por deterioração do papel, reduzindo o tempo de consulta de registros históricos e permitindo contato futuro com visitantes para ações de relacionamento e fidelização.

## Requisitos não funcionais

O sistema deve estar disponível durante todo o horário de funcionamento do museu, com tolerância a pequenas interrupções fora desse período, não sendo exigida alta disponibilidade. O tempo de resposta para o registro de uma visita deve ser inferior a 3 segundos em condições normais de uso. Por envolver dados pessoais como nome completo, e-mail e telefone, o sistema deve estar em conformidade com a LGPD: os dados devem ser coletados exclusivamente para a finalidade de registro de visitas, armazenados com acesso restrito a pessoal autorizado, mantidos pelo prazo mínimo necessário e passíveis de exclusão mediante solicitação do titular. O armazenamento deve adotar criptografia em repouso e em trânsito. Não há requisito de escalabilidade elevada dado o volume esperado de acessos.

## Personas

Visitante do museu: pessoa que comparece ao museu e deseja registrar sua presença no livro de visitas digital, informando nome completo, e-mail, telefone e data da visita. Equipe administrativa do museu: profissionais responsáveis por consultar, acompanhar e gerenciar os registros de visitas, utilizando o sistema para fins de controle histórico e relacionamento com visitantes. Direção do museu: gestores que aprovam requisitos e prioridades do sistema e têm interesse nos dados agregados de visitação para tomada de decisão.

## Funcionalidades

- Registro de nome completo do visitante
- Registro de e-mail do visitante
- Registro de telefone de contato do visitante (opcional)
- Registro automático da data da visita
- Listagem das entradas do livro de visitas para a equipe administrativa

## Stakeholders

Visitantes do museu, usuários finais responsáveis por registrar a própria presença e fornecer os dados de contato. Equipe administrativa do museu, responsável por consultar, acompanhar e gerenciar os registros do livro de visitas no dia a dia. Direção do museu, que aprova requisitos, define prioridades e é informada sobre o funcionamento e os resultados do sistema.

## Regras de negócio

Somente registros com nome completo, e-mail e data da visita preenchidos são aceitos; esses três campos são obrigatórios. O nome completo deve conter ao menos duas palavras, não sendo aceito apenas o primeiro nome. O e-mail deve ter formato válido e ser único por registro, impedindo que o mesmo endereço seja cadastrado mais de uma vez para a mesma visita. O telefone de contato é opcional, mas quando informado deve conter DDD e número em formato válido. A data da visita não pode ser futura, devendo ser igual ou anterior à data atual no momento do registro. Após a criação, nenhum registro pode ser alterado ou excluído, garantindo a integridade histórica do livro de visitas.

