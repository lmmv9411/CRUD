export class PersonaDAO {
    guardar(persona) {
        let json = JSON.stringify(persona);
        localStorage.setItem(persona.id, json);
    }
    mostrar(id) {
        return localStorage.getItem(id);
    }
    mostrarTodo() {
        let all = [];
        const keys = Object.keys(localStorage);
        ///console.log(keys);
        
        for(let key of keys){
            
            let tmp = JSON.parse(localStorage.getItem(key));
            
            if (tmp.id !== undefined){
              all.push(tmp)
            }
        }

        return all;

    }

    eliminar(id){
      console.log(id);
        localStorage.removeItem(id);
    }
}