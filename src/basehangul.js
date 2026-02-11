/**
 * BaseHangul Modernized (ES6+)
 * 바이너리 데이터를 한글 문자열로 인코딩/디코딩하는 모듈
 */

const KSX1001_1028 = '가각간갇갈갉갊감갑값갓갔강갖갗같갚갛개객갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫났낭낮낯낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많맏말맑맒맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바박밖밗반받발밝밞밟밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗';
const PADDING_CHAR = '흐';

// 텍스트 처리를 위한 내장 인코더/디코더
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

/**
 * Uint8Array(바이트 배열)을 BaseHangul 문자열로 인코딩
 * @param {Uint8Array} bytearray 
 * @returns {string} BaseHangul encoded string
 */
export const encode = (bytearray) => {
    if (!(bytearray instanceof Uint8Array)) {
        throw new Error("Input must be a Uint8Array");
    }

    const len = bytearray.length;
    let result = '';

    // 5바이트(40비트)씩 끊어서 4개의 한글(각 10비트)로 변환
    for (let i = 0; i < len; i += 5) {
        // 안전한 배열 접근을 위해 undefined 체크를 비트 연산 전에 수행해야 함
        // 하지만 원본 로직의 간결함을 위해 비트 연산 중 범위를 벗어나면 0으로 처리하되,
        // 조건문으로 패딩 문자를 결정합니다.
        
        const b0 = bytearray[i];
        const b1 = bytearray[i + 1];
        const b2 = bytearray[i + 2];
        const b3 = bytearray[i + 3];
        const b4 = bytearray[i + 4];

        // 첫 번째 글자: b0 전체 + b1의 상위 2비트
        const idx1 = (b0 & 255) << 2 | (b1 !== undefined ? b1 & 255 : 0) >> 6;
        result += KSX1001_1028[idx1];

        // 두 번째 글자 (혹은 패딩)
        if (i + 1 < len) {
            const idx2 = (b1 & 63) << 4 | (b2 !== undefined ? b2 & 255 : 0) >> 4;
            result += KSX1001_1028[idx2];
        } else {
            result += PADDING_CHAR;
        }

        // 세 번째 글자 (혹은 패딩)
        if (i + 2 < len) {
            const idx3 = (b2 & 15) << 6 | (b3 !== undefined ? b3 & 255 : 0) >> 2;
            result += KSX1001_1028[idx3];
        } else {
            result += PADDING_CHAR;
        }

        // 네 번째 글자 (혹은 패딩)
        if (i + 3 < len) {
            // b3의 하위 2비트
            const d = b3 & 3; 
            
            if (i + 4 < len) {
                // b4가 존재하면: b3의 2비트 + b4의 8비트
                const idx4 = d << 8 | (b4 & 255);
                result += KSX1001_1028[idx4];
            } else {
                // b4가 없으면(마지막이 b3): b3의 2비트 + 종료 플래그(1024)
                // 원본 로직: d | 1024
                result += KSX1001_1028[d | 1024];
            }
        } else {
            result += PADDING_CHAR;
        }
    }

    return result;
};

/**
 * BaseHangul 문자열을 Uint8Array(바이트 배열)로 디코딩
 * @param {string} basehangulString 
 * @returns {Uint8Array} Decoded byte array
 */
export const decode = (basehangulString) => {
    // 문자열을 인덱스 배열로 변환
    const baseData = Array.from(basehangulString).map(char => KSX1001_1028.indexOf(char));
    const len = baseData.length;
    const result = [];

    // 4개의 한글 문자(40비트)를 5바이트로 복원
    for (let i = 0; i < len; i += 4) {
        const a = baseData[i];
        const b = baseData[i + 1];
        const c = baseData[i + 2];
        const d = baseData[i + 3];

        if (a === -1) break; // 유효하지 않은 문자

        // Byte 1
        result.push((a >> 2) & 255);

        // Byte 2
        if (b === -1) break;
        result.push(((a & 3) << 6) | (b >> 4));

        // Byte 3
        if (b === -1 || c === -1) break;
        result.push(((b & 15) << 4) | (c >> 6));

        // Byte 4 & 5
        if (c === -1 || d === -1) break;
        
        // 마지막 청크 처리 로직 (1024 플래그 확인)
        const val = ((c & 63) << 2) | (d > 1023 ? d & 3 : d >> 8);
        result.push(val);

        if (d > 1023) break; // 종료 플래그 확인
        result.push(d & 255);
    }

    return new Uint8Array(result);
};

/**
 * 일반 UTF-8 문자열을 BaseHangul로 인코딩
 * @param {string} text 
 * @returns {string}
 */
export const to_basehangul = (text) => {
    const bytes = textEncoder.encode(text);
    return encode(bytes);
};

/**
 * BaseHangul 문자열을 일반 UTF-8 문자열로 디코딩
 * @param {string} encodedString 
 * @returns {string}
 */
export const from_basehangul = (encodedString) => {
    const bytes = decode(encodedString);
    return textDecoder.decode(bytes);
};

export default { encode, decode, to_basehangul, from_basehangul };