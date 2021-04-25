import { v4 as uuidv4 } from 'uuid';
export class DatabaseStorage {

    static Store(formattedObj) {
        //Once user preferences are set up we will use a "local" or "cloud storage" preference to choose between storing with the StoreLocal function vs the StoreCloud.
        return this.StoreLocal(formattedObj);
    }
    static StoreLocal(formattedObj, location) {
        let data = this.GetData(location);
        data.push(formattedObj);
        localStorage.setItem(location, JSON.stringify(data));
        return formattedObj;
    }
    static StoreCloud(formattedObj, location){
        
    }
    static GetData(location) {
        if(localStorage.getItem(location)==null||localStorage.getItem(location)=="") {
            localStorage.setItem(location, "[]");
        }
        
        let data = JSON.parse(localStorage.getItem(location));
        
        return data;
    }

    static ChangeData(location, id, replacement) {
        let data = this.GetData(location);
        data[this.FindIndexOfId(id, data)] = replacement;
        this.ReplaceAll(location, data);
    }

    static RemoveData(location, index) {
        let data = this.GetData(location);
        data.splice(index, 1);
        this.ReplaceAll(location, data);
    }

    static ReplaceAll(location, arr) {
        localStorage.setItem(location, JSON.stringify(arr));
    }

    static GenerateNewId(databaseName) {
        let database = this.GetData(databaseName);
        return uuidv4();
    }
    static FindIndexOfId(id, list) {
        return list.findIndex(element=>element.id==id);
    }
    static GetElementWithId(location, id) {
        let data = this.GetData(location);
        return data[this.FindIndexOfId(id, data)];
    }
    static FormatObject(id, obj) {
        
        obj.id = id;
        return obj;
    }
}
