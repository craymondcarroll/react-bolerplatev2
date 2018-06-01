

const add = (a,b) => a + b;
const generateGreeting = (name) => `Hello ${name}!`;



/******************
 *
 ******************/
test("Should add two numbers", ()=> {

  const results = add(3,4);

 /* if (results != 7) {
       throw new  error (`You added 4 + 3 and we got back ${results} but we expected 7`);
  }*/

 expect(results).toBe(7);

});




/******************
 *
 ******************/
test("Test for String Name", ()=>{

    const result = generateGreeting("Raymond");
    expect(result).toBe("Hello Raymond!");

});