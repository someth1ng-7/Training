// console.log("Hello")

// //variable
// //let, var, const

// let a;
// a=20;
// console.log(a);

// const name="Pradosh"
// console.log(name);

// //operator
// let names;
// if(names="Pradosh"){
//     console.log("Hello Pradosh");
// }
// else{
//     "Hello anonomys user"
// }


// let a=5;
// let b=6;
// console.log(a);
// console.log(b);

// if (a%2==0){
//     console.log("Even");
// }
// else{
//     console.log("Odd");
// }
// if(b%2==0){
//     console.log("Even");
// }
// else{
//     console.log("Odd")
// }

// let x=10,y=20,z=30;
// if (x>y && x>z){
//     console.log(x,"is the greatest number");
// }
// else if(y>x && y>z){    
//     console.log(y,"is the greatest number");
// }
// else{
//     console.log(z,"Is the greatest number");
// }

// const a=2; b=4; c=1; let d;
// if(a>b && a>c){
//     d=a;
// }
// else if(b>a && b>c){
//     d=b;
// }
// else{
//     d=c;
    
// }
// console.log(d,"Is the greatest number");


// let bird1 ="Penguine";
// let bird2 ="Ostrich";
// if (bird1=='Penguine'|| bird2=='Eagle'){
//     console.log("True")
// }
// else{
//     console.log("False")
// }

// console.log(typeof(bird));
// let number= 10.3435;

// const arr=["ram", "hari", 20, true];
// arr.push("Pradosh");
// arr.pop()
// console.log(arr);

// const obj={
//     name:"Ram",
//     age:20,
//     course: 'computer',
//     item: [
//         {num: 20, name1:'koiralo', ride: 'fortuner'}]
    

// }
// console.log(obj.item[0].ride);

// console.log(obj.name);
// console.log(obj.age)
// console.log(obj.course)
// console.log(obj.item[3]);
// console.log(obj.item)
// console.log(obj.item.push("Hari","Pradosh"));
// console.log(obj.item);
// console.log(obj.item.pop())
// console.log(obj.item)


// for(let i=5; i>=0; i--){
//   console.log(i);
// }

// for (let i=2; i<=20; i=i+2){
//   console.log(i)
// }

// const arr=[1,2,3,4,5,6,7,8,9,10];

// for(let i=0; i<arr.length; i++){
//   if(arr[i]%2==0){

//   console.log(arr[i]);
// }
// }

// const arr=[1,2,3,4,5,6,7,8,9,10]
// for(let i=0; i<arr.length; i++){
//   if(arr[i]%2==0){
//     console.log(`This value is odd: ${arr[i]}`);
//   }
//   else{
//     console.log(`This value is even: ${arr[i]}`);
//   }
// }

// function name(a,b){
//   console.log(a+b)
// }
// name(2,3)
// name(10,11)


// function oddeven(a){
//   if(a%2==0){
//     console.log("Even");
//   }
//   else{
//       console.log("Odd");
//     }
// }

// oddeven(10)
// oddeven(11)

// const arrow =() => {
//   console.log("arrow function");

// }
// arrow()

const fetchData = async()=>{
  const data= await fetch("https://dummyjson.com/users")
  const res= await data.json()
  // console.log(res.users[1].id);
  console.log(res.user);
  res.users.map(user =>{
    console.log(user.id);
  })
}
fetchData(); 
