import { ContactAddress } from './contactAddress.class';
import { PersonalData } from './personalData.class';
import { ProfessionalElectoral } from './professional-electoral.class';
import { NotificationNotes } from './notification-notes.class';

export class People {
    _id: string;
    dados_pessoais: PersonalData;
    endereco_contato: ContactAddress;
    profissional_eleitoral: ProfessionalElectoral;
    notificacoes_anotacoes: NotificationNotes;
}
