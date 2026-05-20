import type { Lesson } from "@/data/typescript-lessons";

export const dockerLessons: Lesson[] = [
  {
    id: "01-gioi-thieu",
    title: "Giới thiệu Docker",
    description: "Docker là gì, container vs VM, cài đặt Docker Desktop và chạy container đầu tiên",
    level: "Cơ bản",
    content: `## Docker là gì?

Docker là nền tảng đóng gói ứng dụng thành **container** — môi trường chạy độc lập, nhất quán trên mọi máy.

### Container vs Virtual Machine

| | Container | Virtual Machine |
|---|---|---|
| **Khởi động** | Vài giây | Vài phút |
| **Kích thước** | MB | GB |
| **Cô lập** | Process level | OS level |
| **Hiệu năng** | Gần native | Có overhead |

### Các khái niệm cốt lõi

- **Image** — bản thiết kế (template) của container, read-only
- **Container** — instance đang chạy của image
- **Registry** — kho lưu images (Docker Hub, ECR, GCR...)
- **Dockerfile** — file hướng dẫn build image

### Cài đặt

Tải **Docker Desktop** tại https://docs.docker.com/get-docker/

Kiểm tra:
\`\`\`bash
docker --version
docker run hello-world
\`\`\`

### Lệnh cơ bản

\`\`\`bash
# Pull image từ Docker Hub
docker pull nginx

# Chạy container
docker run -d -p 8080:80 --name my-nginx nginx

# Xem container đang chạy
docker ps

# Xem tất cả container (kể cả đã dừng)
docker ps -a

# Dừng container
docker stop my-nginx

# Xóa container
docker rm my-nginx

# Xem images
docker images

# Xóa image
docker rmi nginx
\`\`\`

### Vòng đời container

\`\`\`
docker pull → docker run → docker stop → docker rm
                ↓
           docker exec  (chạy lệnh bên trong)
           docker logs  (xem logs)
\`\`\``,
    codeExample: `// Mô phỏng Docker container lifecycle
class DockerContainer {
  name: string;
  image: string;
  status: 'created' | 'running' | 'stopped' | 'removed';
  ports: Record<string, number>;
  logs: string[] = [];

  constructor(image: string, name: string, ports: Record<string, number> = {}) {
    this.image = image;
    this.name = name;
    this.status = 'created';
    this.ports = ports;
  }

  start() {
    if (this.status === 'removed') throw new Error('Container đã bị xóa');
    this.status = 'running';
    this.logs.push(\`[\${new Date().toISOString()}] Container "\${this.name}" started\`);
    console.log(\`✅ Container "\${this.name}" đang chạy\`);
    if (Object.keys(this.ports).length) {
      Object.entries(this.ports).forEach(([host, container]) =>
        console.log(\`   Port mapping: \${host} → container:\${container}\`)
      );
    }
  }

  stop() {
    if (this.status !== 'running') throw new Error('Container chưa chạy');
    this.status = 'stopped';
    this.logs.push(\`[\${new Date().toISOString()}] Container "\${this.name}" stopped\`);
    console.log(\`🛑 Container "\${this.name}" đã dừng\`);
  }

  remove() {
    if (this.status === 'running') throw new Error('Dừng container trước khi xóa');
    this.status = 'removed';
    console.log(\`🗑️  Container "\${this.name}" đã bị xóa\`);
  }

  exec(cmd: string): string {
    if (this.status !== 'running') throw new Error('Container chưa chạy');
    const output = \`Executing in \${this.name}: \${cmd}\`;
    this.logs.push(output);
    return output;
  }

  inspect() {
    return { name: this.name, image: this.image, status: this.status, ports: this.ports };
  }
}

// Mô phỏng Docker commands
const nginx = new DockerContainer('nginx:latest', 'my-nginx', { '8080': 80 });
nginx.start();
console.log(nginx.exec('nginx -v'));
console.log('Inspect:', nginx.inspect());
nginx.stop();
nginx.remove();`,
    exercises: [
      {
        title: "Container Manager",
        description: "Tạo class DockerManager quản lý nhiều containers",
        starterCode: `class Container {
  constructor(public name: string, public image: string, public status = 'stopped') {}
}

class DockerManager {
  private containers: Container[] = [];

  run(image: string, name: string): Container {
    // Tạo container, set status='running', thêm vào danh sách, return
  }

  stop(name: string): void {
    // Tìm container theo name, set status='stopped', throw nếu không tìm thấy
  }

  ps(all = false): Container[] {
    // all=false: chỉ trả về running, all=true: tất cả
  }
}

const docker = new DockerManager();
docker.run('nginx', 'web');
docker.run('postgres', 'db');
docker.stop('db');
console.log('Running:', docker.ps().map(c => c.name));
console.log('All:', docker.ps(true).map(c => \`\${c.name}(\${c.status})\`));`,
        solution: `class Container {
  constructor(public name: string, public image: string, public status = 'stopped') {}
}

class DockerManager {
  private containers: Container[] = [];

  run(image: string, name: string): Container {
    const c = new Container(name, image, 'running');
    this.containers.push(c);
    return c;
  }

  stop(name: string): void {
    const c = this.containers.find(c => c.name === name);
    if (!c) throw new Error(\`Container "\${name}" not found\`);
    c.status = 'stopped';
  }

  ps(all = false): Container[] {
    return all ? this.containers : this.containers.filter(c => c.status === 'running');
  }
}

const docker = new DockerManager();
docker.run('nginx', 'web');
docker.run('postgres', 'db');
docker.stop('db');
console.log('Running:', docker.ps().map(c => c.name));
console.log('All:', docker.ps(true).map(c => \`\${c.name}(\${c.status})\`));`,
        hint: "ps() dùng Array.filter với điều kiện status === 'running'",
      },
      {
        title: "Port mapping",
        description: "Implement port mapping giữa host và container",
        starterCode: `class PortMapper {
  private mappings: Map<number, {containerPort: number; containerName: string}> = new Map();

  // map(hostPort, containerPort, containerName): void
  // - Throw nếu hostPort đã được dùng
  unmap(hostPort: number): void { this.mappings.delete(hostPort); }
  getContainer(hostPort: number) { return this.mappings.get(hostPort) ?? null; }
  listAll(): string[] { /* trả về ["8080->nginx:80", ...] */ return []; }
}

const pm = new PortMapper();
// Thêm method map() và hoàn thiện listAll()
// Test: map 8080→nginx:80, 5432→db:5432, thử map 8080 lần 2 (lỗi)`,
        solution: `class PortMapper {
  private mappings: Map<number, {containerPort: number; containerName: string}> = new Map();

  map(hostPort: number, containerPort: number, containerName: string): void {
    if (this.mappings.has(hostPort)) {
      throw new Error(\`Port \${hostPort} already in use\`);
    }
    this.mappings.set(hostPort, { containerPort, containerName });
  }

  unmap(hostPort: number): void { this.mappings.delete(hostPort); }
  getContainer(hostPort: number) { return this.mappings.get(hostPort) ?? null; }

  listAll(): string[] {
    return Array.from(this.mappings.entries()).map(
      ([host, {containerName, containerPort}]) => \`\${host}->\${containerName}:\${containerPort}\`
    );
  }
}

const pm = new PortMapper();
pm.map(8080, 80, 'nginx');
pm.map(5432, 5432, 'db');
console.log(pm.listAll());
console.log(pm.getContainer(8080));
try { pm.map(8080, 80, 'nginx2'); } catch(e: any) { console.error(e.message); }`,
        hint: "Dùng Map.has() để kiểm tra port đã dùng chưa",
      },
    ],
  },

  {
    id: "02-dockerfile",
    title: "Dockerfile — Build Custom Images",
    description: "Viết Dockerfile, các lệnh FROM/RUN/COPY/CMD/EXPOSE, build và tag images",
    level: "Cơ bản",
    content: `## Dockerfile

Dockerfile là file text chứa tập lệnh để build Docker image.

### Cấu trúc Dockerfile cơ bản

\`\`\`dockerfile
# 1. Base image
FROM node:20-alpine

# 2. Thư mục làm việc trong container
WORKDIR /app

# 3. Copy package files trước (cache layer)
COPY package*.json ./

# 4. Cài dependencies
RUN npm ci --only=production

# 5. Copy source code
COPY . .

# 6. Build TypeScript
RUN npm run build

# 7. Expose port
EXPOSE 3000

# 8. Lệnh chạy khi start container
CMD ["node", "dist/main.js"]
\`\`\`

### Các lệnh Dockerfile quan trọng

| Lệnh | Mô tả |
|---|---|
| \`FROM\` | Base image |
| \`WORKDIR\` | Set working directory |
| \`COPY\` | Copy file từ host vào image |
| \`ADD\` | Như COPY nhưng hỗ trợ URL và giải nén tar |
| \`RUN\` | Chạy lệnh lúc build |
| \`CMD\` | Lệnh mặc định khi chạy container |
| \`ENTRYPOINT\` | Lệnh cố định (CMD là argument) |
| \`EXPOSE\` | Khai báo port (không publish thực sự) |
| \`ENV\` | Set biến môi trường |
| \`ARG\` | Build-time variable |
| \`VOLUME\` | Khai báo mount point |
| \`USER\` | Chạy với user khác (bảo mật) |

### .dockerignore

\`\`\`
node_modules
dist
.git
*.log
.env
\`\`\`

### Build và tag

\`\`\`bash
# Build image
docker build -t my-app:1.0 .

# Build với Dockerfile cụ thể
docker build -f Dockerfile.prod -t my-app:prod .

# Xem image layers
docker history my-app:1.0

# Push lên Docker Hub
docker tag my-app:1.0 username/my-app:1.0
docker push username/my-app:1.0
\`\`\`

### Multi-stage build — giảm kích thước image

\`\`\`dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production (chỉ lấy kết quả build)
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
\`\`\``,
    codeExample: `// Mô phỏng Dockerfile build process
interface Layer {
  instruction: string;
  content: string;
  sizeKB: number;
  cached: boolean;
}

class ImageBuilder {
  private layers: Layer[] = [];
  private baseImage: string = '';
  private name: string;
  private tag: string;

  constructor(name: string, tag = 'latest') {
    this.name = name;
    this.tag = tag;
  }

  FROM(image: string) {
    this.baseImage = image;
    this.addLayer('FROM', image, image.includes('alpine') ? 5000 : 50000);
    return this;
  }

  WORKDIR(path: string) {
    this.addLayer('WORKDIR', path, 1);
    return this;
  }

  COPY(src: string, dest: string, sizeKB = 100) {
    this.addLayer('COPY', \`\${src} → \${dest}\`, sizeKB);
    return this;
  }

  RUN(cmd: string, sizeKB = 50) {
    this.addLayer('RUN', cmd, sizeKB);
    return this;
  }

  EXPOSE(port: number) {
    this.addLayer('EXPOSE', String(port), 0);
    return this;
  }

  CMD(command: string[]) {
    this.addLayer('CMD', command.join(' '), 0);
    return this;
  }

  private addLayer(instruction: string, content: string, sizeKB: number, cached = false) {
    this.layers.push({ instruction, content, sizeKB, cached });
  }

  build() {
    const totalMB = (this.layers.reduce((s, l) => s + l.sizeKB, 0) / 1024).toFixed(1);
    console.log(\`\\nBuilding \${this.name}:\${this.tag}...\`);
    this.layers.forEach((l, i) => {
      const size = l.sizeKB > 0 ? \` (\${l.sizeKB >= 1024 ? (l.sizeKB/1024).toFixed(0)+'MB' : l.sizeKB+'KB'})\` : '';
      console.log(\`  Step \${i+1}: \${l.instruction} \${l.content}\${size}\`);
    });
    console.log(\`\\n✅ Image built: \${this.name}:\${this.tag} (\${totalMB}MB total)\`);
    return { name: this.name, tag: this.tag, layers: this.layers.length, sizeMB: totalMB };
  }
}

// Dockerfile cho NestJS app
const image = new ImageBuilder('my-nestjs-app', '1.0')
  .FROM('node:20-alpine')
  .WORKDIR('/app')
  .COPY('package*.json', './', 10)
  .RUN('npm ci --only=production', 80000)
  .COPY('. ', '.', 500)
  .RUN('npm run build', 200)
  .EXPOSE(3000)
  .CMD(['node', 'dist/main.js'])
  .build();

console.log('\\nImage info:', image);`,
    exercises: [
      {
        title: "Phân tích Dockerfile",
        description: "Đọc Dockerfile và trả về danh sách layers với thứ tự đúng",
        starterCode: `const dockerfile = \`
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY src/ ./src/
EXPOSE 3000
CMD ["node", "src/index.js"]
\`;

function parseDockerfile(content: string): Array<{instruction: string; args: string}> {
  // Parse từng dòng, bỏ qua dòng trống và comment (#)
  // Tách instruction (từ đầu tiên) và args (phần còn lại)
}

const layers = parseDockerfile(dockerfile);
layers.forEach((l, i) => console.log(\`\${i+1}. \${l.instruction}: \${l.args}\`));`,
        solution: `const dockerfile = \`
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY src/ ./src/
EXPOSE 3000
CMD ["node", "src/index.js"]
\`;

function parseDockerfile(content: string): Array<{instruction: string; args: string}> {
  return content
    .split('\\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))
    .map(line => {
      const spaceIdx = line.indexOf(' ');
      return {
        instruction: line.substring(0, spaceIdx).toUpperCase(),
        args: line.substring(spaceIdx + 1).trim(),
      };
    });
}

const layers = parseDockerfile(dockerfile);
layers.forEach((l, i) => console.log(\`\${i+1}. \${l.instruction}: \${l.args}\`));`,
        hint: "split('\\n'), filter bỏ dòng trống và #, indexOf(' ') để tách instruction",
      },
      {
        title: "Multi-stage build simulator",
        description: "Tính kích thước image khi dùng multi-stage vs single-stage",
        starterCode: `interface Stage { name: string; layers: Array<{name: string; sizeMB: number}>; }

function calcImageSize(stages: Stage[], finalStage: string, copyFromStages: string[]): number {
  // finalStage: chỉ lấy layers của stage này
  // copyFromStages: cộng thêm layers của các stage được COPY --from=
  // Trả về tổng MB của image cuối
}

const stages: Stage[] = [
  { name: 'builder', layers: [
    { name: 'node:18', sizeMB: 340 },
    { name: 'npm install (dev deps)', sizeMB: 200 },
    { name: 'build output', sizeMB: 5 },
  ]},
  { name: 'production', layers: [
    { name: 'node:18-alpine', sizeMB: 50 },
    { name: 'npm install (prod only)', sizeMB: 80 },
  ]},
];

const singleStageSize = 340 + 200 + 5; // MB
const multiStageSize = calcImageSize(stages, 'production', []);
console.log('Single stage:', singleStageSize, 'MB');
console.log('Multi stage:', multiStageSize, 'MB');
console.log('Saved:', singleStageSize - multiStageSize, 'MB');`,
        solution: `interface Stage { name: string; layers: Array<{name: string; sizeMB: number}>; }

function calcImageSize(stages: Stage[], finalStage: string, copyFromStages: string[]): number {
  const allStages = new Map(stages.map(s => [s.name, s]));
  const final = allStages.get(finalStage);
  if (!final) throw new Error(\`Stage "\${finalStage}" not found\`);

  const finalSize = final.layers.reduce((s, l) => s + l.sizeMB, 0);
  const extraSize = copyFromStages.reduce((total, stageName) => {
    const stage = allStages.get(stageName);
    return total + (stage ? stage.layers.reduce((s, l) => s + l.sizeMB, 0) : 0);
  }, 0);
  return finalSize + extraSize;
}

const stages: Stage[] = [
  { name: 'builder', layers: [
    { name: 'node:18', sizeMB: 340 },
    { name: 'npm install (dev deps)', sizeMB: 200 },
    { name: 'build output', sizeMB: 5 },
  ]},
  { name: 'production', layers: [
    { name: 'node:18-alpine', sizeMB: 50 },
    { name: 'npm install (prod only)', sizeMB: 80 },
  ]},
];

const singleStageSize = 340 + 200 + 5;
const multiStageSize = calcImageSize(stages, 'production', []);
console.log('Single stage:', singleStageSize, 'MB');
console.log('Multi stage:', multiStageSize, 'MB');
console.log('Saved:', singleStageSize - multiStageSize, 'MB');`,
        hint: "Dùng Map để tra cứu stage theo tên, reduce để cộng sizes",
      },
    ],
  },

  {
    id: "03-compose",
    title: "Docker Compose — Multi-Container Apps",
    description: "docker-compose.yml, services, networks, volumes, depends_on, environment",
    level: "Trung cấp",
    content: `## Docker Compose

Quản lý nhiều containers như một ứng dụng với file \`docker-compose.yml\`.

### docker-compose.yml cho NestJS + PostgreSQL

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=postgres
      - DB_NAME=taskmanagement
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./logs:/app/logs

  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: taskmanagement
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: admin
    depends_on:
      - postgres

volumes:
  postgres_data:
\`\`\`

### Lệnh Docker Compose

\`\`\`bash
# Khởi động tất cả services (build nếu cần)
docker compose up -d

# Chỉ build lại images
docker compose build

# Xem logs
docker compose logs -f app
docker compose logs -f postgres

# Dừng tất cả
docker compose down

# Dừng và xóa volumes
docker compose down -v

# Scale service
docker compose up -d --scale app=3

# Chạy lệnh trong service
docker compose exec app sh
docker compose exec postgres psql -U postgres
\`\`\`

### Override với môi trường khác

\`\`\`yaml
# docker-compose.dev.yml
services:
  app:
    build:
      target: development
    volumes:
      - .:/app   # hot reload
    command: npm run start:dev
    environment:
      - NODE_ENV=development
\`\`\`

\`\`\`bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
\`\`\``,
    codeExample: `// Mô phỏng Docker Compose orchestration
interface ServiceConfig {
  image?: string;
  build?: string;
  ports?: string[];
  environment?: Record<string, string>;
  dependsOn?: string[];
  volumes?: string[];
}

class ComposeOrchestrator {
  private services: Map<string, ServiceConfig & { status: string }> = new Map();
  private startOrder: string[] = [];

  addService(name: string, config: ServiceConfig) {
    this.services.set(name, { ...config, status: 'stopped' });
  }

  private resolveDependencies(): string[] {
    const order: string[] = [];
    const visited = new Set<string>();

    const visit = (name: string) => {
      if (visited.has(name)) return;
      visited.add(name);
      const svc = this.services.get(name)!;
      svc.dependsOn?.forEach(dep => visit(dep));
      order.push(name);
    };

    this.services.forEach((_, name) => visit(name));
    return order;
  }

  async up() {
    this.startOrder = this.resolveDependencies();
    console.log('Start order:', this.startOrder.join(' → '));

    for (const name of this.startOrder) {
      const svc = this.services.get(name)!;
      svc.status = 'running';
      const ports = svc.ports?.map(p => \`:\${p}\`).join(', ') ?? 'none';
      console.log(\`✅ \${name} started | ports: \${ports}\`);
    }
  }

  async down(removeVolumes = false) {
    const order = [...this.startOrder].reverse();
    for (const name of order) {
      const svc = this.services.get(name)!;
      svc.status = 'stopped';
      console.log(\`🛑 \${name} stopped\`);
    }
    if (removeVolumes) console.log('🗑️  Volumes removed');
  }

  ps() {
    console.log('\\nNAME\\t\\tSTATUS\\t\\tPORTS');
    this.services.forEach((svc, name) => {
      const ports = svc.ports?.join(', ') ?? '-';
      console.log(\`\${name}\\t\t\${svc.status}\\t\t\${ports}\`);
    });
  }
}

const compose = new ComposeOrchestrator();
compose.addService('postgres', {
  image: 'postgres:15-alpine',
  ports: ['5432:5432'],
  environment: { POSTGRES_DB: 'mydb' },
});
compose.addService('app', {
  build: '.',
  ports: ['3000:3000'],
  dependsOn: ['postgres'],
  environment: { DB_HOST: 'postgres' },
});
compose.addService('nginx', {
  image: 'nginx:alpine',
  ports: ['80:80'],
  dependsOn: ['app'],
});

compose.up().then(() => { compose.ps(); compose.down(); });`,
    exercises: [
      {
        title: "Dependency resolver",
        description: "Implement topological sort để tìm thứ tự khởi động services",
        starterCode: `const services: Record<string, string[]> = {
  app: ['postgres', 'redis'],
  postgres: [],
  redis: [],
  nginx: ['app'],
  worker: ['redis', 'postgres'],
};

function getStartOrder(deps: Record<string, string[]>): string[] {
  // Topological sort: service phụ thuộc phải chạy sau dependencies của nó
  // postgres, redis → app, worker → nginx
}

console.log(getStartOrder(services));`,
        solution: `const services: Record<string, string[]> = {
  app: ['postgres', 'redis'],
  postgres: [],
  redis: [],
  nginx: ['app'],
  worker: ['redis', 'postgres'],
};

function getStartOrder(deps: Record<string, string[]>): string[] {
  const order: string[] = [];
  const visited = new Set<string>();

  function visit(name: string) {
    if (visited.has(name)) return;
    visited.add(name);
    deps[name]?.forEach(dep => visit(dep));
    order.push(name);
  }

  Object.keys(deps).forEach(visit);
  return order;
}

console.log(getStartOrder(services));`,
        hint: "Dùng DFS (depth-first search) — thêm vào order SAU khi visit xong dependencies",
      },
      {
        title: "Environment variable parser",
        description: "Parse docker-compose environment config thành object",
        starterCode: `// docker-compose hỗ trợ 2 format:
// - "KEY=VALUE" (string array)
// - {KEY: VALUE} (object)
type EnvInput = string[] | Record<string, string>;

function parseEnv(env: EnvInput): Record<string, string> {
  // Nếu là array: parse "KEY=VALUE" thành {KEY: VALUE}
  // Nếu là object: return as-is
  // Nếu value trống (chỉ KEY): lấy từ process.env hoặc để trống
}

console.log(parseEnv(['NODE_ENV=production', 'PORT=3000', 'DEBUG']));
console.log(parseEnv({ DB_HOST: 'postgres', DB_PORT: '5432' }));`,
        solution: `type EnvInput = string[] | Record<string, string>;

function parseEnv(env: EnvInput): Record<string, string> {
  if (Array.isArray(env)) {
    return env.reduce((acc, item) => {
      const eqIdx = item.indexOf('=');
      if (eqIdx === -1) {
        acc[item] = process.env[item] ?? '';
      } else {
        acc[item.substring(0, eqIdx)] = item.substring(eqIdx + 1);
      }
      return acc;
    }, {} as Record<string, string>);
  }
  return { ...env };
}

console.log(parseEnv(['NODE_ENV=production', 'PORT=3000', 'DEBUG']));
console.log(parseEnv({ DB_HOST: 'postgres', DB_PORT: '5432' }));`,
        hint: "Dùng indexOf('=') để tìm vị trí dấu '=', substring để tách key/value",
      },
    ],
  },

  {
    id: "04-volumes-networks",
    title: "Volumes & Networks",
    description: "Lưu trữ dữ liệu bền vững với volumes, giao tiếp giữa containers với networks",
    level: "Trung cấp",
    content: `## Docker Volumes

Dữ liệu trong container bị mất khi container bị xóa. **Volumes** giải quyết vấn đề này.

### Các loại volume

\`\`\`bash
# 1. Named volume — Docker quản lý
docker run -v postgres_data:/var/lib/postgresql/data postgres

# 2. Bind mount — map thư mục host vào container
docker run -v $(pwd)/src:/app/src node:20-alpine

# 3. tmpfs — chỉ trong RAM (không persist)
docker run --tmpfs /tmp nginx
\`\`\`

### Quản lý volumes

\`\`\`bash
docker volume create my_data
docker volume ls
docker volume inspect my_data
docker volume rm my_data
docker volume prune  # xóa volumes không dùng
\`\`\`

## Docker Networks

Containers giao tiếp với nhau qua networks.

### Các loại network

| Type | Mô tả |
|---|---|
| \`bridge\` | Default — containers cùng network có thể ping nhau |
| \`host\` | Dùng chung network của host |
| \`none\` | Hoàn toàn cô lập |
| \`overlay\` | Multi-host (Docker Swarm) |

### Tạo và sử dụng network

\`\`\`bash
# Tạo network
docker network create my-network

# Kết nối container vào network
docker run --network my-network --name api my-app
docker run --network my-network --name db postgres

# Trong compose, các services cùng network mặc định
# → giao tiếp qua tên service: postgres:5432, redis:6379
\`\`\`

### Network trong docker-compose

\`\`\`yaml
services:
  app:
    networks:
      - frontend
      - backend
  postgres:
    networks:
      - backend  # app → db OK, nginx → db bị chặn

networks:
  frontend:
  backend:
    internal: true  # không có internet
\`\`\`

### DNS resolution

Containers trong cùng network giao tiếp qua **tên service** (không cần IP):
\`\`\`
app → postgres:5432
app → redis:6379
nginx → app:3000
\`\`\``,
    codeExample: `// Mô phỏng Docker Networking
class DockerNetwork {
  name: string;
  private containers: Map<string, string> = new Map(); // name → IP

  constructor(name: string) { this.name = name; }

  connect(containerName: string): string {
    if (this.containers.has(containerName)) return this.containers.get(containerName)!;
    const ip = \`172.18.0.\${this.containers.size + 2}\`;
    this.containers.set(containerName, ip);
    console.log(\`  \${containerName} joined \${this.name} → \${ip}\`);
    return ip;
  }

  resolve(name: string): string | null {
    return this.containers.get(name) ?? null;
  }

  canReach(from: string, to: string): boolean {
    return this.containers.has(from) && this.containers.has(to);
  }
}

class DockerVolume {
  name: string;
  private data: Map<string, unknown> = new Map();

  constructor(name: string) { this.name = name; }

  write(path: string, content: unknown) { this.data.set(path, content); }
  read(path: string) { return this.data.get(path) ?? null; }
  size() { return this.data.size; }
}

// Mô phỏng NestJS + PostgreSQL + Redis setup
const backendNet = new DockerNetwork('backend');
const frontendNet = new DockerNetwork('frontend');
const pgVolume = new DockerVolume('postgres_data');

console.log('Setting up networks...');
backendNet.connect('postgres');
backendNet.connect('redis');
backendNet.connect('app');
frontendNet.connect('app');
frontendNet.connect('nginx');

// Test connectivity
console.log('\\nConnectivity:');
console.log('app → postgres:', backendNet.canReach('app', 'postgres') ? '✅' : '❌');
console.log('nginx → postgres:', backendNet.canReach('nginx', 'postgres') ? '✅' : '❌ (isolated)');
console.log('app DNS:', backendNet.resolve('postgres'));

// Volume persistence
pgVolume.write('/data/pg_hba.conf', { auth: 'md5' });
pgVolume.write('/data/users', [{ id: 1, name: 'alice' }]);
console.log('\\nVolume data survives restart:', pgVolume.read('/data/users'));`,
    exercises: [
      {
        title: "Network isolation",
        description: "Implement network isolation — chỉ containers cùng network mới giao tiếp được",
        starterCode: `class Network {
  constructor(public name: string, private members = new Set<string>()) {}
  join(container: string) { this.members.add(container); }
  has(container: string) { return this.members.has(container); }
}

class ContainerNetwork {
  private networks: Map<string, Network> = new Map();
  private containerNetworks: Map<string, Set<string>> = new Map();

  createNetwork(name: string) { this.networks.set(name, new Network(name)); }

  connect(container: string, networkName: string): void {
    // Thêm container vào network và ngược lại
  }

  canCommunicate(containerA: string, containerB: string): boolean {
    // true nếu cả 2 cùng thuộc ít nhất 1 network
  }
}

const cn = new ContainerNetwork();
cn.createNetwork('frontend');
cn.createNetwork('backend');
cn.connect('nginx', 'frontend');
cn.connect('app', 'frontend');
cn.connect('app', 'backend');
cn.connect('postgres', 'backend');

console.log('nginx ↔ app:', cn.canCommunicate('nginx', 'app'));       // true (frontend)
console.log('nginx ↔ postgres:', cn.canCommunicate('nginx', 'postgres')); // false
console.log('app ↔ postgres:', cn.canCommunicate('app', 'postgres')); // true (backend)`,
        solution: `class Network {
  constructor(public name: string, private members = new Set<string>()) {}
  join(container: string) { this.members.add(container); }
  has(container: string) { return this.members.has(container); }
}

class ContainerNetwork {
  private networks: Map<string, Network> = new Map();
  private containerNetworks: Map<string, Set<string>> = new Map();

  createNetwork(name: string) { this.networks.set(name, new Network(name)); }

  connect(container: string, networkName: string): void {
    const net = this.networks.get(networkName);
    if (!net) throw new Error(\`Network "\${networkName}" not found\`);
    net.join(container);
    if (!this.containerNetworks.has(container)) {
      this.containerNetworks.set(container, new Set());
    }
    this.containerNetworks.get(container)!.add(networkName);
  }

  canCommunicate(containerA: string, containerB: string): boolean {
    const netsA = this.containerNetworks.get(containerA) ?? new Set();
    const netsB = this.containerNetworks.get(containerB) ?? new Set();
    for (const net of netsA) {
      if (netsB.has(net)) return true;
    }
    return false;
  }
}

const cn = new ContainerNetwork();
cn.createNetwork('frontend');
cn.createNetwork('backend');
cn.connect('nginx', 'frontend');
cn.connect('app', 'frontend');
cn.connect('app', 'backend');
cn.connect('postgres', 'backend');

console.log('nginx ↔ app:', cn.canCommunicate('nginx', 'app'));
console.log('nginx ↔ postgres:', cn.canCommunicate('nginx', 'postgres'));
console.log('app ↔ postgres:', cn.canCommunicate('app', 'postgres'));`,
        hint: "Kiểm tra intersection của 2 Set network bằng vòng lặp for...of",
      },
    ],
  },

  {
    id: "05-nestjs-docker",
    title: "Docker hóa ứng dụng NestJS",
    description: "Containerize NestJS app, hot-reload trong dev, multi-stage production build",
    level: "Trung cấp",
    content: `## Dockerize NestJS App

### Dockerfile cho NestJS

\`\`\`dockerfile
# ========== Development ==========
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

# ========== Builder ==========
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# ========== Production ==========
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
CMD ["node", "dist/main.js"]
\`\`\`

### docker-compose.yml đầy đủ cho NestJS

\`\`\`yaml
version: '3.8'

services:
  app:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules   # anonymous volume để không overwrite
    ports:
      - "3000:3000"
      - "9229:9229"         # debug port
    environment:
      - NODE_ENV=development
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USER=postgres
      - DB_PASS=postgres
      - DB_NAME=taskdb
      - JWT_SECRET=devsecret
    depends_on:
      postgres:
        condition: service_healthy
    command: npm run start:dev

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: taskdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d taskdb"]
      interval: 5s
      timeout: 3s
      retries: 10

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --save 20 1 --loglevel warning
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
\`\`\`

### Workflow phát triển

\`\`\`bash
# Lần đầu setup
docker compose up -d

# Xem logs app
docker compose logs -f app

# Chạy migration
docker compose exec app npm run migration:run

# Vào shell postgres
docker compose exec postgres psql -U postgres -d taskdb

# Rebuild sau khi thêm package
docker compose up -d --build

# Reset database
docker compose down -v && docker compose up -d
\`\`\``,
    codeExample: `// Mô phỏng NestJS app config từ Docker env
interface DbConfig { host: string; port: number; user: string; pass: string; name: string; }
interface AppConfig { port: number; nodeEnv: string; db: DbConfig; jwtSecret: string; jwt: { expiry: string }; }

function loadConfig(env: Record<string, string | undefined>): AppConfig {
  const required = ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME', 'JWT_SECRET'];
  const missing = required.filter(k => !env[k]);
  if (missing.length) throw new Error(\`Missing env vars: \${missing.join(', ')}\`);

  return {
    port: parseInt(env['PORT'] ?? '3000'),
    nodeEnv: env['NODE_ENV'] ?? 'development',
    db: {
      host: env['DB_HOST']!,
      port: parseInt(env['DB_PORT'] ?? '5432'),
      user: env['DB_USER']!,
      pass: env['DB_PASS']!,
      name: env['DB_NAME']!,
    },
    jwtSecret: env['JWT_SECRET']!,
    jwt: { expiry: env['JWT_EXPIRY'] ?? '1d' },
  };
}

// Dev environment (từ docker-compose)
const devEnv = {
  NODE_ENV: 'development',
  PORT: '3000',
  DB_HOST: 'postgres',     // tên service trong compose
  DB_PORT: '5432',
  DB_USER: 'postgres',
  DB_PASS: 'postgres',
  DB_NAME: 'taskdb',
  JWT_SECRET: 'devsecret',
};

const config = loadConfig(devEnv);
console.log('Config loaded:', {
  env: config.nodeEnv,
  port: config.port,
  db: \`\${config.db.host}:\${config.db.port}/\${config.db.name}\`,
});

// Thiếu env var
try {
  loadConfig({ DB_HOST: 'postgres' });
} catch(e: any) {
  console.error('Config error:', e.message);
}`,
    exercises: [
      {
        title: "Health check endpoint",
        description: "Implement health check endpoint kiểm tra database và các service",
        starterCode: `interface HealthStatus { status: 'ok' | 'error'; message?: string; latencyMs?: number; }
interface AppHealth { status: 'healthy' | 'degraded' | 'unhealthy'; services: Record<string, HealthStatus>; }

async function checkDatabase(): Promise<HealthStatus> {
  // Giả lập ping database, ngẫu nhiên latency 10-50ms
  const latency = Math.floor(Math.random() * 40) + 10;
  await new Promise(r => setTimeout(r, 1));
  return { status: 'ok', latencyMs: latency };
}

async function getHealth(): Promise<AppHealth> {
  // Chạy song song các check, tổng hợp kết quả
  // healthy: tất cả ok, degraded: có 1 error, unhealthy: tất cả error
}

getHealth().then(h => console.log(JSON.stringify(h, null, 2)));`,
        solution: `interface HealthStatus { status: 'ok' | 'error'; message?: string; latencyMs?: number; }
interface AppHealth { status: 'healthy' | 'degraded' | 'unhealthy'; services: Record<string, HealthStatus>; }

async function checkDatabase(): Promise<HealthStatus> {
  const latency = Math.floor(Math.random() * 40) + 10;
  await new Promise(r => setTimeout(r, 1));
  return { status: 'ok', latencyMs: latency };
}

async function checkRedis(): Promise<HealthStatus> {
  return { status: 'ok', latencyMs: 2 };
}

async function getHealth(): Promise<AppHealth> {
  const [db, redis] = await Promise.all([checkDatabase(), checkRedis()]);
  const services = { database: db, redis };
  const errors = Object.values(services).filter(s => s.status === 'error').length;
  const total = Object.values(services).length;
  const status = errors === 0 ? 'healthy' : errors === total ? 'unhealthy' : 'degraded';
  return { status, services };
}

getHealth().then(h => console.log(JSON.stringify(h, null, 2)));`,
        hint: "Dùng Promise.all() để chạy song song, đếm errors để xác định overall status",
      },
    ],
  },

  {
    id: "06-production",
    title: "Docker Production & Best Practices",
    description: "Multi-stage builds, security, .dockerignore, image optimization, CI/CD với Docker",
    level: "Nâng cao",
    content: `## Docker Production Best Practices

### 1. Dùng base image nhỏ

\`\`\`dockerfile
# ❌ Quá lớn
FROM node:20        # ~1GB

# ✅ Nhỏ hơn nhiều
FROM node:20-alpine # ~50MB
FROM node:20-slim   # ~200MB
\`\`\`

### 2. Không chạy với root

\`\`\`dockerfile
RUN addgroup -S app && adduser -S app -G app
USER app
\`\`\`

### 3. Layer caching — COPY package.json trước

\`\`\`dockerfile
# ✅ Cache npm install khi code thay đổi
COPY package*.json ./
RUN npm ci
COPY . .

# ❌ Reinstall mỗi lần code thay đổi
COPY . .
RUN npm ci
\`\`\`

### 4. .dockerignore

\`\`\`
node_modules
dist
.git
.env
*.log
coverage
.nyc_output
\`\`\`

### 5. Health check trong Dockerfile

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

### 6. Secret management — đừng hardcode!

\`\`\`bash
# ❌ Lộ secret trong image layer
RUN echo "DB_PASS=secret" >> .env

# ✅ Dùng env var lúc runtime
docker run -e DB_PASS=secret my-app

# ✅ Docker secrets (Swarm)
docker secret create db_password ./password.txt
\`\`\`

### 7. Scan vulnerabilities

\`\`\`bash
# Scan image
docker scout cves my-app:latest

# Snyk
snyk container test my-app:latest
\`\`\`

### CI/CD Pipeline với Docker

\`\`\`yaml
# .github/workflows/docker.yml
name: Build and Push
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: username/app:\${{ github.sha }}
          cache-from: type=registry,ref=username/app:buildcache
          cache-to: type=registry,ref=username/app:buildcache,mode=max
\`\`\``,
    codeExample: `// Image size optimizer — tính toán lợi ích của optimization
interface OptimizationStep {
  name: string;
  savedMB: number;
  effort: 'easy' | 'medium' | 'hard';
}

function analyzeImage(imageSizeMB: number): {
  optimizations: OptimizationStep[];
  estimatedFinalMB: number;
  recommendations: string[];
} {
  const optimizations: OptimizationStep[] = [];
  const recommendations: string[] = [];
  let remaining = imageSizeMB;

  if (imageSizeMB > 500) {
    optimizations.push({ name: 'Switch to alpine base image', savedMB: 300, effort: 'easy' });
    remaining -= 300;
    recommendations.push('Use node:20-alpine instead of node:20');
  }

  if (imageSizeMB > 200) {
    optimizations.push({ name: 'Multi-stage build (remove dev deps)', savedMB: Math.round(imageSizeMB * 0.4), effort: 'medium' });
    remaining -= Math.round(imageSizeMB * 0.4);
    recommendations.push('Add multi-stage build to exclude devDependencies');
  }

  optimizations.push({ name: 'Add .dockerignore', savedMB: 50, effort: 'easy' });
  remaining -= 50;
  recommendations.push('Add node_modules, .git, *.log to .dockerignore');

  optimizations.push({ name: 'npm ci instead of npm install', savedMB: 10, effort: 'easy' });
  recommendations.push('Use npm ci for deterministic, faster installs');

  return {
    optimizations,
    estimatedFinalMB: Math.max(50, remaining),
    recommendations,
  };
}

const analysis = analyzeImage(1200); // Typical unoptimized Node.js image
console.log('=== Docker Image Analysis ===');
console.log(\`Original size: 1200 MB\`);
console.log(\`Estimated final: \${analysis.estimatedFinalMB} MB\`);
console.log(\`Savings: \${1200 - analysis.estimatedFinalMB} MB (\${Math.round((1 - analysis.estimatedFinalMB/1200)*100)}%)\`);
console.log('\\nOptimizations:');
analysis.optimizations.forEach(o =>
  console.log(\`  [\${o.effort}] \${o.name} → -\${o.savedMB}MB\`)
);
console.log('\\nRecommendations:');
analysis.recommendations.forEach((r, i) => console.log(\`  \${i+1}. \${r}\`));`,
    exercises: [
      {
        title: "Dockerfile linter",
        description: "Viết linter kiểm tra Dockerfile theo best practices",
        starterCode: `interface LintResult { line: number; rule: string; severity: 'error' | 'warning'; message: string; }

function lintDockerfile(content: string): LintResult[] {
  const results: LintResult[] = [];
  const lines = content.split('\\n');

  // Kiểm tra các rules:
  // 1. Phải có USER instruction (không chạy root) - warning
  // 2. Không dùng "latest" tag - warning
  // 3. Phải có HEALTHCHECK - warning
  // 4. RUN apt-get phải có -y flag - error
  // 5. Không dùng ADD khi có thể dùng COPY - warning

  return results;
}

const dockerfile = \`
FROM node:latest
WORKDIR /app
ADD package.json .
RUN apt-get install curl
COPY . .
CMD ["node", "index.js"]
\`;

const results = lintDockerfile(dockerfile);
results.forEach(r => console.log(\`Line \${r.line} [\${r.severity.toUpperCase()}] \${r.rule}: \${r.message}\`));`,
        solution: `interface LintResult { line: number; rule: string; severity: 'error' | 'warning'; message: string; }

function lintDockerfile(content: string): LintResult[] {
  const results: LintResult[] = [];
  const lines = content.split('\\n');

  const hasUser = lines.some(l => l.trim().startsWith('USER '));
  const hasHealthcheck = lines.some(l => l.trim().startsWith('HEALTHCHECK'));

  if (!hasUser) results.push({ line: 0, rule: 'no-root', severity: 'warning', message: 'No USER instruction — container runs as root' });
  if (!hasHealthcheck) results.push({ line: 0, rule: 'no-healthcheck', severity: 'warning', message: 'No HEALTHCHECK defined' });

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    const lineNo = i + 1;

    if (/FROM\s+\S+:latest/.test(trimmed)) {
      results.push({ line: lineNo, rule: 'no-latest-tag', severity: 'warning', message: 'Avoid "latest" tag — use a specific version' });
    }
    if (/^ADD\s/.test(trimmed) && !trimmed.includes('http')) {
      results.push({ line: lineNo, rule: 'use-copy', severity: 'warning', message: 'Prefer COPY over ADD for local files' });
    }
    if (/^RUN\s+apt-get install(?!\s+-y)/.test(trimmed)) {
      results.push({ line: lineNo, rule: 'apt-get-y', severity: 'error', message: 'apt-get install should use -y flag' });
    }
  });

  return results;
}

const dockerfile = \`
FROM node:latest
WORKDIR /app
ADD package.json .
RUN apt-get install curl
COPY . .
CMD ["node", "index.js"]
\`;

const results = lintDockerfile(dockerfile);
results.forEach(r => console.log(\`Line \${r.line} [\${r.severity.toUpperCase()}] \${r.rule}: \${r.message}\`));`,
        hint: "Dùng Array.some() để kiểm tra sự tồn tại, regex để match patterns",
      },
    ],
  },
];
