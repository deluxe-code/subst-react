
import {DatabaseStorage}  from './DatabaseStorage.js';
import { Units } from './Units.js';
export class Drugs extends DatabaseStorage{
    static Store(formattedDrug) {
        if(!Drugs.DrugNameExists(formattedDrug.drugName)) {
            return super.Store(formattedDrug);
        } else {
            window.alert('drug name exists')
        }
    }
    static StoreLocal(formattedDrug) {
        super.StoreLocal(formattedDrug, 'drugs');
    }

    static FormatDrug(drugName, description = "", unitId=-1) {
        return super.FormatObject(this.GenerateNewId(), {drugName:drugName, description:description, unitId:unitId});
    }
    static GetDrugs() {
        return super.GetData('drugs');
    }
    static GenerateNewId() {
        return super.GenerateNewId('drugs');
    }
    static FindDrugWithID(id) {
        let drugs = this.GetDrugs();
        let drug = drugs[super.FindIndexOfId(id, drugs)];
        return drug;
    }

    static DrugNameExists(drugName) {
        let drugsWithName = this.GetDrugs().filter(drug=>drug.drugName==drugName);
        return drugsWithName.length>0;
    }

    static AddDefault() {
        Units.AddDefault();
        if(!Drugs.DrugNameExists(DefaultDrugs[0].drugName)) {
            DefaultDrugs.forEach(drug=>{
                Drugs.Store(drug);
            })
        }
    }

    static ChangeDescription(id, description) {
        let drug = Drugs.FindDrugWithID(id);
        drug.description = description;
        super.ChangeData('drugs', id, drug);
    }
}

const DefaultDrugs = [Drugs.FormatDrug("Marijuana", null, 0),Drugs.FormatDrug("Cocaine", null, 0),Drugs.FormatDrug("Heroin", null, 0),Drugs.FormatDrug("Meth", null, 0),Drugs.FormatDrug("Adderall", null, 4), Drugs.FormatDrug("Nicotine", null, 3), Drugs.FormatDrug("Kratom", null, 0)]