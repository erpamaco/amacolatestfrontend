import React from 'react'
// import Arrowfuction from './arrowfunctions'

export default function classes(props) {





    // Now you can create objects using the Car class:
    class Car {
        constructor(name) {
          this.brand = name;
        }
        Present(){
          return "hello " + this.brand
        }

        
      }

//       class Car {
//         constructor(name) {
//           this.brand = name;
//         }
//       }

      

      
  
// // Create an object called "mycar" based on the Car class:
      const mycar = new Car("Ford");


// // -----------------------------------------
//     //   Method in Classes
//     {mycar.brand}






















    


    class Bike {
        constructor(name) {
          this.brand = name;
        }
      
        TEXT() {
          return 'I have a ' + this.brand;
        }
      }

      
      const mybike = new Bike("KTM");


//     //   -----------------------------------------------------


//     // Class Inheritance
  

//     // Create a class named "Model" which will inherit the methods from the "Car" class:

    class College {
        constructor(name) {
          this.brand = name;
        }
        present() {
          return 'I am  Studying In ' + this.brand;
        }
      }
      class Model extends College {
        constructor(name, mod) {
          super(name);
          this.model = mod;
        }  
        show() {
            return this.present() + ', it is at ' + this.model
        }
      }
      const mycollege = new Model("Aloysius", "light house hill");
      
    

  return (
    <div>
        
      {mycar.brand}<br />{mybike.TEXT()}<br />{mycollege.show()}</div>
  )
}


// // i am staying in mangalore , it is a city










// class Car {
//   constructor(name) {
//     this.brand = name;
//   }

//   present() {
//     return 'I have a ' + this.brand;
//   }
// }





// // const mycar = new Car("Ford");
// // document.write(mycar.present());






// // class Car {
// //   constructor(name) {
// //     this.brand = name;
// //   }

// //   present() {
// //     return 'I have a ' + this.brand;
// //   }
// // }

// // class Model extends Car {
// //   constructor(name, mod) {
// //     super(name);
// //     this.model = mod;
// //   }  
// //   show() {
// //     return this.present() + ', it is a ' + this.model
// //   }
// // }

// // const mycar = new Model("Ford", "Mustang");
// // document.write(mycar.show());


































//      Parent Class      |        Child Class
// My Name is "Your Name" | and I am "React Developer"







