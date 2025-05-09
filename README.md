# Proyecto de Autenticación y Listado de Datos con Next.js 14+

Este proyecto es una aplicación web de ejemplo construida con Next.js 14+, TypeScript y React Hooks, demostrando funcionalidades básicas de autenticación (mock), protección de rutas, consumo de API pública, listado de datos y filtrado.

## Índice

1.  [Tecnologías Usadas](#tecnologías-usadas)
2.  [Requisitos](#requisitos)
3.  [Instalación y Ejecución](#instalación-y-ejecución)
4.  [Estructura del Proyecto](#estructura-del-proyecto)
5.  [Funcionalidades Implementadas](#funcionalidades-implementadas)
6.  [Decisiones Técnicas](#decisiones-técnicas)
7.  [Dificultades Encontradas](#dificultades-encontradas)
9.  [API Utilizada](#api-utilizada)

## Tecnologías Usadas

* **Next.js:** Framework de React (versión 15)
* **TypeScript:** Lenguaje de programación con tipado estático
* **React:** Librería para construir interfaces de usuario
* **React Hooks:** Para manejo de estado y efectos en componentes funcionales
* **Context API:** Para manejo de estado global (autenticación)
* **CSS Modules:** Para estilos encapsulados (ejemplos incluidos)

## Requisitos

* Node.js (v18.x o superior recomendado)
* npm o yarn (gestor de paquetes)

## Instalación y Ejecución

1.  Clona este repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    # o
    yarn install
    ```
3.  Ejecuta el proyecto en modo desarrollo:
    ```bash
    npm run dev
    # o
    yarn dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

La estructura sigue las convenciones del App Router de Next.js:

* `app/`: Sistema de enrutamiento basado en archivos. Contiene las páginas y layouts principales (`login`, `dashboard`).
* `context/`: Contextos de React para state management (`auth-context.tsx`).
* `hooks/`: Custom hooks reutilizables.
* `styles/`: Estilos globales y CSS Modules.
* `utils/`: Funciones utilitarias.

## Funcionalidades Implementadas

* **Página de Login (`/login`):**
    * Formulario con campos de email y contraseña.
    * Validación básica de formato de email y longitud de contraseña (mínimo 6 caracteres).
    * Uso de un mock para simular el proceso de autenticación. Las credenciales válidas son `test@example.com` / `password123`.
    * Manejo y visualización de errores en caso de credenciales incorrectas.
    * Redirección automática al `/dashboard` si el login es exitoso.
* **Dashboard Protegido (`/dashboard`):**
    * Ruta protegida: si un usuario no autenticado intenta acceder, es redirigido a `/login`. La protección se implementa en el cliente usando `useEffect` y el estado del Contexto de Autenticación.
    * Muestra el email del usuario actualmente logueado (obtenido del Contexto).
    * Incluye un botón para cerrar sesión que redirige a `/login` tras el logout.
* **Listado de Datos (`/dashboard/posts`):**
    * Consume datos de la API pública JSONPlaceholder (`/posts`). Para simplificar el filtrado client-side, se limita la carga inicial a aproximadamente 10 posts.
    * Muestra un listado de posts con su `id`, `title` y `body`.
    * Muestra un estado de "Cargando posts..." mientras se obtiene la data de la API.
    * Manejo básico de errores si la llamada a la API falla.
* **Sistema de Filtrado (`/dashboard/posts`):**
    * Input de texto para buscar posts por coincidencia en el `title` (filtrado client-side).
    * Botón para resetear todos los filtros y la paginación al inicio.
    * Muestra un mensaje "No se encontraron resultados" cuando los filtros no arrojan coincidencias en la data actual.

## Decisiones Técnicas

* **Next.js App Router:** Se utilizó el App Router por ser la arquitectura recomendada en Next.js 14+ para nuevas aplicaciones, ofreciendo layouts, loading states y manejo de errores integrado (aunque en este ejemplo la protección y loading de datos se manejan en el cliente con Hooks para simplicidad).
* **Context API para Autenticación:** Se eligió Context API para manejar el estado global de autenticación (`user`, `loading`, funciones `login`/`logout`), permitiendo acceder a este estado desde cualquier componente o página sin pasar props manualmente a múltiples niveles.
* **Mock de Autenticación:** Para cumplir con el requisito sin necesidad de un backend real, se implementaron funciones mock (`mockLogin`, `mockLogout`) que simulan las operaciones de autenticación y manejan credenciales predefinidas.
* **Carga de Datos y Filtrado Client-Side:** Para simplificar el ejemplo, se cargan los primeros 10 posts de la API. El filtrado por texto se realiza completamente en el cliente sobre este conjunto de datos cargado. Para grandes volúmenes de datos, sería más eficiente implementar el filtrado directamente en la llamada a la API si esta lo soporta.
* **CSS Modules:** Para encapsular estilos a nivel de componente, evitando conflictos de nombres.

## Dificultades Encontradas

* Equilibrar la simplicidad del ejemplo con la implementación completa de requisitos.

## API Utilizada

* [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
