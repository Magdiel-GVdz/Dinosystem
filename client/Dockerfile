# Establecemos la imagen base
FROM node:20.11.1-alpine3.19

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /code

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Iniciar servidor de desarrollo
CMD ["npm", "run", "dev"]