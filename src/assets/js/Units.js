import {DatabaseStorage}  from './DatabaseStorage.js';
export class Units extends DatabaseStorage {
    static GetUnits() {
        return super.GetData('units');
    }
    static StoreLocal(unit) {
        super.StoreLocal(super.FormatObject(unit.id==null?this.GenerateNewId():unit.id, {unitName:unit.title}), 'units');
    }
    static GenerateNewId() {
        return super.GenerateNewId('units');
    }

    static GetElementWithId(id) {
        return super.GetElementWithId('units',id);
    }
    static UnitNameExists(unitName) {
        let unitsWithName = this.GetUnits().filter(unit=>unit.unitName==unitName);
        return unitsWithName.length>0;
    }
    static AddDefault() {
        if(!Units.UnitNameExists(DefaultUnitNames[0].title)) {
            DefaultUnitNames.forEach(unit=>{
                Units.Store(unit);
            })
        }
    }
}


const DefaultUnitNames = [{title:"No unit specified", id:-1},{title:"Gram(s)", id:0}, {title:"Pill(s)", id:1}, {title:"Injection(s)", id:2}, {title:"Hit(s)", id:3}, {title:"Milligram(s)", id:4}, {title:"Cigarette(s)", id:5}]