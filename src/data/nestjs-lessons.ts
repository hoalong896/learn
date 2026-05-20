import type { Lesson, VideoItem } from "@/data/typescript-lessons";

const S = (folder: string, file: string): VideoItem => ({
  title: file.replace(/^\d+\.\s*/, "").replace(/\.mp4$/i, ""),
  file: `${folder}/${file}`,
});

const DIR1 = "01. Introduction to NestJS & Pre-requisites";
const DIR2 = "02. Task Management Application (REST API)";
const DIR3 = "03. Validation and Error Handling";
const DIR4 = "04. Data Persistence - PostgreSQL and TypeORM";
const DIR5 = "05. Auth Part 1 - Authentication";
const DIR6 = "06. Auth Part 2 - Task Ownership and Restrictions";
const DIR8 = "08. (Bonus) Logging";
const DIR9 = "09. (Bonus) Configuration Management";
const DIR11 = "11. (Bonus) Deployment";
const DIR12 = "12. (Bonus) Unit Testing";

export const nestjsLessons: Lesson[] = [
  {
    id: "01-gioi-thieu",
    title: "Giới thiệu NestJS & Cài đặt",
    description: "NestJS là gì, tại sao dùng NestJS, cài đặt CLI và môi trường phát triển",
    level: "Cơ bản",
    videos: [
      S(DIR1, "01. Welcome to the course!.mp4"),
      S(DIR1, "03. Installing the NestJS CLI.mp4"),
      S(DIR1, "04. (Optional) Installing VSCode and Extensions.mp4"),
    ],
    content: `## NestJS là gì?

NestJS là một framework Node.js dùng để xây dựng ứng dụng server-side hiệu quả, có thể mở rộng. Được viết bằng TypeScript và lấy cảm hứng từ Angular.

### Tại sao dùng NestJS?
- **TypeScript first** — kiểu dữ liệu rõ ràng, ít lỗi hơn
- **Kiến trúc rõ ràng** — Module, Controller, Service, Provider
- **Dependency Injection** — tích hợp sẵn, dễ test
- **Decorator-based** — code clean, dễ đọc
- **Hỗ trợ REST API, GraphQL, WebSocket, Microservices**

### Cài đặt

\`\`\`bash
npm install -g @nestjs/cli
nest new my-project
cd my-project
npm run start:dev
\`\`\`

### Cấu trúc project

\`\`\`
src/
├── app.controller.ts    # Xử lý HTTP requests
├── app.service.ts       # Business logic
├── app.module.ts        # Root module
└── main.ts              # Entry point
\`\`\`

### Tạo module, controller, service

\`\`\`bash
nest generate module tasks
nest generate controller tasks
nest generate service tasks
# Hoặc ngắn hơn:
nest g mo tasks
nest g co tasks
nest g s tasks
\`\`\``,
    codeExample: `// main.ts - Entry point của NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();

// app.module.ts - Root module
// @Module decorator định nghĩa metadata cho module
/*
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
*/

// Ví dụ đơn giản - TypeScript decorators
function Controller(path: string) {
  return function(target: Function) {
    console.log(\`Controller registered at: /\${path}\`);
  };
}

function Get(path: string = '') {
  return function(target: any, key: string) {
    console.log(\`GET /\${path} → \${key}()\`);
  };
}

@Controller('tasks')
class TasksController {
  @Get()
  getAllTasks() {
    return [{ id: 1, title: 'Learn NestJS' }];
  }

  @Get(':id')
  getTaskById() {
    return { id: 1, title: 'Learn NestJS' };
  }
}`,
    exercises: [
      {
        title: "Tạo Controller đơn giản",
        description: "Tạo một UsersController với method getAll() trả về mảng users",
        starterCode: `function Controller(path: string) {
  return (target: Function) => console.log(\`Controller: /\${path}\`);
}
function Get() {
  return (target: any, key: string) => console.log(\`GET → \${key}()\`);
}

// Tạo UsersController với @Controller('users')
// Thêm method getAll() với @Get() trả về [{id:1,name:'Alice'},{id:2,name:'Bob'}]
`,
        solution: `function Controller(path: string) {
  return (target: Function) => console.log(\`Controller: /\${path}\`);
}
function Get() {
  return (target: any, key: string) => console.log(\`GET → \${key}()\`);
}

@Controller('users')
class UsersController {
  @Get()
  getAll() {
    return [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
  }
}

console.log(new UsersController().getAll());`,
        hint: "Dùng @Controller('users') trước class và @Get() trước method",
      },
      {
        title: "Module và Providers",
        description: "Hiểu cách Module kết nối Controller và Service thông qua providers",
        starterCode: `// Giải thích: Module liên kết các thành phần
// Hoàn thành class AppModule với đúng decorator

function Module(meta: object) {
  return (target: Function) => console.log('Module:', JSON.stringify(meta));
}

class AppController {}
class AppService {}

// Thêm @Module với controllers: [AppController], providers: [AppService]
class AppModule {}`,
        solution: `function Module(meta: object) {
  return (target: Function) => console.log('Module:', JSON.stringify(meta));
}

class AppController {}
class AppService {}

@Module({
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {}`,
        hint: "@Module nhận object với controllers và providers",
      },
    ],
  },

  {
    id: "02-rest-api",
    title: "Xây dựng REST API — Task Management",
    description: "Controllers, Services, DTOs, CRUD operations cho ứng dụng quản lý task",
    level: "Cơ bản",
    videos: [
      S(DIR2, "01. Project Overview.mp4"),
      S(DIR2, "02. Creating our project via the NestJS CLI.mp4"),
      S(DIR2, "03. NestJS Project Structure.mp4"),
      S(DIR2, "07. Introduction to NestJS Controllers.mp4"),
      S(DIR2, "08. Creating at Tasks Controller.mp4"),
      S(DIR2, "14. Defining a Task Model.mp4"),
      S(DIR2, "15. Feature Creating a Task (Part 1 - Controller).mp4"),
      S(DIR2, "16. Feature Creating a Task (Part 2 - Service).mp4"),
      S(DIR2, "17. Intro to Data Transfer Objects (DTO).mp4"),
      S(DIR2, "18. Implementing CreateTaskDto.mp4"),
      S(DIR2, "19. Feature Getting a Task by ID.mp4"),
      S(DIR2, "21. Solution Deleting a Task.mp4"),
    ],
    content: `## REST API với NestJS

### Controller — xử lý HTTP requests

\`\`\`typescript
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll(): Task[] {
    return this.tasksService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Task {
    return this.tasksService.getById(id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.create(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.tasksService.delete(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateStatus(id, status);
  }
}
\`\`\`

### Service — business logic

\`\`\`typescript
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] { return this.tasks; }

  getById(id: string): Task {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new NotFoundException(\`Task \${id} not found\`);
    return task;
  }

  create(dto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      ...dto,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
\`\`\`

### DTO (Data Transfer Object)

\`\`\`typescript
export class CreateTaskDto {
  title: string;
  description: string;
}
\`\`\`

### Task Model

\`\`\`typescript
export enum TaskStatus { OPEN = 'OPEN', IN_PROGRESS = 'IN_PROGRESS', DONE = 'DONE' }

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
\`\`\``,
    codeExample: `enum TaskStatus { OPEN = 'OPEN', IN_PROGRESS = 'IN_PROGRESS', DONE = 'DONE' }

interface Task { id: string; title: string; description: string; status: TaskStatus; }

// Mô phỏng TasksService
class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  getAll(): Task[] { return this.tasks; }

  getById(id: string): Task {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new Error(\`Task \${id} not found\`);
    return task;
  }

  create(title: string, description: string): Task {
    const task: Task = { id: String(this.nextId++), title, description, status: TaskStatus.OPEN };
    this.tasks.push(task);
    return task;
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.getById(id);
    task.status = status;
    return task;
  }
}

const svc = new TasksService();
svc.create('Learn NestJS', 'Study controllers and services');
svc.create('Build API', 'Create CRUD endpoints');
console.log('All tasks:', svc.getAll());
svc.updateStatus('1', TaskStatus.IN_PROGRESS);
console.log('After update:', svc.getById('1'));
svc.delete('2');
console.log('After delete:', svc.getAll());`,
    exercises: [
      {
        title: "Service CRUD cơ bản",
        description: "Tạo ProductsService với đầy đủ getAll, create, delete",
        starterCode: `interface Product { id: string; name: string; price: number; }

class ProductsService {
  private products: Product[] = [];
  private nextId = 1;

  // Thêm: getAll(), create(name, price), delete(id)
}

const svc = new ProductsService();
// Test tạo 2 sản phẩm, xóa 1, in ra danh sách còn lại`,
        solution: `interface Product { id: string; name: string; price: number; }

class ProductsService {
  private products: Product[] = [];
  private nextId = 1;

  getAll(): Product[] { return this.products; }

  create(name: string, price: number): Product {
    const p: Product = { id: String(this.nextId++), name, price };
    this.products.push(p);
    return p;
  }

  delete(id: string): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}

const svc = new ProductsService();
svc.create('Laptop', 1500);
svc.create('Phone', 800);
svc.delete('1');
console.log(svc.getAll());`,
        hint: "Dùng Array.filter để delete, push để create",
      },
      {
        title: "DTO Validation",
        description: "Tạo CreateTaskDto và validate title không rỗng",
        starterCode: `class CreateTaskDto {
  title: string;
  description: string;

  // Thêm method validate(): boolean
  // - trả về false nếu title rỗng hoặc chỉ có khoảng trắng
}

const valid = new CreateTaskDto();
valid.title = 'Learn NestJS';
valid.description = 'Study hard';

const invalid = new CreateTaskDto();
invalid.title = '   ';
invalid.description = 'No title';

// In ra kết quả validate của cả 2`,
        solution: `class CreateTaskDto {
  title: string = '';
  description: string = '';

  validate(): boolean {
    return this.title.trim().length > 0;
  }
}

const valid = new CreateTaskDto();
valid.title = 'Learn NestJS';
valid.description = 'Study hard';

const invalid = new CreateTaskDto();
invalid.title = '   ';
invalid.description = 'No title';

console.log('Valid DTO:', valid.validate());    // true
console.log('Invalid DTO:', invalid.validate()); // false`,
        hint: "Dùng String.trim() và .length > 0",
      },
    ],
  },

  {
    id: "03-validation",
    title: "Validation & Error Handling",
    description: "Pipes, ValidationPipe, class-validator, NotFoundException và HTTP exceptions",
    level: "Trung cấp",
    videos: [
      S(DIR3, "01. Introduction to NestJS Pipes.mp4"),
      S(DIR3, "02. ValidationPipe Creating a Task.mp4"),
      S(DIR3, "03. Error Handling Getting a non-existing Task.mp4"),
      S(DIR3, "04. Error Handling Deleting a non-existing Task.mp4"),
      S(DIR3, "05. Validation Update Task Status.mp4"),
      S(DIR3, "06. Challenge Validating Task Filtering and Search.mp4"),
    ],
    content: `## Validation & Error Handling

### Pipes — transform và validate input

\`\`\`typescript
// Global validation pipe
app.useGlobalPipes(new ValidationPipe());
\`\`\`

### class-validator với DTO

\`\`\`typescript
import { IsNotEmpty, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
\`\`\`

### HTTP Exceptions

\`\`\`typescript
import { NotFoundException, BadRequestException } from '@nestjs/common';

getById(id: string): Task {
  const task = this.tasks.find(t => t.id === id);
  if (!task) {
    throw new NotFoundException(\`Task with ID "\${id}" not found\`);
  }
  return task;
}
\`\`\`

### Custom Pipe

\`\`\`typescript
@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: string): TaskStatus {
    const upper = value.toUpperCase();
    if (!Object.values(TaskStatus).includes(upper as TaskStatus)) {
      throw new BadRequestException(\`\${value} is not a valid status\`);
    }
    return upper as TaskStatus;
  }
}
\`\`\``,
    codeExample: `// Mô phỏng Pipe validation
enum TaskStatus { OPEN = 'OPEN', IN_PROGRESS = 'IN_PROGRESS', DONE = 'DONE' }

class BadRequestException extends Error {
  constructor(msg: string) { super(\`400 Bad Request: \${msg}\`); }
}
class NotFoundException extends Error {
  constructor(msg: string) { super(\`404 Not Found: \${msg}\`); }
}

// Custom Pipe
function validateStatus(value: string): TaskStatus {
  const upper = value.toUpperCase();
  const valid = Object.values(TaskStatus);
  if (!valid.includes(upper as TaskStatus)) {
    throw new BadRequestException(\`"\${value}" is not valid. Use: \${valid.join(', ')}\`);
  }
  return upper as TaskStatus;
}

// Mô phỏng NotFoundException
function getTaskById(id: string, tasks: {id:string}[]) {
  const task = tasks.find(t => t.id === id);
  if (!task) throw new NotFoundException(\`Task \${id} not found\`);
  return task;
}

try {
  console.log(validateStatus('in_progress')); // OK - case insensitive
  console.log(validateStatus('invalid'));      // throws
} catch(e: any) { console.error(e.message); }

const tasks = [{ id: '1' }, { id: '2' }];
try {
  console.log(getTaskById('1', tasks));  // OK
  console.log(getTaskById('99', tasks)); // throws
} catch(e: any) { console.error(e.message); }`,
    exercises: [
      {
        title: "Custom Validation Pipe",
        description: "Tạo pipe validate số tuổi hợp lệ (1–120)",
        starterCode: `class BadRequestException extends Error {
  constructor(msg: string) { super(\`400: \${msg}\`); }
}

function validateAge(value: string): number {
  // Parse sang số, throw nếu NaN hoặc < 1 hoặc > 120
}

// Test
try { console.log(validateAge('25')); } catch(e: any) { console.error(e.message); }
try { console.log(validateAge('abc')); } catch(e: any) { console.error(e.message); }
try { console.log(validateAge('200')); } catch(e: any) { console.error(e.message); }`,
        solution: `class BadRequestException extends Error {
  constructor(msg: string) { super(\`400: \${msg}\`); }
}

function validateAge(value: string): number {
  const num = parseInt(value, 10);
  if (isNaN(num)) throw new BadRequestException('Age must be a number');
  if (num < 1 || num > 120) throw new BadRequestException('Age must be between 1 and 120');
  return num;
}

try { console.log(validateAge('25')); } catch(e: any) { console.error(e.message); }
try { console.log(validateAge('abc')); } catch(e: any) { console.error(e.message); }
try { console.log(validateAge('200')); } catch(e: any) { console.error(e.message); }`,
        hint: "parseInt trả về NaN nếu không parse được — kiểm tra bằng isNaN()",
      },
      {
        title: "Error handling chain",
        description: "Tạo hàm findOrThrow tái sử dụng được cho bất kỳ array nào",
        starterCode: `class NotFoundException extends Error {
  constructor(msg: string) { super(\`404: \${msg}\`); }
}

// Tạo generic function findOrThrow<T>(
//   items: T[], predicate: (item: T) => boolean, errorMsg: string
// ): T

const users = [{id:'1',name:'Alice'},{id:'2',name:'Bob'}];
// Test: tìm id='1' (OK), tìm id='99' (throw)`,
        solution: `class NotFoundException extends Error {
  constructor(msg: string) { super(\`404: \${msg}\`); }
}

function findOrThrow<T>(items: T[], predicate: (item: T) => boolean, errorMsg: string): T {
  const found = items.find(predicate);
  if (!found) throw new NotFoundException(errorMsg);
  return found;
}

const users = [{id:'1',name:'Alice'},{id:'2',name:'Bob'}];
try {
  console.log(findOrThrow(users, u => u.id === '1', 'User not found'));
  console.log(findOrThrow(users, u => u.id === '99', 'User not found'));
} catch(e: any) { console.error(e.message); }`,
        hint: "Dùng TypeScript generics <T> để hàm hoạt động với mọi kiểu dữ liệu",
      },
    ],
  },

  {
    id: "04-database",
    title: "PostgreSQL & TypeORM",
    description: "Kết nối database, Entity, Repository pattern, CRUD với TypeORM",
    level: "Trung cấp",
    videos: [
      S(DIR4, "01. Introduction to Persistence.mp4"),
      S(DIR4, "03. Running PostgreSQL via Docker.mp4"),
      S(DIR4, "06. Introduction to TypeORM.mp4"),
      S(DIR4, "07. Setting up a Database Connection.mp4"),
      S(DIR4, "08. Creating a Task Entity.mp4"),
      S(DIR4, "09. Active Record VS Data Mapper Patterns.mp4"),
      S(DIR4, "10. Creating a Tasks Repository.mp4"),
      S(DIR4, "11. Refactoring for Tasks Service.mp4"),
      S(DIR4, "16. Persistence Update Task Status.mp4"),
      S(DIR4, "18. Persistence Getting All Tasks.mp4"),
    ],
    content: `## PostgreSQL & TypeORM

### Cài đặt

\`\`\`bash
npm install @nestjs/typeorm typeorm pg
\`\`\`

### Kết nối database (app.module.ts)

\`\`\`typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmanagement',
  entities: [Task],
  synchronize: true, // chỉ dùng trong dev
})
\`\`\`

### Entity

\`\`\`typescript
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;
}
\`\`\`

### Repository với Data Mapper

\`\`\`typescript
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({ ...dto, status: TaskStatus.OPEN });
    return this.tasksRepository.save(task);
  }

  async delete(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException();
  }
}
\`\`\`

### Chạy PostgreSQL bằng Docker

\`\`\`bash
docker run --name postgres-task -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
\`\`\``,
    codeExample: `// Mô phỏng TypeORM Repository pattern
interface Task { id: string; title: string; status: string; }

class Repository<T extends { id: string }> {
  private store: T[] = [];
  private idCounter = 1;

  create(partial: Omit<T, 'id'>): T {
    return { id: String(this.idCounter++), ...partial } as T;
  }

  async save(entity: T): Promise<T> {
    this.store.push(entity);
    return entity;
  }

  async find(): Promise<T[]> { return this.store; }

  async findOne(where: Partial<T>): Promise<T | null> {
    return this.store.find(item =>
      Object.entries(where).every(([k, v]) => (item as any)[k] === v)
    ) ?? null;
  }

  async delete(id: string): Promise<{ affected: number }> {
    const before = this.store.length;
    this.store = this.store.filter(t => t.id !== id);
    return { affected: before - this.store.length };
  }
}

// Sử dụng
const repo = new Repository<Task>();
const t1 = repo.create({ title: 'Task A', status: 'OPEN' });
const t2 = repo.create({ title: 'Task B', status: 'OPEN' });
repo.save(t1); repo.save(t2);
repo.find().then(tasks => console.log('All:', tasks));
repo.findOne({ id: '1' }).then(t => console.log('Find:', t));
repo.delete('1').then(r => console.log('Deleted:', r.affected));
repo.find().then(tasks => console.log('After delete:', tasks));`,
    exercises: [
      {
        title: "Repository CRUD async",
        description: "Implement async UsersRepository với find, create, save, delete",
        starterCode: `interface User { id: string; email: string; name: string; }

class UsersRepository {
  private users: User[] = [];
  private nextId = 1;

  // Implement: async findAll(), async findByEmail(email), async save(user), async deleteById(id)
}

async function main() {
  const repo = new UsersRepository();
  // Tạo 2 user, tìm theo email, xóa 1, in ra danh sách còn lại
}
main();`,
        solution: `interface User { id: string; email: string; name: string; }

class UsersRepository {
  private users: User[] = [];
  private nextId = 1;

  async findAll(): Promise<User[]> { return this.users; }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) ?? null;
  }

  async save(partial: Omit<User, 'id'>): Promise<User> {
    const user: User = { id: String(this.nextId++), ...partial };
    this.users.push(user);
    return user;
  }

  async deleteById(id: string): Promise<boolean> {
    const before = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length < before;
  }
}

async function main() {
  const repo = new UsersRepository();
  await repo.save({ email: 'alice@test.com', name: 'Alice' });
  await repo.save({ email: 'bob@test.com', name: 'Bob' });
  console.log(await repo.findByEmail('alice@test.com'));
  await repo.deleteById('1');
  console.log(await repo.findAll());
}
main();`,
        hint: "Dùng async/await, Array.find với ?? null cho findByEmail",
      },
      {
        title: "QueryBuilder simulation",
        description: "Filter tasks theo status và search theo title",
        starterCode: `interface Task { id: string; title: string; status: string; }
const tasks: Task[] = [
  {id:'1', title:'Learn NestJS', status:'OPEN'},
  {id:'2', title:'Build API', status:'IN_PROGRESS'},
  {id:'3', title:'Learn TypeORM', status:'OPEN'},
  {id:'4', title:'Deploy app', status:'DONE'},
];

function filterTasks(status?: string, search?: string): Task[] {
  // Lọc theo status nếu có, lọc theo title chứa search nếu có (case-insensitive)
}

console.log(filterTasks('OPEN'));             // bài 1 và 3
console.log(filterTasks(undefined, 'learn')); // bài 1 và 3
console.log(filterTasks('OPEN', 'nestjs'));   // bài 1`,
        solution: `interface Task { id: string; title: string; status: string; }
const tasks: Task[] = [
  {id:'1', title:'Learn NestJS', status:'OPEN'},
  {id:'2', title:'Build API', status:'IN_PROGRESS'},
  {id:'3', title:'Learn TypeORM', status:'OPEN'},
  {id:'4', title:'Deploy app', status:'DONE'},
];

function filterTasks(status?: string, search?: string): Task[] {
  return tasks.filter(t => {
    if (status && t.status !== status) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
}

console.log(filterTasks('OPEN'));
console.log(filterTasks(undefined, 'learn'));
console.log(filterTasks('OPEN', 'nestjs'));`,
        hint: "Chain các điều kiện filter — trả về false sớm nếu không khớp",
      },
    ],
  },

  {
    id: "05-authentication",
    title: "Authentication với JWT & Bcrypt",
    description: "Đăng ký, đăng nhập, hash password, JWT token, Passport.js guards",
    level: "Nâng cao",
    videos: [
      S(DIR5, "01. Intro to Authentication and Authorization.mp4"),
      S(DIR5, "02. Setting up AuthModule, User Entity and User Repository.mp4"),
      S(DIR5, "07. Password Hashing With Bcrypt.mp4"),
      S(DIR5, "08. Feature Signing In.mp4"),
      S(DIR5, "09. Intro to JSON Web Tokens (JWT).mp4"),
      S(DIR5, "10. Setting up the JWT Module and Passport.js.mp4"),
      S(DIR5, "11. Signing a JWT Token on Sign In (Authentication).mp4"),
      S(DIR5, "13. Custom @GetUser Decorator.mp4"),
      S(DIR5, "14. Guarding the Tasks Routes.mp4"),
    ],
    content: `## Authentication với JWT

### Cài đặt

\`\`\`bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/bcrypt @types/passport-jwt
\`\`\`

### Hash password với Bcrypt

\`\`\`typescript
const salt = await bcrypt.genSalt();
const hashedPassword = await bcrypt.hash(password, salt);

// Verify
const isMatch = await bcrypt.compare(plainText, hashedPassword);
if (!isMatch) throw new UnauthorizedException('Wrong credentials');
\`\`\`

### Sign JWT token

\`\`\`typescript
const payload: JwtPayload = { username };
const accessToken = this.jwtService.sign(payload);
return { accessToken };
\`\`\`

### JWT Strategy

\`\`\`typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UsersRepository) {
    super({
      secretOrKey: 'topSecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.usersRepository.findOne({ username });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
\`\`\`

### Guard route

\`\`\`typescript
@UseGuards(AuthGuard())
@Get()
getTasks(@GetUser() user: User) {
  return this.tasksService.getTasks(user);
}
\`\`\``,
    codeExample: `// Mô phỏng JWT Auth flow
class AuthService {
  private users: Array<{username: string; hash: string}> = [];

  // Mô phỏng bcrypt hash
  private async hash(password: string): Promise<string> {
    return \`hashed:\${password}\`; // thực tế dùng bcrypt.hash()
  }

  private async compare(plain: string, hashed: string): Promise<boolean> {
    return hashed === \`hashed:\${plain}\`; // thực tế dùng bcrypt.compare()
  }

  // Mô phỏng JWT sign
  private sign(payload: object): string {
    return 'Bearer ' + btoa(JSON.stringify(payload));
  }

  async signUp(username: string, password: string): Promise<void> {
    const exists = this.users.find(u => u.username === username);
    if (exists) throw new Error('Username already exists');
    const hash = await this.hash(password);
    this.users.push({ username, hash });
    console.log(\`User "\${username}" created\`);
  }

  async signIn(username: string, password: string): Promise<{accessToken: string}> {
    const user = this.users.find(u => u.username === username);
    if (!user) throw new Error('Invalid credentials');
    const ok = await this.compare(password, user.hash);
    if (!ok) throw new Error('Invalid credentials');
    const token = this.sign({ username });
    return { accessToken: token };
  }
}

const auth = new AuthService();
auth.signUp('alice', 'pass123').then(() =>
  auth.signIn('alice', 'pass123').then(r => console.log('Token:', r.accessToken))
);
auth.signIn('alice', 'wrongpass').catch(e => console.error('Error:', e.message));`,
    exercises: [
      {
        title: "Password hashing simulation",
        description: "Implement hashPassword và verifyPassword dùng simple encoding",
        starterCode: `// Mô phỏng bcrypt với base64 + salt
function hashPassword(password: string, salt: string): string {
  // Return format: salt:base64(password+salt)
}

function verifyPassword(plain: string, hashed: string): boolean {
  // Parse salt từ hashed, hash lại plain, so sánh
}

const hash = hashPassword('mySecret', 'randomSalt123');
console.log('Hash:', hash);
console.log('Correct:', verifyPassword('mySecret', hash));
console.log('Wrong:', verifyPassword('wrong', hash));`,
        solution: `function hashPassword(password: string, salt: string): string {
  const combined = btoa(password + salt);
  return \`\${salt}:\${combined}\`;
}

function verifyPassword(plain: string, hashed: string): boolean {
  const [salt] = hashed.split(':');
  return hashPassword(plain, salt) === hashed;
}

const hash = hashPassword('mySecret', 'randomSalt123');
console.log('Hash:', hash);
console.log('Correct:', verifyPassword('mySecret', hash));
console.log('Wrong:', verifyPassword('wrong', hash));`,
        hint: "Tách salt và hash bằng split(':')[0], dùng btoa() để encode",
      },
      {
        title: "JWT payload decode",
        description: "Decode JWT token và extract thông tin user",
        starterCode: `function createToken(username: string, role: string): string {
  const payload = { username, role, iat: Date.now() };
  return 'header.' + btoa(JSON.stringify(payload)) + '.signature';
}

function decodeToken(token: string): { username: string; role: string } | null {
  // Split bằng '.', lấy phần giữa, atob() và JSON.parse()
  // Return null nếu token không hợp lệ
}

const token = createToken('alice', 'admin');
console.log(decodeToken(token));
console.log(decodeToken('invalid.token'));`,
        solution: `function createToken(username: string, role: string): string {
  const payload = { username, role, iat: Date.now() };
  return 'header.' + btoa(JSON.stringify(payload)) + '.signature';
}

function decodeToken(token: string): { username: string; role: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return { username: payload.username, role: payload.role };
  } catch {
    return null;
  }
}

const token = createToken('alice', 'admin');
console.log(decodeToken(token));
console.log(decodeToken('invalid.token'));`,
        hint: "Dùng try/catch, split('.'), atob() và JSON.parse()",
      },
    ],
  },

  {
    id: "06-authorization",
    title: "Authorization & Task Ownership",
    description: "Phân quyền user, liên kết task với user, bảo vệ routes theo ownership",
    level: "Nâng cao",
    videos: [
      S(DIR6, "01. Tasks and Users - Database Relation.mp4"),
      S(DIR6, "02. Make Users Own Tasks.mp4"),
      S(DIR6, "03. Serialize User Data.mp4"),
      S(DIR6, "04. Restricting Getting All Tasks.mp4"),
      S(DIR6, "05. BUG FIX Getting All Tasks.mp4"),
      S(DIR6, "06. Restricting Getting a Task By ID.mp4"),
      S(DIR6, "07. Restricting Status Updates.mp4"),
      S(DIR6, "08. Restricting Deleting A Task.mp4"),
    ],
    content: `## Authorization & Task Ownership

### Database Relation — User ↔ Tasks

\`\`\`typescript
// User entity
@Entity()
export class User {
  @OneToMany(() => Task, task => task.user, { eager: false })
  tasks: Task[];
}

// Task entity
@Entity()
export class Task {
  @ManyToOne(() => User, user => user.tasks, { eager: false })
  user: User;
}
\`\`\`

### Gắn user vào task khi tạo

\`\`\`typescript
async create(dto: CreateTaskDto, user: User): Promise<Task> {
  const task = this.tasksRepository.create({
    ...dto,
    status: TaskStatus.OPEN,
    user,
  });
  return this.tasksRepository.save(task);
}
\`\`\`

### Lọc task theo user

\`\`\`typescript
async getAll(user: User, filterDto: GetTasksFilterDto): Promise<Task[]> {
  const query = this.tasksRepository
    .createQueryBuilder('task')
    .where({ user });

  if (filterDto.status) {
    query.andWhere('task.status = :status', { status: filterDto.status });
  }

  return query.getMany();
}
\`\`\`

### Restrict by ownership

\`\`\`typescript
async getById(id: string, user: User): Promise<Task> {
  const task = await this.tasksRepository.findOne({ where: { id, user } });
  if (!task) throw new NotFoundException();
  return task;
}
\`\`\`

### Ẩn password trong response — @Exclude()

\`\`\`typescript
export class User {
  @Exclude()
  password: string;
}

// main.ts
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
\`\`\``,
    codeExample: `// Mô phỏng Task Ownership
interface User { id: string; username: string; }
interface Task { id: string; title: string; status: string; userId: string; }

class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  create(title: string, user: User): Task {
    const task: Task = { id: String(this.nextId++), title, status: 'OPEN', userId: user.id };
    this.tasks.push(task);
    return task;
  }

  // Chỉ lấy task của user hiện tại
  getAll(user: User): Task[] {
    return this.tasks.filter(t => t.userId === user.id);
  }

  // Verify ownership trước khi delete
  delete(id: string, user: User): boolean {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new Error('404: Task not found');
    if (task.userId !== user.id) throw new Error('403: Forbidden');
    this.tasks = this.tasks.filter(t => t.id !== id);
    return true;
  }
}

const alice: User = { id: '1', username: 'alice' };
const bob: User = { id: '2', username: 'bob' };
const svc = new TasksService();

svc.create('Alice task 1', alice);
svc.create('Alice task 2', alice);
svc.create('Bob task 1', bob);

console.log("Alice's tasks:", svc.getAll(alice));
console.log("Bob's tasks:", svc.getAll(bob));

try { svc.delete('1', bob); } catch(e: any) { console.error(e.message); }
svc.delete('1', alice);
console.log("After delete:", svc.getAll(alice));`,
    exercises: [
      {
        title: "Ownership check middleware",
        description: "Tạo function checkOwnership kiểm tra quyền trước khi thực hiện action",
        starterCode: `interface Resource { id: string; ownerId: string; }
interface User { id: string; role: 'user' | 'admin'; }

function checkOwnership(resource: Resource, user: User): void {
  // Admin có thể làm mọi thứ
  // User chỉ được thao tác resource của chính mình
  // Throw Error('403: Forbidden') nếu không có quyền
}

const res = { id: '1', ownerId: 'user1' };
const owner = { id: 'user1', role: 'user' as const };
const other = { id: 'user2', role: 'user' as const };
const admin = { id: 'admin1', role: 'admin' as const };

// Test 3 trường hợp`,
        solution: `interface Resource { id: string; ownerId: string; }
interface User { id: string; role: 'user' | 'admin'; }

function checkOwnership(resource: Resource, user: User): void {
  if (user.role === 'admin') return;
  if (resource.ownerId !== user.id) throw new Error('403: Forbidden');
}

const res = { id: '1', ownerId: 'user1' };
const owner = { id: 'user1', role: 'user' as const };
const other = { id: 'user2', role: 'user' as const };
const admin = { id: 'admin1', role: 'admin' as const };

try { checkOwnership(res, owner); console.log('Owner: OK'); } catch(e: any) { console.error(e.message); }
try { checkOwnership(res, other); console.log('Other: OK'); } catch(e: any) { console.error(e.message); }
try { checkOwnership(res, admin); console.log('Admin: OK'); } catch(e: any) { console.error(e.message); }`,
        hint: "Kiểm tra role === 'admin' trước, sau đó kiểm tra ownerId",
      },
    ],
  },

  {
    id: "07-logging-config",
    title: "Logging & Configuration",
    description: "NestJS Logger, environment variables, ConfigModule, schema validation",
    level: "Trung cấp",
    videos: [
      S(DIR8, "01. Introduction to Logging.mp4"),
      S(DIR8, "02. Implementing Logs in our NestJS app.mp4"),
      S(DIR9, "01. Introduction to Configuration.mp4"),
      S(DIR9, "03. Quick Intro to Environment Variables.mp4"),
      S(DIR9, "04. Setting up ConfigModule.mp4"),
      S(DIR9, "05. TypeORM Configuration.mp4"),
      S(DIR9, "07. JWT Secret Configuration.mp4"),
    ],
    content: `## Logging & Configuration

### NestJS Logger

\`\`\`typescript
@Injectable()
export class TasksService {
  private logger = new Logger('TasksService');

  async getAll(user: User): Promise<Task[]> {
    this.logger.verbose(\`User "\${user.username}" retrieving all tasks\`);
    return this.tasksRepository.find({ where: { user } });
  }
}
\`\`\`

### Log levels: verbose → debug → log → warn → error

### ConfigModule & .env

\`\`\`bash
npm install @nestjs/config
\`\`\`

\`\`\`typescript
// app.module.ts
ConfigModule.forRoot({ isGlobal: true })

// .env
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=supersecret

// Sử dụng
constructor(private configService: ConfigService) {}
const host = this.configService.get<string>('DB_HOST');
\`\`\`

### Joi Schema Validation

\`\`\`typescript
npm install joi

ConfigModule.forRoot({
  validationSchema: Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    JWT_SECRET: Joi.string().required(),
  }),
})
\`\`\``,
    codeExample: `// Mô phỏng Logger và ConfigService
class Logger {
  constructor(private context: string) {}
  log(msg: string) { console.log(\`[LOG] [\${this.context}] \${msg}\`); }
  warn(msg: string) { console.warn(\`[WARN] [\${this.context}] \${msg}\`); }
  error(msg: string) { console.error(\`[ERROR] [\${this.context}] \${msg}\`); }
  verbose(msg: string) { console.log(\`[VERBOSE] [\${this.context}] \${msg}\`); }
}

class ConfigService {
  private config: Record<string, string>;

  constructor(env: Record<string, string>) {
    this.config = env;
    new Logger('ConfigService').log('Configuration loaded');
  }

  get<T = string>(key: string, defaultValue?: T): T {
    return (this.config[key] ?? defaultValue) as T;
  }

  getOrThrow(key: string): string {
    const val = this.config[key];
    if (!val) throw new Error(\`Config key "\${key}" is required\`);
    return val;
  }
}

const config = new ConfigService({
  DB_HOST: 'localhost',
  DB_PORT: '5432',
  JWT_SECRET: 'supersecret123',
});

const logger = new Logger('TasksService');
logger.log('Service initialized');
logger.verbose('User alice retrieving tasks');

console.log('DB_HOST:', config.get('DB_HOST'));
console.log('DB_PORT:', config.get<number>('DB_PORT'));
console.log('MISSING (default):', config.get('MISSING', 'fallback'));
try { config.getOrThrow('API_KEY'); } catch(e: any) { logger.error(e.message); }`,
    exercises: [
      {
        title: "Config validation",
        description: "Validate required env vars khi app khởi động",
        starterCode: `const required = ['DB_HOST', 'DB_PORT', 'JWT_SECRET'];

function validateConfig(env: Record<string, string | undefined>): void {
  // Throw Error với danh sách các key bị thiếu nếu có
}

// Test 1: đủ config
validateConfig({ DB_HOST: 'localhost', DB_PORT: '5432', JWT_SECRET: 'secret' });
console.log('Config 1: OK');

// Test 2: thiếu 2 key
try {
  validateConfig({ DB_HOST: 'localhost' });
} catch(e: any) { console.error(e.message); }`,
        solution: `const required = ['DB_HOST', 'DB_PORT', 'JWT_SECRET'];

function validateConfig(env: Record<string, string | undefined>): void {
  const missing = required.filter(key => !env[key]);
  if (missing.length > 0) {
    throw new Error(\`Missing required env vars: \${missing.join(', ')}\`);
  }
}

validateConfig({ DB_HOST: 'localhost', DB_PORT: '5432', JWT_SECRET: 'secret' });
console.log('Config 1: OK');

try {
  validateConfig({ DB_HOST: 'localhost' });
} catch(e: any) { console.error(e.message); }`,
        hint: "Dùng Array.filter để lọc các key không có trong env object",
      },
    ],
  },

  {
    id: "08-testing",
    title: "Unit Testing với Jest",
    description: "Viết unit test, mock dependencies, test service và controller",
    level: "Nâng cao",
    videos: [
      S(DIR12, "01. Unit Testing Crash Course Basics.mp4"),
      S(DIR12, "02. Unit Testing Crash Course First Tests.mp4"),
      S(DIR12, "03. IMPORTANT Fixing import paths.mp4"),
    ],
    content: `## Unit Testing với Jest

### Cấu trúc test cơ bản

\`\`\`typescript
describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();
    service = module.get<TasksService>(TasksService);
  });

  it('should get all tasks', async () => {
    const tasks = await service.getAll();
    expect(tasks).toBeInstanceOf(Array);
  });
});
\`\`\`

### Mock Repository

\`\`\`typescript
const mockRepo = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

providers: [
  TasksService,
  { provide: getRepositoryToken(Task), useValue: mockRepo },
]
\`\`\`

### Test cases phổ biến

\`\`\`typescript
it('throws NotFoundException for invalid id', async () => {
  mockRepo.findOne.mockResolvedValue(null);
  await expect(service.getById('bad-id', mockUser))
    .rejects.toThrow(NotFoundException);
});

it('creates a task successfully', async () => {
  mockRepo.create.mockReturnValue(mockTask);
  mockRepo.save.mockResolvedValue(mockTask);
  const result = await service.create(mockDto, mockUser);
  expect(result.title).toBe(mockDto.title);
  expect(result.status).toBe(TaskStatus.OPEN);
});
\`\`\``,
    codeExample: `// Mô phỏng Jest test framework
function describe(name: string, fn: () => void) {
  console.log(\`\\n📦 \${name}\`);
  fn();
}
function it(name: string, fn: () => void | Promise<void>) {
  try {
    const result = fn();
    if (result instanceof Promise) {
      result
        .then(() => console.log(\`  ✅ \${name}\`))
        .catch(e => console.log(\`  ❌ \${name}: \${e.message}\`));
    } else {
      console.log(\`  ✅ \${name}\`);
    }
  } catch(e: any) { console.log(\`  ❌ \${name}: \${e.message}\`); }
}
function expect(val: unknown) {
  return {
    toBe: (expected: unknown) => { if (val !== expected) throw new Error(\`Expected \${expected}, got \${val}\`); },
    toEqual: (expected: unknown) => { if (JSON.stringify(val) !== JSON.stringify(expected)) throw new Error('Not equal'); },
    toBeInstanceOf: (cls: Function) => { if (!(val instanceof cls)) throw new Error(\`Not instanceof \${cls.name}\`); },
    toThrow: () => { /* async check */ },
    rejects: { toThrow: async (cls?: unknown) => {} },
  };
}

// Service to test
class TasksService {
  private tasks = [{ id: '1', title: 'Test task', status: 'OPEN' }];
  getAll() { return this.tasks; }
  getById(id: string) {
    const t = this.tasks.find(t => t.id === id);
    if (!t) throw new Error('Not found');
    return t;
  }
  create(title: string) {
    const t = { id: String(Date.now()), title, status: 'OPEN' };
    this.tasks.push(t);
    return t;
  }
}

describe('TasksService', () => {
  const svc = new TasksService();

  it('getAll returns an array', () => {
    expect(svc.getAll()).toBeInstanceOf(Array);
  });

  it('getById returns correct task', () => {
    expect(svc.getById('1').title).toBe('Test task');
  });

  it('create adds a task', () => {
    const t = svc.create('New task');
    expect(t.status).toBe('OPEN');
  });

  it('getById throws for invalid id', () => {
    try { svc.getById('999'); throw new Error('Should have thrown'); }
    catch(e: any) { expect(e.message).toBe('Not found'); }
  });
});`,
    exercises: [
      {
        title: "Viết test cho Calculator",
        description: "Test đủ cases cho class Calculator: add, divide (chia cho 0)",
        starterCode: `class Calculator {
  add(a: number, b: number): number { return a + b; }
  subtract(a: number, b: number): number { return a - b; }
  multiply(a: number, b: number): number { return a * b; }
  divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }
}

// Viết ít nhất 5 test cases cho Calculator
// Bao gồm: add, subtract, multiply, divide bình thường, và divide by zero`,
        solution: `class Calculator {
  add(a: number, b: number): number { return a + b; }
  subtract(a: number, b: number): number { return a - b; }
  multiply(a: number, b: number): number { return a * b; }
  divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }
}

const calc = new Calculator();
const tests = [
  ['add(2,3) = 5', () => calc.add(2, 3) === 5],
  ['subtract(10,4) = 6', () => calc.subtract(10, 4) === 6],
  ['multiply(3,4) = 12', () => calc.multiply(3, 4) === 12],
  ['divide(10,2) = 5', () => calc.divide(10, 2) === 5],
  ['divide by zero throws', () => {
    try { calc.divide(5, 0); return false; }
    catch(e: any) { return e.message === 'Division by zero'; }
  }],
];

tests.forEach(([name, fn]) => {
  console.log((fn as () => boolean)() ? \`✅ \${name}\` : \`❌ \${name}\`);
});`,
        hint: "Test divide by zero bằng try/catch, kiểm tra message của error",
      },
    ],
  },

  {
    id: "09-deployment",
    title: "Deployment lên Cloud",
    description: "Deploy NestJS lên Heroku, cấu hình PostgreSQL trên cloud, environment variables",
    level: "Nâng cao",
    videos: [
      S(DIR11, "02. Signing up to Heroku.mp4"),
      S(DIR11, "03. Creating a Heroku Application.mp4"),
      S(DIR11, "04. Installing the the Heroku CLI.mp4"),
      S(DIR11, "05. Postgres on Heroku.mp4"),
      S(DIR11, "06. Changes in our NestJS App.mp4"),
      S(DIR11, "07. Deploying NestJS to Heroku.mp4"),
    ],
    content: `## Deployment

### Chuẩn bị ứng dụng

\`\`\`typescript
// main.ts - lấy PORT từ env
const port = process.env.PORT || 3000;
await app.listen(port);
\`\`\`

### Procfile cho Heroku

\`\`\`
web: npm run start:prod
\`\`\`

### TypeORM config cho production

\`\`\`typescript
TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    url: config.get('DATABASE_URL'),
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
    entities: [Task, User],
    synchronize: false,
    migrations: ['dist/migrations/*.js'],
  }),
})
\`\`\`

### Deploy commands

\`\`\`bash
heroku create my-nestjs-app
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your-secret NODE_ENV=production
git push heroku main
heroku logs --tail
\`\`\`

### Package.json scripts

\`\`\`json
{
  "scripts": {
    "build": "nest build",
    "start:prod": "node dist/main"
  }
}
\`\`\``,
    codeExample: `// Cấu hình production-ready
const config = {
  port: parseInt(process.env['PORT'] ?? '3000'),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  dbUrl: process.env['DATABASE_URL'] ?? 'postgresql://localhost/dev',
  jwtSecret: process.env['JWT_SECRET'] ?? 'dev-secret',
};

console.log('Environment:', config.nodeEnv);
console.log('Port:', config.port);
console.log('SSL:', config.nodeEnv === 'production' ? 'enabled' : 'disabled');

// Health check endpoint simulation
function healthCheck() {
  return {
    status: 'ok',
    uptime: process.uptime?.() ?? 0,
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  };
}

console.log('Health:', healthCheck());

// Graceful shutdown simulation
function setupShutdown(cleanup: () => void) {
  ['SIGTERM', 'SIGINT'].forEach(signal => {
    process.on(signal, () => {
      console.log(\`Received \${signal}, shutting down gracefully...\`);
      cleanup();
      process.exit(0);
    });
  });
}

setupShutdown(() => console.log('Database connections closed'));
console.log('App ready — listening on port', config.port);`,
    exercises: [
      {
        title: "Environment-aware config",
        description: "Tạo config factory trả về setting khác nhau theo NODE_ENV",
        starterCode: `type Env = 'development' | 'production' | 'test';

interface AppConfig {
  dbUrl: string;
  jwtExpiry: string;
  logLevel: 'verbose' | 'log' | 'error';
  ssl: boolean;
}

function getConfig(env: Env): AppConfig {
  // development: db=localhost, expiry=1d, log=verbose, ssl=false
  // production:  db=process.env.DATABASE_URL, expiry=15m, log=error, ssl=true
  // test:        db=memory, expiry=1h, log=error, ssl=false
}

console.log('Dev:', getConfig('development'));
console.log('Prod:', getConfig('production'));
console.log('Test:', getConfig('test'));`,
        solution: `type Env = 'development' | 'production' | 'test';
interface AppConfig { dbUrl: string; jwtExpiry: string; logLevel: 'verbose' | 'log' | 'error'; ssl: boolean; }

function getConfig(env: Env): AppConfig {
  const configs: Record<Env, AppConfig> = {
    development: { dbUrl: 'postgresql://localhost/dev', jwtExpiry: '1d', logLevel: 'verbose', ssl: false },
    production:  { dbUrl: process.env['DATABASE_URL'] ?? '', jwtExpiry: '15m', logLevel: 'error', ssl: true },
    test:        { dbUrl: 'memory', jwtExpiry: '1h', logLevel: 'error', ssl: false },
  };
  return configs[env];
}

console.log('Dev:', getConfig('development'));
console.log('Prod:', getConfig('production'));
console.log('Test:', getConfig('test'));`,
        hint: "Dùng Record<Env, AppConfig> để map từng environment sang config object",
      },
    ],
  },
];
