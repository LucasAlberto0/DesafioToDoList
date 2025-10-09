/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_TarefaService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/TarefaService */ \"./src/services/TarefaService.ts\");\n\nconst btnAdicionar = document.getElementById(\"adicionarTarefa\");\nconst quadroTarefas = document.querySelector(\".quadro-tarefas\");\nconst tarefasRealizadas = document.querySelector(\".tarefasRealizadas\");\nconst tarefasNaoCompletadas = document.querySelector(\".tarefasNaoCompletadas\");\nconst service = new _services_TarefaService__WEBPACK_IMPORTED_MODULE_0__.TarefaService();\nfunction atualizarContagem() {\n    const tarefas = service.getTodas();\n    const concluidas = tarefas.filter(t => t.concluida).length;\n    const naoConcluidas = tarefas.length - concluidas;\n    tarefasRealizadas.innerHTML = `Tarefas Realizadas: <b>${concluidas}</b>`;\n    tarefasNaoCompletadas.innerHTML = `Tarefas não completadas: <b>${naoConcluidas}</b>`;\n}\nfunction criarCard(tarefa) {\n    const card = document.createElement(\"div\");\n    card.classList.add(\"card-tarefa\", \"animar-entrada\");\n    card.dataset.id = String(tarefa.id);\n    card.innerHTML = `\r\n    <div class=\"pretty p-svg p-plain p-bigger p-smooth\">\r\n        <input type=\"checkbox\" ${tarefa.concluida ? \"checked\" : \"\"} />\r\n    <div class=\"state\">\r\n        <img class=\"svg\" src=\"assets/icons/checkBoxIcon.svg\" alt=\"check\"/>\r\n        <label></label>\r\n    </div>\r\n    </div>\r\n    <span style=\"${tarefa.concluida ? \"text-decoration: line-through; opacity: 0.6;\" : \"\"}\">\r\n        ${tarefa.texto}\r\n    </span>\r\n    <div>\r\n        <button title=\"editarTarefa\" class=\"editarTarefa\"><img src=\"assets/icons/editIcon.svg\" alt=\"\"></button>\r\n        <button title=\"excluirTarefa\" class=\"excluirTarefa\"><img src=\"assets/icons/deleteIcon.svg\" alt=\"\"></button>\r\n    </div>\r\n    `;\n    const checkbox = card.querySelector(\"input\");\n    const btnEditar = card.querySelector(\".editarTarefa\");\n    const btnExcluir = card.querySelector(\".excluirTarefa\");\n    const span = card.querySelector(\"span\");\n    checkbox.addEventListener(\"change\", () => {\n        service.alternarConclusao(tarefa.id);\n        span.style.textDecoration = tarefa.concluida ? \"line-through\" : \"none\";\n        span.style.opacity = tarefa.concluida ? \"0.6\" : \"1\";\n        atualizarContagem();\n    });\n    btnEditar.addEventListener(\"click\", () => {\n        const input = document.createElement(\"input\");\n        input.type = \"text\";\n        input.value = tarefa.texto;\n        input.classList.add(\"input-editar\");\n        span.replaceWith(input);\n        input.focus();\n        input.addEventListener(\"keydown\", (e) => { if (e.key === \"Enter\")\n            input.blur(); });\n        input.addEventListener(\"blur\", () => {\n            service.editar(tarefa.id, input.value.trim() || tarefa.texto);\n            renderizarTarefas();\n        });\n    });\n    btnExcluir.addEventListener(\"click\", () => {\n        card.classList.add(\"fade-out\");\n        card.addEventListener(\"animationend\", () => {\n            service.excluir(tarefa.id);\n            card.remove();\n            atualizarContagem();\n        }, { once: true });\n    });\n    card.addEventListener(\"animationend\", () => card.classList.remove(\"animar-entrada\"));\n    return card;\n}\nfunction renderizarTarefas() {\n    quadroTarefas.querySelectorAll(\".card-tarefa\").forEach(c => c.remove());\n    service.getTodas().forEach(tarefa => quadroTarefas.appendChild(criarCard(tarefa)));\n}\nbtnAdicionar.addEventListener(\"click\", () => {\n    const novaTarefa = service.criar();\n    const card = criarCard(novaTarefa);\n    quadroTarefas.appendChild(card);\n    atualizarContagem();\n    const input = document.createElement(\"input\");\n    input.type = \"text\";\n    input.placeholder = \"Digite a tarefa...\";\n    input.classList.add(\"input-editar\");\n    const span = card.querySelector(\"span\");\n    span.replaceWith(input);\n    input.focus();\n    input.addEventListener(\"keydown\", (e) => { if (e.key === \"Enter\")\n        input.blur(); });\n    input.addEventListener(\"blur\", () => {\n        service.editar(novaTarefa.id, input.value.trim() || \"Tarefa sem nome\");\n        renderizarTarefas();\n    });\n});\nrenderizarTarefas();\natualizarContagem();\n\n\n//# sourceURL=webpack://desafiotodolist/./src/index.ts?\n}");

/***/ }),

/***/ "./src/services/TarefaService.ts":
/*!***************************************!*\
  !*** ./src/services/TarefaService.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TarefaService: () => (/* binding */ TarefaService)\n/* harmony export */ });\nconst Storage_Key = \"tarefas\";\nclass TarefaService {\n    tarefas = [];\n    constructor() {\n        this.tarefas = this.carregarTarefas();\n    }\n    getTodas() {\n        return this.tarefas;\n    }\n    criar() {\n        const nova = { id: Date.now(), texto: \"\", concluida: false };\n        this.tarefas.push(nova);\n        this.salvarTarefas();\n        return nova;\n    }\n    editar(id, novoTexto) {\n        const t = this.tarefas.find(t => t.id === id);\n        if (t) {\n            t.texto = novoTexto;\n            this.salvarTarefas();\n        }\n    }\n    excluir(id) {\n        this.tarefas = this.tarefas.filter(t => t.id !== id);\n        this.salvarTarefas();\n    }\n    alternarConclusao(id) {\n        const t = this.tarefas.find(t => t.id === id);\n        if (t) {\n            t.concluida = !t.concluida;\n            this.salvarTarefas();\n        }\n    }\n    carregarTarefas() {\n        const dados = localStorage.getItem(Storage_Key);\n        return dados ? JSON.parse(dados) : [];\n    }\n    salvarTarefas() {\n        localStorage.setItem(Storage_Key, JSON.stringify(this.tarefas));\n    }\n}\n\n\n//# sourceURL=webpack://desafiotodolist/./src/services/TarefaService.ts?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;