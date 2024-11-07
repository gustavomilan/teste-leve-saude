export interface Agendamento {
  medico: string;
  paciente: string;
  data_horario: string;
}

export interface SchedulingResponse {
  mensagem: string;
  agendamento: Agendamento;
}
