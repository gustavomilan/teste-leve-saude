// Interface para um médico, que pode ser reutilizada em outros contextos, se necessário
export interface Medico {
  id?: number;
  nome: string;
  especialidade: string;
  horarios_disponiveis: string[];
}

// Interface ScheduleResource que usa a interface Medico para listar médicos
export interface ScheduleResource {
  medicos: Medico[];
}
