## Instalação dos pacotes
```pnpm i```


## Inicializa banco de dados
```docker-compose -f docker-compose.dev.yml up -d```
```pnpm prisma db push```
```pnpm db:seed```

Preencha todas as variáveis de ambiente


## Inicializa APP
```pnpm dev```
