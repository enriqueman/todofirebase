import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  task ={
    actividad:"",
    tipo:"",
    estado:"" 
   //
    

  }
  
  listtasks = [] as any;
  constructor(private database: DatabaseService) {}

  ngOnInit(): void {
      this.database.getAll('tarea').then(firebaseResponse=>{
        firebaseResponse?.subscribe(listtasksRef=>{
          
          this.listtasks = listtasksRef.map(tareaRef=>{

            

            let task= {
              
              'actividad': tareaRef.payload.doc.get('actividad'),
              'tipo': tareaRef.payload.doc.get('tipo'),
              'estado':tareaRef.payload.doc.get('estado'),
              'id':tareaRef.payload.doc.id
            
            } ;
            
          
           
            //task.id=tareaRef.payload.doc.id;

           console.log(task)

            

           return task;
          })
          // listtasksRef.forEach(tareaRef => {
          //   console.log(tareaRef.payload.doc.data());
          // }); // acceder al usuario
         
        })
      })
  }

  eliminar(id:string){
    this.database.delete('tarea',id).then(res=>{
      console.log('Se elimino con exito');
    }).catch(err=>{
      console.log("Error! No se elimino", err)
    });
  }


  modificarform(id:string){
    
    
    this.database.getById('tarea',id);


    
    this.database.update('tarea',this.task,id).then(res=>{
      console.log('Se actualizo con exito');
    }).catch(err=>{
      console.log("Error! No se actualizo", err)
    });

  }



  modificar(id:string){
    this.database.update('tarea',this.task,id).then(res=>{
      console.log('Se actualizo con exito');
    }).catch(err=>{
      console.log("Error! No se actualizo", err)
    });

  }

  markasdone(id:string){

    let a= this.database.getById('tarea',id);

    a.then(res=>{
      res?.subscribe(task1=>{


      let datos ={
        'actividad':  task1.get('actividad'),
        'tipo': task1.get('tipo'),
        'estado': 'Hechisimo'
      }

      this.database.update('tarea',datos,id);



      


       

      })
        
      
    })

  

      
     } 
  
    






   

  registrarTask(){
    this.database.create('tarea',this.task).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log("error en registrarTask", err)
    });

  }

  obtenerporId(id:string){
   
    this.database.getById('tarea',id).then(res=>{
      alert('Se obtuvo el usuario')
    }).catch(err=>{
      console.log("error en registrarTask", err)
    });


  }

}
