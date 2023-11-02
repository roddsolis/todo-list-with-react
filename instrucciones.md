📝 Instrucciones:
Haz que tu TODO List se sincronice con la API de backend cada vez que se agregue o elimine una tarea.
Agregue un botón de limpieza de todas las tareas que eliminará toda la lista del servidor y actualizará la lista vacía en el front-end.
Hay 3 momentos críticos en la línea de tiempo de la aplicación (denominado tiempo de ejecución) para centrarse en su integración:

Después de que la lista se carga vacía por primera vez (componentDidMount): debes obtener (GET) los datos de la API y actualizar las tareas cuando la información finalmente llegue.
Cuando se agrega una nueva tarea: debes PONER (PUT) la nueva lista en el servidor.
Cuando se elimina una tarea: Debes PONER (PUT) la nueva lista en el servidor.