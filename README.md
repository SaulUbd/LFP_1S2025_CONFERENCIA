# Implementando tu parsers descencentes recursivos
## Conferencia Lenguajes formales y de programación
### Primer semestre 2025
Saul Castellanos

## Prerequisitos
Tener instalado nodejs y npm

# Instrucciones

1. Instalar dependendencias del proyecto
```bash
npm install
```

2. Generar archivos de patrón visitante

(La configuración de los nodos para el arbol de sintaxis está en `./tools/nodes.js`)
```bash
npm run visitor
```

3. Compilar los archivos fuente
```bash
npm run build
```

4. Ejecutar programa
```bash
npm start input.txt # El archivo input.txt puede ser modificado para probar diferentes entradas
# el programa acepta cualquier archivo de texto, no necesita ser input.txt
```

