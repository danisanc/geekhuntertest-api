# Teste para vaga de desenvolvedor pleno na geekhunter

O objetivo era criar uma aplicação web que liste os 5 melhores “matches” (Candidatos) para uma Vaga

## Estrutura do projeto

Para o Front-End usei as tecnologias:

- ReactJs (usando o NextJs)
- TailwindCss
- Axios
- React testing library e Jest

Para o Back-end usei as tecnologias:

- Nestjs
- MongoDb
- Jest

O Front-end foi hospedado no Heroku: ```https://geekhuntertest-api.vercel.app/```

O Back-end foi hospedado no Heroku: ```https://geekhuntertest-api.herokuapp.com/```

## Iniciando o projeto

Para iniciar o Front-end entre dentro da pasta `app` com um terminal e:

1. Crie um arquivo chamado .env
2. Crie uma variavel dentro do .env com o nome ```NEXT_PUBLIC_API_HOST``` com a url da api
3. rode o comando yarn install
4. rode o comando yarn dev

Para iniciar o Front-end entre dentro da pasta `api` com um terminal e:

1. Crie um arquivo chamado .env
2. Crie uma variavel dentro do .env com o nome ```DATABASE_URL``` com a url de conexão do mongo
3. rode o comando yarn install
4. rode o comando yarn start:dev

## Rodando os testes

Para rodar os testes, entre dentro da pasta que desejar e rode o comando ```yarn test```
