# Landing page institucional da GCASPP

> Projeto independente do monorepo GAP. Destino local: `~/code/landing-page`. [Issue #1](https://github.com/thiagoCalazans-dev/Gcaspp-landing-page/issues/1).

## Problem Statement

A GCASPP oferece sistemas para diversas áreas da administração pública municipal, mas precisa de uma apresentação digital clara, moderna e fácil de usar por gestores e equipes técnicas. A visita ao site deve permitir entender a abrangência das soluções e iniciar uma conversa comercial sem depender de um assistente de IA.

## Solution

Criar uma landing page pública, em português do Brasil, de página única e responsiva. A composição deve adaptar a hierarquia, a tipografia, o espaço em branco e a sequência de leitura de [America.gov](https://america.gov/) à identidade visual da [GCASPP](https://gcaspp.com/pt/), sem copiar marcas, símbolos oficiais ou sugerir vínculo com o governo dos EUA.

A primeira tela apresenta a proposta de valor e um campo para a pessoa escrever uma pergunta. Ao enviar, abre-se o WhatsApp comercial da GCASPP com a pergunta preenchida. Uma chamada distinta permite solicitar uma demonstração pelo mesmo canal. A página apresenta as áreas atendidas, a empresa e os meios de contato em seções da mesma página. O texto pode ser reorganizado e reescrito para ganhar clareza, preservando a oferta real.

## User Stories

1. Como gestor de prefeitura, quero compreender rapidamente o que a GCASPP oferece, para avaliar se vale iniciar uma conversa.
2. Como gestor de câmara municipal, quero me reconhecer no público atendido, para não supor que a solução serve apenas a prefeituras.
3. Como gestor de autarquia, quero ver que a GCASPP atende minha organização, para considerar uma demonstração.
4. Como servidor de uma área técnica, quero localizar os tipos de sistema relevantes ao meu trabalho, para encaminhar a solução internamente.
5. Como visitante, quero perceber que a oferta cobre várias necessidades da administração municipal, para compreender sua abrangência.
6. Como visitante, quero escrever uma pergunta em linguagem livre, para iniciar o contato pelo assunto que me interessa.
7. Como visitante, quero que minha pergunta apareça preenchida no WhatsApp, para não precisar digitá-la novamente.
8. Como visitante, quero saber antes de enviar que serei levado ao WhatsApp comercial, para entender o que acontecerá.
9. Como potencial cliente, quero pedir uma demonstração por uma ação clara, para conversar sobre o funcionamento dos sistemas.
10. Como usuário de celular, quero ler, navegar e acionar o contato sem ampliar a tela ou perder conteúdo.
11. Como usuário de teclado ou tecnologia assistiva, quero identificar seções, campo e ações e operar a página com foco visível.
12. Como visitante, quero encontrar contato e identidade da empresa, para verificar com quem estou falando.
13. Como responsável comercial da GCASPP, quero receber perguntas e pedidos de demonstração no número comercial publicado, para dar continuidade ao atendimento.
14. Como responsável pelo conteúdo, quero que afirmações de desempenho e satisfação tenham fonte antes de serem publicadas, para manter a comunicação confiável.

## Mapa de domínios

Não há entidades persistidas nem mudanças no domínio do GAP. Os conceitos de conteúdo desta página são **área de solução** (`solutionArea`), **pergunta comercial** (`commercialQuestion`) e **pedido de demonstração** (`demoRequest`). São conteúdo estático ou texto transitório no navegador, sem tabela, ciclo de vida persistido ou relação com entidades do GAP.

| Conceito | Campo | Tipo | Regra |
| --- | --- | --- | --- |
| Área de solução — `solutionArea` | `title` | texto | Obrigatório; representa uma área realmente atendida. |
| Área de solução — `solutionArea` | `description` | texto | Opcional; não promete funcionalidade não confirmada. |
| Pergunta comercial — `commercialQuestion` | `text` | texto | Informado pela pessoa; remover espaços nas pontas antes de compor o link. |
| Pedido de demonstração — `demoRequest` | `message` | texto | Mensagem pré-preenchida identificando a intenção de agendar demonstração. |

A página pode citar contabilidade, licitação, arrecadação, almoxarifado, patrimônio e protocolo, além de outras áreas confirmadas pelo material atual da GCASPP. A enumeração não constitui catálogo fechado nem garantia de cobertura de cada processo municipal.

## Rotas da API

Nenhuma. A página não cria backend, sessão ou integração com a API do GAP. O encaminhamento comercial usa um link para o WhatsApp com texto codificado na URL.

## Rotas de navegação e menus

| Página | Rota | Onde aparece | Permissão para ver |
| --- | --- | --- | --- |
| Landing page GCASPP | `/` | Acesso público pela URL do novo site; menu interno aponta para seções da mesma página | Pública |

O estado transitório da pergunta permanece no campo enquanto a página está aberta; não precisa constar na URL da landing page. As seções usam âncoras navegáveis. Não há telas, diálogos nem páginas separadas por produto nesta entrega.

## Implementation Decisions

- Manter a landing page em projeto e repositório próprios, fora do monorepo GAP.
- Criar uma única página em português do Brasil, com layout adaptável a desktop e celular.
- Usar a referência America.gov para composição e ordem visual, com marca e conteúdo da GCASPP. Evitar qualquer elemento que faça a empresa parecer órgão governamental.
- Colocar a proposta de valor e a pergunta livre na região principal da página; organizar soluções, apresentação institucional e contato em seções legíveis.
- Encaminhar a pergunta ao WhatsApp comercial publicado no site atual: `+55 11 93371-1956`. A mensagem deve incluir o texto informado, codificado corretamente para URL.
- Oferecer uma ação separada “Agendar uma demonstração”, que abre o mesmo WhatsApp com mensagem específica.
- Identificar as ações como contato via WhatsApp; não representar o campo como resposta automática ou IA.
- Não reutilizar percentuais, quantidades de clientes, depoimentos ou promessas de resultado sem fonte aprovada. A conversa confirmou que não há provas desse tipo disponíveis agora.
- Usar conteúdo sobre capacidades e áreas atendidas sem afirmar que todos os processos de qualquer município já estão cobertos.
- Manter semântica de títulos e seções, rótulo acessível para o campo, navegação por teclado, foco visível e contraste adequado.
- O escopo termina em uma página pronta para publicação; o ato de publicar e a definição da hospedagem podem ser tratados à parte.

## Testing Decisions

- Verificar no nível da página pública o comportamento visível, sem testar detalhes internos de componentes.
- Cobrir a navegação por âncoras, o envio de pergunta com codificação correta no link do WhatsApp e a ação de demonstração.
- Conferir o estado de pergunta vazia e de texto com acentos, espaços e sinais de pontuação.
- Inspecionar manualmente a apresentação e operação em larguras de desktop e celular, incluindo teclado e foco.
- Como o novo projeto ainda não tem código nem testes, criar apenas o menor seam de teste que prove esses comportamentos, conforme a tecnologia escolhida na implementação.

## Out of Scope

- Assistente de IA, respostas automáticas, chatbot e armazenamento de conversas.
- Backend, banco de dados, conta de usuário ou integração com o GAP.
- Páginas individuais para cada sistema.
- Formulário de captura de leads ou newsletter.
- Publicação de métricas, clientes ou depoimentos sem material aprovado.
- Implantação em domínio ou provedor de hospedagem específico.

## Further Notes

- O site atual da GCASPP é fonte para identidade e dados públicos de contato; conferir esses dados na implementação.
- A referência America.gov pode mudar. A implementação deve preservar os princípios visuais acordados, sem exigir cópia pixel a pixel.
- Este documento registra o acordo obtido na conversa de 1º de outubro de 2026.
