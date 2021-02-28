# Antes de empezar:

- Para reportar tu trabajo debes crear un repositorio GIT público.

- Crea tantos commits como consideres necesario. Parte de nuestra evaluación se basa en como afrontas los problemas y la única forma que tenemos de verlo es mediante commits. Esta parte puede ser más decisiva que la calidad de la entrega.
- En el comentario del commit especifica los cambios que has realizado, así como explicaciones o aportaciones que consideres importante comentar. Valoraremos especialmente que los commits estén bien documentados
- En caso de que surjan dudas intenta buscar alternativas y justifícalas en el mensaje de commit.

# Tasks.

1.  RE-Estructura el proyecto como mejor consideres.
    1.  Como mínimo se debe crear un modulo a parte para la autenticación y registro.
    2.  Implementa Interficies o clases para los tipos de datos que consideres.
2.  Implementa un sistema de login/registro que persista los datos correctamente.
    1.  Puedes utilizar:
        1. LocalStorage,
        2. Alguna api externa
        3. Implementar servicio propio con Nodejs.
3.  Implementa el patron de diseño redux para la gestion del listado de naves.
    1.  No es necesario implementar redux para todo el aplicativo, solo para la gestión de naves.
4.  Implementa la carga de multiples "páginas" en el apartado de ships.
    1.  Actualmente solo carga una página de la api.
    2.  Revisar la API para saber como consumir el resto de páginas. https://swapi.dev/
5.  Implementa test unitarios para el modulo de login/registro.
6.  Añade imágenes a las CARDS de naves: Puedes usar esta api 'https://starwars-visualguide.com/assets/img/starships/' + ID_DE NAVE --> https://starwars-visualguide.com/assets/img/starships/5.jpg
7.  Suponiendo que esta página tiene un numero elevado de usuarios simultáneos, implementa las mejoras que consideres oportunas para evitar la saturación del servidor.
    1.  Si alguna de las medidas no es de código, comentalas a continuación en este Readme.

# Getting Started

`npm i` for install
Run `npm run start` for a dev server.
Navigate to `http://localhost:4200/`.

# Notas del desarrollador:

# Backlog Inicial:

- Lista de errores encontrados

  1. [x] la contraseña ingresada es usada en el login request, el backend [https://reqres.in/] acepta cualquier contraseña pero solo acepta tanto como para ellogin como para el registro los siguientes mails: [george.bluth@reqres.in], [janet.weaver@reqres.in], [emma.wong@reqres.in], [eve.holt@reqres.in], [charles.morris@reqres.in], [tracey.ramos@reqres.in]
  2. [x] login no realiaza ningun llamado al servidor API para checkar el usario y constraseña
  3. [x] La sesion no persiste al recargar la App
  4. [x] El usuario puede acceder a cualquier pagina de la App sin haberse logueado
  5. [x] Mensajes de error (username is required) de input Username (login Form) es mostrado sin haber sido tocado ni modificado
  6. [x] Mensajes de error (password is required) de input Password (login Form) es mostrado sin haber sido tocado ni modificado
  7. [x] Mensajes de error (FirstName is required) de input FirstName (Rgister Form) es mostrado sin haber sido tocado ni modificado
  8. [x] Mensajes de error (LastName is required) de input LastName (Rgister Form) es mostrado sin haber sido tocado ni modificado
  9. [x] Mensajes de error (Username is required) de input Username (Rgister Form) es mostrado sin haber sido tocado ni modificado
  10. [x] Mensajes de error (email is required) de input email (Rgister Form) es mostrado sin haber sido tocado ni modificado
  11. [x] No hay un input field para ingresar el password del nuevo usuario
  12. [x] El registro del usuario no persiste al recargar la App
  13. [x] No se muestran la imagenes de las naves en la pagina de listado de naves
  14. [x] Paginacion no realiza carga de las subsequentes paginas de la API
  15. [ ] en el Menu -> Page One me dirige a una pagina vacia o sin implementar
  16. [ ] en el Menu -> Page Two me dirige a una pagina vacia o sin implementar

- Mejoras a realizar (propuesta por el desarrollador) en adicion a la lista de Tasks
  1. [ ] Creacion de componente Ship Card
  2. [ ] Creacion de componente Ship Card Details
  3. [ ] Eliminar componentes y codigo no utilizados o vacios o sin imnplementar
  4. [x] Implementacion de Guards para bloquear acceso a usuarios no logueados
  5. [x] Implementacion de Interceptor para cachear las calls a la API y asi reducir las llamdas repetidas a la API
  6. [ ] Restilizar la App con colores, fuentes y estilos teniendo en cuanta el publico objetivo (fans de StarWars/Ciencia Ficcion/Retro)
