// .ts 파일은 브라우저가 못읽음 
// ts파일을 js로 변환해야 사용가능
// 터미널에서 tsc -w 입력하면 자동변환됨

//타입지정 (첫글자는 대문자)
type Member = [number, boolean];

let john:Member = [123, true];

let 이름 :string  = 'kim';
let 나이 :number = 44;
let 결혼여부 :boolean = false; // undefined, null 타입도 있음

//array
let 이름들 :string[] = ['kim', 'park'];


// object
let 오브젝트이름 :{ name1 : string, name2 : string } = { name1 : 'kim', name2 : 'yang'};

// 오브젝트에 타입지정 해야 할 속성이 너무 많으면

type Member2 = {
    [key :string] : string,
}

let profile : Member2 = { name : 'kim', age: '33' };


// class 타입지정 가능 
class User {
    name :string;
    constructor(name :string){
        this.name = name
    }
}


// Union Type
// 타입2개 이상 합친 새로운 타입 만들기
let 회원 :number | string = 1234;
회원 = 'kim';

let 회원들 :(number | string)[] = [1, '2', 3];
let 오브젝트 :{ a : string | number } = { a : '123'}


// any타입 
// 타입실드 해제문법
// 일반 JS변수로 만들고 싶을 때
// 타입 관련 버그가 나도 잡아주지 않음
let 이름2 :any;
이름2 = 123;
이름2 = [];


// unknown 타입 
// any보다 안전
// unknown은 number타입이 아님
let 이름3 :unknown;

// 간단한 수학연산도 타입을 맞춰야 함

let 나이2 :string | number;

// string타입 +1 (허용)
// number타입 +1 (허용)
// string | number +1 (안됨)

// 나이2 + 1; 안됨 




// 함수는 파라미터,return값에 타입지정 가능
// 자바스크립트와 다른점 -> 타입지정된 파라미터 필수
function 함수(x :number) :number {
    return x * 2
}
함수(5)

// 파라미터가 옵션일 경우엔 -> 파라미터변수?:타입
// 변수?(물음표):number는 -> 변수:number|undefined와 같음
// function 함수3(x? :number) :number {
//     return x * 2
// }
// 함수3()

// 함수에서 void타입 활용 가능 -> 실수로 뭔가 return하는걸 사전에 막을 수 있음
function 함수2(x :number) :void {
    // return x * 2

}

// Narrowing으로 판정해주는 문법들
// typeof 변수
// 속셩명 in 오브젝트자료
// 인스턴스 instanceof 부모

function 내함수(x :number|string){
    if(typeof x === 'string'){
        return x + '1'
    }else{
        return x + 1

    }
    
}

내함수(123);


// assertion 문법의 용도
// 1. Narrowing 할때
// 2. 무슨 타입이 들어올지 100% 확실할 때 쓰기
// 남이 짠 코드 수정할때, 왜 타입에러가 나는지 모르겠을 때 비상용으로 주로 쓰임

function 내함수2(x :number|string){

    let array :number[] = [];
    array[0] = x as number;
    
}

내함수2(123);



// type 변수(alias) 만드는 법

type Animal = string | number | undefined;
type Animal2 = { name : string, age : number }

let 동물:Animal = 123;
let 동물2 :Animal2 = {name : 'kim', age: 5}



//오브젝트 자료 수정도 막을수 있음 -> readonly(읽기전용)
type Boyfriend = {
    readonly name : string
}

const 남친 :Boyfriend = {
    name : '강동원'
}


// type 변수 -> union type으로 합치기 가능
type Name = string;
type Age = number;
//합치기
type Person = Name | Age;


type PositionX = { x :number};
type PositionY = { y :number};
// & 연산자로 오브젝트 타입 합치기 (extend)
type NewType = PositionX & PositionY // = {x:number, y:number}

let position :NewType = { x: 10, y:30}


// 더 엄격한 타입지정  Literal types

let 이름4 : 'kim';
let 접니다 : '솔로' | 'yang';

function 함수5(a:'hello') : 1 | 0 {
    return 1
}

function 가위바위보(a : '가위'| '바위' | '보') : ('가위'| '바위' | '보')[]{
    return ['가위']

}
가위바위보('바위')

// Literal type 문제점

var 자료 = {
    name : 'kim'
} as const // 해결법

function 내함수3(a:'kim'){

}
내함수3(자료.name) // 문제점


// type alias에 함수 type 저장해서 쓰는 법

type 함수타입 = (a: string) => number;

let 함수6 :함수타입 = function(a){
    return 10

}


// object 안에 함수 만들기 
// 다시 해보기
let 회원정보 = {
    name : 'kim',
    plusOne(a:number):number{      //plusOne는 파라미터 number return값은 number(plusOne이라는 속성은 함수여야하고, 숫자를 넣어서 숫자를 뱉는 함수여야합니다.)
        return a + 10;
    },
    changName : () => {// changeName이라는 속성은 함수여야하고, 아무것도 return하면 안됩니다

    }
}

회원정보.plusOne(1)
회원정보.changName()

//html 변경해보기 - narrowing 하는 법 
// 1. null : 제목 != null 
// 2. instanceof : 제목 instanceof Element -> 가장 많이 씀?
// 4. 오브젝트에 붙이는 ?. -> 1. 제목에 innerHTML이 있으면 출력해주고 2. 없으면 undifined (optional chaining)
// 5. strictNullChecks 모드를 false로 바꾸는 무식한 방법
let 제목 = document.querySelector('#title');
// if( 제목 != null ){
if(제목 instanceof Element){
// if(제목?.innerHTML != undefined ){
제목.innerHTML ='반갑습니다.'
}

// 3. as - 비상시만 
let 제목1 = document.querySelector('#title') as Element;
제목1.innerHTML ='반갑습니다.'


let 링크 = document.querySelector('.link');
if(링크 instanceof HTMLAnchorElement){ // 태그마다 다 다름 버튼이면 HTMLButtonElement 등 잘 찾아서 쓰기
링크.href = 'https://kakao.com'
}


//버튼 
let 버튼 = document.querySelector('#button');
버튼?.addEventListener('click', function(){
    console.log('안녕')
})


//반복문 돌리기 1
let 링크2 = document.querySelectorAll('.naver');

링크2.forEach((a)=>{
  if (a instanceof HTMLAnchorElement){
    a.href = 'https://kakao.com'
  }
})


// 반복문 돌리기 2
let 링크3 = document.querySelectorAll('.kakao');

for (let i = 0; i < 3; i++){
  let a = 링크3[i];
  if (a instanceof HTMLAnchorElement){
    a.href = 'https://naver.com'
  }
} 


//class

class Person1 {
    name :string;
ㅣ
    constructor(a :string){
        this.name = a;

    }

    함수8(a: string){
        console.log('안녕'+a)
    }

}


let 사람1 = new Person1('kim');
let 사람2 = new Person1('yang');
사람1.함수8('안녕녕')


//interface
// 장점 : extends로 복사 가능

interface Square { 
    color :string,
    width : number
}

let 네모 :Square = {color : 'red', width :100}


// 해보기 extends -> &기호도 가능
interface Student  { name :string }
interface Teacher extends Student { age :number }

let 학생 :Student = {name : 'kim'}
let 선생 :Teacher = {name : 'yang', age : 55}


// type alias에서도 가능
// &기호 (intesection type) -> 두 타입을 전부 만족하는 타입
type Animal1 = {name :string}
type Cat = { age :number} & Animal1

//type VS interface
// interface는 중복선언 가능 (합쳐짐) - 유연
// type은 중복선언 불가능 - 엄격


// rest parameter 
// 점3개 붙이면 파라미터 무한으로 들어올수 있음
// 다른 파라미터 있으면 맨 뒤에만 사용 가능
function 무한(...a){
// function 무한(num, ...a){

}

무한(1,4,3,6,3,4)

// 타입지정은 어떻게?
// 
function 무한1(...a :number[]){

}


// ... spread operator -> 괄호 제거
// rest parameter은 다른 문법임 
// 참고하기
let arr = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr, ...arr2]

console.log(arr3)


// destructuring 
let arr4 = ['안녕', 100] // 이 자료들을 변수로 빼서 쓰고 싶으면
let [변수1,변수2] = ['안녕', 100] // 이렇게 간단하게 하기

//let {student : student, age1 : age1} = {student : true, age1 : 20} // 오브젝트도 가능
let {student, age1} = {student : true, age1 : 20}  // 생력 가능


// 함수파라미터에 destructuring 가능
let 오브젝트7 = {student : true, age1 : 20} 

function 함수7({student, age}){
    console.log(student, age)

}

함수7({student : true , age : 20}) 



//타입지정
let person = { student : true, age : 20 }

function 함수8({student, age} :{student : boolean, age : number}){
  console.log(student, age)
}
함수8({ student : true, age : 20 })



// Narrowing 2
function 함수9(a :string | undefined){
    if( a && typeof a === 'string'){    // a가 undefined면 if문 실행 x
                                        // a가 string이면 if문 실행 o
 
    }
}


type Fish = {swim :string}
type Bird = {fly :string}

function 함수10(animal :Fish | Bird){
    if( 'swim' in animal){  // Fish타입인지 검사
        animal.swim
    }
}

// instanceof 연산자로 object narrowing 가능
let 날짜 = new Date()
if (날짜 instanceof Date){

}


// 비슷한 object타입이 많을때 literal type 넣어보기
type Car2 = {
    wheel : '4개',
    color : string
}

type Bike = {
    wheel : '2개',
    color : string
}

function 함수11(x :Car2 | Bike){
    if(x.wheel === '4개'){
        console.log('x는 Car타입')

    }
}



// never type
// 조건 1. return 값이 없어야함
// 조건 2. endpoint가 없어야함

function 함수12() :never{
    // throw new Error() // 강제 에러
    while(true){        // 내부코드를 무한히 반복

    }
    

}

// 실사용
// 대부분 쓸데가 없음 - void 쓰면 되니까
// 코드 이상하게 짜면 등장함
function 함수13(parameter :string){
    if(typeof parameter == 'string'){
        console.log(parameter)
    }else{
        console.log(parameter) // never 타입
    }
}


// never 타입 등장 2
// 어떤 함수표현식은 return타입이 자동으로 never
let 함수14 = function(){
    throw new Error()

}


// public private
// public 붙으면 모든 자식들이 이용가능
// 당연히 함수에도 사용가능
class User1{
    // public name = 'kim';
    // private name = 'kim';    // private붙으면 class 안에서만 수정,이용가능
    name :string;
    private familyName :string = 'kim'
    constructor(a){  // 파라미터 적용이 가능하기 때문에 씀
        this.name= this.familyName + a

    }

    이름변경함수(){
        this.familyName = 'park';
    }

}

let 유저1 = new User1('나래')
console.log(유저1)

유저1.이름변경함수()


// 
class Person2{
    constructor(public name :string){

    }

}

let 자식 = new Person2('kim');
console.log(자식)

// protected 붙이면
// 현재 class{}안에서 + extends 된 class{}안에서 사용 가능, 
// protected : extends된 class는 사용 가능, 자식들 사용 불가능
// private : extends된 class는 사용 불가능, 자식들 사용 불가능
class User3{
    protected x = 10;
}

class NewUser extends User3{
    doThis(){
        this.x = 20;
    }
}


// static
// 부모 class에 직접 부여됨 (+자식에게 안물려줌)
class User4{
    // static x = 10;
    public static x = 10;
    y = 20;
}

let 자식2 = new User4();
console.log(자식2)


// 활용
class User5{
    static skill = 'js';
    intro = User5.skill + '전문가입니다.'
}

let 철수1 = new User5();
console.log(철수1)

User5.skill = 'ts'  


let 철수2 = new User5();
console.log(철수2)