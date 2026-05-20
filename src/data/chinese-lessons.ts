import type { LangLesson } from "./english-lessons";
export type { LangLesson };

export const chineseLessons: LangLesson[] = [
  {
    id: "01-pinyin-am-dieu",
    title: "Pinyin và 4 Thanh điệu",
    level: "Cơ bản",
    description: "Học hệ thống phiên âm Pinyin và 4 thanh điệu tiếng Trung",
    content: `
## Pinyin là gì?

**Pinyin** (拼音) là hệ thống phiên âm La-tinh cho tiếng Trung. Đây là nền tảng để học phát âm chính xác.

## 4 Thanh điệu

| Thanh | Ký hiệu | Tên gọi | Cách phát âm |
|-------|---------|---------|-------------|
| Thanh 1 | ā | Bình thanh | Ngang đều, cao |
| Thanh 2 | á | Dương bình | Lên cao (như hỏi) |
| Thanh 3 | ǎ | Thượng thanh | Xuống rồi lên |
| Thanh 4 | à | Khứ thanh | Xuống mạnh |

## Ví dụ với âm "ma":
- **mā (妈)** — mẹ (thanh 1: bằng)
- **má (麻)** — gai/tê (thanh 2: lên)
- **mǎ (马)** — ngựa (thanh 3: xuống lên)
- **mà (骂)** — mắng (thanh 4: xuống)
- **ma (吗)** — không thanh (câu hỏi)

## Âm đầu phổ biến:
b, p, m, f | d, t, n, l | g, k, h | j, q, x | zh, ch, sh, r | z, c, s
    `,
    vocabulary: [
      { word: "你好 nǐ hǎo", phonetic: "nǐ hǎo", meaning: "xin chào", example: "你好！我是越南人。(Xin chào! Tôi là người Việt Nam.)" },
      { word: "谢谢 xièxiè", phonetic: "xiè·xiè", meaning: "cảm ơn", example: "谢谢你！(Cảm ơn bạn!)" },
      { word: "对不起 duìbuqǐ", phonetic: "duì·bu·qǐ", meaning: "xin lỗi", example: "对不起，我迟到了。(Xin lỗi, tôi đến muộn.)" },
      { word: "再见 zàijiàn", phonetic: "zài·jiàn", meaning: "tạm biệt", example: "再见！明天见！(Tạm biệt! Gặp lại ngày mai!)" },
      { word: "是 shì", phonetic: "shì", meaning: "là (động từ be)", example: "我是学生。(Tôi là học sinh.)" },
      { word: "不 bù", phonetic: "bù", meaning: "không", example: "我不是老师。(Tôi không phải giáo viên.)" },
    ],
    exercises: [
      { question: "'Xin chào' tiếng Trung là:", type: "choice", options: ["再见 zàijiàn", "你好 nǐ hǎo", "谢谢 xièxiè", "对不起 duìbuqǐ"], answer: "你好 nǐ hǎo", hint: "你好 = nǐ hǎo" },
      { question: "Thanh 4 (khứ thanh) phát âm như thế nào?", type: "choice", options: ["Ngang đều cao", "Lên cao", "Xuống rồi lên", "Xuống mạnh"], answer: "Xuống mạnh", hint: "Thanh 4 như khi ra lệnh dứt khoát" },
      { question: "Mā (妈) có nghĩa là:", type: "choice", options: ["ngựa", "mẹ", "mắng", "tê"], answer: "mẹ", hint: "妈 = mẹ (thanh 1)" },
      { question: "Dịch: '谢谢'", type: "write", answer: "Cảm ơn", hint: "xièxiè = cảm ơn" },
      { question: "'Tạm biệt' tiếng Trung:", type: "choice", options: ["你好", "谢谢", "再见", "对不起"], answer: "再见", hint: "再见 zàijiàn = tạm biệt" },
      { question: "Điền pinyin: '你好' đọc là:", type: "fill", answer: "nǐ hǎo", hint: "nǐ = bạn, hǎo = tốt" },
    ],
  },
  {
    id: "02-chao-hoi-co-ban",
    title: "Chào hỏi cơ bản 你好",
    level: "Cơ bản",
    description: "Các câu chào hỏi và tự giới thiệu đơn giản",
    content: `
## Chào hỏi

| Tiếng Trung | Pinyin | Nghĩa |
|-------------|--------|-------|
| 你好！| nǐ hǎo | Xin chào! |
| 你好吗？| nǐ hǎo ma | Bạn khỏe không? |
| 我很好。| wǒ hěn hǎo | Tôi rất khỏe. |
| 不太好。| bú tài hǎo | Không khỏe lắm. |
| 早上好！| zǎoshang hǎo | Chào buổi sáng! |
| 晚上好！| wǎnshang hǎo | Chào buổi tối! |
| 再见！| zàijiàn | Tạm biệt! |
| 明天见！| míngtiān jiàn | Gặp ngày mai! |

## Tự giới thiệu

\`\`\`
我叫...       Wǒ jiào...     Tên tôi là...
我是越南人。  Wǒ shì Yuènán rén.  Tôi là người Việt Nam.
我是学生。    Wǒ shì xuésheng.   Tôi là học sinh.
我...岁。     Wǒ...suì.     Tôi...tuổi.
\`\`\`

## Hỏi tên

- **你叫什么名字？** Nǐ jiào shénme míngzì? — Bạn tên là gì?
- **你是哪国人？** Nǐ shì nǎ guó rén? — Bạn là người nước nào?
    `,
    vocabulary: [
      { word: "我 wǒ", phonetic: "wǒ", meaning: "tôi", example: "我是学生。(Tôi là học sinh.)" },
      { word: "你 nǐ", phonetic: "nǐ", meaning: "bạn (ngôi 2)", example: "你好！(Xin chào bạn!)" },
      { word: "他/她 tā", phonetic: "tā", meaning: "anh ấy/cô ấy", example: "他是老师。(Anh ấy là giáo viên.)" },
      { word: "名字 míngzì", phonetic: "míng·zì", meaning: "tên", example: "你叫什么名字？(Bạn tên là gì?)" },
      { word: "学生 xuésheng", phonetic: "xué·sheng", meaning: "học sinh", example: "我是学生。(Tôi là học sinh.)" },
      { word: "老师 lǎoshī", phonetic: "lǎo·shī", meaning: "giáo viên", example: "她是老师。(Cô ấy là giáo viên.)" },
    ],
    dialogue: `**A:** 你好！我叫林明。你叫什么名字？
(Xin chào! Tôi tên là Lâm Minh. Bạn tên là gì?)

**B:** 你好，林明！我叫阮安。
(Xin chào, Lâm Minh! Tôi tên là Nguyễn An.)

**A:** 你是哪国人？
(Bạn là người nước nào?)

**B:** 我是越南人。你呢？
(Tôi là người Việt Nam. Còn bạn?)

**A:** 我也是越南人！你是学生吗？
(Tôi cũng là người Việt Nam! Bạn có phải học sinh không?)

**B:** 是的，我是学生。再见！
(Vâng, tôi là học sinh. Tạm biệt!)`,
    exercises: [
      { question: "Dịch: 'Tên tôi là Minh'", type: "write", answer: "我叫Minh / wǒ jiào Minh", hint: "我叫 + tên" },
      { question: "Hỏi 'Bạn khỏe không?' tiếng Trung:", type: "choice", options: ["你叫什么？", "你好吗？", "你是谁？", "你在哪里？"], answer: "你好吗？", hint: "你好吗 = Bạn tốt không?" },
      { question: "'Giáo viên' tiếng Trung:", type: "choice", options: ["学生 xuésheng", "老师 lǎoshī", "医生 yīshēng", "工人 gōngrén"], answer: "老师 lǎoshī", hint: "老师 = giáo viên" },
      { question: "Điền: '我___越南人' (là)", type: "fill", answer: "是", hint: "是 shì = là" },
      { question: "Dịch: 'Chào buổi sáng!'", type: "write", answer: "早上好！zǎoshang hǎo", hint: "早上 = buổi sáng, 好 = tốt" },
    ],
  },
  {
    id: "03-so-dem",
    title: "Số đếm 数字",
    level: "Cơ bản",
    description: "Học số từ 1 đến 10.000",
    content: `
## Số cơ bản 1-10

| Số | Chữ Hán | Pinyin |
|----|---------|--------|
| 1 | 一 | yī |
| 2 | 二 | èr |
| 3 | 三 | sān |
| 4 | 四 | sì |
| 5 | 五 | wǔ |
| 6 | 六 | liù |
| 7 | 七 | qī |
| 8 | 八 | bā |
| 9 | 九 | jiǔ |
| 10 | 十 | shí |

## Số lớn hơn

- 11 = 十一 (shí yī)
- 20 = 二十 (èr shí)
- 35 = 三十五 (sān shí wǔ)
- 100 = 一百 (yī bǎi)
- 1000 = 一千 (yī qiān)
- 10000 = 一万 (yī wàn)

## Hỏi giá cả:

- **多少钱？** Duōshǎo qián? — Bao nhiêu tiền?
- **五十块。** Wǔshí kuài. — 50 tệ.
    `,
    vocabulary: [
      { word: "多少 duōshǎo", phonetic: "duō·shǎo", meaning: "bao nhiêu", example: "多少钱？(Bao nhiêu tiền?)" },
      { word: "钱 qián", phonetic: "qián", meaning: "tiền", example: "这个多少钱？(Cái này bao nhiêu tiền?)" },
      { word: "块 kuài", phonetic: "kuài", meaning: "đồng tệ (nhân dân tệ)", example: "十块钱。(10 tệ.)" },
      { word: "年 nián", phonetic: "nián", meaning: "năm", example: "我今年20岁。(Năm nay tôi 20 tuổi.)" },
      { word: "岁 suì", phonetic: "suì", meaning: "tuổi", example: "你多大了？我18岁。(Bạn bao nhiêu tuổi? 18 tuổi.)" },
      { word: "个 gè", phonetic: "gè", meaning: "cái (lượng từ phổ biến nhất)", example: "三个苹果 (ba quả táo)" },
    ],
    exercises: [
      { question: "Số 7 tiếng Trung:", type: "choice", options: ["六 liù", "八 bā", "七 qī", "九 jiǔ"], answer: "七 qī", hint: "7 = 七 qī" },
      { question: "Đọc số 35:", type: "write", answer: "三十五 sān shí wǔ", hint: "30 = 三十, +5 = 五" },
      { question: "'Bao nhiêu tiền?' tiếng Trung:", type: "choice", options: ["你好吗？", "在哪里？", "多少钱？", "什么时候？"], answer: "多少钱？", hint: "多少 = bao nhiêu, 钱 = tiền" },
      { question: "1000 tiếng Trung:", type: "choice", options: ["一百 yī bǎi", "一千 yī qiān", "一万 yī wàn", "十百 shí bǎi"], answer: "一千 yī qiān", hint: "千 qiān = nghìn" },
      { question: "Hỏi tuổi: '你___了？' (bao nhiêu)", type: "fill", answer: "多大", hint: "多大 = bao nhiêu tuổi" },
    ],
  },
  {
    id: "04-ngay-gio",
    title: "Ngày tháng và Thời gian 时间",
    level: "Cơ bản",
    description: "Nói ngày tháng, thứ trong tuần và giờ giấc",
    content: `
## Thứ trong tuần

| Thứ | Tiếng Trung | Pinyin |
|-----|------------|--------|
| Thứ 2 | 星期一 | xīngqī yī |
| Thứ 3 | 星期二 | xīngqī èr |
| Thứ 4 | 星期三 | xīngqī sān |
| Thứ 5 | 星期四 | xīngqī sì |
| Thứ 6 | 星期五 | xīngqī wǔ |
| Thứ 7 | 星期六 | xīngqī liù |
| CN | 星期日/天 | xīngqī rì/tiān |

## Hỏi ngày giờ

- **现在几点？** Xiànzài jǐ diǎn? — Bây giờ mấy giờ?
- **三点半。** Sān diǎn bàn. — 3 giờ rưỡi.
- **今天几号？** Jīntiān jǐ hào? — Hôm nay ngày mấy?
- **今天星期几？** Jīntiān xīngqī jǐ? — Hôm nay thứ mấy?

## Thời gian

- 早上 zǎoshang — buổi sáng
- 中午 zhōngwǔ — buổi trưa
- 下午 xiàwǔ — buổi chiều
- 晚上 wǎnshang — buổi tối
    `,
    vocabulary: [
      { word: "今天 jīntiān", phonetic: "jīn·tiān", meaning: "hôm nay", example: "今天几号？(Hôm nay ngày mấy?)" },
      { word: "明天 míngtiān", phonetic: "míng·tiān", meaning: "ngày mai", example: "明天见！(Gặp lại ngày mai!)" },
      { word: "昨天 zuótiān", phonetic: "zuó·tiān", meaning: "hôm qua", example: "昨天我去了图书馆。(Hôm qua tôi đi thư viện.)" },
      { word: "现在 xiànzài", phonetic: "xiàn·zài", meaning: "bây giờ", example: "现在几点？(Bây giờ mấy giờ?)" },
      { word: "点 diǎn", phonetic: "diǎn", meaning: "giờ (đồng hồ)", example: "八点 = 8 giờ" },
      { word: "分 fēn", phonetic: "fēn", meaning: "phút", example: "八点十五分 = 8 giờ 15 phút" },
    ],
    exercises: [
      { question: "Thứ Ba tiếng Trung:", type: "choice", options: ["星期一", "星期二", "星期三", "星期四"], answer: "星期二", hint: "二 = 2 → thứ Hai (CN) = 1, thứ Ba = 2" },
      { question: "Hỏi 'Bây giờ mấy giờ?':", type: "write", answer: "现在几点？xiànzài jǐ diǎn", hint: "现在 = bây giờ, 几点 = mấy giờ" },
      { question: "'Hôm qua' tiếng Trung:", type: "choice", options: ["今天", "明天", "昨天", "后天"], answer: "昨天", hint: "昨天 zuótiān = hôm qua" },
      { question: "3 giờ rưỡi tiếng Trung:", type: "write", answer: "三点半 sān diǎn bàn", hint: "半 bàn = nửa (rưỡi)" },
      { question: "'Buổi tối' tiếng Trung:", type: "choice", options: ["早上", "中午", "下午", "晚上"], answer: "晚上", hint: "晚上 wǎnshang = tối" },
    ],
  },
  {
    id: "05-gia-dinh",
    title: "Gia đình 家庭",
    level: "Cơ bản",
    description: "Từ vựng về gia đình và mô tả người thân",
    content: `
## Thành viên gia đình

| Tiếng Trung | Pinyin | Nghĩa |
|-------------|--------|-------|
| 爸爸 | bàba | bố |
| 妈妈 | māma | mẹ |
| 哥哥 | gēgē | anh trai |
| 弟弟 | dìdi | em trai |
| 姐姐 | jiějie | chị gái |
| 妹妹 | mèimei | em gái |
| 爷爷 | yéye | ông (nội) |
| 奶奶 | nǎinai | bà (nội) |
| 外公 | wàigōng | ông (ngoại) |
| 外婆 | wàipó | bà (ngoại) |

## Mô tả gia đình

- **我家有四口人。** Wǒ jiā yǒu sì kǒu rén. — Gia đình tôi có 4 người.
- **我有一个哥哥。** Wǒ yǒu yī gè gēgē. — Tôi có một anh trai.
- **我没有兄弟姐妹。** Wǒ méiyǒu xiōngdì jiěmèi. — Tôi không có anh chị em.

## Lượng từ 口 (kǒu):
Dùng để đếm thành viên gia đình: 一口人, 两口人...
    `,
    vocabulary: [
      { word: "家 jiā", phonetic: "jiā", meaning: "nhà / gia đình", example: "我家在河内。(Nhà tôi ở Hà Nội.)" },
      { word: "有 yǒu", phonetic: "yǒu", meaning: "có", example: "我有一个妹妹。(Tôi có một em gái.)" },
      { word: "没有 méiyǒu", phonetic: "méi·yǒu", meaning: "không có", example: "我没有兄弟。(Tôi không có anh/em trai.)" },
      { word: "多大 duō dà", phonetic: "duō dà", meaning: "bao nhiêu tuổi", example: "你哥哥多大？(Anh trai bạn bao nhiêu tuổi?)" },
      { word: "工作 gōngzuò", phonetic: "gōng·zuò", meaning: "làm việc / công việc", example: "我爸爸在银行工作。(Bố tôi làm ở ngân hàng.)" },
      { word: "漂亮 piàoliang", phonetic: "piào·liang", meaning: "đẹp (người, vật)", example: "我妈妈很漂亮。(Mẹ tôi rất đẹp.)" },
    ],
    exercises: [
      { question: "Em gái tiếng Trung:", type: "choice", options: ["姐姐 jiějie", "妹妹 mèimei", "弟弟 dìdi", "哥哥 gēgē"], answer: "妹妹 mèimei", hint: "妹妹 = em gái" },
      { question: "Dịch: 'Gia đình tôi có 3 người'", type: "write", answer: "我家有三口人 wǒ jiā yǒu sān kǒu rén", hint: "口 kǒu là lượng từ cho người trong gia đình" },
      { question: "'Ông nội' tiếng Trung:", type: "choice", options: ["外公 wàigōng", "爷爷 yéye", "奶奶 nǎinai", "外婆 wàipó"], answer: "爷爷 yéye", hint: "爷爷 = ông nội, 外公 = ông ngoại" },
      { question: "Điền: '我___一个妹妹' (có)", type: "fill", answer: "有", hint: "有 yǒu = có" },
      { question: "Dịch: 'Tôi không có anh chị em'", type: "write", answer: "我没有兄弟姐妹 wǒ méiyǒu xiōngdì jiěmèi", hint: "没有 = không có, 兄弟姐妹 = anh chị em" },
    ],
  },
  {
    id: "06-do-an-thi-uong",
    title: "Đồ ăn và Thức uống 食物",
    level: "Cơ bản",
    description: "Gọi món và nói về sở thích ẩm thực",
    content: `
## Đồ ăn phổ biến

| Tiếng Trung | Pinyin | Nghĩa |
|-------------|--------|-------|
| 米饭 | mǐfàn | cơm |
| 面条 | miàntiáo | mì/phở |
| 饺子 | jiǎozi | há cảo |
| 包子 | bāozi | bánh bao |
| 鸡肉 | jīròu | thịt gà |
| 猪肉 | zhūròu | thịt lợn |
| 牛肉 | niúròu | thịt bò |
| 蔬菜 | shūcài | rau củ |
| 水果 | shuǐguǒ | trái cây |

## Tại nhà hàng

- **你想吃什么？** Nǐ xiǎng chī shénme? — Bạn muốn ăn gì?
- **我要一碗米饭。** Wǒ yào yī wǎn mǐfàn. — Tôi muốn một bát cơm.
- **好吃！** Hǎo chī! — Ngon!
- **买单！** Mǎidān! — Tính tiền!

## Lượng từ:
- 一**碗** (wǎn) 面 — một **bát** mì
- 一**杯** (bēi) 水 — một **cốc** nước
- 一**瓶** (píng) 可乐 — một **chai** cola
    `,
    vocabulary: [
      { word: "吃 chī", phonetic: "chī", meaning: "ăn", example: "我喜欢吃米饭。(Tôi thích ăn cơm.)" },
      { word: "喝 hē", phonetic: "hē", meaning: "uống", example: "我想喝水。(Tôi muốn uống nước.)" },
      { word: "好吃 hǎochī", phonetic: "hǎo·chī", meaning: "ngon", example: "这个很好吃！(Cái này rất ngon!)" },
      { word: "辣 là", phonetic: "là", meaning: "cay", example: "这个菜很辣。(Món này rất cay.)" },
      { word: "甜 tián", phonetic: "tián", meaning: "ngọt", example: "这个水果很甜。(Quả này rất ngọt.)" },
      { word: "要 yào", phonetic: "yào", meaning: "muốn / cần", example: "我要一杯茶。(Tôi muốn một ly trà.)" },
    ],
    exercises: [
      { question: "Cơm tiếng Trung:", type: "choice", options: ["面条 miàntiáo", "米饭 mǐfàn", "饺子 jiǎozi", "包子 bāozi"], answer: "米饭 mǐfàn", hint: "米饭 = cơm (gạo nấu)" },
      { question: "Dịch: 'Tôi muốn một bát phở'", type: "write", answer: "我要一碗面条 wǒ yào yī wǎn miàntiáo", hint: "要 = muốn, 一碗 = một bát, 面条 = mì/phở" },
      { question: "Hỏi 'Bạn muốn ăn gì?':", type: "write", answer: "你想吃什么？nǐ xiǎng chī shénme", hint: "你想 = bạn muốn, 吃 = ăn, 什么 = gì" },
      { question: "'Ngon' tiếng Trung:", type: "choice", options: ["辣 là", "甜 tián", "好吃 hǎochī", "苦 kǔ"], answer: "好吃 hǎochī", hint: "好吃 = ngon ăn" },
      { question: "Tính tiền: '___！' (gọi tính tiền)", type: "fill", answer: "买单", hint: "买单 mǎidān = tính tiền/thanh toán" },
    ],
  },
  {
    id: "07-mua-sam",
    title: "Mua sắm 购物",
    level: "Cơ bản",
    description: "Từ vựng và câu mẫu khi đi mua sắm",
    content: `
## Tại cửa hàng

- **这个多少钱？** Zhège duōshǎo qián? — Cái này bao nhiêu tiền?
- **太贵了！** Tài guì le! — Đắt quá!
- **能便宜一点吗？** Néng piányí yīdiǎn ma? — Có thể rẻ hơn không?
- **我要买这个。** Wǒ yào mǎi zhège. — Tôi muốn mua cái này.
- **有没有...？** Yǒu méiyǒu...? — Có... không?

## Tính từ hay dùng khi mua sắm

| Tiếng Trung | Pinyin | Nghĩa |
|-------------|--------|-------|
| 贵 | guì | đắt |
| 便宜 | piányí | rẻ |
| 大/小 | dà/xiǎo | to/nhỏ |
| 好看 | hǎokàn | đẹp (nhìn) |
| 新/旧 | xīn/jiù | mới/cũ |

## Thanh toán

- **可以刷卡吗？** Kěyǐ shuā kǎ ma? — Có thể quẹt thẻ không?
- **我用支付宝。** Wǒ yòng Zhīfùbǎo. — Tôi dùng Alipay.
    `,
    vocabulary: [
      { word: "买 mǎi", phonetic: "mǎi", meaning: "mua", example: "我想买一件衣服。(Tôi muốn mua một cái áo.)" },
      { word: "卖 mài", phonetic: "mài", meaning: "bán", example: "这里卖苹果。(Chỗ này bán táo.)" },
      { word: "贵 guì", phonetic: "guì", meaning: "đắt", example: "这个太贵了。(Cái này đắt quá.)" },
      { word: "便宜 piányí", phonetic: "pián·yí", meaning: "rẻ", example: "这个很便宜。(Cái này rẻ lắm.)" },
      { word: "颜色 yánsè", phonetic: "yán·sè", meaning: "màu sắc", example: "有没有红色的？(Có màu đỏ không?)" },
      { word: "试穿 shì chuān", phonetic: "shì chuān", meaning: "thử mặc", example: "我可以试穿吗？(Tôi có thể thử mặc không?)" },
    ],
    exercises: [
      { question: "Hỏi giá: 'Cái này bao nhiêu tiền?'", type: "write", answer: "这个多少钱？zhège duōshǎo qián", hint: "这个 = cái này, 多少钱 = bao nhiêu tiền" },
      { question: "'Rẻ' tiếng Trung:", type: "choice", options: ["贵 guì", "便宜 piányí", "好看 hǎokàn", "大 dà"], answer: "便宜 piányí", hint: "便宜 = rẻ, 贵 = đắt" },
      { question: "Mặc cả: 'Có thể rẻ hơn không?'", type: "write", answer: "能便宜一点吗？néng piányí yīdiǎn ma", hint: "能...吗 = có thể...không" },
      { question: "Điền: '我___买这个' (muốn)", type: "fill", answer: "要", hint: "要 yào = muốn" },
      { question: "Hỏi thử đồ: '我可以___吗？' (thử mặc)", type: "fill", answer: "试穿", hint: "试穿 = thử mặc" },
    ],
  },
  {
    id: "08-phuong-huong",
    title: "Phương hướng và Di chuyển 方向",
    level: "Trung cấp",
    description: "Hỏi đường và mô tả vị trí địa điểm",
    content: `
## Phương hướng cơ bản

- 左 zuǒ — trái
- 右 yòu — phải
- 直走 zhí zǒu — đi thẳng
- 前面 qiánmiàn — phía trước
- 后面 hòumiàn — phía sau
- 旁边 pángbiān — bên cạnh
- 对面 duìmiàn — đối diện

## Hỏi đường

- **请问，...在哪里？** Qǐngwèn, ...zài nǎlǐ? — Làm ơn, ...ở đâu?
- **往左拐。** Wǎng zuǒ guǎi. — Rẽ sang trái.
- **走到红绿灯。** Zǒu dào hónglǜdēng. — Đi đến đèn đỏ.
- **大概多远？** Dàgài duō yuǎn? — Khoảng bao xa?
- **走路要多久？** Zǒulù yào duōjiǔ? — Đi bộ mất bao lâu?

## Phương tiện

| 中文 | Pinyin | Nghĩa |
|------|--------|-------|
| 公共汽车 | gōnggòng qìchē | xe buýt |
| 地铁 | dìtiě | tàu điện ngầm |
| 出租车 | chūzūchē | taxi |
| 高铁 | gāotiě | tàu cao tốc |
    `,
    vocabulary: [
      { word: "在哪里 zài nǎlǐ", phonetic: "zài nǎ·lǐ", meaning: "ở đâu", example: "厕所在哪里？(Toilet ở đâu?)" },
      { word: "附近 fùjìn", phonetic: "fù·jìn", meaning: "gần đây", example: "附近有银行吗？(Gần đây có ngân hàng không?)" },
      { word: "远/近 yuǎn/jìn", phonetic: "yuǎn/jìn", meaning: "xa/gần", example: "这里离机场远吗？(Chỗ này xa sân bay không?)" },
      { word: "站 zhàn", phonetic: "zhàn", meaning: "trạm / ga", example: "下一站是天安门。(Ga tiếp theo là Thiên An Môn.)" },
      { word: "换乘 huànchéng", phonetic: "huàn·chéng", meaning: "chuyển tuyến", example: "在这里换乘二号线。(Ở đây chuyển sang tuyến số 2.)" },
      { word: "步行 bùxíng", phonetic: "bù·xíng", meaning: "đi bộ", example: "步行十分钟。(Đi bộ 10 phút.)" },
    ],
    exercises: [
      { question: "Hỏi đường: '请问，邮局___？'(ở đâu)", type: "fill", answer: "在哪里", hint: "在哪里 = ở đâu" },
      { question: "'Rẽ phải' tiếng Trung:", type: "write", answer: "往右拐 wǎng yòu guǎi", hint: "往 = về phía, 右 = phải, 拐 = rẽ" },
      { question: "Tàu điện ngầm:", type: "choice", options: ["公共汽车", "出租车", "地铁", "高铁"], answer: "地铁", hint: "地铁 dìtiě = metro/tàu điện ngầm" },
      { question: "Hỏi khoảng cách: '___多远？' (khoảng bao xa)", type: "fill", answer: "大概", hint: "大概 = khoảng, đại khái" },
      { question: "Dịch: 'Đi bộ khoảng 10 phút'", type: "write", answer: "步行大概十分钟 bùxíng dàgài shí fēnzhōng", hint: "步行 = đi bộ, 大概 = khoảng, 十分钟 = 10 phút" },
    ],
  },
  {
    id: "09-thoi-tiet",
    title: "Thời tiết 天气",
    level: "Trung cấp",
    description: "Mô tả thời tiết và các mùa trong năm",
    content: `
## Hỏi về thời tiết

- **今天天气怎么样？** Jīntiān tiānqì zěnmeyàng? — Hôm nay thời tiết thế nào?
- **天气很好。** Tiānqì hěn hǎo. — Thời tiết rất đẹp.
- **天气预报说明天下雨。** Tiānqì yùbào shuō míngtiān xià yǔ. — Dự báo thời tiết nói ngày mai có mưa.

## Từ vựng thời tiết

| 中文 | Pinyin | Nghĩa |
|------|--------|-------|
| 晴天 | qíngtiān | nắng |
| 下雨 | xià yǔ | mưa |
| 下雪 | xià xuě | tuyết |
| 多云 | duōyún | nhiều mây |
| 刮风 | guā fēng | gió |
| 热/冷 | rè/lěng | nóng/lạnh |
| 温度 | wēndù | nhiệt độ |

## 4 Mùa

- 春天 chūntiān — mùa xuân
- 夏天 xiàtiān — mùa hè
- 秋天 qiūtiān — mùa thu
- 冬天 dōngtiān — mùa đông
    `,
    vocabulary: [
      { word: "天气 tiānqì", phonetic: "tiān·qì", meaning: "thời tiết", example: "今天天气很好。(Hôm nay thời tiết đẹp.)" },
      { word: "热 rè", phonetic: "rè", meaning: "nóng", example: "夏天很热。(Mùa hè rất nóng.)" },
      { word: "冷 lěng", phonetic: "lěng", meaning: "lạnh", example: "冬天很冷。(Mùa đông rất lạnh.)" },
      { word: "下雨 xià yǔ", phonetic: "xià yǔ", meaning: "mưa", example: "今天下雨，带伞吧。(Hôm nay mưa, mang ô nhé.)" },
      { word: "预报 yùbào", phonetic: "yù·bào", meaning: "dự báo", example: "天气预报说明天晴。(Dự báo nói ngày mai nắng.)" },
      { word: "温度 wēndù", phonetic: "wēn·dù", meaning: "nhiệt độ", example: "今天温度是30度。(Hôm nay 30 độ.)" },
    ],
    exercises: [
      { question: "Hỏi thời tiết hôm nay:", type: "write", answer: "今天天气怎么样？jīntiān tiānqì zěnmeyàng", hint: "天气怎么样 = thời tiết thế nào" },
      { question: "'Mưa' tiếng Trung:", type: "choice", options: ["刮风 guā fēng", "下雪 xià xuě", "下雨 xià yǔ", "晴天 qíngtiān"], answer: "下雨 xià yǔ", hint: "下 = rơi xuống, 雨 = mưa" },
      { question: "Mùa hè tiếng Trung:", type: "choice", options: ["春天", "夏天", "秋天", "冬天"], answer: "夏天", hint: "夏天 xiàtiān = mùa hè" },
      { question: "Điền: '今天___30度' (nhiệt độ)", type: "fill", answer: "温度", hint: "温度 = nhiệt độ" },
      { question: "Dịch: 'Hôm nay trời lạnh, mặc áo ấm vào'", type: "write", answer: "今天很冷，穿暖和点儿 jīntiān hěn lěng chuān nuǎnhuo diǎnr", hint: "冷 = lạnh, 穿 = mặc, 暖和 = ấm" },
    ],
  },
  {
    id: "10-hsk1-on-tap",
    title: "Ôn tập HSK 1 — 150 từ cơ bản",
    level: "Cơ bản",
    description: "Ôn lại 150 từ vựng cần thiết cho HSK cấp 1",
    content: `
## HSK 1 — Nền tảng

HSK 1 yêu cầu khoảng **150 từ vựng** và các câu đơn giản.

## Các chủ đề chính:

### Đại từ:
我 wǒ (tôi) | 你 nǐ (bạn) | 他/她 tā (anh/cô ấy) | 我们 wǒmen (chúng tôi) | 你们 nǐmen (các bạn)

### Động từ cơ bản:
是 shì (là) | 有 yǒu (có) | 在 zài (ở) | 要 yào (muốn) | 喜欢 xǐhuān (thích)
来 lái (đến) | 去 qù (đi) | 吃 chī (ăn) | 喝 hē (uống) | 看 kàn (xem/nhìn)
说 shuō (nói) | 听 tīng (nghe) | 学 xué (học) | 工作 gōngzuò (làm việc)

### Tính từ:
大/小 (to/nhỏ) | 多/少 (nhiều/ít) | 好/不好 (tốt/không tốt)
热/冷 (nóng/lạnh) | 高/矮 (cao/thấp) | 贵/便宜 (đắt/rẻ)

### Câu hỏi:
什么 shénme (gì) | 哪 nǎ (nào/đâu) | 谁 shéi (ai) | 几 jǐ (mấy) | 怎么 zěnme (thế nào)
    `,
    vocabulary: [
      { word: "喜欢 xǐhuān", phonetic: "xǐ·huān", meaning: "thích", example: "我喜欢学中文。(Tôi thích học tiếng Trung.)" },
      { word: "来/去 lái/qù", phonetic: "lái/qù", meaning: "đến/đi", example: "你来我家吧。(Bạn đến nhà tôi đi.)" },
      { word: "看 kàn", phonetic: "kàn", meaning: "xem / nhìn", example: "我喜欢看电影。(Tôi thích xem phim.)" },
      { word: "说 shuō", phonetic: "shuō", meaning: "nói", example: "他说中文说得很好。(Anh ấy nói tiếng Trung rất giỏi.)" },
      { word: "一点儿 yīdiǎnr", phonetic: "yī·diǎnr", meaning: "một chút", example: "我会说一点儿中文。(Tôi biết nói một chút tiếng Trung.)" },
      { word: "都 dōu", phonetic: "dōu", meaning: "đều / tất cả", example: "我们都是学生。(Chúng tôi đều là học sinh.)" },
    ],
    exercises: [
      { question: "Dịch: 'Tôi thích học tiếng Trung'", type: "write", answer: "我喜欢学中文 wǒ xǐhuān xué zhōngwén", hint: "喜欢 = thích, 学 = học, 中文 = tiếng Trung" },
      { question: "'Chúng tôi đều là học sinh':", type: "write", answer: "我们都是学生 wǒmen dōu shì xuésheng", hint: "都 dōu = đều" },
      { question: "Hỏi 'Ai?':", type: "choice", options: ["什么", "哪", "谁", "几"], answer: "谁", hint: "谁 shéi = ai" },
      { question: "Điền: '我会说___中文' (một chút)", type: "fill", answer: "一点儿", hint: "一点儿 = một chút" },
      { question: "Dịch: 'Bạn có thích xem phim không?'", type: "write", answer: "你喜欢看电影吗？nǐ xǐhuān kàn diànyǐng ma", hint: "喜欢 = thích, 看 = xem, 电影 = phim, 吗 = câu hỏi" },
    ],
  },
  {
    id: "11-hsk2-on-tap",
    title: "Ôn tập HSK 2 — Giao tiếp cơ bản",
    level: "Trung cấp",
    description: "Mở rộng từ vựng lên 300 từ cho HSK cấp 2",
    content: `
## HSK 2 — Giao tiếp đơn giản

HSK 2 yêu cầu **300 từ vựng** — có thể giao tiếp về các chủ đề quen thuộc.

## Từ vựng mới quan trọng:

### Trạng từ:
- 已经 yǐjīng — đã rồi
- 还 hái — còn, vẫn
- 又 yòu — lại (lần nữa)
- 也 yě — cũng
- 就 jiù — ngay, liền

### Bổ nghĩa:
- 非常 fēicháng — rất, cực kỳ
- 有点儿 yǒudiǎnr — hơi, một chút
- 比较 bǐjiào — tương đối, so sánh

### Cấu trúc so sánh HSK 2:
\`\`\`
A + 比 + B + tính từ
= A so sánh hơn B

哥哥比我高。
Gēgē bǐ wǒ gāo.
Anh trai cao hơn tôi.
\`\`\`
    `,
    vocabulary: [
      { word: "已经 yǐjīng", phonetic: "yǐ·jīng", meaning: "đã (rồi)", example: "我已经吃饭了。(Tôi đã ăn cơm rồi.)" },
      { word: "还是 háishi", phonetic: "hái·shì", meaning: "hay là (lựa chọn)", example: "你喝茶还是咖啡？(Bạn uống trà hay cà phê?)" },
      { word: "比 bǐ", phonetic: "bǐ", meaning: "hơn (so sánh)", example: "今天比昨天热。(Hôm nay nóng hơn hôm qua.)" },
      { word: "虽然...但是", phonetic: "suīrán...dànshì", meaning: "tuy...nhưng...", example: "虽然贵，但是质量好。(Tuy đắt nhưng chất lượng tốt.)" },
      { word: "因为...所以", phonetic: "yīnwèi...suǒyǐ", meaning: "vì...nên...", example: "因为下雨，所以我没去。(Vì mưa nên tôi không đi.)" },
      { word: "觉得 juédé", phonetic: "jué·dé", meaning: "cảm thấy / cho rằng", example: "我觉得这个主意很好。(Tôi cho rằng ý kiến này rất tốt.)" },
    ],
    exercises: [
      { question: "So sánh: 'Hôm nay lạnh hơn hôm qua'", type: "write", answer: "今天比昨天冷 jīntiān bǐ zuótiān lěng", hint: "A + 比 + B + tính từ" },
      { question: "Điền: '我___吃饭了' (đã)", type: "fill", answer: "已经", hint: "已经 = đã rồi" },
      { question: "Dịch: 'Vì mệt nên tôi không đi'", type: "write", answer: "因为累，所以我没去 yīnwèi lèi suǒyǐ wǒ méi qù", hint: "因为...所以..." },
      { question: "'Tuy...nhưng' tiếng Trung:", type: "choice", options: ["因为...所以", "如果...就", "虽然...但是", "不但...而且"], answer: "虽然...但是", hint: "虽然...但是 = tuy...nhưng" },
      { question: "Dịch: 'Bạn uống trà hay cà phê?'", type: "write", answer: "你喝茶还是咖啡？nǐ hē chá háishi kāfēi", hint: "还是 = hay là (lựa chọn)" },
    ],
  },
  {
    id: "12-nghe-nghiep",
    title: "Nghề nghiệp 职业",
    level: "Trung cấp",
    description: "Từ vựng về nghề nghiệp và nơi làm việc",
    content: `
## Các nghề phổ biến

| 中文 | Pinyin | Nghĩa |
|------|--------|-------|
| 医生 | yīshēng | bác sĩ |
| 老师 | lǎoshī | giáo viên |
| 工程师 | gōngchéngshī | kỹ sư |
| 护士 | hùshi | y tá |
| 厨师 | chúshī | đầu bếp |
| 律师 | lǜshī | luật sư |
| 警察 | jǐngchá | cảnh sát |
| 司机 | sījī | tài xế |
| 程序员 | chéngxùyuán | lập trình viên |
| 商人 | shāngrén | thương nhân |

## Hỏi về công việc

- **你做什么工作？** Nǐ zuò shénme gōngzuò? — Bạn làm công việc gì?
- **我在...公司上班。** Wǒ zài...gōngsī shàngbān. — Tôi làm ở công ty...
- **我已经工作了五年。** Wǒ yǐjīng gōngzuò le wǔ nián. — Tôi đã làm việc 5 năm rồi.
    `,
    vocabulary: [
      { word: "工作 gōngzuò", phonetic: "gōng·zuò", meaning: "công việc / làm việc", example: "我的工作很忙。(Công việc của tôi rất bận.)" },
      { word: "公司 gōngsī", phonetic: "gōng·sī", meaning: "công ty", example: "他在大公司上班。(Anh ấy làm ở công ty lớn.)" },
      { word: "工资 gōngzī", phonetic: "gōng·zī", meaning: "lương", example: "工资不错。(Lương không tệ.)" },
      { word: "经验 jīngyàn", phonetic: "jīng·yàn", meaning: "kinh nghiệm", example: "我有三年工作经验。(Tôi có 3 năm kinh nghiệm.)" },
      { word: "上班/下班", phonetic: "shàngbān/xiàbān", meaning: "đi làm/tan làm", example: "我八点上班，五点下班。(Tôi đi làm 8 giờ, tan 5 giờ.)" },
      { word: "同事 tóngshì", phonetic: "tóng·shì", meaning: "đồng nghiệp", example: "我的同事都很好。(Đồng nghiệp của tôi đều tốt.)" },
    ],
    exercises: [
      { question: "Lập trình viên tiếng Trung:", type: "choice", options: ["医生 yīshēng", "程序员 chéngxùyuán", "律师 lǜshī", "厨师 chúshī"], answer: "程序员 chéngxùyuán", hint: "程序员 = người viết chương trình" },
      { question: "Dịch: 'Bạn làm công việc gì?'", type: "write", answer: "你做什么工作？nǐ zuò shénme gōngzuò", hint: "做什么工作 = làm công việc gì" },
      { question: "'Đồng nghiệp' tiếng Trung:", type: "choice", options: ["同学", "同事", "朋友", "邻居"], answer: "同事", hint: "同事 tóngshì = đồng nghiệp" },
      { question: "Điền: '我在这家公司___五年了' (đã làm)", type: "fill", answer: "工作了", hint: "工作了 = đã làm việc" },
      { question: "'Tan làm' tiếng Trung:", type: "choice", options: ["上班", "下班", "休息", "工作"], answer: "下班", hint: "下班 xiàbān = tan làm/hết ca" },
    ],
  },
  {
    id: "13-suc-khoe",
    title: "Sức khỏe và Khám bệnh 健康",
    level: "Trung cấp",
    description: "Mô tả triệu chứng và khám bệnh bằng tiếng Trung",
    content: `
## Tại phòng khám

- **我哪儿不舒服？** — Bạn không thoải mái ở đâu?
- **我头疼。** Wǒ tóuténg. — Tôi đau đầu.
- **我发烧了。** Wǒ fāshāo le. — Tôi bị sốt rồi.
- **我嗓子疼。** Wǒ sǎngzi téng. — Tôi đau họng.
- **从什么时候开始的？** Cóng shénme shíhòu kāishǐ de? — Bắt đầu từ khi nào?

## Bộ phận cơ thể

- 头 tóu — đầu | 眼睛 yǎnjīng — mắt | 耳朵 ěrduo — tai
- 鼻子 bízi — mũi | 嘴 zuǐ — miệng | 脖子 bózi — cổ
- 手 shǒu — tay | 脚 jiǎo — chân | 肚子 dùzi — bụng
- 背 bèi — lưng | 腿 tuǐ — đùi/chân

## Lời khuyên bác sĩ

- **多喝水，多休息。** Duō hē shuǐ, duō xiūxi. — Uống nhiều nước, nghỉ ngơi nhiều.
- **吃这个药，一天三次。** — Uống thuốc này, ngày 3 lần.
    `,
    vocabulary: [
      { word: "不舒服 bùshūfu", phonetic: "bù·shū·fu", meaning: "không thoải mái / khó chịu", example: "我今天很不舒服。(Hôm nay tôi rất khó chịu.)" },
      { word: "疼/痛 téng/tòng", phonetic: "téng/tòng", meaning: "đau", example: "我腿疼。(Chân tôi đau.)" },
      { word: "发烧 fāshāo", phonetic: "fā·shāo", meaning: "sốt", example: "他发烧了，温度38度。(Anh ấy sốt 38 độ.)" },
      { word: "药 yào", phonetic: "yào", meaning: "thuốc", example: "这个药一天吃三次。(Thuốc này uống 3 lần/ngày.)" },
      { word: "医院 yīyuàn", phonetic: "yī·yuàn", meaning: "bệnh viện", example: "我要去医院看病。(Tôi phải đến bệnh viện khám.)" },
      { word: "检查 jiǎnchá", phonetic: "jiǎn·chá", meaning: "kiểm tra / khám", example: "医生给我做了检查。(Bác sĩ đã khám cho tôi.)" },
    ],
    exercises: [
      { question: "Dịch: 'Tôi bị đau đầu'", type: "write", answer: "我头疼 wǒ tóuténg", hint: "头 = đầu, 疼 = đau" },
      { question: "'Bệnh viện' tiếng Trung:", type: "choice", options: ["学校 xuéxiào", "医院 yīyuàn", "银行 yínháng", "药店 yàodiàn"], answer: "医院 yīyuàn", hint: "医院 = bệnh viện (医 = y tế)" },
      { question: "Điền: '我___烧了' (bị sốt)", type: "fill", answer: "发", hint: "发烧 fāshāo = sốt" },
      { question: "Dịch: 'Uống nhiều nước, nghỉ ngơi nhiều'", type: "write", answer: "多喝水，多休息 duō hē shuǐ duō xiūxi", hint: "多 = nhiều, 喝水 = uống nước, 休息 = nghỉ ngơi" },
      { question: "'Thuốc' tiếng Trung:", type: "choice", options: ["医生", "护士", "药", "病"], answer: "药", hint: "药 yào = thuốc" },
    ],
  },
  {
    id: "14-hoi-thoai-thuc-te",
    title: "Hội thoại thực tế 实用对话",
    level: "Nâng cao",
    description: "Các tình huống giao tiếp thực tế trong cuộc sống",
    content: `
## Tình huống 1 — Tại ngân hàng

- **我想开一个账户。** Wǒ xiǎng kāi yīgè zhànghù. — Tôi muốn mở tài khoản.
- **我想换钱。** Wǒ xiǎng huàn qián. — Tôi muốn đổi tiền.
- **汇率是多少？** Huìlǜ shì duōshǎo? — Tỷ giá là bao nhiêu?

## Tình huống 2 — Tại khách sạn

- **我预订了一个房间。** Wǒ yùdìng le yīgè fángjiān. — Tôi đã đặt một phòng.
- **有没有空房间？** Yǒu méiyǒu kōng fángjiān? — Có phòng trống không?
- **什么时候退房？** Shénme shíhòu tuì fáng? — Mấy giờ trả phòng?

## Tình huống 3 — Qua điện thoại

- **喂？** Wèi? — A lô?
- **请问...在吗？** Qǐngwèn...zài ma? — Làm ơn hỏi... có ở đó không?
- **我等一下再打。** Wǒ děng yīxià zài dǎ. — Tôi đợi một lúc rồi gọi lại.
    `,
    vocabulary: [
      { word: "预订 yùdìng", phonetic: "yù·dìng", meaning: "đặt trước / đặt chỗ", example: "我预订了一张票。(Tôi đã đặt một vé.)" },
      { word: "护照 hùzhào", phonetic: "hù·zhào", meaning: "hộ chiếu", example: "请出示你的护照。(Làm ơn xuất trình hộ chiếu.)" },
      { word: "签证 qiānzhèng", phonetic: "qiān·zhèng", meaning: "visa", example: "我需要申请签证。(Tôi cần xin visa.)" },
      { word: "帮助 bāngzhù", phonetic: "bāng·zhù", meaning: "giúp đỡ", example: "能帮助我吗？(Bạn có thể giúp tôi không?)" },
      { word: "紧急 jǐnjí", phonetic: "jǐn·jí", meaning: "khẩn cấp", example: "这是紧急情况！(Đây là tình huống khẩn cấp!)" },
      { word: "翻译 fānyì", phonetic: "fān·yì", meaning: "phiên dịch / dịch", example: "你能帮我翻译吗？(Bạn có thể giúp tôi dịch không?)" },
    ],
    exercises: [
      { question: "A lô (nghe điện thoại) tiếng Trung:", type: "choice", options: ["你好？", "喂？", "请问？", "对不起？"], answer: "喂？", hint: "喂 wèi = a lô" },
      { question: "Dịch: 'Tôi đã đặt phòng'", type: "write", answer: "我预订了一个房间 wǒ yùdìng le yīgè fángjiān", hint: "预订 = đặt trước, 房间 = phòng" },
      { question: "'Hộ chiếu' tiếng Trung:", type: "choice", options: ["签证", "护照", "身份证", "驾照"], answer: "护照", hint: "护照 hùzhào = hộ chiếu" },
      { question: "Dịch: 'Bạn có thể giúp tôi không?'", type: "write", answer: "你能帮助我吗？nǐ néng bāngzhù wǒ ma", hint: "能...吗 = có thể...không" },
      { question: "Hỏi trả phòng: '什么时候___房？' (trả)", type: "fill", answer: "退", hint: "退房 tuì fáng = trả phòng" },
    ],
  },
  {
    id: "15-van-hoa-trung-quoc",
    title: "Văn hóa Trung Quốc 中国文化",
    level: "Nâng cao",
    description: "Tìm hiểu văn hóa, phong tục và lễ hội Trung Quốc",
    content: `
## Các lễ hội quan trọng

| Lễ hội | Tên Trung | Thời gian |
|--------|-----------|-----------|
| Tết Nguyên Đán | 春节 Chūnjié | Tháng 1-2 |
| Tết Nguyên Tiêu | 元宵节 Yuánxiāojié | 15/1 âm lịch |
| Tiết Thanh Minh | 清明节 Qīngmíngjié | Tháng 4 |
| Tết Đoan Ngọ | 端午节 Duānwǔjié | 5/5 âm lịch |
| Tết Trung Thu | 中秋节 Zhōngqiūjié | 15/8 âm lịch |

## Phong tục hay gặp

- **恭喜发财！** Gōngxǐ fācái! — Chúc mừng phát tài!
- **红包 hóngbāo** — phong bì đỏ (lì xì)
- **饺子 jiǎozi** — há cảo ăn dịp Tết
- **月饼 yuèbǐng** — bánh trung thu
- **筷子 kuàizi** — đũa

## Thành ngữ 成语 (Chéngyǔ)

- **一石二鸟** Yī shí èr niǎo — Một mũi tên trúng hai đích
- **马到成功** Mǎ dào chénggōng — Thành công ngay lập tức (chúc mừng)
    `,
    vocabulary: [
      { word: "春节 Chūnjié", phonetic: "Chūn·jié", meaning: "Tết Nguyên Đán", example: "春节快乐！(Chúc mừng năm mới!)" },
      { word: "红包 hóngbāo", phonetic: "hóng·bāo", meaning: "phong bì đỏ / lì xì", example: "过年要发红包。(Tết phải lì xì.)" },
      { word: "饺子 jiǎozi", phonetic: "jiǎo·zi", meaning: "há cảo", example: "过年要吃饺子。(Tết phải ăn há cảo.)" },
      { word: "祝福 zhùfú", phonetic: "zhù·fú", meaning: "chúc phúc / lời chúc", example: "我给你送上最好的祝福。(Tôi gửi lời chúc tốt đẹp nhất đến bạn.)" },
      { word: "传统 chuántǒng", phonetic: "chuán·tǒng", meaning: "truyền thống", example: "这是中国的传统文化。(Đây là văn hóa truyền thống Trung Quốc.)" },
      { word: "月饼 yuèbǐng", phonetic: "yuè·bǐng", meaning: "bánh trung thu", example: "中秋节要吃月饼。(Tết Trung Thu phải ăn bánh trung thu.)" },
    ],
    exercises: [
      { question: "Tết Nguyên Đán tiếng Trung:", type: "choice", options: ["中秋节", "春节", "端午节", "元宵节"], answer: "春节", hint: "春节 Chūnjié = Tết mùa xuân" },
      { question: "Dịch: 'Chúc mừng năm mới!'", type: "write", answer: "春节快乐！Chūnjié kuàilè", hint: "快乐 = vui vẻ/hạnh phúc" },
      { question: "'Lì xì' / phong bì đỏ tiếng Trung:", type: "choice", options: ["月饼", "饺子", "红包", "筷子"], answer: "红包", hint: "红包 = bao đỏ" },
      { question: "Điền: '一石___鸟' (thành ngữ)", type: "fill", answer: "二", hint: "Một mũi tên trúng 'hai' đích" },
      { question: "Bánh trung thu tiếng Trung:", type: "choice", options: ["粽子", "月饼", "饺子", "包子"], answer: "月饼", hint: "月饼 = bánh mặt trăng = bánh trung thu" },
    ],
  },
];
