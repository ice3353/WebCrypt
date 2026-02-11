<script>
import init, { ext_encode, inv_encode, inv_decode, inv_detect, to_base64, from_base64, to_unicode_escape, from_unicode_escape, encrypt_aes256_cbc, decrypt_aes256_cbc } from './encodedecode.js';
import queryString from 'query-string';
import { to_basehangul, from_basehangul } from './basehangul.js';
init()
let query = queryString.parse(location.search, {parseBooleans: true, types: { keyText: "string", autoDetect: "boolean", B64Invisible: "boolean", encrypt: 'string' }});

let sourceText = $state("");
let resultText = $state("");
let memoryText = $state("");
let keyText = $state(query.keyText ? query.keyText : "");
let autoDetect = $state(query.autoDetect ? query.autoDetect : false);
let B64Invisible = $state(query.B64Invisible ? query.B64Invisible : false)
let enctype = $state(query.enctype ? query.enctype : "base64");

// function setUrl() {
// 	let status = $state({})
// 	keyText ? status.keyText = keyText : null
// 	autoDetect ? status.autoDetect = autoDetect : null
// 	B64Invisible ? status.B64Invisible = B64Invisible : null
// 	enctype = 'base64' ? null : status.enctype = enctype
// 	console.log(status)
// }
</script>
<main class="container">
	<nav>
		<ul>
			<li><h1><strong>WebCrypt</strong></h1></li>
		</ul>
		<ul>
			<li><a href="https://freecommunity.kro.kr">자유 커뮤니티 위키</a></li>
			<li><a href="https://goroawase.kro.kr">고로아와세 변환기</a></li>
		</ul>
	</nav>
	<form role="group">
		<textarea class="source" placeholder="처리할 텍스트를 입력해주세요." bind:value={sourceText} aria-invalid={autoDetect && inv_detect(sourceText) ? "false" : null}></textarea>
		<button type="button" onclick={() => {
			try {
				navigator.clipboard.readText().then(text => sourceText = text);
			} catch (err) {
				sourceText = '클립보드 읽기 실패: ' + err;
			}
		}}>붙여넣기</button>
	</form>
	<select bind:value={enctype} aria-label="처리 알고리즘">
		<option value="base64">Base64</option>
		<option value="basehangul">basehangul</option>
		<option value="inv">투명 인코딩</option>
		<option value="unicode">유니코드 이스케이프</option>
		<option value="aes">AES 암호</option>
	</select>
	{#if enctype === "base64"}
		<button type="button" onclick={() => resultText = to_base64(sourceText)}>인코딩</button>
		<button type="button" onclick={() => {
			try{
				resultText = from_base64(sourceText)
			}catch(err){
				resultText = "디코딩 실패: 올바른 Base64 문자열이 아닙니다."
			}
		}}>디코딩</button>
	{:else if enctype === "basehangul"}
		<button type="button" onclick={() => resultText = to_basehangul(sourceText)}>인코딩</button>
		<button type="button" onclick={() => resultText = from_basehangul(sourceText)}>디코딩</button>
	{:else if enctype === "inv"}
	<button type="button" onclick={() => resultText = B64Invisible ? inv_encode(to_base64(sourceText)) : inv_encode(sourceText)}>인코딩</button>
	<button type="button" onclick={() => resultText = B64Invisible ? from_base64(inv_decode(ext_encode(sourceText))) : inv_decode(sourceText)}>디코딩</button>
	<fieldset>
		<label>
			<input type="checkbox" role="switch" bind:checked={B64Invisible} />
			<span data-tooltip="문자를 Base64로 먼저 인코딩하여 ASCII 범위 외에서도 투명 상태를 유지합니다.">Base64 래핑</span>
		</label>
	</fieldset>
	{:else if enctype === 'unicode'}
	<button type="button" onclick={() => resultText = to_unicode_escape(sourceText)}>인코딩</button>
	<button type="button" onclick={() => resultText = from_unicode_escape(sourceText)}>디코딩</button>
	{:else if enctype === 'aes'}
	<form role="group">			
		<textarea class="key" placeholder="암호" bind:value={keyText}></textarea>
		<button type="button" onclick={() => {
			try {
				navigator.clipboard.readText().then(text => keyText = text);
			} catch (err) {
				keyText = '클립보드 읽기 실패: ' + err;
			}
		}}>붙여넣기</button>
	</form>
	<button type="button" onclick={() => resultText = encrypt_aes256_cbc(sourceText, keyText)}>암호화</button>
	<button type="button" onclick={() => {try { resultText = decrypt_aes256_cbc(sourceText, keyText) } catch(e) { resultText = '복호화 실패: ' + e }}}>복호화</button>
	{:else}
	<p>방식 "${enctype}"은 존재하지 않습니다.</p>
	{/if}
	<form role="group">
			<textarea class="result" name="read-only" readonly>{resultText}</textarea>
			<button type="button" onclick={() => navigator.clipboard.writeText(resultText)}>복사</button>
	</form>
	<button type="button" onclick={() => sourceText = resultText}>↑ 처리 필드로 이동</button>
	<button type="button" onclick={() => memoryText += resultText}>메모리에 추가 ↓</button>
	<form role="group">
		<textarea class="memory" placeholder="메모리" bind:value={memoryText}></textarea>
		<button type="button" onclick={() => navigator.clipboard.writeText(memoryText)}>메모리 복사</button>
	</form>
	<button type="button" onclick={() => sourceText = memoryText}>↑ 처리 필드로 이동</button><br>
	<fieldset>
		<label>
			<input type="checkbox" role="switch" bind:checked={autoDetect} />
			<span data-tooltip="입력 필드에 투명 인코딩이 감지되면 필드가 초록색으로 강조됩니다">투명 인코딩 자동 감지</span>
		</label>
	</fieldset>
</main>