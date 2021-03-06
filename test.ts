
// 변수 타입 지정해보기 1
let user :string = 'kim';
let age :number | undefined  = undefined;
let married :boolean = false; 
let 철수 :(string|number|boolean )[] = [user, age, married];


// 타입 지정해보기  답 2
let 학교 : {
    score : (number | boolean)[],
    teacher : string,
    friend : string | string[]
}

= {
    score : [100, 97, 84],
    teacher : 'Phil',
    friend : 'John'
}
학교.score[4] = false;
학교.friend = ['Lee' , 학교.teacher]




// 이름을 파라미터로 입력하면 콘솔창에 "안녕하세요 홍길동"을 출력해주고
// 아무것도 파라미터로 입력하지 않고 함수를 사용하면 "이름이 없습니다" 를 출력하는 함수를 만들어봅시다.
function hello(x :string){
    if(x){
        console.log('안녕하세요' + x)
    } else{
        console.log('입력해주세요')
    }
}


// 함수에 숫자 또는 문자를 집어넣으면 자릿수를 세어 출력해주는 함수를 만들어보십시오.
// 예를 들어 '245' 이런 문자를 입력하면 3이 return 되어야합니다.
// 숫자도 마찬가지로 9567 이런 숫자를 입력하면 4가 return 되어야합니다.
// 숫자 또는 문자 이외의 자료가 들어오면 안됩니다. 

function count(x : number | string) :number{
    return x.toString().length
}

// 결혼 가능 확률을 알려주는 함수를 만들어봅시다.
// 1. 함수의 파라미터로 월소득(만원단위), 집보유여부(true/false), 매력점수 ('상' or '중' or '하') 를 입력할 수 있어야합니다. 
// 2. 월소득은 만원 당 1점, 집보유시 500점 & 미보유시 0점, 매력점수는 '상'일 때만 100점으로 계산합니다. 
// 3. 총 점수가 600점 이상일 경우 "결혼가능"을 return 해줘야합니다. 그 외엔 아무것도 return하지 않습니다.

// (예시)
// 결혼가능하냐(700, false, '중') 이렇게 사용할 경우 "결혼가능"을 return 해줍니다.
// 결혼가능하냐(100, false, '상') 이렇게 사용할 경우 아무것도 return되지 않습니다.

function 결혼가능하냐(money :number, house :boolean, charm :string) :string|void{
    let score :number = 0;
    score += money;
    if (house === true){
      score += 500
    }
    if (charm === '상'){
      score += 100
    }
    if (score >= 600){
      return '결혼가능'
    } 
  }
  console.log(결혼가능하냐(100,true,'상'))



// 숫자여러개를 array 자료에 저장해놨는데
// 가끔 '4', '5' 이런 식의 문자타입의 숫자가 발견되고 있습니다.
// 이걸 클리닝해주는 함수가 필요합니다. 
// 클리닝함수( ['1', 2, '3'] ) 이렇게 숫자와 문자가 섞인 array를 입력하면
// [1,2,3] 이렇게 숫자로 깔끔하게 변환되어 나오는 클리닝함수를 만들어오고 타입지정까지 확실히 해보십시오

function 클리닝함수(a :(number|string)[]){

    let 클리닝완료된거 :number[] = [];

    a.forEach((b)=>{
        if (typeof b === 'string') {
        클리닝완료된거.push(parseFloat(b))
        } else {
        클리닝완료된거.push(b)
        }
    })

    return 클리닝완료된거
    }

    console.log( 클리닝함수([123,'3']) )



// 1. 이 타입은 object 자료형이어야합니다.
// 2. 이 타입은 color 라는 속성을 가질 수도 있으며 항상 문자가 들어와야합니다. 
// 3. 이 타입은 size 라는 속성이 있어야하며 항상 숫자가 들어와야합니다.
// 4. 이 타입은 position 이라는 변경불가능한 속성이 있어야하며 항상 숫자가 담긴 array 자료가 들어와야합니다.  
// type alias로 만들어보셈 

type One = {
    color? : string, 
    size : number
    readonly position : number[]
}

let 테스트 :One ={
  size : 1234,
  position : [1,2,3,4]

  }


// 1. 대충 이렇게 생긴 object 자료를 다룰 일이 많습니다. { name : 'kim', phone : 123, email : 'abc@naver.com' }
// 2. object 안에 있는 이름, 전화번호, 이메일 속성이 옳은 타입인지 검사하는 type alias를 만들어봅시다.
// 3. 각 속성이 어떤 타입일지는 자유롭게 정하십시오. 

type Two ={
  name : string,
  phone : number,
  email : string
}

let 테스트2 :Two = {
  name : 'kim',
  phone : 123,
  email : 'na@naver.com'
}

// 0. Two에서 만들어둔 type alias에 미성년자여부 extend 하기
// 1. 이번엔 이름, 전화번호, 이메일, 미성년자여부 속성을 옳은 타입인지 검사하는 type alias를 만들어봅시다.
// 2. 미성년자 여부 속성은 true/false만 들어올 수 있습니다. 

type three ={
  name : string,
  phone : number,
  email : string
}
type add = { adult : boolean}

type fin = three & add;

let 테스트3 : fin = {
  name : 'kim',
  adult : true,
  phone : 1234,
  email : 'rae@naver.com'
}


// 다음 함수2개를 만들어보고 타입까지 정의해보십시오.
// - cutZero()라는 함수를 만듭시다. 이 함수는 문자를 하나 입력하면 맨 앞에 '0' 문자가 있으면 제거하고 문자 type으로 return 해줍니다.
// - removeDash()라는 함수를 만듭시다. 이 함수는 문자를 하나 입력하면 대시기호 '-' 가 있으면 전부 제거해주고 그걸 숫자 type으로 return 해줍니다. 
// - 함수에 타입지정시 type alias를 꼭 써보도록 합시다. 
// 물론 문자제거 하는 방법을 모른다면 구글검색이 필요합니다. 

type CutType = (x :string) => string

let cutZero :CutType = function (x){
    let result = x.replace(/^0+/, ""); // /어쩌구/ 이건 정규식문법인데 정규식은 글자에서 원하는 글자를 찾는 식일 뿐입니다. 구글 검색
    return result
}
function removeDash(x :string) :number{
    let result = x.replace(/-/g, "");
    return parseFloat(result)
}



// Car 클래스를 만들고 싶습니다.
// 1. 대충 { model : '소나타', price : 3000 } 이렇게 생긴 object를 복사해주는 class를 만들어보십시오.
// 2. 그리고 복사된 object 자료들은 .tax() 라는 함수를 사용가능한데 현재 object에 저장된 price의 10분의1을 출력해주어야합니다. 
// 3. model과 price 속성의 타입지정도 알아서 잘 해보십시오. tax() 함수의 return 타입도요. 

class Car{
  model :string;
  price :number;

  constructor(a :string, b : number){
    this.model = a;
    this.price =b;
  }
  tax() :number{
    return this.price * 0.1
  }
}

let 소나타 = new Car('소나타',4000);
console.log(소나타);
console.log(소나타.tax());


// class인데 파라미터가 잔뜩 들어가는 class Word를 만들어봅시다.
// 1. object 만들 때 new Word() 소괄호 안에 숫자 혹은 문자를 입력하면 
// 2. 숫자는 전부 object 안의  num 속성 안에 array 형태로 저장되고 
// 3. 문자는 전부 object 안의 str 속성 안에 array 형태로 저장되는 class를 만들어봅시다.
// 4. class 만들 때 넣을 수 있는 숫자와 문자 갯수는 일단 제한은 없습니다. 그리고 타입 빼먹지 마셈 

// 다시 해보기

class Word{
  num;
  str;

  constructor(...param){
    let 숫자들 :number[] = [];
    let 문자들 :string[] = [];

    param.forEach((i)=>{
      if (typeof i ==='string') {
        문자들.push(i)
      } else {
        숫자들.push(i)
      }
    })

    this.num = 숫자들;
    this.str = 문자들;
  }
}


let obj = new Word('kim', 3, 5, 'park');
console.log(obj.num) //[3,5]
console.log(obj.str) //['kim', 'park'] 


//interface 1

interface contents {
  brand :string,
  serialNumber :number,
  model :string[]
}

let 상품 :contents = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] }


//interface 2

interface Cart {
  product :string,
  price : number
}

let 장바구니 :Cart[] = [ { product : '청소기', price : 7000 }, { product : '삼다수', price : 800 } ] 

//interface 3

interface Update extends Cart {card :boolean}

let 업데이트 :Update = { product : '청소기', price : 7000, card : false }



//interface 4
// object 안에 함수를 2개 넣고 싶은데요 
// 1. 이 object 자료는 plus() 함수를 내부에 가지고 있으며 plus 함수는 파라미터 2개를 입력하면 더해서 return 해줍니다. 
// 2. 이 object 자료는 minus() 함수를 내부에 가지고 있으며 minus 함수는 파라미터 2개를 입력하면 빼서 return 해줍니다. 
// 이 object 자료를 어떻게 만들면 될까요? 
// interface를 이용해서 object에 타입지정도 해보십시오. 

// 다시 해보기
// 함수타입은 ()=>{} 이렇게 만들면 됨
interface MathObj {
  plus : (a:number, b:number) => number,
  minus : (a:number, b:number) => number
}

let 오브젝트1 :MathObj = {
  plus(a,b){
    return a + b
  },
  minus(a,b){
    return a - b
  }
} 

// 숫자 여러개를 입력하면 최댓값을 return 해주는 함수를 만들어봅시다. 
// 최댓값(6,3,7,2) 이렇게 쓰면 7이 return 되어야합니다. 
// (조건1) 넣을 수 있는 숫자 갯수는 제한없음, 0 이상의 정수만 가능합니다.
// (조건2) Math.max() 사용금지 반복문이나 쓰셈 

function 최댓값(...x : number[]) {
  let result = 0;
  x.forEach((i)=>{
    if (result < i) {
      result = i
    }
  })
  return result;
}
console.log(최댓값(4,6,3,2)) 