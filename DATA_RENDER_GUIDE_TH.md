# คู่มือเรื่อง “การกำหนดข้อมูล” และ “การเรียกใช้ข้อมูล” ในโปรเจกต์นี้

เอกสารนี้อธิบายแบบเจาะจงว่า:

- ข้อมูลในโปรเจกต์นี้ถูกกำหนดยังไง
- ข้อมูลถูกส่งไปที่ component ยังไง
- ข้อมูลถูกเอาไปแสดงบนหน้าเว็บยังไง
- ก้อนโค้ดนี้ทำงานยังไง:

```jsx
<div className="project-clean-body">
  <p className="project-clean-type">{project.type}</p>

  <h3>{project.title}</h3>

  <p>{project.description}</p>

  <div className="project-clean-stack">
    {project.stack.map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
</div>
```

เอกสารนี้จะเน้นสำหรับ “มือใหม่” โดยอธิบายให้พอถึงระดับที่เอาไปตอบคนอื่นต่อได้

---

## 1. ก่อนเข้าใจโค้ดก้อนนี้ ต้องเข้าใจคำว่า “ข้อมูล” ใน React ก่อน

ในโปรเจกต์นี้ React ทำงานแบบนี้:

1. เราเตรียมข้อมูลไว้ก่อน
2. เราส่งข้อมูลเข้า component
3. component เอาข้อมูลนั้นไปแสดงเป็น HTML/JSX
4. CSS ค่อยจัดหน้าตาให้สวย

พูดแบบง่ายที่สุด:

> ข้อมูลคือ “เนื้อหา”  
> JSX คือ “โครงที่จะเอาเนื้อหาไปวาง”  
> CSS คือ “การแต่งหน้าตา”

---

## 2. ไฟล์ที่เรากำลังดูคืออะไร

ไฟล์หลักคือ [Projects.jsx](/C:/Users/thana/OneDrive/เอกสาร/GitHub/CV/Frontend/src/pages/Projects.jsx)

ไฟล์นี้มีหน้าที่:

- สร้างข้อมูลของโปรเจกต์แต่ละตัว
- เลือกโปรเจกต์เด่น
- ส่งข้อมูลของแต่ละโปรเจกต์เข้า component `ProjectCard`
- ให้ `ProjectCard` แสดงข้อมูลออกมาเป็นการ์ด

สรุปสั้น ๆ:

> `Projects.jsx` คือหน้า “รายการโปรเจกต์”  
> และ `ProjectCard` คือแม่พิมพ์ที่เอาไว้แสดงโปรเจกต์ 1 ชิ้น

---

## 3. โครงสร้างการทำงานทั้งไฟล์

ใน [Projects.jsx](/C:/Users/thana/OneDrive/เอกสาร/GitHub/CV/Frontend/src/pages/Projects.jsx) มี 4 ส่วนสำคัญ

### ส่วนที่ 1: import ของที่ต้องใช้

อยู่ช่วงบรรทัด `1-4`

```jsx
import { Link } from "react-router-dom";
import imgBB from "../assets/work.png";
import YL8 from "../assets/YL/train_batch0.jpg";
import Logo from "../assets/sport/Logo.png";
```

ความหมาย:

- `Link` ใช้ทำลิงก์เปลี่ยนหน้าใน React
- รูปต่าง ๆ ถูก import เข้ามาเพื่อใช้กับโปรเจกต์

สำคัญมาก:

> ใน React รูปไม่ได้ถูกใส่เป็น path ตรง ๆ อย่างเดียวเสมอไป  
> เรามัก import มาก่อน แล้วค่อยเอาไปใส่ในข้อมูล

---

### ส่วนที่ 2: กำหนดข้อมูลของโปรเจกต์

อยู่ช่วงบรรทัด `6-61`

```jsx
const projects = [
  {
    number: "01",
    badge: "WEB",
    title: "Portfolio Website",
    type: "Personal Website",
    description: "...",
    stack: ["React", "Vite", "CSS", "Responsive"],
    status: "...",
    link: "/portfolio/portfolio",
    image: imgBB,
  },
  ...
];
```

ส่วนนี้สำคัญมาก เพราะนี่คือ “แหล่งข้อมูล”

### โครงสร้างของข้อมูลนี้คืออะไร

- `projects` เป็น **array**
- ใน array มีหลาย **object**
- แต่ละ object คือโปรเจกต์ 1 ตัว

มองเป็นภาพ:

```text
projects
├─ โปรเจกต์ตัวที่ 1
├─ โปรเจกต์ตัวที่ 2
├─ โปรเจกต์ตัวที่ 3
└─ โปรเจกต์ตัวที่ 4
```

และในแต่ละโปรเจกต์ก็มีข้อมูลย่อย:

```text
โปรเจกต์ 1
├─ number
├─ badge
├─ title
├─ type
├─ description
├─ stack
├─ status
├─ link
└─ image
```

---

## 4. ทำไมต้องเก็บข้อมูลเป็น array ของ object

เพราะมันช่วยให้ React แสดง UI ซ้ำ ๆ ได้ง่ายมาก

ถ้าไม่ทำแบบนี้ เราต้องเขียนการ์ดทีละใบ เช่น:

```jsx
<ProjectCard title="A" ... />
<ProjectCard title="B" ... />
<ProjectCard title="C" ... />
```

แต่พอเก็บเป็น array เราสามารถใช้ `.map()` วนลูปสร้าง UI ได้

ข้อดี:

- เพิ่มโปรเจกต์ใหม่ง่าย
- แก้ข้อมูลได้เป็นระบบ
- ลดการเขียน JSX ซ้ำ

นี่เป็นแนวคิดสำคัญมากของ React ที่มือใหม่ต้องเข้าใจ

---

## 5. ข้อมูลแต่ละ field ใน `projects` ใช้ทำอะไร

ลองดูตัวอย่าง 1 โปรเจกต์

```jsx
{
  number: "02",
  badge: "APP",
  title: "Sport Booking Platform",
  type: "Web Application",
  description: "...",
  stack: ["Vue 3", "Pinia", "PrimeVue", "Node.js"],
  status: "...",
  link: "/portfolio/sport-booking",
  image: Logo,
  featured: true,
  demoUrl: "https://sport-booking-x2r6.onrender.com/",
  summary: ["...", "...", "..."],
}
```

ความหมายของแต่ละตัว:

- `number`
  - เลขลำดับของโปรเจกต์
- `badge`
  - ป้ายสั้น ๆ เช่น `WEB`, `APP`
- `title`
  - ชื่อโปรเจกต์
- `type`
  - ประเภทของโปรเจกต์
- `description`
  - คำอธิบายโปรเจกต์
- `stack`
  - เทคโนโลยีที่ใช้
- `status`
  - สถานะโปรเจกต์ เช่น กำลังพัฒนา
- `link`
  - ลิงก์ไปหน้ารายละเอียด
- `image`
  - รูปที่ใช้แสดงบนการ์ด
- `featured`
  - ใช้บอกว่าโปรเจกต์นี้เป็นตัวเด่น
- `demoUrl`
  - ลิงก์เปิดเดโมจริง
- `summary`
  - ข้อความสรุปพิเศษสำหรับโปรเจกต์เด่น

---

## 6. แล้วข้อมูลถูก “เลือกใช้” ยังไง

ดูบรรทัด `63-64`

```jsx
const featuredProject = projects.find((project) => project.featured);
const otherProjects = projects.filter((project) => !project.featured);
```

นี่คือการ “แยกข้อมูล” ก่อนเอาไปแสดง

### บรรทัดแรก

```jsx
const featuredProject = projects.find((project) => project.featured);
```

ความหมาย:

- วนหาทุกโปรเจกต์
- หาอันแรกที่มี `featured: true`
- เก็บไว้ในตัวแปร `featuredProject`

สรุปง่าย:

> หาโปรเจกต์ตัวเด่น 1 ตัว

### บรรทัดที่สอง

```jsx
const otherProjects = projects.filter((project) => !project.featured);
```

ความหมาย:

- เอาเฉพาะโปรเจกต์ที่ไม่ใช่ตัวเด่น
- เก็บไว้ใน `otherProjects`

สรุปง่าย:

> แยกโปรเจกต์ที่เหลือออกมา

---

## 7. Component `ProjectCard` คืออะไร

ดูช่วงบรรทัด `66-138`

```jsx
function ProjectCard({ project, featured = false }) {
```

นี่คือ component ย่อยที่สร้างขึ้นมาในไฟล์เดียวกัน

มันรับค่าเข้ามา 2 ตัว:

- `project`
- `featured`

### `project` คืออะไร

`project` คือ object ของโปรเจกต์ 1 ตัว

ตัวอย่าง:

```jsx
{
  number: "01",
  title: "Portfolio Website",
  type: "Personal Website",
  ...
}
```

### `featured = false` คืออะไร

แปลว่า:

- ถ้าไม่ได้ส่ง `featured` มา
- ให้ค่าเริ่มต้นเป็น `false`

นี่คือค่า default ของ props

---

## 8. ก้อนโค้ดที่คุณถาม ทำงานยังไง

ก้อนนี้อยู่ช่วงบรรทัด `93-104` ของ [Projects.jsx](/C:/Users/thana/OneDrive/เอกสาร/GitHub/CV/Frontend/src/pages/Projects.jsx:93)

```jsx
<div className="project-clean-body">
  <p className="project-clean-type">{project.type}</p>

  <h3>{project.title}</h3>

  <p>{project.description}</p>

  <div className="project-clean-stack">
    {project.stack.map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
</div>
```

นี่คือส่วนที่เอา “ข้อมูลจาก object `project`” มาแสดงลงบนหน้า

---

## 9. อธิบายทีละบรรทัดของก้อนนี้

### บรรทัด 1

```jsx
<div className="project-clean-body">
```

นี่คือกล่องหลักของ “เนื้อหาในการ์ด”

มันไม่ได้แสดงข้อมูลเอง  
แต่มันเป็น container สำหรับรวมข้อมูลย่อยทั้งหมด

CSS class ที่ชื่อ `project-clean-body` จะไปกำหนดหน้าตาใน `App.css`

สรุป:

> เป็นกล่องห่อเนื้อหาทั้งหมดของการ์ด

---

### บรรทัด 2

```jsx
<p className="project-clean-type">{project.type}</p>
```

อันนี้แสดง “ประเภทของโปรเจกต์”

เช่นถ้า `project.type` เป็น:

```js
"Web Application"
```

หน้าจอก็จะแสดง:

```text
Web Application
```

ตรงนี้สำคัญมาก:

### `{project.type}` คืออะไร

ใน JSX ถ้าเราใส่วงเล็บปีกกา `{ ... }`
แปลว่าเรากำลังเขียน “JavaScript expression”

ดังนั้น:

```jsx
{project.type}
```

แปลว่า:

> ไปอ่านค่าจาก object `project` ที่ key ชื่อ `type`

ถ้า object เป็นแบบนี้:

```js
const project = {
  type: "Web Application"
}
```

React ก็จะแสดงคำว่า `Web Application`

---

### บรรทัด 4

```jsx
<h3>{project.title}</h3>
```

แสดงชื่อโปรเจกต์

เช่น:

```js
project.title = "Sport Booking Platform"
```

จะถูก render ออกมาเป็น:

```html
<h3>Sport Booking Platform</h3>
```

สรุป:

> ใช้ค่าจาก `title` ของ object `project`

---

### บรรทัด 6

```jsx
<p>{project.description}</p>
```

แสดงคำอธิบายโปรเจกต์

ถ้า `description` เป็นข้อความยาว  
React ก็จะแสดงข้อความยาวนั้นลงใน `<p>`

สรุป:

> ใช้ค่าจาก `description` ของ object `project`

---

### บรรทัด 8

```jsx
<div className="project-clean-stack">
```

นี่คือกล่องสำหรับรวมรายการเทคโนโลยี

เช่น:

- React
- Vite
- CSS
- Responsive

---

### บรรทัด 9-11

```jsx
{project.stack.map((item) => (
  <span key={item}>{item}</span>
))}
```

นี่คือจุดที่สำคัญที่สุดของก้อนนี้

มันกำลังทำสิ่งต่อไปนี้:

1. เอา array `project.stack`
2. วนทีละสมาชิกด้วย `.map()`
3. สร้าง `<span>` 1 ตัวต่อ 1 ค่า

ถ้า `project.stack` เป็น:

```js
["Vue 3", "Pinia", "PrimeVue", "Node.js"]
```

React จะสร้างผลลัพธ์ประมาณนี้:

```jsx
<span>Vue 3</span>
<span>Pinia</span>
<span>PrimeVue</span>
<span>Node.js</span>
```

---

## 10. `.map()` คืออะไร ทำไมใช้ตรงนี้

`.map()` เป็นคำสั่งของ JavaScript สำหรับ:

> วนข้อมูลใน array แล้วสร้างผลลัพธ์ใหม่ออกมา

ตัวอย่างง่าย ๆ

```js
const numbers = [1, 2, 3];

const result = numbers.map((n) => n * 2);
```

ผลคือ:

```js
[2, 4, 6]
```

แต่ใน React เราใช้ `.map()` เพื่อสร้าง JSX

ตัวอย่าง:

```jsx
["React", "Vite"].map((item) => <span>{item}</span>)
```

ผลคือ React จะสร้างรายการ `<span>` หลายตัว

ดังนั้นในโปรเจกต์นี้ `.map()` ถูกใช้เพื่อ:

- แสดงรายการ stack
- แสดงรายการโปรเจกต์
- แสดงรายการ highlights
- แสดงรายการ roles
- แสดงรายการ learned

สรุป:

> ถ้าในโปรเจกต์นี้คุณเห็น `.map()`  
> ให้คิดทันทีว่า “กำลังเอาข้อมูลหลายตัวมาสร้าง UI หลายชิ้น”

---

## 11. `key={item}` คืออะไร

ในบรรทัดนี้:

```jsx
<span key={item}>{item}</span>
```

`key` เป็นสิ่งที่ React ใช้แยกแยะว่า element แต่ละตัวใน list คือชิ้นไหน

ทำไมต้องมี:

- เวลา list เปลี่ยน React จะอัปเดตได้ฉลาดขึ้น
- ลดปัญหา render ผิดตัว

ถ้าไม่มี `key`
React มักจะเตือนใน console

ในกรณีนี้ใช้:

```jsx
key={item}
```

เพราะแต่ละชื่อ tech stack มักไม่ซ้ำกัน

เช่น:

- `Vue 3`
- `Pinia`
- `PrimeVue`
- `Node.js`

---

## 12. ก้อนนี้ไปทำงานหน้าไหนบ้าง

ก้อนนี้อยู่ใน component `ProjectCard`

ดังนั้นมันจะทำงาน “ทุกครั้งที่ `ProjectCard` ถูก render”

ในไฟล์นี้ `ProjectCard` ถูกเรียกใช้อยู่ 2 จุด

### จุดที่ 1: โปรเจกต์เด่น

อยู่แถวบรรทัด `187`

```jsx
{featuredProject && <ProjectCard project={featuredProject} featured />}
```

ความหมาย:

- ถ้ามีโปรเจกต์เด่น
- ให้ส่งข้อมูลโปรเจกต์เด่นเข้า `ProjectCard`

ดังนั้นก้อน `project-clean-body` จะทำงาน 1 ครั้งตรง featured card

---

### จุดที่ 2: โปรเจกต์ที่เหลือ

อยู่แถวบรรทัด `196-199`

```jsx
{otherProjects.map((project) => (
  <ProjectCard project={project} key={project.number} />
))}
```

ความหมาย:

- วนลูปทุกโปรเจกต์ที่ไม่ใช่ featured
- ส่งแต่ละตัวเข้า `ProjectCard`

ดังนั้นก้อน `project-clean-body` จะทำงานซ้ำตามจำนวนโปรเจกต์ที่เหลือ

สรุป:

> ก้อนนี้ไม่ได้ทำงานแค่ครั้งเดียว  
> แต่มันถูกใช้ซ้ำกับทุกการ์ดโปรเจกต์ที่สร้างจาก `ProjectCard`

---

## 13. Data Flow จริงของก้อนนี้

นี่คือ flow ที่แท้จริงของข้อมูล

```text
const projects = [ ... ]
   |
   v
แยกเป็น featuredProject และ otherProjects
   |
   v
ส่ง object แต่ละตัวเข้า <ProjectCard project={...} />
   |
   v
ProjectCard รับ props ชื่อ project
   |
   v
ใช้ project.type / project.title / project.description / project.stack
   |
   v
React render ออกมาเป็นข้อความและ span หลายตัวบนหน้า
```

---

## 14. ถ้าอยากได้หน้าจอแบบนี้ ต้องเขียนยังไง

แนวคิดหลักมี 4 ขั้น

### ขั้นที่ 1: เตรียมข้อมูล

```jsx
const projects = [
  {
    title: "Portfolio Website",
    type: "Personal Website",
    description: "เว็บไซต์พอร์ตโฟลิโอส่วนตัว",
    stack: ["React", "Vite", "CSS"],
  },
];
```

### ขั้นที่ 2: สร้าง component ที่รับข้อมูล

```jsx
function ProjectCard({ project }) {
  return <div>{project.title}</div>;
}
```

### ขั้นที่ 3: เอาข้อมูลมาใช้ใน JSX

```jsx
function ProjectCard({ project }) {
  return (
    <div>
      <p>{project.type}</p>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}
```

### ขั้นที่ 4: ถ้ามีข้อมูลหลายตัว ใช้ `.map()`

```jsx
{projects.map((project) => (
  <ProjectCard key={project.title} project={project} />
))}
```

นี่คือสูตรสำเร็จพื้นฐานที่ใช้บ่อยมากใน React

---

## 15. โครงสร้างสำคัญที่มือใหม่ต้องจำจากก้อนนี้

ก้อนนี้สอนเรื่องสำคัญ 6 อย่าง

### 1. `props`

`project` ใน `ProjectCard({ project })` คือ props

มันคือข้อมูลที่ parent ส่งลงมาให้ child

### 2. object access

```jsx
project.title
```

แปลว่าไปหยิบค่า `title` จาก object `project`

### 3. JSX expression

```jsx
{project.title}
```

แปลว่าเอาค่า JavaScript มาแสดงใน JSX

### 4. array

```jsx
project.stack
```

เป็น array ของเทคโนโลยี

### 5. `.map()`

ใช้วน array เพื่อสร้าง UI หลายชิ้น

### 6. `key`

ใช้ช่วย React จัดการ list

---

## 16. ถ้าจะแก้ก้อนนี้ ต้องแก้อะไรตรงไหน

## อยากแก้ประเภทโปรเจกต์

แก้ค่า `type` ใน `projects`

## อยากแก้ชื่อโปรเจกต์

แก้ค่า `title` ใน `projects`

## อยากแก้คำอธิบาย

แก้ค่า `description` ใน `projects`

## อยากเพิ่ม/ลด tech stack

แก้ array `stack`

ตัวอย่าง:

```jsx
stack: ["Vue 3", "Pinia", "PrimeVue", "Node.js", "Tailwind CSS"]
```

## อยากเปลี่ยนหน้าตาแต่ไม่เปลี่ยนข้อมูล

ไปแก้ class พวกนี้ใน `App.css`

- `project-clean-body`
- `project-clean-type`
- `project-clean-stack`

สำคัญมาก:

> ถ้าแก้ “ข้อความหรือค่า” ให้ดูที่ data  
> ถ้าแก้ “สี ระยะห่าง ฟอนต์ ขนาด” ให้ดูที่ CSS

---

## 17. ความสัมพันธ์ระหว่าง “ข้อมูล”, “component”, “หน้า”

นี่คือความสัมพันธ์ที่ต้องเข้าใจ

```text
projects (ข้อมูล)
   |
   v
ProjectCard (แม่พิมพ์การ์ด)
   |
   v
Projects page (หน้าที่รวมการ์ดทุกใบ)
```

อธิบายง่าย ๆ:

- `projects` = เนื้อหา
- `ProjectCard` = แบบฟอร์มของการ์ด
- `Projects` = หน้าที่เอาการ์ดหลายใบมาวางรวมกัน

---

## 18. ถ้าจะอธิบายให้คนอื่นฟัง ควรพูดยังไง

คุณสามารถอธิบายก้อนนี้แบบง่าย ๆ ได้ว่า:

> ในไฟล์ `Projects.jsx` เราเก็บข้อมูลโปรเจกต์ไว้ใน array ชื่อ `projects`  
> แต่ละตัวเป็น object ที่มีชื่อ ประเภท คำอธิบาย และ tech stack  
> จากนั้นเราสร้าง component ชื่อ `ProjectCard` เพื่อรับ object 1 ตัวผ่าน props ชื่อ `project`  
> แล้วใน JSX เราใช้ `{project.type}`, `{project.title}`, `{project.description}` เพื่อดึงค่าจาก object มาแสดง  
> ส่วน `project.stack.map(...)` ใช้สำหรับวนลูป tech stack แล้วสร้าง `<span>` ออกมาทีละตัว  
> สุดท้ายหน้า `Projects` จะเอาข้อมูลหลายตัวมาวนลูปแล้วสร้าง `ProjectCard` หลายใบออกมาบนหน้า

ถ้าพูดได้ประมาณนี้ แปลว่าเข้าใจแกนสำคัญแล้ว

---

## 19. จุดที่มือใหม่ชอบงงในก้อนนี้

### งงที่ 1: ทำไมใช้ `{}` ใน JSX

เพราะ `{}` คือการบอกว่า “ข้างในนี้คือ JavaScript”

### งงที่ 2: `project` มาจากไหน

มาจาก props ที่ส่งเข้า `ProjectCard`

### งงที่ 3: `item` มาจากไหน

มาจาก `.map()` ของ `project.stack`

### งงที่ 4: ทำไมไม่เขียน `<span>React</span>` ตรง ๆ

เพราะเราต้องการให้ UI สร้างจากข้อมูลอัตโนมัติ

### งงที่ 5: ทำไมต้องมี `key`

เพราะ React ต้องใช้มันแยกรายการใน list

---

## 20. สิ่งที่ “จำเป็นต้องรู้” เกี่ยวกับ pattern นี้ในโปรเจกต์นี้

ถ้าจะทำงานกับโปรเจกต์นี้จริง คุณควรรู้ pattern นี้ให้แม่น เพราะมันถูกใช้ซ้ำหลายที่

### ใช้ในหน้า Projects

- render โปรเจกต์จาก array

### ใช้ในหน้า Portfolio

- render stack
- render highlights
- render roles
- render learned
- render images

### ใช้ใน Sidebar

- render main links
- render portfolio links
- render game links

### ใช้ใน Home / About

- render highlight cards
- render summary cards
- render skill groups

ดังนั้น pattern นี้ไม่ใช่แค่ก้อนเล็ก ๆ  
แต่มันคือ “วิธีคิดหลัก” ของทั้งโปรเจกต์

---

## 21. สรุปสุดท้าย

ก้อนโค้ดนี้:

```jsx
<div className="project-clean-body">
  <p className="project-clean-type">{project.type}</p>
  <h3>{project.title}</h3>
  <p>{project.description}</p>
  <div className="project-clean-stack">
    {project.stack.map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
</div>
```

ทำหน้าที่:

- รับข้อมูลโปรเจกต์ 1 ตัว
- ดึงค่าจาก object `project`
- แสดงประเภท ชื่อ และคำอธิบาย
- วน tech stack ด้วย `.map()`
- สร้าง `<span>` หลายตัวจาก array

ถ้าจะจำให้สั้นที่สุด:

> นี่คือโค้ดที่เอา “ข้อมูลของโปรเจกต์ 1 ตัว” มาแปลงเป็น “หน้าตาของการ์ด 1 ใบ”

---

## 22. ถ้าต้องการ ผมช่วยต่อได้

ผมช่วยทำเอกสารต่อจากไฟล์นี้ได้อีก เช่น:

- อธิบาย `project.stack.map(...)` แบบลึกเฉพาะเรื่อง array/map
- ทำไฟล์ “สอน props, state, map จากโปรเจกต์นี้โดยตรง”
- ทำเอกสาร “อธิบาย Portfolio.jsx ด้วยแนวเดียวกัน”
- ทำแบบฝึกหัดเล็ก ๆ ให้ลองแก้โค้ดแล้วเข้าใจเร็วขึ้น

