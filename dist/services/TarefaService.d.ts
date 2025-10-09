import type { Tarefa } from "../models/TarefaInterface";
export declare class TarefaService {
    private tarefas;
    constructor();
    getTodas(): Tarefa[];
    criar(): Tarefa;
    editar(id: number, novoTexto: string): void;
    excluir(id: number): void;
    alternarConclusao(id: number): void;
    private carregarTarefas;
    private salvarTarefas;
}
//# sourceMappingURL=TarefaService.d.ts.map