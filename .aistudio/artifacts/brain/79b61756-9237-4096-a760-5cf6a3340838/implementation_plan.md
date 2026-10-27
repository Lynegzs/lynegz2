# XR Hand Lab Edu – Tecnología e Informática: El Computador por Dentro y por Fuera

Laboratorio educativo de Realidad Aumentada y visualización 3D interactiva controlado con gestos de las manos (y respaldo completo de ratón/táctil), dedicado exclusivamente al área de **Tecnología e Informática** para explorar, desarmar, ensamblar y diagnosticar **el computador por dentro y por fuera** en todos los grados escolares (1.° a 11.°).

## Revisión del Usuario y Decisiones Clave

> [!IMPORTANT]
> **Envía o pega tu archivo HTML de referencia ahora:** Al responder el cuestionario anterior indicaste que adjuntarías o pegarías tu HTML en el siguiente mensaje. **Adjunta el archivo `.html` o pega su código directamente en el chat** para analizar sus componentes útiles, fusionarlos en este plan (o integrarlos directamente al ejecutar) sin perder ninguna funcionalidad.

- **Enfoque Curricular Confirmado**: Se eliminan por completo las demás asignaturas (Matemáticas, Ciencias Naturales, Sociales, Humanidades, Artes, Educación Física, Ética y Filosofía). Toda la plataforma se especializa en **Tecnología e Informática: El Computador por Dentro y por Fuera Completo**.
- **Organización de la Biblioteca Confirmada**: El panel izquierdo filtrará las experiencias por **Subtema Tecnológico** (Arquitectura Interna, Procesamiento y Memorias, Almacenamiento y Energía, Periféricos Externos E/S, Puertos y Conectividad, Portátil vs. Escritorio) y por **Grado Escolar (1.° a 11.°)**, además del cargador de modelos `.GLB/.GLTF` propios (locales o por URL HTTPS).
- **Integración de Componentes del HTML del Usuario**: Lista para absorber visores, controles, fichas, efectos, paneles o modelos presentes en el HTML que compartas, combinados con el motor de seguimiento de manos y síntesis de audio WebAudio.

---

## 1. Visión General y Concepto Central

- **Qué Hace**: Superpone estaciones de cómputo 3D interactivas sobre el video en vivo de la cámara (o sobre un escenario espacial oscuro cuando no se usa cámara), permitiendo manipular piezas internas y periféricos externos con gestos naturales estilo *visionOS* (pellizcar, acercar/alejar con dos manos, rotar muñeca, extraer y encajar en zócalos magnéticos) o con ratón y pantalla táctil.
- **Público Objetivo**: Estudiantes y docentes de **Tecnología e Informática** de educación básica primaria, secundaria y media (1.° a 11.°), tanto en aulas dotadas de cámara web/tabletas como en equipos básicos sin cámara.
- **Valor Pedagógico**: Permite abrir un computador sin riesgo eléctrico ni deterioro físico de equipos reales, visualizar el viaje invisible de bits y voltajes, validar en qué ranura exacta encaja cada tarjeta y practicar diagnóstico lógico de fallas de hardware.

---

## 2. Experiencia de Usuario y Diseño Visual Espacial

- **Flujos Principales del Estudiante y Docente**:
  1. **Bienvenida e Indagación ("Tus manos, tu laboratorio")**: Presenta los roles *Observador, Conector y Crítico*, la pregunta detonadora y acceso directo al **Tutorial Interactivo de Gestos** o al visor XR.
  2. **Selección por Subtema Tecnológico y Grado**: Desde la columna izquierda se filtra la estación específica del computador (ej. *Estación Completa Torre + Periféricos*, *Placa Base, CPU y Ranuras*, *Jerarquía de Memorias RAM vs. SSD/HDD*, *Periféricos de Entrada, Salida y Mixtos*, *Puertos, Cables y Red*, *Arquitectura de Portátil Compacto*) o se arrastran modelos `.GLB` propios.
  3. **Manipulación Espacial y Desarme Guiado**: Al apuntar o tocar una pieza emerge su etiqueta holográfica (nombre, función técnica, analogía cotidiana, dato curioso y narración por voz). Con pellizco y arrastre se extraen módulos (CPU, RAM DDR, GPU PCIe, SSD/HDD, Fuente PSU, Tarjeta de Red, Batería CMOS) dejando visibles sus zócalos magnéticos luminosos; al devolverlos se valida la ranura correcta.
  4. **Modos Activos de Laboratorio**:
     - **Vista Explosionada y Capas**: Deslizador suave de separación 3D y selector de capas (*Solo exterior*, *Solo interior*, *Circuitos*, *Flujo de energía*, *Flujo de datos animado*).
     - **Reto "Armar el PC"**: Ensamblaje paso a paso cronometrado con puntaje y validación de zócalos.
     - **Modo "Diagnóstico de Fallas"**: Casos reales de soporte técnico donde una pieza falla y el estudiante debe deducirla y señalarla en el modelo 3D.
     - **Comparador Interactivo**: Visualizaciones dinámicas de *RAM vs. Disco*, *CPU vs. GPU* y *HDD vs. SSD*.
  5. **Mediación Didáctica y Copiloto sin API**: En el panel derecho se gestiona la misión *Mirar como investigador* (Observar → Señalar → Explicar → Transferir), descarga de ficha imprimible, fijación de **Puntos de Interés 3D** con atribución de licencias y el **Copiloto Pedagógico offline** (20, 35, 50 y 90 min).

- **Identidad Visual y Sistema Espacial**:
  - *Dirección Estética*: Interfaz espacial tipo *visionOS* con paneles translúcidos flotantes (`backdrop-filter: blur(20px)`), bordes luminosos sutiles y escenario central despejado ($>60\%$ del área visual libre sobre el objeto 3D).
  - *Paleta de Color*:
    - Fondo espacial principal: `#020B15` y azul profundo `#031426`
    - Acento primario tecnológico: `#00B7FF` (cursores, foco activo, flujo de datos)
    - Acento de confirmación e imán de zócalo: `#B6E800` (verde neón)
    - Acento energético y alertas de diagnóstico: `#FF7A1A` (naranja energético)
    - Texto principal `#F7FBFF` y secundario `#A9C4D7` (cumpliendo contraste WCAG AA y modo opcional de Alto Contraste).
  - *Tipografía y Disciplina de Metadatos*: Jerarquía limpia con `Plus Jakarta Sans` / `Inter` para interfaz y `JetBrains Mono` para telemetría técnica (FPS, confianza, voltajes, velocidades de bus). Metadatos estáticos mostrados como texto limpio separado por puntos medios (`·`) sin cápsulas decorativas saturadas.
  - *Retroalimentación y Accesibilidad*: Subtítulos en vivo de gestos y narración, sonidos sintetizados por Web Audio API (chasquido magnético de inserción, vibración grave de ranura errónea), navegación por teclado, objetivos táctiles $\ge 44\text{px}$ en móvil, modo *Manos Libres* y soporte `prefers-reduced-motion`.

---

## 3. Decisiones de Producto y Compensaciones Técnicas

- **Decisión 1: Especialización Profunda en Hardware y Arquitectura del Computador**
  - *Enfoque elegido*: Convertir el antiguo selector general de materias en un **Selector de Subtemas de Tecnología e Informática** con 6 experiencias especializadas del computador (desde periféricos básicos para primaria hasta buses PCIe/SATA, flujo de instrucción Von Neumann y diagnóstico de BIOS/CMOS para secundaria y media).
  - *Por qué*: Elimina ruido curricular ajeno y aprovecha todo el presupuesto visual y pedagógico en desglosar cada componente interno y externo del PC con mayor riqueza geométrica y didáctica.
- **Decisión 2: Aplicación Autocontenida Compatible con GitHub Pages y Entorno Local**
  - *Enfoque elegido*: Arquitectura limpia servida en el puerto `3000` y empaquetada de forma autocontenida en `index.html` con modelos 3D procedurales de respaldo en Three.js más cargador `GLTFLoader` para archivos `.GLB` locales/HTTPS.
  - *Por qué*: Garantiza funcionamiento inmediato sin claves API, sin backend y sin fallos si no hay modelos externos descargados, manteniendo privacidad 100% local del video de la cámara.
- **Decisión 3: Motor de Gestos con Filtro Suavizado y Respaldo Universal Ratón/Táctil**
  - *Enfoque elegido*: `GestureEngine` desacoplado con suavizado *One Euro Filter*, histéresis de pellizco y anti-rebote para los 11 gestos requeridos, sincronizado con `OrbitControls`, arrastre 3D por *raycasting* y botonera en pantalla.
  - *Por qué*: Asegura que ningún estudiante quede excluido si su equipo carece de cámara web, permisos o buena iluminación.

---

## 4. Arquitectura Técnica y Estrategia de Datos

### Diagrama de Arquitectura y Componentes

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                     XR HAND LAB EDU (100% En Navegador)                      │
├───────────────────────┬──────────────────────────────┬───────────────────────┤
│   ENTRADA MULTIMODAL  │     NÚCLEO CENTRAL ESTADO    │   SALIDA SENSORIAL    │
│ ┌───────────────────┐ │ ┌──────────────────────────┐ │ ┌───────────────────┐ │
│ │ Cámara getUserMed.│─┼─▶ GestureEngine            │ │ │ Escena Three.js   │ │
│ │ MediaPipe Hands   │ │ │ • Filtro One-Euro        │ │ │ • PC Torre/Laptop │ │
│ │ (1-2 manos, 21pt) │ │ │ • Histéresis + Debounce  │─┼─▶ • Zócalos Imán    │ │
│ └───────────────────┘ │ │ • 11 Eventos Espaciales  │ │ │ • Flujo Datos/En. │ │
│ ┌───────────────────┐ │ └────────────┬─────────────┘ │ │ • WebXR Hit-Test  │ │
│ │ Ratón / Táctil /  │─┼──────────────┤               │ └───────────────────┘ │
│ │ Teclado / Botones │ │              ▼               │ ┌───────────────────┐ │
│ └───────────────────┘ │ ┌──────────────────────────┐ │ │ Audio WebAudio +  │ │
│ ┌───────────────────┐ │ │ AppState (Tecnología)    │─┼─▶ Voz Web Speech +  │ │
│ │ Cargador GLB/GLTF │─┼─▶ • Subtema PC + Grado     │ │ │ Subtítulos Acces. │ │
│ │ Local + URL HTTPS │ │ │ • Piezas puestas/sueltas │ │ └───────────────────┘ │
│ └───────────────────┘ │ │ • Puntos 3D + Atribución │ │                       │
│                       │ │ • Progreso Misión / Reto │ │                       │
│                       │ └───────┬──────────┬───────┘ │                       │
└───────────────────────┴─────────┼──────────┼─────────┴───────────────────────┘
                                  ▼          ▼
        ┌──────────────────────────┐        ┌──────────────────────────────────┐
        │ Panel Biblioteca Técnica │        │ Panel Mediación y Copiloto       │
        │ • Subtemas del PC        │        │ • Pestaña Actividad + Misión 4p  │
        │ • Filtro Grado 1.°–11.°  │        │ • Pestaña Puntos 3D + Licencias  │
        │ • Gestor GLB + Limpieza  │        │ • Copiloto 20/35/50/90m sin API  │
        └──────────────────────────┘        └──────────────────────────────────┘
```

### Modelo de Datos y Estado

- **Catálogo de Tecnología e Informática**: Colección estructurada `{ id, subtema, grados[], nivelSugerido, titulo, objetivo, varianteModelo, piezas[], etiquetas[], reto, reflexion, atribucion }` enfocada 100% en sistemas computacionales:
  1. *Computador de Escritorio Completo (Interno + Externo)* — Torre, placa base, CPU+disipador, RAM Dual Channel, GPU PCIe, SSD/HDD SATA, fuente PSU, ventiladores, tarjeta de red, batería CMOS, monitor, cámara web, teclado, mouse, parlantes, impresora, escáner, proyector, puertos USB/HDMI/Ethernet/Audio y cables.
  2. *Arquitectura Interna: Placa Base, Buses PCIe/SATA y Microprocesador*.
  3. *Memorias y Almacenamiento: RAM Volátil vs. SSD/HDD y BIOS/CMOS*.
  4. *Periféricos de Entrada, Salida, Mixtos y Puertos de Comunicación*.
  5. *Computador Portátil (Laptop) vs. PC de Escritorio: Integración y Disipación*.
  6. *Flujo de Información y Energía: Del Teclado al Monitor (Ciclo Entrada → Proceso → Salida)*.
- **Estado de Sesión**: Controla la capa activa, porcentaje de vista explosionada, piezas extraídas en bandeja espacial, progreso del reto *Armar el PC*, caso activo de *Diagnóstico de Fallas*, pines 3D fijados por estación y recursos `.GLB` importados con liberación segura de `ObjectURL`.

### Mapeo de Interacciones y Transiciones de Estado

- **Gestos y Controles Manuales $\to$ Escena 3D**:
  - *Pellizco simple / Arrastre*: Selecciona o traslada piezas; si se arrastra fuera del chasis extrae el componente y enciende su zócalo guía; al soltar cerca del zócalo correcto encaja con imán visual y sonido; en zócalo erróneo vibra y explica la incompatibilidad física.
  - *Doble pellizco separando/juntando / Rueda / Botones `+` `−`*: Escala y acerca el modelo con límites suaves.
  - *Giro de palma abierta / Arrastre orbital*: Rota la estación 360° y marca el paso *Observar* de la misión.
  - *Índice + medio (Señalar) / Clic*: Abre el holograma técnico con función, analogía y curiosidad, marcando *Señalar*.
  - *Palma abierta 1,5 s*: Abre el menú radial espacial en el centro del visor.
  - *Deslizar mano lateral*: Cambia a la siguiente o anterior estación del computador.
  - *Pulgar arriba*: Confirma selecciones en retos y tutorial.
- **Modos Didácticos Especiales**:
  - *Armar el PC*: Desmonta las piezas clave en orden lógico, inicia cronómetro y valida cada inserción hasta encender el equipo virtual.
  - *Diagnóstico*: Inyecta un síntoma realista de taller (pitidos de RAM, ausencia de unidad de arranque SATA, reloj BIOS desconfigurado por CMOS, sobrecalentamiento de CPU o falla de video GPU) y evalúa el razonamiento del estudiante al señalar el componente.
  - *Comparador*: Despliega barras comparativas dinámicas de velocidad, latencia y persistencia entre *RAM vs. Disco*, *CPU vs. GPU* y *HDD vs. SSD*.
