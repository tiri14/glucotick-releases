# GlucoTick

**Glucosa en la barra de tareas de Windows, mediante LibreLinkUp.**

Última versión: [**GlucoTick 0.8.9**](https://github.com/tiri14/glucotick-releases/releases/tag/v0.8.9).

GlucoTick es un visor de glucosa para Windows pensado para acompañar el seguimiento diario de personas con diabetes que utilizan **FreeStyle Libre de Abbott**, con un sistema y una app compatibles con **LibreLinkUp**. Muestra las lecturas compartidas junto al reloj del PC. También pueden usarlo familiares o cuidadores autorizados para ver las lecturas de una persona.

**[Descubre GlucoTick y sus capturas](https://tiri14.github.io/glucotick-releases/)** · **[Descargar la última versión para Windows](https://github.com/tiri14/glucotick-releases/releases/latest)**

<img src="docs/assets/panel-dark.png" width="420" alt="Panel real de GlucoTick con datos ficticios de ejemplo">

[Ver capturas reales en Windows: reloj integrado, número grande, bandeja y logo](https://tiri14.github.io/glucotick-releases/#en-windows). Capturadas en Sandbox con lecturas ficticias.

## Guías de Windows

- [LibreLinkUp en Windows: instalación y primera lectura](https://tiri14.github.io/glucotick-releases/librelinkup-windows.html)
- [Glucosa en la barra de tareas: bandeja, número grande y reloj](https://tiri14.github.io/glucotick-releases/glucosa-barra-tareas-windows.html)
- [Ayuda con cuenta, lecturas y reloj](https://tiri14.github.io/glucotick-releases/ayuda.html)
- [Demostración con datos ficticios](https://tiri14.github.io/glucotick-releases/demo.html)
- [English website and guides](https://tiri14.github.io/glucotick-releases/en/): the Windows app is currently in Spanish.

## ¿Cómo llegan las lecturas al PC?

**Sensor FreeStyle Libre → app compatible de FreeStyle Libre en el móvil → LibreLinkUp → GlucoTick en Windows.**

- La app oficial del móvil recibe las lecturas del sensor y permite compartirlas con una cuenta de LibreLinkUp. [Abbott explica la conexión remota](https://pro.freestyle.abbott/es-es/bienvenida/sistema-freestyle-libre/digital-health-solutions/libreview/conexion-remota.html).
- LibreLinkUp recibe las lecturas compartidas después de aceptar una invitación. Es distinta de la app que utilizas con el sensor. [Guía oficial de conexión](https://www.librelinkup.com/articles/getting-started).
- GlucoTick consulta la cuenta de LibreLinkUp con permiso para ver esas lecturas. No se conecta directamente al sensor por Bluetooth o USB. El móvil que envía los datos y el PC necesitan Internet; el PC no necesita estar junto al sensor.

**Antes de instalar:** comprueba que la lectura ya aparece en la app oficial LibreLinkUp. La compatibilidad depende del sistema, app, móvil y región; tener un sensor FreeStyle Libre no garantiza por sí solo que los datos estén disponibles en LibreLinkUp. Consulta la [información oficial de LibreLinkUp](https://www.librelinkup.com/). GlucoTick no promete compatibilidad con todos los sensores ni con otras marcas.

## Elige dónde ver la glucosa

- **Bandeja de Windows:** muestra el valor o el icono de GlucoTick. El menú del botón derecho da acceso a vistas, ajustes y actualizaciones.
- **Número grande:** lectura con fondo transparente en la barra de tareas; ajusta ancho, posición y monitor.
- **Reloj de Windows 11:** integración opcional con Windhawk, guiada por un asistente. Las otras vistas funcionan sin Windhawk y puedes combinarlas.
- **Panel de glucosa:** valor, tendencia, hora, antigüedad, conexión y gráfica de las últimas tres horas recibidas en la sesión actual.

## Instala y conecta

1. Abre la [última publicación](https://github.com/tiri14/glucotick-releases/releases/latest) y descarga **GlucoTick-Setup-VERSIÓN.exe**. Ejecútalo y sigue el asistente. No necesitas extraer el ZIP; los archivos automáticos «Source code» no son instaladores.
2. En la app de FreeStyle Libre del móvil, busca **Compartir / Aplicaciones conectadas → LibreLinkUp → Añadir conexión**. El nombre del menú puede variar según la app y la región. Envía la invitación al correo de la cuenta que recibirá las lecturas.
3. En la app oficial **LibreLinkUp**, crea o inicia sesión en la cuenta receptora, verifica el correo, acepta las condiciones y la invitación. Comprueba que ves la persona y su lectura.
4. En GlucoTick, abre **Ajustes → Cuenta**, introduce el correo y contraseña de esa cuenta de **LibreLinkUp**, pulsa **Conectar y comprobar cuenta**, selecciona la persona y guarda los ajustes. No basta con disponer de una cuenta del sensor si no tiene acceso a las lecturas compartidas.
5. Elige tus vistas en **Visualización**. Puedes configurar el reloj más adelante.

**Requisitos:** Windows 10 versión 2004 o posterior, o Windows 11; PC x64; .NET Framework 4.8; Internet; cuenta de LibreLinkUp con acceso a las lecturas. La integración con Windhawk requiere Windows 11 x64: primera preparación de hasta 313 MiB, 4 GB libres y posible permiso de administrador.

Los instaladores actuales no tienen firma de editor de confianza de Windows. Descarga desde las publicaciones de este repositorio. Los archivos `.sha256` permiten comprobar la integridad del paquete; no sustituyen una firma del editor.

## Personaliza la aplicación

- Tema claro, oscuro o de Windows; unidades mg/dL o mmol/L; inicio con Windows.
- Cuatro límites de color comunes al panel, bandeja, número grande y reloj.
- Avisos opcionales de glucosa baja/alta y falta de lecturas recientes, con límites independientes de los colores.
- Oculta el nombre o activa el **modo privado** para ocultar temporalmente las lecturas y la gráfica en todas las vistas y suspender los avisos de glucosa.
- Reparación y desactivación de la integración del reloj desde su asistente. Las versiones de Windhawk no validadas se conservan, sin rebajarlas automáticamente.

## Datos recientes y actualizaciones

Los minutos cuentan desde la hora de la medición y siguen aumentando aunque no lleguen datos nuevos. Después de **más de cinco minutos**, todos los indicadores de glucosa se vuelven **grises**, conservando el último valor y su antigüedad. Revisa el móvil y LibreLinkUp si ocurre.

Comprueba automáticamente nuevas versiones cada 2 horas, con hasta 5 minutos de margen, y al abrir el panel o Actualizaciones. Tú decides cuándo instalarlas.

Una nueva versión se muestra en el panel, el menú de bandeja y, si Windows lo permite, mediante una notificación. En **Ver novedades y descargar** decides cuándo instalar. Puedes ver tamaño, progreso y velocidad; la actualización verifica el paquete y conserva tu cuenta y tus preferencias. Guarda antes los ajustes pendientes.

Cerrar la ventana deja GlucoTick en la bandeja. Para cerrar la aplicación, elige **Salir** en el menú del icono. Desinstalar desde Windows permite conservar o borrar tus datos locales.

## Privacidad, ayuda y versiones

El acceso se guarda cifrado para tu usuario de Windows. Las lecturas y la gráfica permanecen en memoria durante la sesión. La aplicación conecta con LibreLinkUp para consultar y con GitHub para actualizar; no incluye telemetría propia ni envía diagnósticos automáticamente.

- [Guía, capturas y preguntas frecuentes](https://tiri14.github.io/glucotick-releases/)
- [Información de privacidad](https://tiri14.github.io/glucotick-releases/privacidad.html)
- [Todas las versiones y sus novedades](https://github.com/tiri14/glucotick-releases/releases)
- [Comunicar un problema](https://github.com/tiri14/glucotick-releases/issues): indica versión y Windows; evita datos personales, lecturas, credenciales y registros sin revisar.

GlucoTick es un **visor complementario independiente: no es una aplicación oficial de Abbott**. No sustituye al sistema FreeStyle Libre, a sus alarmas ni a las indicaciones de tu equipo sanitario. No calcula dosis de insulina. Consulta tu dispositivo o app principal para las decisiones de tratamiento; las lecturas compartidas pueden llegar con retraso y los avisos de Windows pueden silenciarse. La propia [información de uso de LibreLinkUp](https://www.librelinkup.com/) señala que no es un monitor principal de glucosa. FreeStyle, Libre y sus marcas relacionadas pertenecen a Abbott.

Este repositorio contiene descargas públicas, documentación y la web. El código C# principal permanece privado. Las capturas muestran datos ficticios.
