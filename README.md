# 디자인 패턴 with canvas

## SOLID 원칙
### Single Responsibility Principle(SRP)
단일 책임 원칙
- 한 객체는 하나의 책임만 가져야 한다
- 책임 = 변경의 이유
- 객체가 너무 많아지므로 지키지 않는 경우도 많음
### Open Closed Principle(OCP)
개방 폐쇄 원칙
- 확장에 대해서는 열려 있고, 변경에 대해서는 닫혀 있어야 한다.
- 새로운 기능을 추가할 때 기존 코드가 수정되면 안 된다.
### Liskov Substitution Principle(LSP)
리스코프 치환 원칙
- 자식 클래스는 부모 클래스의 역할을 대체할 수 있어야 한다
- 부모 클래스의 자리에 자식 클래스를 넣고 타입 에러가 나나 확인해보면 됨
### Interface Segregation Principle(ISP)
인터페이스 분리 원칙
- 클래스는 자신이 사용하지 않는 인터페이스는 구현하지 말아야 한다
- 인터페이스의 단일 책임 원칙
- 인터페이스를 쪼개서 여러 개로 만들고, 필요한 만큼 implements
### Dependency Inversion Principle(DIP)
의존성 역전 원칙
- 추상성이 높은 클래스와 의존 관계를 맺는다
- interface, abstract class를 매개변수로 받자

# GoF 디자인 패턴
## 생성(creational patterns)
### 싱글턴(Singleton)
하나의 인스턴스만 존재함을 보장
- 생성자도 private으로(자바스크립트에서는 symbol 사용해서 생성자 호출 막기)
- 단일 책임 원칙 위반!
  
![singleton drawio (1)](https://github.com/user-attachments/assets/97072e3e-4b16-4314-9f87-a48212967955)

### 심플 팩토리(Simple Factory)
객체를 반환하는 함수
- 주로 조건문에 따라 다른 객체를 반환함
- 단일 책임 원칙 위반!
- 개방 폐쇄 원칙 위반!
  
![simple-factory drawio](https://github.com/user-attachments/assets/308d7a41-20d0-41af-a429-b66abef830b7)

### 팩토리 메서드(Factory Method)
상위 클래스가 인터페이스 역할, 하위 클래스에서 구체적인 구현
- 하위 클래스를 다양하게 만들어 OCP, SRP 충족
- 상속을 통해서도 다른 객체를 생성할 수 있음

![factory-method drawio](https://github.com/user-attachments/assets/8a1b7a42-a739-4902-8283-fad52565435b)

### 추상 팩토리(Abstract Factory)
여러 팩토리의 그룹
- 팩토리 메서드 패턴에서 확장하면 편함
- 그림판, 메뉴, 히스토리의 세트가 브라우저별로 생성됨(Chrome 메뉴에 IE 히스토리가 생기는 등의 상황을 방지)

![abstract-factory drawio](https://github.com/user-attachments/assets/d324f149-aca9-47b5-9ec7-d64b18c40669)


### 빌더(Builder)
복잡한 객체의 단계별 생성
- drawBtnByType 메서드가 director(빌더의 set 메서드의 순서를 정하고 실행하는)의 역할
- setter에서 개별 속성 validation을 하고, build에서 최종적으로 전체 validation을 한 번 더 하면 좋음.

![builder drawio](https://github.com/user-attachments/assets/b2440e33-c07e-4ac3-a134-82311fe05980)


### 프로토타입(Prototype)
기존 객체를 복사(clone)해서 생성 후 달라지는 부분만 활용
- javascript의 prototype을 활용해 객체를 생성하는 것(Object.create(프로토타입))도 어떻게 보면 프로토타입 타입 패턴임

![_prototype drawio](https://github.com/user-attachments/assets/2a61051d-dc8c-40e6-bfa4-6c006854f119)

## 행동(behavioral patterns)
### 명령(Command)
명령을 표준화된 객체로 만듦
- 마우스 이벤트든, 단축키 이벤트든 상관 없이 동일한 명령 수행 가능
- 비즈니스 로직은 receiver로 분리해도 되고, 안 해도 되고.
- GrimpanMenu가 invoker(커맨드 실행) 역할, GrimpanHistory가 receiver(비즈니스 로직 수행) 역할

![command drawio](https://github.com/user-attachments/assets/716dd1ca-0a92-4afe-8e27-dd279d1664f3)

### 상태(State)
객체의 상태를 외부 객체로 분리하는 패턴
- 상태에 따른 if/switch 문이 여러 메서드에 걸쳐 중복될 때 유용
- 상태는 직접 자신의 상태를 바꿀 수 있음
- setMode 함수가 원래는 Mode를 매개변수로 받아 변경해야 하지만, 지금은 factory 패턴 형태의 메서드가 되었음.

![state drawio](https://github.com/user-attachments/assets/95c28112-b462-4d62-9c72-82bedd2e774e)


### 전략(Strategy)
객체의 알고리즘(전략)을 외부 객체로 분리하는 패턴
- 상태 패턴과 유사하나, 다른 점은 전략 패턴은 자신의 전략을 스스로 바꿀 수 없다는 점
- 전략 객체가 간단한 경우 람다 함수(익명 함수)로 만들어서 사용하면 편리

![strategy drawio](https://github.com/user-attachments/assets/fea59849-7ba5-4a5a-8575-91f0fd2517e1)


### 서식 메서드(Template Method)
일련의 과정을 부모 클래스의 메서드로 만들어두고 달라지는 부분만 자식 클래스에서 재정의
- 대부분 공통인데 일부 기능만 다른 경우 활용하면 좋음
- 가독성이 떨어진다는 단점

![template-method drawio](https://github.com/user-attachments/assets/c9e2328d-25f7-470d-a04c-83da05fc8692)

  
### 책임 연쇄(Chain of Responsibility)
한 대상에 일련의 작업을 연달아 수행하는 패턴
- 미리 다음 작업을 등록해두어야 함(setNext)
- 도중에 중단할 수도 있음(next.handle을 호출하지 않으면 됨)

![chain-of-responsibility drawio](https://github.com/user-attachments/assets/d90da306-37b2-4b56-b35e-f2c6994fbf4c)


### 옵저버(Observer)
다른 대상의 상태를 직접 물어보지 않고, 그 대상에게 자신의 연락처를 남긴 뒤 나중에 알려주기를 기다리는 패턴
- 비동기, 이벤트 드리븐 개발이 가능해짐.
- Observer가 Publisher 역할, Listener가 Subscriber 역할
- 하나의 이벤트 당 하나의 Observer가 생김
- 이벤트가 많아져 옵저버가 여러 개 생기면 펍섭 패턴을 대신 사용하는 게 좋음

![observer drawio (1)](https://github.com/user-attachments/assets/0e0f35a5-91db-4b21-8f32-4f703db9bd36)

### 펍섭(Pub/Sub)
옵저버와 유사하나 이벤트 중개를 중앙에서 하는 패턴
- 여러 옵저버 대신 하나의 SubscriptionManager가 모든 이벤트를 관리
- Redis나 Memcached, DB 등으로 외부화 가능
- UML을 언뜻 보면 Observer와 동일해보이나 Observer 패턴의 Observer는 이벤트 별로 개수가 늘어나는 데 반해, SubscriptionManager는 싱글턴인 경우가 많음
  
![pubsub drawio (1)](https://github.com/user-attachments/assets/41d95a52-0806-4601-b80a-27fc8396c76e)


### 중재자(Mediator)
중앙에서 이벤트를 모두 처리하는 객체가 있는 패턴
- 펍섭의 SubscriptionManager와 유사해보이나 listener를 등록하는 시스템이 아님.
- Event 객체를 중재자한테 전달하면 중재자가 알아서 적합한 객체를 골라 비즈니스 로직을 실행시킴
- 중재자의 역할이 너무 커져 단일 책임 원칙, 개방 폐쇄 원칙 위반 소지가 다분

![mediator drawio (1)](https://github.com/user-attachments/assets/c66f94ba-7554-421c-8c9c-59501feaa5f5)


### 반복자(Iterator)
순회가능한 객체를 반복하는 패턴
- 배열, 문자열이 이미 Itertator protocol을 사용해서 구현되어 있음

### 메멘토(Memento)
객체의 현재 상태를 박제하는 패턴
- 객체는 불변 객체여야 함(Object.freeze 사용하기)
- 박제할 대상 객체 내부에 위치하는 게 좋음(private 속성 접근 위해서)

### 방문자(Visitor)
로직을 외부 클래스로 분리하는 패턴
- private, protected 속성을 사용하기 어려움

## 구조(structural patterns)

### 퍼사드(Facade)
복잡한 서브시스템은 감추고 클라이언트가 관심있어할 만한 메서드만 공개하는 패턴
- 대부분 이미 이 패턴을 사용하고 있음
- 하나의 함수가 여러 다른 객체를 사용하고 있다면 그것도 일종의 퍼사드 패턴임

![facade drawio](https://github.com/user-attachments/assets/dd645e5b-e854-480d-86c3-46a6af3735b9)


### 어댑터(Adapter)
서로 호환되지 않고 코드 수정도 어려운 두 인터페이스를 호환시키는 패턴
- 써드파티 라이브러리는 코드를 수정하기 어려우므로 어댑터 패턴을 사용해서 타입을 맞추는 경우가 많음
- 써드파티가 아니더라도 이미 여러군데서 사용하고 있는 내 코드는 수정하기 어려우므로 어댑터로 맞추는 경우가 많음

![adapter drawio](https://github.com/user-attachments/assets/77647f3c-9dfb-453c-9239-50b6a7d4b0b3)


### 데코레이터(Decorator)
### 믹스인(Mixin)
### 대리인(Proxy)
### 플라이급(Flyweight)
### 다리(Bridge)
### 컴포지트(Composite)
