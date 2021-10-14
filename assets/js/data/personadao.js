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
        
        for(let key of keys){
            let tmp = JSON.parse(localStorage.getItem(key));
            all.push(tmp)
        }

        return all;

    }

    eliminar(id){
        localStorage.removeItem(id);
    }
}