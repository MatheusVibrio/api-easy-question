Ao clonar para instalar a node_modules dar: yarn 

Para rodar: yarn dev

Criar o banco a primeira vez no docker (não se esqueça de baixar): docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Para rodar o banco após já estar criado: docker run postgres
