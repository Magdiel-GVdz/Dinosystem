# Establecemos la imagen base
FROM python:3.13.0a4-alpine3.19

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /code

# Copiamos el archivo de requisitos al directorio de trabajo
COPY requirements.txt .

RUN apt update -y & apt -y upgrade 

# Instalamos las dependencias del proyecto
RUN pip install -r requirements.txt

# Copiamos el contenido del directorio actual al directorio de trabajo en el contenedor
COPY . .

# Ejecutamos el servidor de desarrollo de Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
