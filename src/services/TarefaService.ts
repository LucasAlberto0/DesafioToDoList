import type { Tarefa } from "../models/TarefaInterface";

const Storage_Key = "tarefas";

export class TarefaService {
    private tarefas: Tarefa[] = [];

    constructor() {
        this.tarefas = this.carregarTarefas();
    }

    getTodas(): Tarefa[] {
        return this.tarefas;
    }

    criar(): Tarefa {
        const nova: Tarefa = { id: Date.now(), texto: "", concluida: false };
        this.tarefas.push(nova);
        this.salvarTarefas();
        return nova;
    }

    editar(id: number, novoTexto: string): void {
        const t = this.tarefas.find(t => t.id === id);
        if (t) {
            t.texto = novoTexto;
            this.salvarTarefas();
        }
    }

    excluir(id: number): void {
        this.tarefas = this.tarefas.filter(t => t.id !== id);
        this.salvarTarefas();
    }

    alternarConclusao(id: number): void {
        const t = this.tarefas.find(t => t.id === id);
        if (t) {
            t.concluida = !t.concluida;
            this.salvarTarefas();
        }
    }

    private carregarTarefas(): Tarefa[] {
        const dados = localStorage.getItem(Storage_Key);
        return dados ? JSON.parse(dados) : [];
    }

    private salvarTarefas(): void {
        localStorage.setItem(Storage_Key, JSON.stringify(this.tarefas));
    }
}
