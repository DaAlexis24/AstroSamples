# Apuntes sobre Astro

## Martes 07/01/2025

### GoT work

Para importar un JSON en un archivo JS, se tiene que utilizar la siguiente ruta:

`import DATA from 'ubicacionfichero.json' with {type: 'json}`

En `index.js` voy a recibir ese JSON

Para recorrer el archivo JSON (ya que, al ser una fuente de datos, se tiene que tomar como un array), tenemos que utilizar la siguiente sentencia:

```JS
DATA.forEach((character) => {
  createCharacter('ul', 'afterbegin', character);
})
```

### Render Models

Hay que entender DONDE se están produciendo las cosas y los distintos modos PARA poderlas realizar

1. Creación manual en el servidor
2. SSG (Static Site Generation): El sitio se genera en el servidor en TIEMPO de compilación (ahead of time), esto es poco flexible a la hora de querer crear una web dinámica. Es muy rápido a la hora de devolver un valor, ya que todo esta construido.
3. SSR (Server Side Rendering): Subo al servidor un programa JS, y cuando el usuario realiza la petición EN EL SERVIDOR, se genera un HTML (render) que cumpla los requerimientos de esa petición(just in time).
4. CSR (Client Side Rendering): Se genera el HTML en el cliente en tiempo de ejecución (just in time). La desventaja es que el cliente trabaja más y descargar muchos archivos JS, también es que si soy un _indexador_ (Google por ejemplo) no reconoce los cambios realizados en su código fuente, aunque los enseñe

No hay modelo bueno, cada uno tiene sus ventajas y desventajas, todo depende del proyecto que deseas realizar. Por ejemplo, en una aplicación de banco es buena idea utilizar CSR, pero no para una landing page.

#### Framework Astro

Aparece como una **solución** para webs con _mucho contenido_ pero _poco dinamismo_, esto es para poder optimizar el tiempo de respuesta en el servidor. Un blog, landing pages son ejemplos perfecto para poder utilizar astro. Una página operativa no lo es.

Para poder iniciar un proyecto nuevo, solo tenemos que ir a la web de [astro](https://astro.build/ "Astro")

Los framework son una serie de estructura de trabajo, para poder estructurar tu proyecto según las normas del framework seleccionado.

La estructura de los proyectos es el **_scaffolding_**

Public, ahi se coloca lo que queremos que se suba de manera directa, es transparente.

Scripts:

dev: El index se construye en tiempo de compilación, para ello se tiene que ejecutar en consola `npmp run dev` para poder enseñar la web en modo de desarrollo.

build: Crea la build de la aplicación, y esto lo guarda en una carpeta oculta llamada dist, donde se guardará la web que querremos subir a producción.

preview: Nos enseña la web que creamos con el build

Todo archivo que coloques en la carpeta "pages" se enrutara automáticamente.

Astro favorece el uso de COMPONENTES, por ello es tan popular y cómodo de utilizar.

Todo lo que se coloca en el _template_ de Astro, soporta HTML y CSS

```js
---
// Front matter: Son los metadatos que se pueden agregar a un archivo Markdown o MDX. En este caso, se está utilizando para definir el título de la página.
// Aquí va el JS/TS
const title = 'Hello GoT'
console.log(title);
---

<h1>{title}</h1>

<style>
    h1 {
        color: #187559e0;
    }
</style>
```

Cuando creas un componente siempre será una _función_ que construye **objetos** que están pensadas en ser utilizadas **declarativamente**

Se importan de la siguiente manera:

```js
import Footer from "../components/footer.astro";
```

Y se utiliza en el template de la siguiente forma:

```js
<Footer />
```

Si queremos crear un componente que reciba cosas, podemos generar un Front Matter con las constantes que queramos utilizar

```js
const props = Astro.props

<footer>
  Soy el footer de {props.owner}
</footer>
```

Y en la _page_ vamos a colocar ese _owner_

```js
<Footer owner="Pepe" />
```

Ahora, es recomendable **desestructurar** estas **_Props_**, y nuestro código del componente _footer_ cambiará de la siguiente manera:

```js
---
// Props
// Definir el tipado (TS)
type Props = {
    owner: string
}
const {owner} = Astro.props
---

<footer>
    Soy el footer de {owner}
</footer>
```

##### Layouts

Son la carpeta donde generaremos los metadatos de las _pages_ que vamos a utilizar.

A la hora de referenciar un favicon, si ese esta en public, solo debemos colocar el nombre del archivo.

Ahora, esto en concepto es como un envolvente, que utilizará un **slot** para colocar la información de la _page_ que se ha creado.

Esta interacción se realiza de la siguiente manera:

- Layout (layoutGoT.astro)

  ```js

  ```

## Miércoles 08/01/2025

Es recomendable coger **solo** los datos que se requieren dentro de la etiqueta, es decir, en vez de pasar esto: `<My_Label label = {label} />`, lo recomendable es realizar lo siguiente:

```js
<My_Label first={label.first} second={label.second} />
```

Con respecto a la construcción de **componentes**, tenemos que tomar en cuenta las siguientes _directrices_:

- Astro favorece la construcción de webs con SSR, mediante la **ejecución** de componentes construidos en una page, y está será envuelta en un Layout final.
- Los componentes deben de ser lo más pequeños posibles, para una fácil comprensión.
- Los componentes deben de tener una lógica para su creación, por ejemplo; si nos enfocamos en una parte trasera de una _card_ quizás pensemos en construir un componente nuevo, pero lo mejor es dejarlo con la _card_, en cambio, un bloque de botones si se puede convertir en un componente distinto, una lista de estilos también. Añadiendo, si un bloque de HTML **requiere** de una codificación para que pueda funcionar, también se convierte en un candidato para ser un componente.

> [!IMPORTANT]
>
> Todo componente debe de tener un **type Props = {}** dentro de su Front Matter, aunque hay una excepción si solo vamos a utilizar lenguaje de marcado HTML y CSS.

Componente "emoji":
Se usa la etiqueta `<i />` por convenio, ya que se entiende por "icono" para la gente de FontAwesome, esto es para colocar _iconos_, _emojis_ o cualquier elemento que se salga del **texto** _convencional_

Astro también soporta código especializado para construir SVG, en la carpeta [icons](./src/icons/ "icons folder") vemos archivos donde lo utilizamos. La ventaja de ello es es los podemos utilizar como si fueran un **componente** más.

Ahora, los SVG tienen que tener si o si el ViewBox, ya que es el espacio donde se soporta la imagen.

Teniendo estos componentes, podemos otorgarle las propiedades que queramos, como puede ser el height, width, fill (con su correspondiente palabra reservada _currentColor_).

La particularidad de esto, es que podemos preferir trabajar con los SVG normal, así que Astro esta probando el uso de SVG mediante la importación en formato de etiqueta. Para probar esto tenemos que dirigirnos al archivo de [configuración](/astro.config.mjs "astro.config.mjs") y escribimos lo siguiente:

```js
    experimental: {
    svg: true,
  },
```

### Control de imágenes

Es importante tener un control sobre el tamaño de las imágenes, ya que esto nos puede dar errores de _Performance_ en _Lighthouse_

Astro nos puede ayudar, por ello **sí o sí** las imágenes tienen que estar en la carpeta **_assets_**

### Funcionalidad

En este caso, queremos que estos elementos dinámicos se ejecuten en el lado del cliente, entonces, en vez de colocar la configuración en el Front Matter del componente elegido, lo haremos utilizando la etiqueta `<script>`
