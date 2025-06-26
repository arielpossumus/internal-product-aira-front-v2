# Agentes Inteligentes - Interfaz de Chat V0.2.0

## Changelog

### V0.1.0
- Ingreso a través de Voz
- Multiclientes

### V0.1.1
- Securizacion y autenticacion

### V0.1.2
- Mejoras y ajustes varios sobre version Mobile
- Menu lateral colapsabe en dispositivos moviles

### V0.1.3
- Estiliziacion Aira
- Soporte Google Fonts
- Se arreglo el error donde al cargar por primera vez no cargaba los estilos

### V0.1.4
- Se modifico el servicio para el endpoint del theme
- Nuevo logo Aira
- Seccion "Acerca de"
- Se deshabilita boton "Enviar" mientras se genera la respuesta

### V0.2.0
- Las preguntas predefinidas se toman desde la configuracion del cliente (Strapi)
- Se envia el cliente como dato a la api para obtener los prompts


## Descripción
Agentes Inteligentes es una interfaz de chat interactiva que permite a los usuarios integrar un widget de chat en sus propias páginas web a través de un iframe.

La misma está bajo el concepto de "Marca blanca", lo que permite de manera rápida crear un bot de IA para cualquier cliente, con configuración dinámica a través de Strapi CMS.

## Características

- **Diseño Moderno UI/UX**
  - Interfaz limpia y profesional
  - Diseño responsivo que funciona en dispositivos de escritorio y móviles
  - Componentes de Material-UI para un estilo consistente
  - Esquema de colores personalizable a través de Strapi

- **Interfaz de Chat**
  - Visualización de mensajes en tiempo real
  - Diferenciación entre mensajes de usuario y AI
  - Persistencia del historial de mensajes
  - Visualización de mensaje de bienvenida configurable
  - Desplazamiento suave y animaciones de mensajes
  - Efecto de animación de escritura para respuestas de AI
  - Preguntas de placeholder dinámicas que cambian después de la interacción del usuario
  - Preguntas predefinidas para interacción rápida
  - Estado de carga con animación "pensando"
  - Botones para Like - Dislike, función que se usará para entrenar al agente con las recomendaciones del usuario
  - Botón para copiar la respuesta del agente al portapapeles

- **Funcionalidad de Barra Lateral**
  - Visualización del historial de chat
  - Botón de nuevo chat
  - Barra lateral responsiva que se colapsa en móviles
  - Sesiones de chat persistentes

- **Integración con API**
  - Comunicación con API basada en Axios
  - Configuración mediante variables de entorno
  - Manejo de errores y retroalimentación al usuario
  - Envío automático de mensajes desde preguntas predefinidas
  - Id de sesión único por chat, para mantener el hilo de la conversación

## Integración del Widget
Para integrar el widget de Tina en tu página web:

1. Haz clic en el botón "Usar en mi web" en la interfaz principal
2. En el diálogo que se abre, configura el ancho y alto del widget según tus necesidades
3. Copia el código del iframe generado
4. Pega el código en el lugar de tu página web donde deseas que aparezca el widget

Se agregó un botón para copiar directamente el código al portapapeles

### Ejemplo de código del iframe
```html
<iframe src="[URL_DE_APP]/iframe" width="300" height="300" style="border: none;"></iframe>
```

## Requisitos
- Navegador web moderno
- Conexión a internet
- Acceso al panel de administración de Strapi

## Stack Tecnológico

- React 18
- Vite
- Material-UI (MUI)
- CSS-in-JS con la prop sx de MUI
- React Router (para navegación)
- Axios (para comunicación con API)
- React Query (para manejo de estado y caché)
- React Helmet Async (para manejo de metadatos)

## Estructura del Proyecto

```
src/
├── assets/           # Recursos estáticos (imágenes, iconos)
├── components/       # Componentes React
│   ├── DocumentHead.jsx # Componente para manejo de metadatos
│   ├── Header.jsx   # Componente de encabezado
│   ├── ConfigureIframe.jsx   # Componente de configuración del Iframe
│   ├── Messages.jsx # Componente de visualización de mensajes
│   ├── NewChat.jsx  # Componente de nuevo chat
│   ├── Submit.jsx   # Componente de entrada de mensajes
│   └── User.jsx     # Componente de perfil de usuario
├── config/          # Archivos de configuración
│   └── constants.js # Constantes de API
├── hooks/           # Custom hooks
│   ├── useAppConfig.js  # Hook para configuración de la app
│   └── useThemeConfig.js # Hook para configuración del tema
├── pages/           # Páginas de la aplicación
│   ├── Home.jsx    # Página principal de chat
│   └── IframeAgent.jsx # Página para el widget iframe
├── routes/          # Configuración de rutas
│   └── AppRouter.jsx # Definición de rutas de la aplicación
├── services/        # Servicios y lógica de negocio
│   ├── apiService.js  # Servicios de API del chat
│   └── adminService.js # Servicios de API de administración
├── theme.js         # Configuración del tema de MUI
├── App.jsx          # Componente principal de la aplicación
└── main.jsx        # Punto de entrada de la aplicación
```

## Configuración del Proyecto

### Variables de Entorno

El archivo `.env-cmdrc.json` debe contener las siguientes variables:

```json
{
  "local": {
    "VITE_APP_URL_APP": "Url de la app: Ej.: [http://localhost:5173/]", 
    "VITE_APP_API_URL": "Url Backend IA. Ej.: [http://localhost:8000/api]",
    "VITE_APP_API_AGENT_ASK": "Endpoint para preguntar al agente. [ask]",
    "VITE_APP_API_QUESTIONS_RANDOM": "Enpoint para obtener preguntas aleatorias. [random]",
    "VITE_APP_API_ADMIN_CONFIG": "URL Admin de Front: Ej.: [http://localhost:1337]"
  }
}
```

### Configuración en Strapi

La configuración de la aplicación se realiza a través del panel de administración de Strapi, donde podrás personalizar:

#### Configuración General
- Ancho del drawer lateral
- Descripción de la aplicación

#### Configuración de Mensajes
- Ingreso por voz
- Mensaje de "pensando"
- Mensaje inicial
- Texto de nueva conversación
- Texto del botón enviar
- Placeholders de preguntas
- Mensaje de error
- Texto para usar en web

#### Configuración de Imágenes
- Logo del cliente
- Logo de la aplicación
- Ícono del agente
- Imagen de saludo
- Imagen del header del iframe

#### Configuración de Tema
- Paleta de colores primarios y secundarios
- Colores de fondo
- Colores de inputs
- Colores de enlaces
- Colores de texto
- Tipografía

### Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo desarrollo con variables de entorno locales
npm run local

# Iniciar en modo desarrollo para el proyecto Tina
npm run local

npm run build

# Ejecutar linter
npm run lint

# Previsualizar la construcción
npm run preview
```


### Pasos para Configurar un Nuevo Proyecto

1. Clona el repositorio
2. Crea un archivo `.env-cmdrc.json` basado en el ejemplo proporcionado
3. Configura las variables de entorno según tu entorno
4. Instala las dependencias con `npm install`
5. Accede al panel de administración de Strapi y configura:
   - Los colores de la marca
   - Los textos y mensajes
   - Las imágenes del proyecto
   - Las dimensiones según el diseño
6. Inicia el proyecto en modo desarrollo con `npm run local`
7. Accede a la App a tráves del navegador, en la siguiente url: http://localhost:5173/cliente
8. Asegurarse de tener levantado los siguientes proyectos
   - Admin Strapi para configurar Front: http://localhost:1337
   - Backend End IA: http://localhost:8000

## Clientes Configurados

### Tina (Gobierno de Argentina)
- url: /tina

### Gala (Banco Galicia)
- url: /galicia

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
