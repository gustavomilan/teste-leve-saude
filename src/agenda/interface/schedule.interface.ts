export interface ScheduleResource {
    
    medicos:{
        id?: number;
        nome: string;
        especialidade: string;
        horarios_disponiveis: string[];
    }[];
}