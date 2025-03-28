# 👋 ¡Bienvenido al Bot de Discord de Business Group!  

¡Gracias por tu interés en contribuir al Bot de Discord del Business Group! Apreciamos tu tiempo y esfuerzo para ayudarnos a mejorar y ampliar el proyecto.  

# 📝 Guía de Contribución  

Antes de contribuir, por favor lee nuestro [Código de Conducta](CODE_OF_CONDUCT.md).  

## Antes de empezar  

### Requisitos previos  
- Asegúrate de tener [Docker](https://docs.docker.com/get-docker/) instalado.  
- También necesitarás un token de Discord para usar el bot. Puedes obtener uno [aquí](https://discord.com/developers/applications).  

### Instalación  

1. Haz un fork del proyecto en tu cuenta de GitHub para tener tu propia copia. Para hacer esto, haz clic en el botón “Fork” en la parte superior derecha de la página del repositorio en GitHub. Esto creará una copia del repositorio en tu cuenta de GitHub.  

2. Clona el fork:  

   ```bash
   git clone <tu-url-del-repositorio-forkeado>
   ```  

3. Navega al directorio del proyecto:  

   ```bash
   cd business-discord-bot
   ```  

4. Agrega el repositorio original como remoto:  

   ```bash
   git remote add upstream https://github.com/ouariachi/business-discord-bot.git
   ```  

   Esto te permitirá mantener tu fork actualizado con el repositorio original.  

5. Crea un archivo `.env` en la raíz del proyecto con el token de discord:
   ```bash
   TOKEN=<tu-token-de-discord>
   ```

6. Construye el contenedor:  

   ```bash
   docker-compose build
   ```  

   > [!IMPORTANT]  
   > Si se han realizado cambios en los archivos `Dockerfile` o `docker-compose.yml`, siempre debes compilar antes de ejecutarlo.  

7. Inicia el contenedor:  

   ```bash
   docker-compose up 
   ```  

De esta forma ya tendrás la base de datos y tu bot en ejecución. Como usamos nodemon para ejecutar el bot en modo desarrollo, cuando cambies algún archivo, el bot se reiniciará automáticamente. ¡Pero, ten en cuenta! Los cambios que realices en el archivo .env no son detectados automáticamente, por lo que debes reiniciar el contenedor para que se apliquen los cambios.

# 📝 Guía de Commits  

Para mantener un historial de commits limpio y consistente, seguimos el estándar de [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/) y agregamos emojis a los mensajes de commit. Esto nos ayuda a comprender rápidamente el propósito de cada commit y a rastrear los cambios de manera más efectiva.  

Es importante que los mensajes de commit sigan el siguiente formato: `<tipo>(<scope>): <mensaje>`. Y el mensaje debe estar en inglés.

## 📌 Tipos y Emojis:  

| Tipo        | Emoji                          | Descripción                                                    |  
|------------|--------------------------------|----------------------------------------------------------------|  
| **feat**    | ✨ (`:sparkles:`)              | Se introduce una nueva funcionalidad.                         |  
| **fix**     | 🐛 (`:bug:`)                   | Se ha corregido un error.                                     |  
| **docs**    | 📚 (`:books:`)                 | Se ha actualizado la documentación.                          |  
| **style**   | 🎨 (`:art:`)                   | Cambios en el estilo del código (formato, espacios, etc.).   |  
| **refactor**| 🔨 (`:hammer:`)                | Refactorización del código sin cambiar su funcionalidad.      |  
| **test**    | ✅ (`:white_check_mark:`)      | Se agregan o corrigen pruebas.                               |  
| **perf**    | 🚀 (`:rocket:`)                | Mejoras en el rendimiento.                                   |  
| **chore**   | 🔧 (`:wrench:`)                | Tareas de mantenimiento (actualización de dependencias, etc.). |  
| **ci**      | 🤖 (`:robot:`)                 | Cambios relacionados con Integración/Entrega Continua.       |  
| **build**   | 🏗 (`:building_construction:`) | Cambios que afectan el sistema de compilación.               |  
| **revert**  | ⏪ (`:rewind:`)                | Se revierte un commit anterior.                              |  
| **security**| 🛡️ (`:shield:`)                | Se corrigen vulnerabilidades de seguridad en el código.       |  

## ⚙️ Cómo Usarlo  

1. **Elige el tipo correcto**: Escoge el tipo adecuado (por ejemplo, `feat`, `fix`, `docs`) que represente el propósito de tu commit.  
2. **Agrega una descripción breve**: Después del tipo, proporciona una descripción corta y clara de lo que hace el commit. Usa el modo imperativo (por ejemplo, "Agregar" en lugar de "Agregado").  
3. **Cuerpo opcional**: Si es necesario, puedes agregar más información detallada sobre el commit en el cuerpo (por ejemplo, por qué se hizo un cambio o cómo probarlo).  
4. **Añade emojis**: Para mayor claridad visual, usa el emoji correspondiente al inicio del mensaje.  

## 📌 Ejemplos:  

| Tipo     | Ejemplo                                                   |  
|----------|-----------------------------------------------------------|  
| **feat** | `✨ feat(auth): add JWT authentication support`            |  
| **fix**  | `🐛 fix(cart): fix checkout button not working on mobile`  |  
| **docs** | `📚 docs(readme): update installation instructions`        |  
