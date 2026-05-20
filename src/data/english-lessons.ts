export interface VocabWord {
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
}

export interface LangExercise {
  question: string;
  type: "translate" | "fill" | "choice" | "write";
  options?: string[];
  answer: string;
  hint?: string;
}

export interface LangLesson {
  id: string;
  title: string;
  level: "Cơ bản" | "Trung cấp" | "Nâng cao";
  description: string;
  content: string;
  vocabulary: VocabWord[];
  grammar?: string;
  dialogue?: string;
  exercises: LangExercise[];
}

export const englishLessons: LangLesson[] = [
  {
    id: "01-greetings",
    title: "Greetings & Introductions",
    level: "Cơ bản",
    description: "Chào hỏi và tự giới thiệu bản thân",
    content: `
## Chào hỏi cơ bản

Đây là những câu chào hỏi bạn dùng mỗi ngày khi gặp người khác.

### Formal (trang trọng):
- **Good morning!** — Chào buổi sáng!
- **Good afternoon!** — Chào buổi chiều!
- **Good evening!** — Chào buổi tối!
- **How do you do?** — Hân hạnh được gặp bạn!

### Informal (thân mật):
- **Hi / Hey!** — Xin chào!
- **What's up?** — Có gì không?
- **How are you?** — Bạn khỏe không?
- **I'm fine, thanks!** — Tôi ổn, cảm ơn!

### Tự giới thiệu:
- **My name is...** — Tên tôi là...
- **I'm from Vietnam.** — Tôi đến từ Việt Nam.
- **I'm a student.** — Tôi là học sinh.
- **Nice to meet you!** — Rất vui được gặp bạn!
    `,
    vocabulary: [
      { word: "hello", phonetic: "/həˈloʊ/", meaning: "xin chào", example: "Hello! How are you?" },
      { word: "goodbye", phonetic: "/ˌɡʊdˈbaɪ/", meaning: "tạm biệt", example: "Goodbye! See you tomorrow!" },
      { word: "please", phonetic: "/pliːz/", meaning: "làm ơn", example: "Please sit down." },
      { word: "thank you", phonetic: "/ˈθæŋk juː/", meaning: "cảm ơn", example: "Thank you very much!" },
      { word: "sorry", phonetic: "/ˈsɒri/", meaning: "xin lỗi", example: "I'm sorry I'm late." },
      { word: "excuse me", phonetic: "/ɪkˈskjuːz miː/", meaning: "xin phép / xin lỗi", example: "Excuse me, where is the library?" },
    ],
    dialogue: `**A:** Good morning! My name is Minh. What's your name?
**B:** Hi Minh! I'm Lisa. Nice to meet you!
**A:** Nice to meet you too! Where are you from?
**B:** I'm from Canada. And you?
**A:** I'm from Vietnam. I'm a student here.
**B:** That's great! See you around!
**A:** Goodbye, Lisa!`,
    exercises: [
      { question: "Dịch sang tiếng Anh: 'Tên tôi là Minh'", type: "write", answer: "My name is Minh", hint: "My name is + tên" },
      { question: "Chào buổi sáng tiếng Anh là gì?", type: "choice", options: ["Good night", "Good morning", "Good evening", "Good afternoon"], answer: "Good morning", hint: "morning = buổi sáng" },
      { question: "Điền vào chỗ trống: 'Nice to ___ you!'", type: "fill", answer: "meet", hint: "Rất vui được 'gặp' bạn" },
      { question: "Dịch: 'Rất vui được gặp bạn!'", type: "write", answer: "Nice to meet you!", hint: "Nice to meet you!" },
      { question: "Câu nào có nghĩa 'Bạn khỏe không?'", type: "choice", options: ["What's your name?", "Where are you from?", "How are you?", "How old are you?"], answer: "How are you?", hint: "How are you = Bạn thế nào?" },
      { question: "Dịch: 'Tôi đến từ Việt Nam'", type: "write", answer: "I'm from Vietnam", hint: "I'm from + nơi" },
      { question: "Điền vào: '___ me, where is the toilet?'", type: "fill", answer: "Excuse", hint: "Excuse me = xin phép hỏi" },
      { question: "Tạm biệt trong tiếng Anh:", type: "choice", options: ["Hello", "Please", "Goodbye", "Sorry"], answer: "Goodbye", hint: "Goodbye = tạm biệt" },
    ],
  },
  {
    id: "02-numbers-time",
    title: "Numbers & Time",
    level: "Cơ bản",
    description: "Số đếm và cách nói giờ giấc",
    content: `
## Số đếm

### 1–20:
one, two, three, four, five, six, seven, eight, nine, ten,
eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty

### Số lớn:
- 21 = twenty-one
- 30 = thirty | 40 = forty | 50 = fifty
- 100 = one hundred | 1,000 = one thousand

## Nói giờ

\`\`\`
7:00  → It's seven o'clock
7:15  → It's seven fifteen / quarter past seven
7:30  → It's seven thirty / half past seven
7:45  → It's seven forty-five / quarter to eight
\`\`\`

### Hỏi và trả lời giờ:
- **What time is it?** — Mấy giờ rồi?
- **It's three o'clock.** — 3 giờ rồi.
- **It's half past two.** — 2 giờ rưỡi.
    `,
    vocabulary: [
      { word: "clock", phonetic: "/klɒk/", meaning: "đồng hồ (treo tường)", example: "Look at the clock. It's 9 am." },
      { word: "time", phonetic: "/taɪm/", meaning: "thời gian / giờ", example: "What time is it?" },
      { word: "hour", phonetic: "/ˈaʊər/", meaning: "giờ (đơn vị)", example: "The meeting is one hour long." },
      { word: "minute", phonetic: "/ˈmɪnɪt/", meaning: "phút", example: "Wait five minutes, please." },
      { word: "morning", phonetic: "/ˈmɔːrnɪŋ/", meaning: "buổi sáng", example: "I go to school in the morning." },
      { word: "afternoon", phonetic: "/ˌæftərˈnuːn/", meaning: "buổi chiều", example: "Class starts at 2 in the afternoon." },
    ],
    exercises: [
      { question: "Số 15 đọc như thế nào?", type: "choice", options: ["fifty", "fifteen", "five", "fourteen"], answer: "fifteen", hint: "13=thirteen, 14=fourteen, 15=fifteen" },
      { question: "Dịch: '8 giờ rưỡi'", type: "write", answer: "half past eight", hint: "half past + giờ" },
      { question: "Hỏi 'Mấy giờ rồi?' bằng tiếng Anh:", type: "write", answer: "What time is it?", hint: "What time..." },
      { question: "Số 100 tiếng Anh là:", type: "choice", options: ["one thousand", "ten hundred", "one hundred", "hundred"], answer: "one hundred", hint: "100 = one hundred" },
      { question: "7:45 đọc là:", type: "choice", options: ["quarter past seven", "half past seven", "quarter to eight", "seven forty"], answer: "quarter to eight", hint: "45 phút = quarter to giờ tiếp" },
      { question: "Điền: 'It's ___ past three' (3:15)", type: "fill", answer: "quarter", hint: "15 phút = quarter" },
    ],
  },
  {
    id: "03-family",
    title: "Family & Relationships",
    level: "Cơ bản",
    description: "Từ vựng về gia đình và các mối quan hệ",
    content: `
## Các thành viên gia đình

| Tiếng Anh | Phiên âm | Nghĩa |
|-----------|----------|-------|
| father / dad | /ˈfɑːðər/ | bố / ba |
| mother / mom | /ˈmʌðər/ | mẹ |
| brother | /ˈbrʌðər/ | anh/em trai |
| sister | /ˈsɪstər/ | chị/em gái |
| grandfather | /ˈɡrænfɑːðər/ | ông |
| grandmother | /ˈɡrænmʌðər/ | bà |
| uncle | /ˈʌŋkl/ | chú/bác/cậu |
| aunt | /ænt/ | cô/dì/thím |
| cousin | /ˈkʌzn/ | anh/chị/em họ |

## Mô tả gia đình

- **I have a big/small family.** — Tôi có gia đình đông/nhỏ.
- **My father is a teacher.** — Bố tôi là giáo viên.
- **She is my older sister.** — Cô ấy là chị gái tôi.
- **How many siblings do you have?** — Bạn có bao nhiêu anh/chị/em?
    `,
    vocabulary: [
      { word: "family", phonetic: "/ˈfæməli/", meaning: "gia đình", example: "I love my family very much." },
      { word: "parents", phonetic: "/ˈpeərənts/", meaning: "cha mẹ", example: "My parents are both doctors." },
      { word: "children", phonetic: "/ˈtʃɪldrən/", meaning: "trẻ em / con cái", example: "They have three children." },
      { word: "husband", phonetic: "/ˈhʌzbənd/", meaning: "chồng", example: "Her husband is very kind." },
      { word: "wife", phonetic: "/waɪf/", meaning: "vợ", example: "His wife is a nurse." },
      { word: "only child", phonetic: "/ˈoʊnli tʃaɪld/", meaning: "con một", example: "I'm an only child." },
    ],
    dialogue: `**A:** Tell me about your family.
**B:** Sure! I have a small family. There are four of us.
**A:** Who's in your family?
**B:** My father, my mother, my younger sister, and me.
**A:** What does your father do?
**B:** He's an engineer. My mother is a nurse.
**A:** That's nice! Do you have any cousins?
**B:** Yes, I have two cousins. They live in Hanoi.`,
    exercises: [
      { question: "Dịch: 'Bố tôi là kỹ sư'", type: "write", answer: "My father is an engineer", hint: "My father is a/an + nghề nghiệp" },
      { question: "Em gái tiếng Anh là:", type: "choice", options: ["brother", "sister", "aunt", "cousin"], answer: "sister", hint: "sister = chị/em gái" },
      { question: "Hỏi 'Bạn có bao nhiêu anh chị em?':", type: "write", answer: "How many siblings do you have?", hint: "siblings = anh chị em ruột" },
      { question: "'Ông nội/ngoại' tiếng Anh:", type: "choice", options: ["uncle", "father", "grandfather", "cousin"], answer: "grandfather", hint: "grand + father" },
      { question: "Điền: 'I have a ___ family' (gia đình nhỏ)", type: "fill", answer: "small", hint: "small=nhỏ, big=lớn" },
    ],
  },
  {
    id: "04-food-drinks",
    title: "Food & Drinks",
    level: "Cơ bản",
    description: "Đồ ăn, thức uống và cách gọi món",
    content: `
## Đồ ăn phổ biến

**Meals (Bữa ăn):**
- breakfast /ˈbrekfəst/ — bữa sáng
- lunch /lʌntʃ/ — bữa trưa
- dinner /ˈdɪnər/ — bữa tối

**Common foods:**
- rice /raɪs/ — cơm
- noodles /ˈnuːdlz/ — mì/bún/phở
- bread /bred/ — bánh mì
- meat /miːt/ — thịt | chicken /ˈtʃɪkɪn/ — gà
- vegetables /ˈvedʒtəblz/ — rau củ
- fruit /fruːt/ — trái cây

## Gọi món ở nhà hàng

- **Can I have...?** — Cho tôi... được không?
- **I'd like...** — Tôi muốn...
- **What do you recommend?** — Bạn giới thiệu món gì?
- **The bill, please!** — Tính tiền, làm ơn!
    `,
    vocabulary: [
      { word: "delicious", phonetic: "/dɪˈlɪʃəs/", meaning: "ngon", example: "This pho is delicious!" },
      { word: "hungry", phonetic: "/ˈhʌŋɡri/", meaning: "đói", example: "I'm very hungry. Let's eat!" },
      { word: "thirsty", phonetic: "/ˈθɜːrsti/", meaning: "khát", example: "I'm thirsty. Can I have some water?" },
      { word: "menu", phonetic: "/ˈmenjuː/", meaning: "thực đơn", example: "May I see the menu, please?" },
      { word: "order", phonetic: "/ˈɔːrdər/", meaning: "gọi món / đặt hàng", example: "Are you ready to order?" },
      { word: "vegetarian", phonetic: "/ˌvedʒəˈteəriən/", meaning: "ăn chay", example: "I'm vegetarian. No meat, please." },
    ],
    exercises: [
      { question: "Dịch: 'Cho tôi một tô phở'", type: "write", answer: "Can I have a bowl of pho?", hint: "Can I have a + loại đồ đựng + tên món" },
      { question: "'Ngon' trong tiếng Anh:", type: "choice", options: ["hungry", "thirsty", "delicious", "spicy"], answer: "delicious", hint: "delicious = ngon tuyệt" },
      { question: "Điền: 'I'm very ___. Let's eat!' (đói)", type: "fill", answer: "hungry", hint: "hungry = đói" },
      { question: "Bữa sáng tiếng Anh là:", type: "choice", options: ["lunch", "dinner", "breakfast", "brunch"], answer: "breakfast", hint: "break + fast (phá vỡ nhịn ăn)" },
      { question: "Dịch: 'Tính tiền, làm ơn'", type: "write", answer: "The bill, please!", hint: "bill = hóa đơn" },
    ],
  },
  {
    id: "05-daily-routine",
    title: "Daily Routine",
    level: "Cơ bản",
    description: "Mô tả hoạt động hàng ngày",
    content: `
## Hoạt động hàng ngày

### Sáng sớm:
- **wake up** — thức dậy
- **get up** — ra khỏi giường
- **brush teeth** — đánh răng
- **have breakfast** — ăn sáng
- **go to school/work** — đi học/đi làm

### Ban ngày:
- **have lunch** — ăn trưa
- **study** — học bài
- **do homework** — làm bài tập
- **take a nap** — ngủ trưa

### Buổi tối:
- **have dinner** — ăn tối
- **watch TV** — xem TV
- **read a book** — đọc sách
- **go to bed** — đi ngủ

## Thì hiện tại đơn — thói quen

\`\`\`
I/You/They/We + V (nguyên mẫu)
He/She/It      + V-s/es
\`\`\`

- **I wake up at 6 am.** — Tôi thức dậy lúc 6 giờ.
- **She goes to school at 7.** — Cô ấy đi học lúc 7 giờ.
    `,
    vocabulary: [
      { word: "usually", phonetic: "/ˈjuːʒuəli/", meaning: "thường thường", example: "I usually wake up at 6 am." },
      { word: "always", phonetic: "/ˈɔːlweɪz/", meaning: "luôn luôn", example: "She always brushes her teeth after meals." },
      { word: "sometimes", phonetic: "/ˈsʌmtaɪmz/", meaning: "đôi khi", example: "I sometimes take a nap after lunch." },
      { word: "never", phonetic: "/ˈnevər/", meaning: "không bao giờ", example: "He never skips breakfast." },
      { word: "routine", phonetic: "/ruːˈtiːn/", meaning: "thói quen / lịch trình", example: "My morning routine takes 30 minutes." },
      { word: "exercise", phonetic: "/ˈeksərsaɪz/", meaning: "tập thể dục", example: "I exercise every morning." },
    ],
    exercises: [
      { question: "Dịch: 'Tôi thức dậy lúc 6 giờ sáng'", type: "write", answer: "I wake up at 6 am", hint: "I wake up at + giờ" },
      { question: "'Luôn luôn' trong tiếng Anh:", type: "choice", options: ["sometimes", "never", "always", "usually"], answer: "always", hint: "always = luôn luôn" },
      { question: "Điền: 'She ___ to school at 7' (đi)", type: "fill", answer: "goes", hint: "She/He/It dùng goes (go+es)" },
      { question: "Dịch: 'Làm bài tập về nhà'", type: "write", answer: "do homework", hint: "do + homework" },
      { question: "'Đôi khi' trong tiếng Anh:", type: "choice", options: ["always", "never", "usually", "sometimes"], answer: "sometimes", hint: "some + times" },
    ],
  },
  {
    id: "06-present-simple",
    title: "Present Simple Tense",
    level: "Cơ bản",
    description: "Thì hiện tại đơn — thói quen và sự thật",
    content: `
## Thì hiện tại đơn

### Dùng khi nào?
1. **Thói quen, hành động lặp lại:** I go to school every day.
2. **Sự thật hiển nhiên:** The sun rises in the east.
3. **Lịch trình cố định:** The train leaves at 8 pm.

### Cách chia:
\`\`\`
(+) I/You/We/They + V
    He/She/It      + V-s/es

(-) I don't + V
    He/She/It doesn't + V

(?) Do + I/you/we/they + V?
    Does + he/she/it + V?
\`\`\`

### Ví dụ:
- **I like pizza.** / **She likes sushi.**
- **They don't study on Sunday.**
- **Does he play football?** — Yes, he does.

### Thêm -s hay -es?
- Thêm **-s**: work→works, play→plays
- Thêm **-es**: go→goes, watch→watches, do→does
- Bất quy tắc: have→has, be→is
    `,
    vocabulary: [
      { word: "every day", phonetic: "/ˈevri deɪ/", meaning: "mỗi ngày", example: "I exercise every day." },
      { word: "often", phonetic: "/ˈɒfən/", meaning: "thường xuyên", example: "She often reads books." },
      { word: "rarely", phonetic: "/ˈreərli/", meaning: "hiếm khi", example: "He rarely eats fast food." },
      { word: "once a week", phonetic: "/wʌns ə wiːk/", meaning: "mỗi tuần một lần", example: "I go to the gym once a week." },
      { word: "twice a day", phonetic: "/twaɪs ə deɪ/", meaning: "hai lần mỗi ngày", example: "I brush my teeth twice a day." },
      { word: "work", phonetic: "/wɜːrk/", meaning: "làm việc", example: "She works at a hospital." },
    ],
    exercises: [
      { question: "Chia động từ: 'She ___ (go) to school'", type: "fill", answer: "goes", hint: "She/He/It + go → goes" },
      { question: "Phủ định: 'He ___ like coffee'", type: "fill", answer: "doesn't", hint: "He/She/It doesn't + V nguyên mẫu" },
      { question: "Dịch: 'Bạn có học tiếng Anh không?'", type: "write", answer: "Do you study English?", hint: "Do you + V?" },
      { question: "'watch' với He/She/It:", type: "choice", options: ["watchs", "watches", "watch", "watching"], answer: "watches", hint: "-ch → thêm -es" },
      { question: "Dịch: 'Mặt trời mọc ở phía Đông'", type: "write", answer: "The sun rises in the east", hint: "The sun rises..." },
      { question: "Chọn câu đúng:", type: "choice", options: ["She don't like cats", "She doesn't likes cats", "She doesn't like cats", "She not like cats"], answer: "She doesn't like cats", hint: "doesn't + V nguyên mẫu (không có s)" },
    ],
  },
  {
    id: "07-past-simple",
    title: "Past Simple Tense",
    level: "Trung cấp",
    description: "Thì quá khứ đơn — kể về việc đã xảy ra",
    content: `
## Thì quá khứ đơn

### Dùng khi nào?
- Hành động đã hoàn thành trong quá khứ
- Thường đi với: **yesterday, last week, ago, in 2020...**

### Động từ có quy tắc (thêm -ed):
\`\`\`
work → worked
play → played
study → studied
watch → watched
\`\`\`

### Động từ bất quy tắc (phải học thuộc):
| Hiện tại | Quá khứ | Nghĩa |
|----------|---------|-------|
| go | went | đi |
| eat | ate | ăn |
| see | saw | thấy |
| have | had | có |
| make | made | làm |
| buy | bought | mua |
| come | came | đến |
| get | got | nhận |

### Cấu trúc:
\`\`\`
(+) S + V-ed/V2
(-) S + didn't + V
(?) Did + S + V?
\`\`\`
    `,
    vocabulary: [
      { word: "yesterday", phonetic: "/ˈjestərdeɪ/", meaning: "hôm qua", example: "I went to the park yesterday." },
      { word: "last week", phonetic: "/læst wiːk/", meaning: "tuần trước", example: "She visited her grandma last week." },
      { word: "ago", phonetic: "/əˈɡoʊ/", meaning: "trước đây", example: "He moved here two years ago." },
      { word: "already", phonetic: "/ɔːlˈredi/", meaning: "đã rồi", example: "I already finished my homework." },
      { word: "just", phonetic: "/dʒʌst/", meaning: "vừa mới", example: "She just called me." },
      { word: "suddenly", phonetic: "/ˈsʌdənli/", meaning: "đột nhiên", example: "Suddenly, it started to rain." },
    ],
    exercises: [
      { question: "Chia: 'I ___ (go) to the market yesterday'", type: "fill", answer: "went", hint: "go → went (bất quy tắc)" },
      { question: "Chia: 'She ___ (study) all night'", type: "fill", answer: "studied", hint: "study → studied (y→ied)" },
      { question: "Phủ định: 'They ___ watch TV last night'", type: "fill", answer: "didn't", hint: "didn't + V nguyên mẫu" },
      { question: "Hỏi: '___ you eat breakfast today?'", type: "fill", answer: "Did", hint: "Did + S + V?" },
      { question: "Dịch: 'Tôi đã mua một cuốn sách hôm qua'", type: "write", answer: "I bought a book yesterday", hint: "buy → bought" },
      { question: "Câu đúng:", type: "choice", options: ["She goed to school", "She went to school", "She goes to school yesterday", "She did went to school"], answer: "She went to school", hint: "go → went, không dùng did + went" },
    ],
  },
  {
    id: "08-future-tense",
    title: "Future Tense",
    level: "Trung cấp",
    description: "Nói về kế hoạch và dự đoán tương lai",
    content: `
## Thì tương lai

### Will — dự đoán / quyết định tức thì:
\`\`\`
S + will + V
S + won't + V
Will + S + V?
\`\`\`
- **I think it will rain tomorrow.** — Tôi nghĩ mai sẽ mưa.
- **I'll help you.** — Tôi sẽ giúp bạn.

### Be going to — kế hoạch đã định sẵn:
\`\`\`
S + am/is/are + going to + V
\`\`\`
- **I'm going to study tonight.** — Tối nay tôi định học.
- **She's going to visit Paris.** — Cô ấy định thăm Paris.

### Khi nào dùng cái nào?
| | Will | Going to |
|---|---|---|
| Kế hoạch có sẵn | ❌ | ✅ |
| Quyết định tức thì | ✅ | ❌ |
| Dự đoán chung | ✅ | ❌ |
| Dự đoán có bằng chứng | ❌ | ✅ |
    `,
    vocabulary: [
      { word: "plan", phonetic: "/plæn/", meaning: "kế hoạch / dự định", example: "What are your plans for the weekend?" },
      { word: "probably", phonetic: "/ˈprɒbəbli/", meaning: "có lẽ", example: "It will probably snow tomorrow." },
      { word: "maybe", phonetic: "/ˈmeɪbi/", meaning: "có thể", example: "Maybe I'll visit you next week." },
      { word: "definitely", phonetic: "/ˈdefɪnətli/", meaning: "chắc chắn", example: "I will definitely come to your party." },
      { word: "soon", phonetic: "/suːn/", meaning: "sớm thôi", example: "She will arrive soon." },
      { word: "next year", phonetic: "/nekst jɪər/", meaning: "năm sau", example: "I'm going to travel next year." },
    ],
    exercises: [
      { question: "Dịch: 'Tôi sẽ giúp bạn' (quyết định tức thì)", type: "write", answer: "I will help you", hint: "will + V nguyên mẫu" },
      { question: "Dịch: 'Tôi định đi du lịch hè này' (kế hoạch sẵn)", type: "write", answer: "I'm going to travel this summer", hint: "be going to + V" },
      { question: "Điền: 'She ___ going to cook dinner tonight'", type: "fill", answer: "is", hint: "She → is going to" },
      { question: "Phủ định will: 'He ___ come to the party'", type: "fill", answer: "won't", hint: "will not = won't" },
      { question: "Câu nào đúng ngữ pháp?", type: "choice", options: ["I will going to travel", "I am go to travel", "I'm going to travel", "I going travel"], answer: "I'm going to travel", hint: "am/is/are + going to + V" },
    ],
  },
  {
    id: "09-adjectives",
    title: "Adjectives & Comparisons",
    level: "Trung cấp",
    description: "Tính từ và so sánh trong tiếng Anh",
    content: `
## Tính từ (Adjectives)

Tính từ mô tả danh từ và đứng **trước danh từ** hoặc sau **be**:
- a **big** house / the house **is big**

### So sánh hơn (Comparative):
\`\`\`
1-2 âm tiết: tính từ + -er + than
Nhiều âm tiết: more + tính từ + than
\`\`\`
- tall → **taller** than
- beautiful → **more beautiful** than

### So sánh nhất (Superlative):
\`\`\`
the + tính từ + -est
the + most + tính từ
\`\`\`
- tall → **the tallest**
- beautiful → **the most beautiful**

### Bất quy tắc:
| Tính từ | So sánh hơn | So sánh nhất |
|---------|------------|-------------|
| good | better | best |
| bad | worse | worst |
| far | farther | farthest |
    `,
    vocabulary: [
      { word: "tall", phonetic: "/tɔːl/", meaning: "cao (người)", example: "He is taller than his brother." },
      { word: "beautiful", phonetic: "/ˈbjuːtɪfl/", meaning: "đẹp", example: "This is the most beautiful city I've seen." },
      { word: "expensive", phonetic: "/ɪkˈspensɪv/", meaning: "đắt tiền", example: "This phone is more expensive than that one." },
      { word: "fast", phonetic: "/fæst/", meaning: "nhanh", example: "A cheetah is faster than a lion." },
      { word: "intelligent", phonetic: "/ɪnˈtelɪdʒənt/", meaning: "thông minh", example: "She is the most intelligent student in the class." },
      { word: "crowded", phonetic: "/ˈkraʊdɪd/", meaning: "đông đúc", example: "Ho Chi Minh City is more crowded than Hanoi." },
    ],
    exercises: [
      { question: "So sánh hơn của 'tall':", type: "choice", options: ["most tall", "taller", "more tall", "tallest"], answer: "taller", hint: "1 âm tiết: thêm -er" },
      { question: "So sánh nhất của 'beautiful':", type: "write", answer: "the most beautiful", hint: "Nhiều âm tiết: the most + adj" },
      { question: "Dịch: 'Cô ấy thông minh hơn anh trai'", type: "write", answer: "She is more intelligent than her brother", hint: "more + adj + than" },
      { question: "So sánh hơn bất quy tắc của 'good':", type: "choice", options: ["gooder", "more good", "better", "best"], answer: "better", hint: "good → better → best" },
      { question: "Điền: 'This is ___ worst movie I've ever seen'", type: "fill", answer: "the", hint: "So sánh nhất luôn có 'the'" },
    ],
  },
  {
    id: "10-questions",
    title: "Question Words & Formation",
    level: "Trung cấp",
    description: "Đặt câu hỏi đúng cách trong tiếng Anh",
    content: `
## Từ để hỏi (Wh- questions)

| Từ hỏi | Nghĩa | Ví dụ |
|--------|-------|-------|
| What | Cái gì | What is your name? |
| Who | Ai | Who is your teacher? |
| Where | Ở đâu | Where do you live? |
| When | Khi nào | When is your birthday? |
| Why | Tại sao | Why are you late? |
| How | Như thế nào | How are you? |
| Which | Cái nào | Which color do you like? |
| How many | Bao nhiêu (đếm được) | How many students? |
| How much | Bao nhiêu (không đếm) | How much water? |
| How long | Bao lâu | How long does it take? |

## Cấu trúc câu hỏi:

\`\`\`
Wh- + aux verb + subject + main verb?
What   do         you       like?
Where  does       she       work?
When   did        they      arrive?
\`\`\`
    `,
    vocabulary: [
      { word: "question", phonetic: "/ˈkwestʃən/", meaning: "câu hỏi", example: "Do you have any questions?" },
      { word: "answer", phonetic: "/ˈænsər/", meaning: "câu trả lời / trả lời", example: "I don't know the answer." },
      { word: "reason", phonetic: "/ˈriːzn/", meaning: "lý do", example: "What is the reason for being late?" },
      { word: "purpose", phonetic: "/ˈpɜːrpəs/", meaning: "mục đích", example: "What is the purpose of this meeting?" },
      { word: "opinion", phonetic: "/əˈpɪnjən/", meaning: "ý kiến", example: "What is your opinion about this?" },
      { word: "information", phonetic: "/ˌɪnfərˈmeɪʃn/", meaning: "thông tin", example: "Can you give me more information?" },
    ],
    exercises: [
      { question: "Hỏi tên: '___ is your name?'", type: "fill", answer: "What", hint: "What = cái gì" },
      { question: "Hỏi nơi ở: '___ do you live?'", type: "fill", answer: "Where", hint: "Where = ở đâu" },
      { question: "Dịch: 'Tại sao bạn học tiếng Anh?'", type: "write", answer: "Why do you study English?", hint: "Why do you + V?" },
      { question: "Hỏi số lượng học sinh (đếm được):", type: "choice", options: ["How much students?", "How many students?", "How long students?", "How students?"], answer: "How many students?", hint: "How many + danh từ đếm được" },
      { question: "Dịch: 'Cô ấy làm việc ở đâu?'", type: "write", answer: "Where does she work?", hint: "Where + does + she + V?" },
    ],
  },
  {
    id: "11-travel",
    title: "Travel & Directions",
    level: "Trung cấp",
    description: "Từ vựng du lịch và hỏi đường",
    content: `
## Hỏi đường

- **Excuse me, how do I get to...?** — Làm ơn, tôi đến... bằng cách nào?
- **Turn left/right.** — Rẽ trái/phải.
- **Go straight ahead.** — Đi thẳng.
- **It's on the left/right.** — Nó ở bên trái/phải.
- **It's about 5 minutes walk.** — Đi bộ khoảng 5 phút.

## Từ vựng di chuyển

- **by bus/train/taxi/plane** — bằng xe buýt/tàu/taxi/máy bay
- **station** — ga tàu
- **airport** — sân bay
- **hotel** — khách sạn
- **book a ticket** — đặt vé
- **check in/out** — nhận/trả phòng
    `,
    vocabulary: [
      { word: "journey", phonetic: "/ˈdʒɜːrni/", meaning: "hành trình", example: "It's a 3-hour journey by train." },
      { word: "destination", phonetic: "/ˌdestɪˈneɪʃn/", meaning: "điểm đến", example: "What's your destination?" },
      { word: "luggage", phonetic: "/ˈlʌɡɪdʒ/", meaning: "hành lý", example: "I have two pieces of luggage." },
      { word: "passport", phonetic: "/ˈpæspɔːrt/", meaning: "hộ chiếu", example: "Don't forget your passport!" },
      { word: "sightseeing", phonetic: "/ˈsaɪtsiːɪŋ/", meaning: "tham quan", example: "We went sightseeing in Paris." },
      { word: "souvenir", phonetic: "/ˌsuːvəˈnɪər/", meaning: "đồ lưu niệm", example: "I bought some souvenirs for my family." },
    ],
    exercises: [
      { question: "Dịch: 'Rẽ trái rồi đi thẳng'", type: "write", answer: "Turn left and go straight ahead", hint: "Turn left, go straight ahead" },
      { question: "Hỏi đường: 'Excuse me, how do I get ___ the station?'", type: "fill", answer: "to", hint: "get to = đến được" },
      { question: "Sân bay tiếng Anh:", type: "choice", options: ["harbor", "station", "airport", "terminal"], answer: "airport", hint: "air + port" },
      { question: "Dịch: 'Tôi muốn đặt 2 vé đến Hà Nội'", type: "write", answer: "I'd like to book two tickets to Hanoi", hint: "I'd like to book + số + tickets" },
      { question: "'Hành lý' tiếng Anh:", type: "choice", options: ["luggage", "passport", "ticket", "souvenir"], answer: "luggage", hint: "luggage = hành lý" },
    ],
  },
  {
    id: "12-jobs-careers",
    title: "Jobs & Careers",
    level: "Trung cấp",
    description: "Nghề nghiệp và nơi làm việc",
    content: `
## Nghề nghiệp phổ biến

| Nghề | Phiên âm | Nơi làm việc |
|------|----------|-------------|
| doctor | /ˈdɒktər/ | hospital |
| teacher | /ˈtiːtʃər/ | school |
| engineer | /ˌendʒɪˈnɪər/ | company/factory |
| nurse | /nɜːrs/ | hospital/clinic |
| police officer | /pəˈliːs ˈɒfɪsər/ | police station |
| chef | /ʃef/ | restaurant |
| pilot | /ˈpaɪlət/ | airplane |
| lawyer | /ˈlɔɪər/ | law firm/court |
| programmer | /ˈproʊɡræmər/ | tech company |
| designer | /dɪˈzaɪnər/ | studio/agency |

## Hỏi về công việc

- **What do you do (for a living)?** — Bạn làm nghề gì?
- **Where do you work?** — Bạn làm ở đâu?
- **I work as a + nghề.** — Tôi làm nghề...
- **I'm a + nghề.** — Tôi là...
    `,
    vocabulary: [
      { word: "career", phonetic: "/kəˈrɪər/", meaning: "sự nghiệp / nghề nghiệp", example: "She has a successful career in medicine." },
      { word: "salary", phonetic: "/ˈsæləri/", meaning: "lương (tháng)", example: "The salary is 1000 USD per month." },
      { word: "experience", phonetic: "/ɪkˈspɪəriəns/", meaning: "kinh nghiệm", example: "He has 5 years of experience." },
      { word: "interview", phonetic: "/ˈɪntərvjuː/", meaning: "phỏng vấn", example: "I have a job interview tomorrow." },
      { word: "colleague", phonetic: "/ˈkɒliːɡ/", meaning: "đồng nghiệp", example: "My colleagues are very friendly." },
      { word: "promote", phonetic: "/prəˈmoʊt/", meaning: "thăng chức", example: "She was promoted to manager." },
    ],
    exercises: [
      { question: "Dịch: 'Bạn làm nghề gì?'", type: "write", answer: "What do you do for a living?", hint: "What do you do?" },
      { question: "Bác sĩ làm việc ở đâu?", type: "choice", options: ["school", "hospital", "restaurant", "court"], answer: "hospital", hint: "doctor → hospital" },
      { question: "Dịch: 'Tôi là lập trình viên'", type: "write", answer: "I'm a programmer", hint: "I'm a + nghề nghiệp" },
      { question: "'Đồng nghiệp' tiếng Anh:", type: "choice", options: ["colleague", "manager", "employee", "boss"], answer: "colleague", hint: "colleague = người cùng làm việc" },
      { question: "Điền: 'I work ___ a software engineer at Google'", type: "fill", answer: "as", hint: "work as = làm với vai trò là" },
    ],
  },
  {
    id: "13-health",
    title: "Health & Body",
    level: "Trung cấp",
    description: "Bộ phận cơ thể và mô tả triệu chứng bệnh",
    content: `
## Bộ phận cơ thể

- **head** — đầu | **face** — mặt | **eye** — mắt
- **ear** — tai | **nose** — mũi | **mouth** — miệng
- **neck** — cổ | **shoulder** — vai | **arm** — cánh tay
- **hand** — bàn tay | **finger** — ngón tay
- **chest** — ngực | **back** — lưng | **stomach** — bụng
- **leg** — chân | **knee** — đầu gối | **foot** — bàn chân

## Tại phòng khám

- **I have a headache.** — Tôi đau đầu.
- **I have a fever.** — Tôi bị sốt.
- **I have a sore throat.** — Tôi đau họng.
- **I feel dizzy.** — Tôi cảm thấy chóng mặt.
- **I'm allergic to...** — Tôi bị dị ứng với...
- **How long have you had this?** — Bạn bị bao lâu rồi?
    `,
    vocabulary: [
      { word: "symptom", phonetic: "/ˈsɪmptəm/", meaning: "triệu chứng", example: "What are your symptoms?" },
      { word: "medicine", phonetic: "/ˈmedsn/", meaning: "thuốc / y học", example: "Take this medicine three times a day." },
      { word: "prescription", phonetic: "/prɪˈskrɪpʃn/", meaning: "đơn thuốc", example: "The doctor wrote a prescription." },
      { word: "allergy", phonetic: "/ˈælərdʒi/", meaning: "dị ứng", example: "I have a peanut allergy." },
      { word: "appointment", phonetic: "/əˈpɔɪntmənt/", meaning: "cuộc hẹn", example: "I have a doctor's appointment at 3 pm." },
      { word: "recover", phonetic: "/rɪˈkʌvər/", meaning: "hồi phục", example: "She recovered quickly after the surgery." },
    ],
    exercises: [
      { question: "Dịch: 'Tôi bị đau đầu'", type: "write", answer: "I have a headache", hint: "I have a + triệu chứng" },
      { question: "Mô tả đau họng:", type: "choice", options: ["I have a fever", "I have a sore throat", "I have a stomachache", "I feel dizzy"], answer: "I have a sore throat", hint: "sore throat = họng đau" },
      { question: "Điền: 'How long ___ you had this pain?'", type: "fill", answer: "have", hint: "How long have you..." },
      { question: "Dịch: 'Tôi cần đặt lịch hẹn với bác sĩ'", type: "write", answer: "I need to make a doctor's appointment", hint: "make an appointment = đặt lịch hẹn" },
      { question: "'Đơn thuốc' tiếng Anh:", type: "choice", options: ["medicine", "prescription", "symptom", "allergy"], answer: "prescription", hint: "prescription = giấy bác sĩ kê thuốc" },
    ],
  },
  {
    id: "14-environment",
    title: "Environment & Nature",
    level: "Nâng cao",
    description: "Môi trường và thiên nhiên — từ vựng nâng cao",
    content: `
## Vấn đề môi trường

- **climate change** — biến đổi khí hậu
- **global warming** — nóng lên toàn cầu
- **pollution** — ô nhiễm (air/water/noise pollution)
- **deforestation** — phá rừng
- **endangered species** — loài có nguy cơ tuyệt chủng
- **renewable energy** — năng lượng tái tạo
- **recycle** — tái chế
- **carbon footprint** — dấu chân carbon

## Thiên nhiên

- **forest** — rừng | **ocean** — đại dương
- **mountain** — núi | **river** — sông
- **desert** — sa mạc | **waterfall** — thác nước

## Câu phức tạp:

- **We should reduce our carbon footprint.** — Chúng ta nên giảm dấu chân carbon.
- **Unless we act now, it will be too late.** — Nếu không hành động ngay, sẽ quá muộn.
    `,
    vocabulary: [
      { word: "sustainable", phonetic: "/səˈsteɪnəbl/", meaning: "bền vững", example: "We need sustainable development." },
      { word: "conservation", phonetic: "/ˌkɒnsəˈveɪʃn/", meaning: "bảo tồn", example: "Wildlife conservation is important." },
      { word: "emission", phonetic: "/ɪˈmɪʃn/", meaning: "khí thải", example: "We must reduce carbon emissions." },
      { word: "biodiversity", phonetic: "/ˌbaɪoʊdaɪˈvɜːrsəti/", meaning: "đa dạng sinh học", example: "Rainforests have incredible biodiversity." },
      { word: "drought", phonetic: "/draʊt/", meaning: "hạn hán", example: "The drought destroyed all the crops." },
      { word: "flood", phonetic: "/flʌd/", meaning: "lũ lụt", example: "The flood damaged many homes." },
    ],
    exercises: [
      { question: "Dịch: 'Biến đổi khí hậu là vấn đề nghiêm trọng'", type: "write", answer: "Climate change is a serious problem", hint: "Climate change is a serious..." },
      { question: "'Ô nhiễm không khí' tiếng Anh:", type: "choice", options: ["water pollution", "noise pollution", "air pollution", "soil pollution"], answer: "air pollution", hint: "air = không khí" },
      { question: "Điền: 'We should ___ plastic bags' (tái chế)", type: "fill", answer: "recycle", hint: "recycle = tái chế" },
      { question: "Dịch: 'Năng lượng tái tạo như mặt trời và gió'", type: "write", answer: "Renewable energy like solar and wind", hint: "renewable energy, solar, wind" },
    ],
  },
  {
    id: "15-writing-emails",
    title: "Writing Emails & Messages",
    level: "Nâng cao",
    description: "Viết email và tin nhắn chuyên nghiệp",
    content: `
## Cấu trúc email

\`\`\`
Subject: [Chủ đề rõ ràng]

Dear Mr./Ms. [Tên],          ← Lời chào
[Mở đầu]                      ← Giới thiệu mục đích
[Nội dung chính]
[Kết thúc]                    ← Lời kết
Best regards,                 ← Ký tên
[Tên bạn]
\`\`\`

## Mẫu câu hay dùng

**Mở đầu:**
- I am writing to inform you that...
- I am writing with regard to...
- Further to our conversation...

**Nội dung:**
- I would like to request...
- Could you please...?
- I would appreciate it if you could...

**Kết thúc:**
- Please do not hesitate to contact me if...
- I look forward to hearing from you.
- Thank you for your time and consideration.
    `,
    vocabulary: [
      { word: "attach", phonetic: "/əˈtætʃ/", meaning: "đính kèm", example: "Please find the document attached." },
      { word: "regarding", phonetic: "/rɪˈɡɑːrdɪŋ/", meaning: "liên quan đến", example: "I'm writing regarding your application." },
      { word: "urgent", phonetic: "/ˈɜːrdʒənt/", meaning: "khẩn cấp", example: "This matter is urgent." },
      { word: "deadline", phonetic: "/ˈdedlaɪn/", meaning: "hạn chót", example: "The deadline is next Friday." },
      { word: "confirm", phonetic: "/kənˈfɜːrm/", meaning: "xác nhận", example: "Please confirm your attendance." },
      { word: "apologize", phonetic: "/əˈpɒlədʒaɪz/", meaning: "xin lỗi (trang trọng)", example: "I apologize for the late reply." },
    ],
    exercises: [
      { question: "Lời chào trang trọng trong email:", type: "choice", options: ["Hey!", "Hi there,", "Dear Mr. Smith,", "What's up,"], answer: "Dear Mr. Smith,", hint: "Dear + Mr./Ms. + Tên" },
      { question: "Dịch: 'Tôi viết để hỏi về...' (trang trọng)", type: "write", answer: "I am writing to inquire about", hint: "I am writing to + V" },
      { question: "Điền: 'Please find the report ___' (đính kèm)", type: "fill", answer: "attached", hint: "attached = đính kèm" },
      { question: "Kết thúc email chuyên nghiệp:", type: "choice", options: ["Bye!", "See ya!", "Best regards,", "TTYL"], answer: "Best regards,", hint: "Best regards = Trân trọng" },
      { question: "Dịch: 'Tôi mong được hồi âm sớm'", type: "write", answer: "I look forward to hearing from you", hint: "look forward to + V-ing" },
    ],
  },
];
