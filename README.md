#Alexandria-sistema (backend)

O Projeto Alexandria trata-se de uma Biblioteca Digital para gerenciamento de biblioteca, permitindo o cadastro e controle de livros, autores e editoras. Ele é o projeto integrador desenvolvido para o MBA em Engenharia de Software da PUC-SP.

##Arquitetura e Stack Tecnológica

A arquitetura do projeto baseia-se nos princípios da Clean Architecture, focando na separação de preocupações, testabilidade e independência de frameworks. Atualmente, utiliza as seguintes tecnologias:

#Backend (Java + Spring)

- Java 17: versão LTS, estável, segura e com bom desempenho.

- Spring Boot 3: framework robusto que facilita a configuração e o desenvolvimento da aplicação.

- Spring Data JPA: facilita o acesso ao banco com menos código SQL, aumentando produtividade.

- Clean Architecture: estrutura focada em regras de negócio desacopladas de detalhes técnicos.

- Spring Boot Actuator: permite monitorar saúde, métricas e performance da aplicação facilmente.

#Banco de dados

- MySQL 8: confiável, amplamente utilizado e com ótimo suporte para aplicações web.

#Cache

- Redis: alta performance para sessões e cache de dados.

#Infraestrutura e build

- Maven: gerenciamento simples e padronizado de dependências e build.

- Docker Compose: facilita subir o banco e serviços rapidamente, garantindo ambiente consistente.

#Porque essa Stack

Essa stack foi escolhida porque oferece:

- Alta produtividade no desenvolvimento.

- Escalabilidade e manutenção facilitada devido à arquitetura limpa.

- Ferramentas maduras e bem suportadas pela comunidade.

- Código organizado e fácil de testar.

###Pré-requisitos

- Java 17 ou superior

- Maven 3.6+

- Docker e Docker Compose (para o banco de dados e cache)