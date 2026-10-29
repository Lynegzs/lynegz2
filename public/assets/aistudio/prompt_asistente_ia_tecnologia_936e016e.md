# PROMPT MAESTRO: añadir un "Asistente IA de Tecnología" gratuito a un proyecto web

Copia todo lo que está debajo de la línea y pégalo en la IA programadora (junto con el archivo `index.html` o el `.zip` de tu proyecto).

---

## ROL

Actúa como un **programador front-end senior** (JavaScript vanilla, HTML5, CSS3, accesibilidad y seguridad web). Trabajas con **cambios mínimos y quirúrgicos**: no refactorizas, no renombras, no reformateas y no eliminas nada de lo que ya funciona en mi proyecto. Respondes en español.

## OBJETIVO

Integrar en mi proyecto un **chat con un agente de IA gratuito** que responda preguntas **enfocadas en tecnología e informática**, como una nueva pestaña llamada **"Asistente IA"** dentro del panel derecho de la aplicación. El resultado debe ser **idéntico** al de la solución de referencia que te entrego abajo (mismo comportamiento, mismos ids, mismo código).

## CONTEXTO DEL PROYECTO

- Es una aplicación de una sola página (`index.html` con CSS y JS en línea, servida con Vite o abierta directamente) llamada "XR Hand Lab Edu" (laboratorio educativo de computador en 3D con gestos de manos).
- Tiene un panel derecho (`<aside id="right-panel">`) con una barra de pestañas `<div class="seg-bar">` cuyos botones usan `class="seg-btn"` y `data-tab="<id-del-panel>"`, y paneles `<div class="tab-pane" id="...">` dentro de `<div class="panel-scroll">`.
- El cambio de pestañas ya lo maneja un script existente que escucha `.seg-btn[data-tab]` y activa el `.tab-pane` con ese id. **No lo toques ni lo dupliques.**
- Variables CSS existentes: `--cyan`, `--neon`, `--line`, `--line-bright`, `--bg-card`, `--muted`, `--dim`, `--font-mono`, `--radius-md`. Clases existentes: `.btn`, `.btn-sm`, `.btn-neon`, `.btn-cyan`, `.field-lbl`, `.ctrl-input`, `.mono`.
- Existe un elemento `#card-title` con el nombre de la pieza que se muestra en el visor 3D (se usa como contexto para el asistente). Si no existe, el código funciona igual (el contexto queda vacío).
- **Antes de editar, inspecciona el archivo** y confirma que estos nombres existen. Si algún nombre difiere, adapta únicamente ese selector y avísame en el resumen final.

## COMPORTAMIENTO REQUERIDO

1. Nueva pestaña **"Asistente IA"** (5.ª pestaña; la barra pasa de 4 a 5 columnas: `repeat(4, 1fr)` → `repeat(5, 1fr)` solo en `.seg-bar`).
2. Contenido del panel: 6 botones de preguntas sugeridas, historial de chat (`role="log"`, `aria-live="polite"`), cuadro de texto (Enter envía, Shift+Enter hace salto de línea, máximo 800 caracteres), botones **Enviar**, **Limpiar chat** y **Escuchar última** (síntesis de voz `es-CO`), y un bloque plegable **Ajustes del motor de IA**.
3. **Tres motores gratuitos** con respaldo en cascada:
   - **Google Gemini** (gratis con clave de `https://aistudio.google.com/apikey`): `POST https://generativelanguage.googleapis.com/v1beta/models/{modelo}:generateContent` con cabecera `x-goog-api-key`, modelo por defecto `gemini-flash-latest` (editable).
   - **Pollinations** (gratis, sin clave, experimental): `POST https://text.pollinations.ai/openai` en formato compatible con OpenAI.
   - **Base local**: ~25 entradas de conocimiento escritas en el código, con coincidencia por palabras clave sin tildes; funciona sin internet.
   - Modo **Automático**: Gemini si hay clave → si no, Pollinations → si falla, base local. Si el motor elegido falla, cae a la base local y lo indica en la etiqueta de la respuesta.
4. **Prompt de sistema** del agente: solo temas de tecnología e informática, español, tono amable, analogías, respuestas concisas (~180 palabras), no inventar datos, no pedir datos personales, y redirigir con amabilidad las preguntas de otros temas. Incluye como contexto la pieza visible (`#card-title`).
5. Memoria de conversación: los últimos 8 turnos, solo en memoria (no se guarda el historial).
6. Ajustes (proveedor, clave y modelo) guardados en `localStorage` dentro de `try/catch`. La clave **nunca** se escribe en el código.
7. **Seguridad**: todo texto se escapa antes de mostrarse; el renderizador Markdown solo soporta negrita, cursiva, código, listas, títulos y bloques de código (sin enlaces ni HTML crudo). Sin `eval`, sin `innerHTML` con texto sin escapar.
8. **Accesibilidad**: etiquetas `label` asociadas, `aria-live`, foco visible heredado, animación desactivada con `prefers-reduced-motion`.
9. El video de la cámara y los datos de gestos **nunca** se envían a ningún servicio; solo el texto de la pregunta.

## PASOS DE IMPLEMENTACIÓN (en este orden)

1. En `<style>`, cambiar `.seg-bar` a `grid-template-columns: repeat(5, 1fr);` y pegar el **BLOQUE CSS** justo antes de `.tab-pane { display: none; ... }`.
2. Agregar en la `seg-bar`, después del botón "Copiloto": `<button class="seg-btn" role="tab" data-tab="pane-ai">Asistente IA</button>`.
3. Pegar el **BLOQUE HTML** (`<div class="tab-pane" id="pane-ai">…</div>`) dentro de `.panel-scroll`, después del último `.tab-pane` existente.
4. Pegar el **BLOQUE JS** como un segundo `<script>` independiente justo antes de `</body>` (una IIFE autónoma; no mezclarlo con el script principal).
5. Si el proyecto usa Vite con módulos y no un solo `index.html`, convertir el bloque JS en `src/aiAssistant.js` importado desde el punto de entrada, sin cambiar su contenido.

## VERIFICACIÓN OBLIGATORIA ANTES DE ENTREGAR

- Validar la sintaxis de todos los `<script>` (por ejemplo con `node -e "new Function(code)"`).
- Probar con jsdom (o similar) que: se crean los 6 botones sugeridos, enviar una pregunta ("¿Qué hace la CPU?") produce respuesta de la base local cuando no hay red, y un texto como `<img src=x onerror=alert(1)>` **no** crea ningún elemento `<img>`.
- Confirmar que las 4 pestañas originales siguen funcionando y que no hay errores nuevos en consola.

## FORMATO DE ENTREGA

1. El `index.html` completo y modificado (o el `.zip` del proyecto), sin omitir nada con "…".
2. Un resumen breve de qué cambiaste y qué selector tuviste que adaptar, si alguno.
3. Aviso de que las llamadas reales a Gemini/Pollinations dependen de la red y de la clave del usuario, y de que no se deben publicar claves dentro del código.

## BLOQUE CSS

````css
    /* ===== Asistente IA de Tecnología ===== */
    .ai-log { display:flex; flex-direction:column; gap:8px; min-height:220px; max-height:360px; overflow-y:auto; padding:10px; background:rgba(2,11,21,0.86); border:1px solid var(--line); border-radius:var(--radius-md); }
    .ai-msg { max-width:94%; padding:8px 10px; border-radius:10px; font-size:12.5px; line-height:1.5; word-wrap:break-word; }
    .ai-msg p { margin:0 0 6px; } .ai-msg p:last-child { margin-bottom:0; }
    .ai-msg ul, .ai-msg ol { margin:2px 0 6px 18px; }
    .ai-msg code { font-family:var(--font-mono); font-size:11.5px; background:rgba(0,183,255,0.14); padding:1px 4px; border-radius:4px; }
    .ai-msg pre.ai-code { font-family:var(--font-mono); font-size:11px; background:#010a14; border:1px solid var(--line); border-radius:6px; padding:8px; overflow:auto; white-space:pre; margin:4px 0; }
    .ai-msg.user { align-self:flex-end; background:rgba(0,183,255,0.22); border:1px solid var(--line-bright); }
    .ai-msg.bot { align-self:flex-start; background:var(--bg-card); border:1px solid var(--line); }
    .ai-msg.sys { align-self:center; color:var(--dim); font-size:11.5px; text-align:center; }
    .ai-msg .ai-src { display:block; margin-top:6px; font-size:10.5px; color:var(--dim); font-family:var(--font-mono); }
    .ai-chips { display:flex; flex-wrap:wrap; gap:5px; }
    .ai-chips .btn { font-size:11px; min-height:30px; padding:3px 8px; }
    .ai-row { display:grid; grid-template-columns:1fr auto; gap:6px; align-items:end; }
    .ai-dots::after { content:'...'; animation: aiDots 1.2s steps(4,end) infinite; display:inline-block; width:1.2em; overflow:hidden; vertical-align:bottom; }
    @keyframes aiDots { 0%{width:0} 100%{width:1.2em} }
    details.ai-set { border:1px solid var(--line); border-radius:var(--radius-md); padding:8px 10px; background:rgba(3,15,29,0.6); }
    details.ai-set summary { cursor:pointer; font-size:12px; font-weight:600; color:var(--muted); }
    details.ai-set .ai-set-body { display:flex; flex-direction:column; gap:8px; margin-top:8px; }
    @media (prefers-reduced-motion: reduce) { .ai-dots::after { animation:none; } }
````

## BLOQUE HTML

````html
        <!-- PESTAÑA 5: ASISTENTE IA DE TECNOLOGÍA -->
        <div class="tab-pane" id="pane-ai">
          <div>
            <span class="field-lbl">Pregúntame sobre tecnología e informática</span>
            <div class="ai-chips" id="ai-chips"></div>
          </div>
          <div class="ai-log" id="ai-log" role="log" aria-live="polite" aria-label="Conversación con el asistente"></div>
          <div class="ai-row">
            <textarea class="ctrl-input" id="ai-input" rows="2" maxlength="800" placeholder="Escribe tu pregunta de tecnología… (Enter para enviar)" aria-label="Tu pregunta"></textarea>
            <button class="btn btn-sm btn-neon" id="ai-send">Enviar</button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <button class="btn btn-sm" id="ai-clear">Limpiar chat</button>
            <button class="btn btn-sm btn-cyan" id="ai-speak">Escuchar última</button>
          </div>
          <details class="ai-set" id="ai-settings">
            <summary>Ajustes del motor de IA · <span class="mono" id="ai-engine-lbl">…</span></summary>
            <div class="ai-set-body">
              <div>
                <label class="field-lbl" for="ai-provider">Motor</label>
                <select id="ai-provider" class="ctrl-input">
                  <option value="auto">Automático (Gemini si hay clave, si no Pollinations, si no base local)</option>
                  <option value="gemini">Google Gemini · gratis con clave</option>
                  <option value="pollinations">Pollinations · gratis sin clave (experimental)</option>
                  <option value="local">Base local · sin internet</option>
                </select>
              </div>
              <div>
                <label class="field-lbl" for="ai-key">Clave de Gemini (gratis en <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">aistudio.google.com/apikey</a>)</label>
                <input class="ctrl-input" id="ai-key" type="password" autocomplete="off" placeholder="AIza…" spellcheck="false">
              </div>
              <div>
                <label class="field-lbl" for="ai-model">Modelo de Gemini</label>
                <input class="ctrl-input" id="ai-model" type="text" value="gemini-flash-latest" spellcheck="false">
              </div>
              <button class="btn btn-sm btn-cyan" id="ai-save">Guardar ajustes</button>
              <small style="color:var(--dim);font-size:11px;">La clave se guarda solo en este navegador. Las preguntas se envían al motor elegido (Google o Pollinations); el video de la cámara nunca se envía. No escribas datos personales.</small>
            </div>
          </details>
        </div>
````

## BLOQUE JS (pegar dentro de `<script> … </script>`)

````javascript
(() => {
'use strict';
const $ = (id) => document.getElementById(id);
const K = { key: 'xr_ai_gemini_key', model: 'xr_ai_gemini_model', prov: 'xr_ai_provider' };
const store = {
  get(k, d = '') { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} }
};
const esc = (t) => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/* ---------- Render Markdown mínimo y seguro ---------- */
function md(text) {
  let t = esc(text); const blocks = [];
  t = t.replace(/```(?:\w+)?\n?([\s\S]*?)```/g, (m, c) => { blocks.push(c.replace(/\n$/, '')); return `\u0000B${blocks.length - 1}\u0000`; });
  t = t.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  t = t.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  let out = '', list = null;
  const close = () => { if (list) { out += `</${list}>`; list = null; } };
  for (const ln of t.split('\n')) {
    let m;
    if (/^\u0000B\d+\u0000$/.test(ln.trim())) { close(); out += ln.trim(); }
    else if ((m = ln.match(/^\s*[-*•]\s+(.*)/))) { if (list !== 'ul') { close(); out += '<ul>'; list = 'ul'; } out += `<li>${m[1]}</li>`; }
    else if ((m = ln.match(/^\s*\d+[.)]\s+(.*)/))) { if (list !== 'ol') { close(); out += '<ol>'; list = 'ol'; } out += `<li>${m[1]}</li>`; }
    else if (/^#{1,4}\s+/.test(ln)) { close(); out += `<p><strong>${ln.replace(/^#{1,4}\s+/, '')}</strong></p>`; }
    else if (ln.trim() === '') { close(); }
    else { close(); out += `<p>${ln}</p>`; }
  }
  close();
  return out.replace(/\u0000B(\d+)\u0000/g, (m, i) => `<pre class="ai-code">${blocks[i]}</pre>`);
}

/* ---------- Base local de conocimiento (funciona sin internet ni clave) ---------- */
const KB = [
  { k: ['cpu', 'procesador', 'microprocesador'], a: '**La CPU (procesador)** es el "cerebro" del computador: ejecuta las instrucciones de los programas.\n- Trabaja en ciclos: busca, decodifica y ejecuta instrucciones.\n- Su velocidad se mide en GHz y su capacidad de trabajo en paralelo en núcleos.\n- Se calienta mucho, por eso lleva disipador y ventilador.\n\nAnalogía: es el chef de la cocina que sigue la receta (el programa) paso a paso.' },
  { k: ['ram', 'memoria ram', 'memoria principal'], a: '**La RAM** es la memoria de trabajo temporal del computador.\n- Guarda los programas y datos que estás usando ahora, para que la CPU los lea muy rápido.\n- Es **volátil**: al apagar el equipo se borra.\n- Más RAM permite tener más programas abiertos sin que se ponga lento.\n\nAnalogía: es el mesón de la cocina; el disco es la despensa.' },
  { k: ['ssd', 'hdd', 'disco duro', 'almacenamiento', 'disco solido'], a: '**HDD vs SSD**\n- **HDD:** platos magnéticos que giran y un cabezal que lee. Barato y de mucha capacidad, pero más lento y sensible a golpes.\n- **SSD:** chips de memoria flash sin partes móviles. Mucho más rápido, silencioso y resistente, aunque más costoso por GB.\n\nAmbos son **almacenamiento permanente**: los datos siguen allí al apagar el equipo.' },
  { k: ['gpu', 'tarjeta grafica', 'tarjeta de video', 'grafica'], a: '**La GPU (tarjeta gráfica)** está hecha para hacer miles de cálculos simples a la vez.\n- Genera las imágenes que ves en pantalla (juegos, video, 3D).\n- También acelera tareas de inteligencia artificial.\n\nCPU vs GPU: la CPU es pocos trabajadores muy versátiles; la GPU son miles de trabajadores especializados.' },
  { k: ['placa base', 'tarjeta madre', 'motherboard', 'mainboard', 'ranura', 'pcie', 'zocalo'], a: '**La placa base (tarjeta madre)** es la gran tarjeta donde se conectan todos los componentes.\n- Tiene el zócalo de la CPU, las ranuras de RAM y las ranuras PCIe (tarjeta gráfica, red).\n- Sus circuitos (buses) llevan los datos entre las piezas.\n- Incluye el chipset, la BIOS/UEFI y los conectores SATA, M.2 y USB.' },
  { k: ['fuente de poder', 'fuente de alimentacion', 'psu', 'energia', 'voltaje'], a: '**La fuente de poder (PSU)** convierte la corriente alterna de la pared (110/220 V) en corriente continua de bajo voltaje (12 V, 5 V, 3,3 V) que usan los componentes.\n- Debe tener potencia suficiente para todas las piezas.\n- Una fuente mala puede dañar el equipo: es una pieza que conviene no escatimar.' },
  { k: ['bios', 'uefi', 'cmos', 'arranque', 'bateria cmos', 'booteo'], a: '**BIOS/UEFI** es el programa mínimo que vive en la placa base y se ejecuta al encender.\n1. Revisa que el hardware funcione (POST).\n2. Permite configurar hora, orden de arranque, etc.\n3. Entrega el control al sistema operativo.\n\nLa **batería CMOS** (pila de botón) mantiene la hora y la configuración cuando el equipo está apagado.' },
  { k: ['puerto', 'usb', 'hdmi', 'displayport', 'ethernet', 'conector', 'vga'], a: '**Puertos comunes**\n- **USB:** periféricos y carga; USB-C es reversible.\n- **HDMI / DisplayPort:** imagen y sonido a monitores y TV.\n- **Ethernet (RJ-45):** red por cable.\n- **Jack 3,5 mm:** audio analógico.\n\nRegla útil: revisa siempre que el cable y el puerto sean compatibles antes de conectar.' },
  { k: ['hardware', 'software'], a: '**Hardware vs software**\n- **Hardware:** las partes físicas que puedes tocar (CPU, RAM, teclado, pantalla).\n- **Software:** los programas y datos (sistema operativo, apps, juegos).\n\nSe necesitan mutuamente: sin software el hardware no sabe qué hacer, y sin hardware el software no tiene dónde ejecutarse.' },
  { k: ['sistema operativo', 'windows', 'linux', 'android', 'macos', 'kernel'], a: '**El sistema operativo (SO)** es el software principal que administra el hardware y deja que los programas funcionen.\n- Gestiona memoria, procesos, archivos y dispositivos.\n- Ofrece la interfaz con la que interactúas.\n- Ejemplos: Windows, macOS, Linux, Android, iOS.' },
  { k: ['binario', 'bit', 'byte', 'sistema binario', 'unos y ceros'], a: '**Binario, bit y byte**\n- Un **bit** es la unidad mínima: 0 o 1 (apagado/encendido).\n- Un **byte** son 8 bits y puede representar un carácter.\n- 1 KB ≈ 1000 bytes; 1 MB ≈ 1000 KB; 1 GB ≈ 1000 MB.\n\nEjemplo: el número 5 en binario es `101` (4 + 0 + 1).' },
  { k: ['ip', 'direccion ip', 'dns', 'router', 'modem', 'wifi', 'red', 'redes', 'internet', 'lan', 'wan'], a: '**Redes e Internet**\n- **Dirección IP:** número que identifica a un dispositivo en una red (como la dirección de una casa).\n- **Router:** reparte la conexión entre tus dispositivos y los conecta con Internet.\n- **DNS:** traduce nombres (ejemplo.com) a direcciones IP.\n- **Wi-Fi:** conexión de red sin cables por ondas de radio.\n\nInternet es la red mundial de redes; la **web** es solo uno de los servicios que corre sobre ella.' },
  { k: ['phishing', 'contrasena', 'seguridad', 'ciberseguridad', 'virus', 'malware', 'hackeo', 'hacker', 'privacidad'], a: '**Seguridad básica**\n- Usa contraseñas largas y distintas para cada cuenta, y activa la verificación en dos pasos.\n- **Phishing:** mensajes falsos que imitan a un banco o servicio para robarte datos. Desconfía de urgencias y enlaces raros; entra escribiendo tú la dirección.\n- Mantén el sistema y las apps actualizados.\n- No instales programas de fuentes dudosas y haz copias de seguridad.' },
  { k: ['inteligencia artificial', 'ia', 'machine learning', 'aprendizaje automatico', 'chatgpt', 'red neuronal', 'modelo de lenguaje'], a: '**Inteligencia artificial (IA)** es software capaz de realizar tareas que normalmente requieren inteligencia humana: reconocer imágenes, entender lenguaje, recomendar contenido.\n- **Machine learning:** el sistema aprende patrones a partir de muchos ejemplos en lugar de seguir reglas escritas a mano.\n- Esta misma app usa IA de visión para detectar tus manos.\n- Puede equivocarse: conviene verificar lo importante.' },
  { k: ['algoritmo', 'pseudocodigo', 'diagrama de flujo'], a: '**Un algoritmo** es una secuencia ordenada y finita de pasos para resolver un problema.\nEjemplo (preparar cereal): 1) servir cereal, 2) agregar leche, 3) comer.\nSe puede representar con diagramas de flujo o pseudocódigo y es la base de todo programa.' },
  { k: ['programacion', 'programar', 'python', 'javascript', 'codigo', 'lenguaje de programacion', 'variable', 'bucle', 'scratch'], a: '**Programar** es escribir instrucciones que el computador pueda ejecutar.\n- Ideas base: **variables** (guardan datos), **condicionales** (`if`), **bucles** (repetir) y **funciones**.\n- Para empezar: Scratch (bloques), luego Python (sintaxis clara) o JavaScript (para la web).\n\n```\nfor i in range(3):\n    print("Hola", i)\n```' },
  { k: ['nube', 'cloud', 'servidor', 'hosting'], a: '**La nube** significa usar computadores de otra empresa (servidores) a través de Internet para guardar archivos o ejecutar programas, en vez de hacerlo en tu equipo.\nVentajas: acceso desde cualquier lugar y copias de seguridad. Riesgos: dependes de la conexión y debes cuidar tu privacidad.' },
  { k: ['base de datos', 'sql', 'tabla', 'datos'], a: '**Una base de datos** es una colección organizada de información que se puede consultar rápido.\nSe organiza en tablas con filas (registros) y columnas (campos). Con lenguajes como SQL se piden datos: `SELECT nombre FROM estudiantes;`' },
  { k: ['von neumann', 'ciclo de instruccion', 'arquitectura'], a: '**Arquitectura Von Neumann:** el computador guarda programas y datos en la misma memoria y los procesa con la CPU.\nPartes: CPU (unidad de control + ALU), memoria, entrada/salida y buses que las conectan.\nCiclo básico: **buscar → decodificar → ejecutar → guardar**.' },
  { k: ['periferico', 'teclado', 'mouse', 'raton', 'monitor', 'impresora', 'entrada', 'salida', 'escaner'], a: '**Periféricos**\n- **Entrada:** envían datos al equipo (teclado, ratón, micrófono, cámara, escáner).\n- **Salida:** muestran resultados (monitor, impresora, parlantes).\n- **Mixtos (E/S):** hacen ambas cosas (pantalla táctil, disco externo).' },
  { k: ['portatil', 'laptop', 'escritorio', 'torre'], a: '**Portátil vs escritorio**\n- **Portátil:** compacto, con batería y pantalla integrada; piezas más pequeñas y difíciles de cambiar.\n- **Escritorio:** más fácil de ampliar y reparar, mejor refrigeración y mayor potencia por precio; no es portable.' },
  { k: ['mantenimiento', 'limpieza', 'se calienta', 'sobrecalent', 'ventilador', 'pasta termica', 'refrigeracion', 'lento'], a: '**Mantenimiento y equipo lento o caliente**\n- Limpia el polvo de ventiladores y rejillas (equipo apagado y desconectado).\n- Revisa que los ventiladores giren y renueva la pasta térmica si es necesario.\n- Libera espacio en disco y cierra programas pesados.\n- Revisa si hay malware y actualiza el sistema.\n\nSiempre descarga la electricidad estática (toca metal) antes de manipular piezas.' }
];
const SUGGEST = [
  '¿Qué hace la CPU?', 'Diferencia entre RAM y SSD', '¿Qué es una dirección IP?',
  '¿Cómo evito el phishing?', '¿Qué es la inteligencia artificial?', 'Explícame la pieza que estoy viendo'
];

function localAnswer(q) {
  const n = ' ' + norm(q).replace(/[^a-z0-9ñ ]/g, ' ') + ' ';
  let best = null, bestScore = 0;
  for (const e of KB) {
    let sc = 0;
    for (const kw of e.k) { if (n.includes(' ' + norm(kw) + ' ') || (kw.length > 4 && n.includes(norm(kw)))) sc += kw.length > 3 ? 2 : 1; }
    if (sc > bestScore) { best = e; bestScore = sc; }
  }
  if (best) return best.a;
  return 'En modo sin conexión solo conozco temas básicos: CPU, RAM, SSD/HDD, GPU, placa base, fuente, BIOS, puertos, redes, seguridad, programación e IA.\n\nPrueba reformular tu pregunta con una de esas palabras, o activa un motor de IA en **Ajustes** (Gemini es gratis con una clave de aistudio.google.com/apikey) para responder cualquier pregunta de tecnología.';
}

/* ---------- Estado y utilidades ---------- */
const history = []; // {role:'user'|'assistant', text}
const MAX_TURNS = 8;
const log = $('ai-log'), input = $('ai-input');
let busy = false, lastBotText = '';

function currentPiece() { const el = $('card-title'); return el ? el.textContent.trim() : ''; }

function systemPrompt() {
  const piece = currentPiece();
  return 'Eres el Asistente de Tecnología e Informática de la app educativa "XR Hand Lab Edu" (el computador por dentro y por fuera), usada por estudiantes de 1.° a 11.° y sus docentes en Colombia.\n' +
    'Reglas:\n' +
    '- Responde SIEMPRE en español, con tono amable y claro.\n' +
    '- Responde solo preguntas de tecnología e informática: hardware, software, redes, internet, programación, electrónica, inteligencia artificial, ciberseguridad, datos y uso responsable de la tecnología. Si la pregunta es de otro tema, explica brevemente que solo ayudas con tecnología y sugiere una pregunta relacionada.\n' +
    '- Explica con analogías y ejemplos cotidianos; ajusta el nivel si el estudiante indica su grado.\n' +
    '- Sé conciso (máximo unas 180 palabras salvo que pidan más) y usa listas cortas cuando ayuden.\n' +
    '- Si no estás seguro de algo, dilo; no inventes datos, cifras ni enlaces.\n' +
    '- No pidas ni aceptes datos personales ni des instrucciones para dañar sistemas o cuentas ajenas.' +
    (piece ? `\nContexto: la pieza o estación que el estudiante está viendo ahora en el visor 3D es "${piece}".` : '');
}

function addMsg(role, text, src) {
  const d = document.createElement('div');
  d.className = 'ai-msg ' + role;
  d.innerHTML = role === 'user' ? `<p>${esc(text).replace(/\n/g, '<br>')}</p>` : (role === 'sys' ? esc(text) : md(text));
  if (src) { const s = document.createElement('span'); s.className = 'ai-src'; s.textContent = src; d.appendChild(s); }
  log.appendChild(d); log.scrollTop = log.scrollHeight;
  return d;
}

/* ---------- Proveedores ---------- */
async function fetchJSON(url, opts, ms = 30000) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { ...opts, signal: ctl.signal });
    let data = null; try { data = await r.json(); } catch {}
    if (!r.ok) throw new Error((data && data.error && (data.error.message || data.error)) || ('HTTP ' + r.status));
    return data;
  } finally { clearTimeout(t); }
}

async function askGemini(q) {
  const key = store.get(K.key).trim(); if (!key) throw new Error('Falta la clave de Gemini');
  const model = (store.get(K.model, 'gemini-flash-latest').trim() || 'gemini-flash-latest').replace(/^models\//, '');
  const contents = history.slice(-MAX_TURNS * 2).map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] }));
  contents.push({ role: 'user', parts: [{ text: q }] });
  const data = await fetchJSON(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ systemInstruction: { parts: [{ text: systemPrompt() }] }, contents, generationConfig: { temperature: 0.5, maxOutputTokens: 2048 } })
  });
  const parts = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
  const text = (parts || []).map(p => p.text || '').join('').trim();
  if (!text) throw new Error((data && data.promptFeedback && data.promptFeedback.blockReason) ? 'Respuesta bloqueada por filtros de seguridad' : 'Respuesta vacía');
  return { text, src: 'Gemini · ' + model };
}

async function askPollinations(q) {
  const messages = [{ role: 'system', content: systemPrompt() }]
    .concat(history.slice(-MAX_TURNS * 2).map(h => ({ role: h.role, content: h.text })), [{ role: 'user', content: q }]);
  const data = await fetchJSON('https://text.pollinations.ai/openai', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'openai', messages, temperature: 0.5 })
  });
  const text = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
  if (!text || !String(text).trim()) throw new Error('Respuesta vacía');
  return { text: String(text).trim(), src: 'Pollinations · sin clave' };
}

function chain() {
  const prov = store.get(K.prov, 'auto'), hasKey = !!store.get(K.key).trim();
  if (prov === 'gemini') return ['gemini', 'local'];
  if (prov === 'pollinations') return ['pollinations', 'local'];
  if (prov === 'local') return ['local'];
  return hasKey ? ['gemini', 'pollinations', 'local'] : ['pollinations', 'local'];
}

function engineLabel() {
  const c = chain()[0];
  return c === 'gemini' ? 'Gemini' : c === 'pollinations' ? 'Pollinations' : 'Base local';
}

async function ask(q) {
  let note = '';
  for (const p of chain()) {
    try {
      if (p === 'gemini') return await askGemini(q);
      if (p === 'pollinations') return await askPollinations(q);
      return { text: localAnswer(q), src: 'Base local · sin conexión' + (note ? ' · ' + note : '') };
    } catch (err) {
      const m = (err && err.name === 'AbortError') ? 'tiempo agotado' : String((err && err.message) || err).slice(0, 90);
      note = (p === 'gemini' ? 'Gemini' : 'Pollinations') + ' falló: ' + m;
    }
  }
  return { text: localAnswer(q), src: 'Base local · ' + note };
}

/* ---------- Envío ---------- */
async function send(raw) {
  const q = (raw ?? input.value).trim();
  if (!q || busy) return;
  busy = true; $('ai-send').disabled = true; input.value = '';
  addMsg('user', q);
  const wait = addMsg('bot', ''); wait.innerHTML = '<span class="ai-dots">Pensando</span>';
  const res = await ask(q);
  wait.remove();
  addMsg('bot', res.text, res.src);
  history.push({ role: 'user', text: q }, { role: 'assistant', text: res.text });
  if (history.length > MAX_TURNS * 2) history.splice(0, history.length - MAX_TURNS * 2);
  lastBotText = res.text;
  busy = false; $('ai-send').disabled = false; input.focus();
}

/* ---------- Inicialización ---------- */
function refreshLabel() { $('ai-engine-lbl').textContent = engineLabel(); }
function greet() {
  addMsg('sys', 'Asistente de Tecnología e Informática');
  addMsg('bot', '¡Hola! Soy tu asistente de **tecnología e informática**. Pregúntame sobre hardware, redes, programación, seguridad o inteligencia artificial, o elige una pregunta de arriba.');
}

function init() {
  if (!log || !input) return;
  const chips = $('ai-chips');
  SUGGEST.forEach(t => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-sm'; b.textContent = t;
    b.addEventListener('click', () => {
      if (/pieza que estoy viendo/.test(t)) { const p = currentPiece(); send(p ? `Explícame para qué sirve "${p}" y cómo funciona.` : '¿Cuáles son las partes principales de un computador?'); }
      else send(t);
    });
    chips.appendChild(b);
  });
  $('ai-provider').value = store.get(K.prov, 'auto');
  $('ai-key').value = store.get(K.key);
  $('ai-model').value = store.get(K.model, 'gemini-flash-latest');
  refreshLabel();
  $('ai-send').addEventListener('click', () => send());
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
  $('ai-clear').addEventListener('click', () => { history.length = 0; lastBotText = ''; log.innerHTML = ''; greet(); });
  $('ai-speak').addEventListener('click', () => {
    if (!('speechSynthesis' in window) || !lastBotText) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(lastBotText.replace(/[*`#]/g, '')); u.lang = 'es-CO';
    window.speechSynthesis.speak(u);
  });
  $('ai-save').addEventListener('click', () => {
    store.set(K.prov, $('ai-provider').value); store.set(K.key, $('ai-key').value.trim());
    store.set(K.model, $('ai-model').value.trim() || 'gemini-flash-latest');
    refreshLabel(); addMsg('sys', 'Ajustes guardados · motor: ' + engineLabel());
  });
  greet();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
````
