
export interface SchedulingPayload {
        medico_id : number,
        paciente_nome: string,
        data_horario: string;
}

export interface SchedulingResponse{
    mensagem: string,
    agendamento:{
        medico: string,
        paciente: string,
        data_horario: string
    }
}