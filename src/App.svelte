<script>
import init, { ext_encode, inv_encode, inv_decode, inv_detect, to_base64, from_base64 } from './encodedecode.js';
import { createMessage, encrypt, readMessage, decrypt } from 'openpgp';
async function run() {
await init();
}
run();
let sourceText = $state("");
let resultText = $state("");
let memoryText = $state("");
let keyText = $state("");
let autoDetect = $state(false);
let enctype = $state("base64");
</script>
<header class="container">
	<nav>
		<ul>
			<li><h1><strong>WebCrypt</strong></h1></li>
		</ul>
	</nav>
</header>
<main class="container">
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
		<option value="rawinv">투명 인코딩</option>
		<option value="inv">투명 인코딩 With Base64</option>
		<option value="aes256">PGP-대칭 암호</option>
	</select>
	{#if enctype === "base64"}
		<button type="button" onclick={() => resultText = to_base64(sourceText)}>인코딩</button>
		<button type="button" onclick={() => resultText = inv_encode(to_base64(sourceText))}>투명 인코딩</button>
		<button type="button" onclick={() => {
			try{
				resultText = from_base64(sourceText)
			}catch(err){
				resultText = "디코딩 실패: 올바른 Base64 문자열이 아닙니다."
			}
		}}>디코딩</button>
	{:else if enctype === "rawinv"}
		아스키 범위 밖의 문자열 사용 시 투명하지 않을 수 있습니다. 다만 투명 인코딩 With Base64에 비해 글자 수를 줄일 수 있습니다.<br>
		<button type="button" onclick={() => resultText = inv_encode(sourceText)}>인코딩</button>
		<button type="button" onclick={() => resultText = inv_decode(sourceText)}>디코딩</button>
	{:else if enctype === "inv"}
		<button type="button" onclick={() => resultText = inv_encode(to_base64(sourceText))}>인코딩</button>
		<button type="button" onclick={() => resultText = from_base64(inv_decode(ext_encode(sourceText)))}>디코딩</button>
	{:else if enctype === "aes256"}
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
		<button type="button" onclick={ async () => {
			const message = await createMessage({ text: sourceText });
			console.log(message);
			const encrypted = await encrypt({
				message,
				passwords: [keyText]
			});
			resultText = encrypted;
		}}>암호화</button>
		<button type="button" onclick={async () => {
			try{
				const message = await readMessage({ armoredMessage: sourceText });
				const { data: decrypted } = await decrypt({
					message,
					passwords: [keyText],
				});
				resultText = decrypted;
			} catch(err) {
				resultText = "오류:" + err;
			}
		}}>복호화</button>
	{:else}
		<p>이것이 보인다면 무언가 잘못된 것이니 사이트 개발자에게 알려주십시오</p>
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
	</form><br>
	<fieldset>
		<label>
			<input type="checkbox" role="switch" bind:checked={autoDetect} />
			<span data-tooltip="입력 필드에 투명 인코딩이 감지되면 필드가 초록색으로 강조됩니다">투명 인코딩 자동 감지</span>
		</label>
	</fieldset>
</main>
<footer class="container">
	<p>이 도구는 클라이언트 측에서만 작동하며, 어떠한 데이터도 서버로 전송되지 않습니다.</p>
</footer>
