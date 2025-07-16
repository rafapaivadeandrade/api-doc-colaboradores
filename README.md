# API de Gerenciamento de Documentação de Colaboradores

## 📦 Instalação

```bash
git clone https://github.com/rafapaivadeandrade/api-doc-colaboradores.git
cd api-doc-colaboradores
pnpm install

# Execução

## Com Docker
docker-compose up --build

## Local
npx prisma migrate dev
pnpm run start:dev
```

# Testando a API com HTTPie

Criar colaborador:
http POST :3000/employees name="Rafael Paiva" document="07833313475" hiredAt="2023-01-01T00:00:00Z" (Powershell)

Criar tipos de documento:
http POST :3000/document-types name="CPF"
http POST :3000/document-types name="Carteira de Trabalho"

Vincular documentos a um colaborador:
http POST :3000/documents/link \
 employeeId=922f18c7-5d67-45de-9f9e-2a9597d19cbe \
 documentTypeIds:='["4879d4e1-9b74-42e0-9b63-802cc64ad67a", "e44a062d-83b7-4760-a084-750213042397"]' (Bash)

Enviar documento de um colaborador:
http POST :3000/documents/send --raw '{ "employeeId": "922f18c7-5d67-45de-9f9e-2a9597d19cbe", "documentTypeId": "4879d4e1-9b74-42e0-9b63-802cc64ad67a" }' Content-Type:application/json (Bash)

Ver status de documentos de um colaborador:
http GET :3000/employees/922f18c7-5d67-45de-9f9e-2a9597d19cbe/status (Bash)

Ver todos os documentos pendentes (com paginação e filtros):
http GET :3000/documents/pending page==1 limit==10 (Bash)

Desvincular documento:
http POST :3000/documents/unlink \
 employeeId=922f18c7-5d67-45de-9f9e-2a9597d19cbe \
 employeeId=922f18c7-5d67-45de-9f9e-2a9597d19cbe \
 documentTypeIds:='["4879d4e1-9b74-42e0-9b63-802cc64ad67a","e44a062d-83b7-4760-a084-750213042397"]'
documentTypeIds:='["4879d4e1-9b74-42e0-9b63-802cc64ad67a","e44a062d-83b7-4760-a084-750213042397"]'
