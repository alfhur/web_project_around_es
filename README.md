# Tripleten web_project_around_es

📌 Descripción del proyecto

"Alrededor de los EE. UU." es una página web interactiva que funciona como una galería de imágenes, donde los usuarios pueden agregar fotos, eliminarlas y darles me gusta.

Este proyecto ha sido desarrollado durante los sprints del curso de desarrollo Web Fullstack. Partiendo de un layout estático (HTML/CSS) provisto como base, se le ha ido agregnado "vida" a la página utilizando JavaScript puro, implementando toda la lógica de interacción, la manipulación dinámica del DOM, la validación de formularios y llamadas WebAPI con un servidor para guardar y recuperar las imágenes en la galería.

🛠️ Tecnologías Utilizadas

- HTML5: Uso de < template >
- CSS3: Flexbox, Grid, diseño responsivo y animaciones (proporcionado inicialmente).
- JavaScript (ES6+):
  - Manipulación del DOM (querySelector, addEventListener).
  - Creación dinámica de elementos.
  - Manejo de arrays y objetos (forEach).
  - Eventos del navegador (submit, click, keydown).
  - Programación orientada en objetos.
  - Promesas.
  - Llamadas a interfases WebAPI.

🚀 Funcionalidades Implementadas Sprint 12

La galería evoluciona de un sistema estático a una aplicación conectada a un servidor. Se integraron llamas WebAPI para obtener y almacenar la información de las imágenes en la plataforma de TripleTen, permitiendo que los cambios realizados se conserven entre sesiones. Con esta implementación, la galería ahora maneja datos persistentes y sincronizados, mejorando significativamente la experiencia de uso y acercando el proyecto a un entorno de producción real.

🚀 Funcionalidades Implementadas Sprint 11

Este sprint fue especialmente desafiante. Se continuó la refactorización del proyecto aplicando conceptos avanzados de programación orientada a objetos, como herencia y polimorfismo, para mejorar la organización del código. Se crearon las clases Section, Popup, PopupWithForm, PopupWithImage y UserInfo, construyendo una arquitectura más modular en capas y un bajo acoplamiento entre componentes mediante callbacks.

Espero que los siguientes sprints sean igual de divertidos y desafiantes.

🚀 Funcionalidades Implementadas Sprint 10

Este sprint se centra en la programación orientada a objetos mediante la sentencia class y en la programación modular utilizando las sentencias import y export.

El proyecto fue actualizado y refactorizado para implementar los objetos Card y FormValidator. Además, el código dejó de concentrarse en un único archivo (index.js) y se reorganizó en módulos independientes, creando los archivos Card.js, FormValidator.js y Utils.js. Con esta estructura se logró una arquitectura más modular, organizada y fácil de mantener.

🚀 Funcionalidades Implementadas Sprint 9

- Validación en tiempo real de los campos en los formularios:
- El botón de "Guardar" se desactiva/activa según la validez del formulario.
- Mensajes de error personalizados debajo de cada campo.
- Cierre de modales haciendo clic en la superposición (overlay).
- Cierre de modales presionando la tecla Esc.

🚀 Funcionalidades Implementadas Sprint 8

- Gestión Dinámica de Tarjetas:
  - Renderizado de tarjetas a partir de la información de un array JavaScript.
  - Agregar nuevas tarjetas mediante un formulario modal (ventana emergente).
  - Eliminar tarjetas existentes.
  - Dar "Me gusta" (toggle visual del corazón).
- Modales (Ventanas Emergentes):
  - Editar Perfil: Permite modificar el "Nombre" y "Acerca de mí" del usuario.
  - Agregar Tarjeta: Añadir nuevas imágenes a la galería.
  - Vista Previa: Abre la imagen en tamaño completo al hacer clic en una tarjeta.
