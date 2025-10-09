import { TarefaService } from "./services/TarefaService";
import type { Tarefa } from "./models/TarefaInterface";

const btnAdicionar = document.getElementById("adicionarTarefa") as HTMLButtonElement;
const quadroTarefas = document.querySelector(".quadro-tarefas") as HTMLDivElement;
const tarefasRealizadas = document.querySelector(".tarefasRealizadas") as HTMLDivElement;
const tarefasNaoCompletadas = document.querySelector(".tarefasNaoCompletadas") as HTMLDivElement;

const service = new TarefaService();

function atualizarContagem(): void {
    const tarefas = service.getTodas();
    const concluidas = tarefas.filter(t => t.concluida).length;
    const naoConcluidas = tarefas.length - concluidas;

    tarefasRealizadas.innerHTML = `Tarefas Realizadas: <b>${concluidas}</b>`;
    tarefasNaoCompletadas.innerHTML = `Tarefas não completadas: <b>${naoConcluidas}</b>`;
}

function criarCard(tarefa: Tarefa): HTMLDivElement {
    const card = document.createElement("div");
    card.classList.add("card-tarefa", "animar-entrada");
    card.dataset.id = String(tarefa.id);

    card.innerHTML = `
    <div class="pretty p-svg p-plain p-bigger p-smooth">
        <input type="checkbox" ${tarefa.concluida ? "checked" : ""} />
    <div class="state">
        <img class="svg" src="assets/icons/checkBoxIcon.svg" alt="check"/>
        <label></label>
    </div>
    </div>
    <span style="${tarefa.concluida ? "text-decoration: line-through; opacity: 0.6;" : ""}">
        ${tarefa.texto}
    </span>
    <div>
        <button title="editarTarefa" class="editarTarefa"><img src="assets/icons/editIcon.svg" alt=""></button>
        <button title="excluirTarefa" class="excluirTarefa"><img src="assets/icons/deleteIcon.svg" alt=""></button>
    </div>
    `;

    const checkbox = card.querySelector("input") as HTMLInputElement;
    const btnEditar = card.querySelector(".editarTarefa") as HTMLButtonElement;
    const btnExcluir = card.querySelector(".excluirTarefa") as HTMLButtonElement;
    const span = card.querySelector("span") as HTMLSpanElement;

    checkbox.addEventListener("change", () => {
        service.alternarConclusao(tarefa.id);
        span.style.textDecoration = tarefa.concluida ? "line-through" : "none";
        span.style.opacity = tarefa.concluida ? "0.6" : "1";
        atualizarContagem();
    });

    btnEditar.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = tarefa.texto;
        input.classList.add("input-editar");

        span.replaceWith(input);
        input.focus();

        input.addEventListener("keydown", (e) => { if (e.key === "Enter") input.blur(); });
        input.addEventListener("blur", () => {
            service.editar(tarefa.id, input.value.trim() || tarefa.texto);
            renderizarTarefas();
        });
    });

    btnExcluir.addEventListener("click", () => {
        card.classList.add("fade-out");
        card.addEventListener("animationend", () => {
            service.excluir(tarefa.id);
            card.remove();
            atualizarContagem();
        }, { once: true });
    });

    card.addEventListener("animationend", () => card.classList.remove("animar-entrada"));

    return card;
}

function renderizarTarefas(): void {
    quadroTarefas.querySelectorAll(".card-tarefa").forEach(c => c.remove());
    service.getTodas().forEach(tarefa => quadroTarefas.appendChild(criarCard(tarefa)));
}

btnAdicionar.addEventListener("click", () => {
    const novaTarefa = service.criar();
    const card = criarCard(novaTarefa);
    quadroTarefas.appendChild(card);
    atualizarContagem();

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Digite a tarefa...";
    input.classList.add("input-editar");

    const span = card.querySelector("span")!;
    span.replaceWith(input);
    input.focus();

    input.addEventListener("keydown", (e) => { if (e.key === "Enter") input.blur(); });
    input.addEventListener("blur", () => {
        service.editar(novaTarefa.id, input.value.trim() || "Tarefa sem nome");
        renderizarTarefas();
    });
});

renderizarTarefas();
atualizarContagem();
