import { Component } from '@angular/core';
import { PulsadoresComponent } from '../pulsadores/pulsadores.component';
import { ContentBoxesComponent } from '../content-boxes/content-boxes.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SlantComponent } from '../../slant/slant.component';
import { HomeGaleryComponent } from '../home-galery/home-galery.component';
import { MatIconModule } from '@angular/material/icon';
import { ReviewsComponent } from '../../reviews/reviews.component';
import { Review } from '../../../interfaces/review';
import { RouterLink } from '@angular/router';
import { NivelesComponent } from '../../niveles/niveles.component';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Componente principal de la página de inicio que agrupa múltiples secciones y componentes
 * como el carrusel, los niveles, y las reseñas de los estudiantes.
 *
 * @export
 * @class HomeMainComponent
 * @typedef {HomeMainComponent}
 */
@Component({
  selector: 'app-home-main',
  standalone: true,
  templateUrl: './home-main.component.html',
  styleUrl: './home-main.component.scss',
  imports: [
    PulsadoresComponent,
    ContentBoxesComponent,
    MatCardModule,
    MatButtonModule,
    SlantComponent,
    HomeGaleryComponent,
    MatIconModule,
    ReviewsComponent,
    RouterLink,
    NivelesComponent,
    MatMenuModule,
  ],
})
export class HomeMainComponent {
  /**
   * textos motivacionales del componente Slant.
   *
   * @type {string}
   */
  text1Slant1: string = '¡ APRENDE A BAILAR !';
  text2Slant1: string = 'HAZ NUEVOS AMIGOS Y DIVIÉRTETE';
  text1Slant2: string = 'VEN CON UN AMIGO/A';
  text2Slant2: string = 'LOS DOS OBTENDRÉIS UN 50% DE DESUENTO';

  /**
   * Color de fondo para el componente Niveles.
   *
   * @type {string}
   */
  nivelesBackgroundColor: string = 'black';

  /**
   * Color del título en el componente Niveles.
   *
   * @type {string}
   */
  nivelesTitleColor: string = 'white';

  /**
   * Ruta de la imagen del ícono en el componente Niveles.
   *
   * @type {string}
   */
  iconNivelesSrc: string = 'assets/img/kizomba.png';

  /**
   * Array de reseñas que los estudiantes han dejado sobre las clases.
   * Cada reseña incluye imagen, alt text, contenido del texto y nombre del estudiante.
   * @type {Array<Review>}
   */
  reviewsArray: Array<Review> = [
    {
      imgSrc: 'assets/img/review-bruna.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Experiencia maravillosa. Sara es muy simpática, divertida y tiene buena didáctica. Los compañeros de clases son agradables y abiertos. Me lo estoy pasando genial y haciendo nuevas amistades. ¡Super recomiendo!',
      nombre: 'Bruna Andrade',
    },
    {
      imgSrc: 'assets/img/review-cristopher.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text:
        'Excelente profesora que se acerca a las dos décadas de experiencia y eso se palpa en el día a día.' +
        'Enseña de forma ágil y sencilla, hace fácil lo difícil. Se adapta a cada uno de sus alumnos y constantemente está testeandolos para ver su progreso y donde fallan para indicarles donde deben mejorar.' +
        'Entiende que cuando alguien se inicia en el baile lo primero que suele sentir es vergüenza, ella destruye la tensión e incomodidad con comentarios humorísticos, irónicos o satíricos durante la práctica.' +
        'Ha creado una comunidad activa, sana y abierta donde todo el mundo es bienvenido. Hay gente de todas las edades, culturas y niveles. Los las veteranos cuidan de los novatos y les ayudan a progresar, incluso entran en las clases de principiantes para que los principiantes practiquen con gente más avanzada.' +
        'Mucho cuidado, corres el peligro de que te guste y nunca más lo dejes.',
      nombre: 'Cristopher Cava',
    },
    {
      imgSrc: 'assets/img/review-desy.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Para mi?... bailar es sentir, bailar es vivir, bailando renací y me encontré a mi misma. Bailar me enamora y me enamoro bailando. ¿Hay algo mejor?',
      nombre: 'Desy Amor',
    },
    {
      imgSrc: 'assets/img/review-fons.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Sara es especial en el mundo del baile latino. ¡Ella no solo te aprende los pasos, sino que también te enseña a bailar! y cada mes una nueva coreografía. Muy recomendable para giris ya que también habla inglés. en un ambiente agradable aprendiendo a bailar mientras te diviertes.',
      nombre: 'Fons Houtkamp',
    },
    {
      imgSrc: 'assets/img/review-inma.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Tiene muy buenos horarios, como madre es genial poder despejarme un ratito por las mañanas. Además el ambiente es estupendo con los compañeros! Es una profesora de 10!!',
      nombre: 'Inmaculada Camarena',
    },
    {
      imgSrc: 'assets/img/review-juanfran.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text:
        'Llevo poco más de un año bailando con Sara, empecé con un nivel iniciación y desde el primer día me sentí cómodo en las clases, te enseña paso a paso, adaptándose a tu nivel, haciendo las clases muy divertidas y amenas.' +
        'Sara es fabulosa, su forma de ser te hace que te alegre el día, siempre con una sonrisa y bromeando. En definitiva, una excelente persona y profesional, se nota que disfruta enseñando, haciendo que el ambiente sea insuperable!!!',
      nombre: 'Juanfran Moreno',
    },
    {
      imgSrc: 'assets/img/review-lazaro.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text:
        'Pedazo profesora, en 4 meses he aprendido pasos de baile y figuras que crei que no aprendería tan rápido, con Sara cómo profesora, todo es más fácil y además creando un ambiente inscreible entre alumnos. Para mí ha sido todo un descubrimiento, tanto la academia como este nuevo mundo.' +
        'Gracias Sara ',
      nombre: 'Lázaro Rivera',
    },
    {
      imgSrc: 'assets/img/review-lucia.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Clases dinámicas y divertidas. Muy paciente con todos los alumnos. Facilidad para combinar horarios entre mañanas o tardes, pudiendo elegir cada semana las clases que más te convengan. 100% recomendada.',
      nombre: 'Lucía Oleá',
    },
    {
      imgSrc: 'assets/img/review-mahi.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text:
        'La clase es GENIAL… Sara más allá de su baile que es tremendo, es pura musicalidad e inspiración… simplemente única y autentica.' +
        'Es una profe que saca lo mejor de sus alumnos.' +
        ' El ambiente es divertido y amistoso.',
      nombre: 'Mahi Rosé',
    },
    {
      imgSrc: 'assets/img/review-manolo.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text:
        'Lo que más me gusta es que es el lugar, el hueco sin problemas ni preocupaciones, sin planes ni obligaciones rígidas como las que tenemos a diario…' +
        ' En esta academia no solo aprendes a bailar con una profesora profesional, aquí desde el principio conoces gente maravillosa y te encuentras en un ambientazo de grupo y amistad. Conectas contigo y con los demás…',
      nombre: 'Manuel Martínez',
    },
    {
      imgSrc: 'assets/img/review-manuel.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Aparte de buena profesora y hay muy buen ambiente en las clases.Lo mejor la flexibilidad con el horario que puedo ir si estoy trabajando tanto de mañana como de tarde.',
      nombre: 'Manuel Monte',
    },
    {
      imgSrc: 'assets/img/review-marcela.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Las clases de Sara me devolvieron la alegría de vivir. Su forma de enseñar, ver los progresos cada semana, el buen ambiente, las risas, quedar los fines de semana para poner en práctica lo aprendido. Sara es única ❤️ ',
      nombre: 'Marcela Alzerreca',
    },
    {
      imgSrc: 'assets/img/review-marta.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text:
        'Empecé en clases con Sara a principios de año, y desde el primer día me he sentido muy cómoda tanto con ella como con el clima que crea en las clases. Se aprende muy bien porque te motiva y te ayuda las veces que sean necesarias. Es divertida, risueña y muy profesional.' +
        ' El método que usa permite que las personas puedan acceder a un nivel correspondiente a lo que saben y no se sientan pérdidas en los comienzos.' +
        ' Da facilidades para que puedas adaptar tus horarios a los de las clases, lo cual se agradece mucho.' +
        ' Os recomiendo que probéis con ella, pues una clase es suficiente para saber que es la mejor decisión ! ',
      nombre: 'Marta Rosado',
    },
    {
      imgSrc: 'assets/img/review-nany.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Sin duda alguna mi recomendación es del 100%, llevo bailando con Sara aprox. 3 años en bachata, salsa y kizomba y es una profesora EXCELENTE en todos los sentidos, resaltando su paciencia, dedicación, compromiso y no puede faltar su inigualable sentido del humor que hace tan alegre y amenda la tarde que no dudas ni un segundo en no asistir a sus clases.',
      nombre: 'Oscarina Silva',
    },
    {
      imgSrc: 'assets/img/review-nathalie.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Sara es una excelente profesora, da las clases con profesionalidad y entusiasmo, también organiza eventos/encuentros para que sus alumnos se sientan como parte de un gran familia, compartiendo amistad, baile y alegría. ¡Recomendada al 100%! ',
      nombre: 'Nathalie Lorente',
    },
    {
      imgSrc: 'assets/img/review-paola.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Me apunté a clases de baile porque me había mudado a Málaga y quería hacer algo divertido, que me hiciera moverme y me ayudara a conocer gente alegre. Siempre me ha encantado bailar, pero no tenía ninguna formación. Y pensé que la salsa era precisamente lo que necesitaba.. ¡Y TANTO! Pero no por el baile, que también, sino porque gracias a Sara y a su calidad humana, a la excelente profesional que es y sobre todo mejor persona, ha hecho del baile mi mejor terapia. He encontrado gente hermosa con la que compartir risas, cenas, alguna cervecita y muchos momentos que hacen que Málaga se haya convertido en mi hogar. Y soy más feliz.',
      nombre: 'Paola Álvarez',
    },
    {
      imgSrc: 'assets/img/review-sharon.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text: 'Aprender Salsa, Bachata y Kisomba con Sara es una de las mejores cosas que he hecho en España. Sara es una profesora fantástica y una hermosa persona. Sus clases están llenas de diversión con un ambiente amigable. Ven y únete a la familia, no te arrepentirás.',
      nombre: 'Sharon Waller',
    },
    {
      imgSrc: 'assets/img/review-vicky.png',
      imgAlt: 'Clases de salsa en Torremolinos',
      text:
        'Me gustaría compartir mi gran experiencia. Sara es una profesora absolutamente fantástica. Ella crea un gran ambiente, con mucha diversión, amor y atención para todos en la clase. Tengo mucha suerte de tener la gran oportunidad de realizar este viaje con Sara. Empecé desde el nivel cero y.... ¡¡¡Puedo bailar!!!! Sara hizo la magia. Nadie más podría hacerlo.' +
        ' Gracias Sara por tu paciencia, me haces feliz.',
      nombre: 'Vicky Gorb',
    },
  ];
}
