## Arquitectura

La arquitectura se basa en un contexto que engloba las variables que se deben conservar entre las páginas. 
Por ejemplo, los autores, los autores favoritos, el autor seleccionado para la edición, etc. Todo esto se engloba
en un contexto que usan los componentes de tarjeta de autor, listado de usuarios e incluso el formulario de edición de
usuario.

Hay tres principales páginas, la página principal(Bienvenida), autores, autores favoritos y creación de un autor.
La página principal no tiene nada de interesante. La página de autores saca del contexto de autores la lista de los autores
y hace una grilla de tarjeta de autores, esto mismo sucede en la página de autores favoritos, pero él hace un filtrado para 
que los ids de favoritos concuerden con la lista de todos los autores(sé que hubiera sido mejor que autores favoritos
fuera una lista de autores, pero fue lo que hice en el examen). Luego tanto el botón update como en la página de crear un 
se hace uso de un formulario que recibe como propts los datos iniciales del autor, en caso de que sea edición recibe
los parametros del autor a editar, en caso de que no, recibe un autor vacío. El formulario hace uso del contexto para 
editar  la información de los autores y actualizar el listado de autores.

## Accesibilidad

Aunque no se implementó accesibilidad de forma completa(en los botones). Si se posibilita al usuario de ir variando 
por las opciones con el tab, esto se hizo con las mismas funciones que ofrece React al declarar correctamente las partes de
la página. También hay feedback al usuario cuando comete un error en el formulario y este sale del campo a editar dejandolo
vacío, esto se hizo por medio de las funciones onBlur(), setTouched() y setErrors() además de estados. Por cada campo se hace 
la verificación de que cuando deje de estar blurreado, se actualice un texto debajo para permitirle al usuario saber en qué campo
tuvo errores o no mostrarle nada si no tuvo ninguno.

## Ejecución 

Para ejecutar la aplicación basta con el comando por defecto: 

`npm run dev
`


