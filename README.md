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
- 상속 대신 합성을 하자
- interface, abstract class를 매개변수로 받자

# GoF 디자인 패턴
* 강의에서 나오는 클라이언트(client)는 클라이언트-서버의 클라이언트가 아니라(사실 의미가 같기는 함), 현재 디자인패턴을 사용하는 코드를 클라이언트라고 부른다.

## UML(강의를 위해 커스텀화)
![legend drawio (1)](https://github.com/user-attachments/assets/daed106f-f368-4fa1-8c85-8db527fd837d)

## 생성(creational patterns)
### 싱글턴(Singleton)
하나의 인스턴스만 존재함을 보장
- 생성자도 private으로(자바스크립트에서는 symbol 사용해서 생성자 호출 막기)
- 단일 책임 원칙 위반!
- 강결합으로 인해 테스트하기 어려움
  
![singleton drawio](https://github.com/user-attachments/assets/e81c7f9d-53e7-4b42-ab17-732734c6cbae)

### 심플 팩토리(Simple Factory)
객체를 반환하는 함수
- 주로 조건문에 따라 다른 객체를 반환함
- 단일 책임 원칙 위반!
- 개방 폐쇄 원칙 위반!

![simple-factory drawio (1)](https://github.com/user-attachments/assets/2b1f7b8c-856a-464d-97b1-f805719a1793)


### 팩토리 메서드(Factory Method)
상위 클래스가 인터페이스 역할, 하위 클래스에서 구체적인 구현
- 하위 클래스를 다양하게 만들어 OCP, SRP 충족
- 상속을 통해서도 다른 객체를 생성할 수 있음

![factory-method drawio (1)](https://github.com/user-attachments/assets/3dce6caf-e987-4c78-99da-a785d3fefd4c)


### 추상 팩토리(Abstract Factory)
여러 팩토리의 그룹
- 팩토리 메서드 패턴에서 확장하면 편함
- 그림판, 메뉴, 히스토리의 세트가 브라우저별로 생성됨(Chrome 메뉴에 IE 히스토리가 생기는 등의 상황을 방지)

![abstract-factory drawio (1)](https://github.com/user-attachments/assets/ebf9cb43-81ff-4c29-b791-eedf50e9ccf2)

### 빌더(Builder)
복잡한 객체의 단계별 생성
- drawButtonByType 메서드가 director(빌더의 set 메서드의 순서를 정하고 실행하는)의 역할
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

![iterator drawio](https://github.com/user-attachments/assets/f404bdcc-26da-48d6-be51-df8679d9431f)

### 메멘토(Memento)
객체의 현재 상태를 박제하는 패턴
- 객체는 불변 객체여야 함(Object.freeze 사용하기)
- 박제할 대상 객체 내부에 위치하는 게 좋음(private 속성 접근 위해서)
- 메멘토 객체를 생성하는 객체를 Originator(Grimpan), 사용하는 객체를 Caretaker(GrimpanHistory)라고 부름
  
![memento drawio](https://github.com/user-attachments/assets/2bfb8f45-6cf3-4f46-970e-74c8d4da6854)

### 방문자(Visitor)
로직을 외부 클래스로 분리하는 패턴
- private, protected 속성을 사용하기 어려움
- draw 메서드는 일반적으로 accept라는 이름을 가짐
- 클라이언트(GrimpanMenu)는 동일한 인터페이스(draw)로 다양한 버튼을 그릴 수 있음

![visitor drawio](https://github.com/user-attachments/assets/cf5e91cc-7d25-48b1-9822-52a539af963b)


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

![adapter drawio](https://github.com/user-attachments/assets/6de099dc-6776-4eae-a800-448042f308ae)

### 데코레이터(Decorator)
기존 클래스 변경 없이 기능을 확장하는 패턴
- 기존 클래스와 동일한 인터페이스 또는 일부 확장된 인터페이스를 가짐
- 자바스크립트 데코레이터는 아래 믹스인 패턴 참고

![decorator drawio](https://github.com/user-attachments/assets/ea7c855e-609d-45f6-aea4-65e34032a407)

### 믹스인(Mixin)
기존 클래스를 상속하여 기능을 확장하는 패턴
- 자바스크립트의 클래스 데코레이터를 믹스인 패턴으로 구현하기도 함
- 리액트에서도 클래스 컴포넌트 시절 많이 사용되었음

![mixin drawio](https://github.com/user-attachments/assets/62782bfd-bcd0-4c98-8100-4f48913db0d2)


### 대리인(Proxy)
기존 클래스 변경 없이 접근제어, 캐싱, 지연 로딩 등의 기능을 추가하는 패턴
- 자바스크립트의 프록시 객체도 프록시 패턴의 구현체로 볼 수 있음
- 클라이언트(GrimpanMenu)는 원본 객체인지 프록시 객체인지 신경쓰지 않

![proxy drawio (1)](https://github.com/user-attachments/assets/584e4c47-ae4e-46fc-a84e-608b9f450fe0)

### 플라이급(Flyweight)
메모리를 아끼기 위해 객체를 외부에서 주입하는 패턴
- 외부에서 주입하는 객체가 클 수록, 빈번하게 사용할수록 메모리를 많이 아낄 수 있음
- 자바스크립트 프로토타입을 사용해서도 구현 가능
- 왜 외부로 분리한 건지 코드상에서는 잘 안보여서 따로 설명 필요

### 다리(Bridge)
추상과 구현을 분리하는 패턴
- 추상은 interface같은 게 아님, 클라이언트가 관심있어 하는게 추상
- 클라이언트가 관심있지 않지만 실제 구현에 필요한 로직들은 구현부로 감

![bridge drawio (1)](https://github.com/user-attachments/assets/a2b2588d-2526-4c5b-a562-b3276b0f2d7a)

### 컴포지트(Composite)
트리 구조의 객체를 다루는 패턴
- parent<->children 구조의 객체를 아우르는 명령을 수행할 때 유용함
- Circle, Rectangle처럼 더이상 자식이 없는 객체를 Leaf라고 부름
- Circle, Rectangle들이 모여있는 객체를 Group

![composite drawio](https://github.com/user-attachments/assets/7400bdae-c997-442a-8992-a8b54f45c7b8)
