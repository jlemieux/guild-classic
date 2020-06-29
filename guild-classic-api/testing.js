// const p = ms => new Promise((resolve, reject) => {
//   console.log('Initial');
//   resolve(ms);
//   console.log('Second');
// })
// .then((f) => {
//   console.log("my result: " + f);
//   return f;
//   //throw new Error('Something failed');
//   //console.log('Do this');
// })
// .catch(() => {
//   console.error('Do that');
// })
// .then((g) => {
//   console.log('Do this, no matter what happened before');
//   console.log(g);
// });
// p("hihi");
// console.log("first?");
// console.log("first?");
// console.log("first?");
// console.log("first?");
// console.log("first?");
// console.log("first?");
// console.log("first?");
// const wait = ms => new Promise(resolve => setTimeout(resolve, 0));
// const p = Promise.resolve();

// wait().then(() => console.log(4));
// Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
// console.log(1); // 1, 2, 3, 4
// const myfunc = () => "james";
// mynum = 4;

// console.log(myfunc());
// console.log(mynum);
console.log(process.env);
