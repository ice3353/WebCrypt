/**
 * Zero-Width Unicode Character Steganography
 */
class UnicodeSteganographer {
  constructor(chars = '\u200c\u200d\u202c\ufeff') {
    this.setUseChars(chars);
  }

  /**
   * 사용할 제로 너비 문자 설정 및 관련 계산값 업데이트
   */
  setUseChars(newChars) {
    if (newChars.length >= 2) {
      this.chars = [...newChars];
      this.radix = this.chars.length;
      // 16비트 유니코드 텍스트와 8비트 바이너리를 위한 코드 길이 계산
      this.codelengthText = Math.ceil(Math.log(65536) / Math.log(this.radix));
      this.codelengthBinary = Math.ceil(Math.log(256) / Math.log(this.radix));
    }
  }

  /**
   * 텍스트 인코더
   */
  encodeText(originalText, hiddenText) {
    const encodedData = this._encodeToZeroWidth(hiddenText, this.codelengthText, true);
    return this._combineShuffle(originalText, encodedData, this.codelengthText);
  }

  /**
   * 바이너리 인코더
   */
  encodeBinary(originalText, uint8Data) {
    const encodedData = this._encodeToZeroWidth(uint8Data, this.codelengthBinary, false);
    return this._combineShuffle(originalText, encodedData, this.codelengthBinary);
  }

  /**
   * 텍스트 디코더
   */
  decodeText(stegoText) {
    const { originalText, hiddenChars } = this._splitZeroWidth(stegoText);
    return {
      originalText,
      hiddenText: this._decodeFromZeroWidth(hiddenChars, this.codelengthText, true)
    };
  }

  /**
   * 바이너리 디코더
   */
  decodeBinary(stegoText) {
    const { originalText, hiddenChars } = this._splitZeroWidth(stegoText);
    return {
      originalText,
      hiddenData: this._decodeFromZeroWidth(hiddenChars, this.codelengthBinary, false)
    };
  }

  // --- 내부 헬퍼 메서드 (Internal Logic) ---

  _encodeToZeroWidth(data, codelength, isText) {
    let result = '';
    const items = isText ? [...data].map(c => c.charCodeAt(0)) : data;

    for (const val of items) {
      // 진법 변환 후 길이에 맞춰 앞을 '0'으로 채움 (padStart 사용)
      const encoded = val.toString(this.radix).padStart(codelength, '0');
      result += encoded;
    }

    // 숫자를 제로 너비 문자로 치환
    return result.split('').map(digit => this.chars[parseInt(digit, 10)]).join('');
  }

  _decodeFromZeroWidth(zeroStr, codelength, isText) {
    // 문자를 다시 숫자로 치환
    let numStr = [...zeroStr].map(char => this.chars.indexOf(char)).join('');
    const result = [];

    for (let i = 0; i < numStr.length; i += codelength) {
      const part = numStr.substring(i, i + codelength);
      result.push(parseInt(part, this.radix));
    }

    return isText 
      ? String.fromCharCode(...result) 
      : new Uint8Array(result);
  }

  _splitZeroWidth(str) {
    const charSet = this.chars.join('');
    const reHidden = new RegExp(`[${charSet}]`, 'g');
    const reOriginal = new RegExp(`[^${charSet}]`, 'g');

    return {
      originalText: str.replace(reHidden, ''),
      hiddenChars: str.replace(reOriginal, '')
    };
  }

  _combineShuffle(str1, str2, codelength) {
    const unicodeBlocks = /([\u0000-\u002F\u003A-\u0040\u005b-\u0060\u007b-\u007f])|([\u0030-\u0039]+)|([\u0041-\u005a\u0061-\u007a]+)|.../g; // 생략 (기존 정규식 사용)
    
    const c1 = str1.match(/./gu) || []; // 유니코드 안전 분할
    const chunks = str2.match(new RegExp(`.{${codelength}}`, 'g')) || [];
    
    const result = [];
    let i = 0, j = 0;
    const ratio = c1.length / (c1.length + chunks.length);

    while (i < c1.length && j < chunks.length) {
      if (Math.random() <= ratio) {
        result.push(c1[i++]);
      } else {
        result.push(chunks[j++]);
      }
    }

    return [...result, ...c1.slice(i), ...chunks.slice(j)].join('');
  }
}

export default UnicodeSteganographer;