# Tripleten web_project_around_es

📌 Descripción del proyecto

"Alrededor de los EE. UU." es una página web interactiva que funciona como una galería de imágenes,  donde los usuarios pueden agregar fotos, eliminarlas y darles me gusta.

Este proyecto representa la culminación de los sprints 8 y 9 de un curso de desarrollo Fullstack. Partiendo de un layout estático (HTML/CSS) provisto por un desarrollador frontend, me encargué de "dar vida" a la página utilizando JavaScript puro, implementando toda la lógica de interacción, la manipulación dinámica del DOM y la validación de formularios.

Nota: Actualmente el proyecto funciona solo en el lado del cliente (frontend). Los datos se reinician al recargar la página.

🚀 Funcionalidades Implementadas (Sprint 10)

Este sprint se centra en la programación orientada a objetos mediante la sentencia class y en la programación modular utilizando las sentencias import y export.

El proyecto fue actualizado y refactorizado para implementar los objetos Card y FormValidator. Además, el código dejó de concentrarse en un único archivo (index.js) y se reorganizó en módulos independientes, creando los archivos Card.js, FormValidator.js y Utils.js. Con esta estructura se logró una arquitectura más modular, organizada y fácil de mantener.


🚀 Funcionalidades Implementadas (Sprint 9)

* Validación en tiempo real de los campos en los formularios:
* El botón de "Guardar" se desactiva/activa según la validez del formulario.
* Mensajes de error personalizados debajo de cada campo.
* Cierre de modales haciendo clic en la superposición (overlay).
* Cierre de modales presionando la tecla Esc.


🚀 Funcionalidades Implementadas (Sprint 8)

* Gestión Dinámica de Tarjetas:
	- Renderizado de tarjetas a partir de la información de un array JavaScript.
	- Agregar nuevas tarjetas mediante un formulario modal (ventana emergente).
	- Eliminar tarjetas existentes.
	- Dar "Me gusta" (toggle visual del corazón).
* Modales (Ventanas Emergentes):

	- Editar Perfil: Permite modificar el "Nombre" y "Acerca de mí" del usuario.
	- Agregar Tarjeta: Añadir nuevas imágenes a la galería.
	- Vista Previa: Abre la imagen en tamaño completo al hacer clic en una tarjeta.


🛠️ Tecnologías Utilizadas

* HTML5: Uso de < template >
* CSS3: Flexbox, Grid, diseño responsivo y animaciones (proporcionado inicialmente).
* JavaScript (ES6+):
	- Manipulación del DOM (querySelector, addEventListener).
	- Creación dinámica de elementos.
	- Manejo de arrays y objetos (forEach).
	- Eventos del navegador (submit, click, keydown).
