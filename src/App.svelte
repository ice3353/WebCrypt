<script>
import init, { ext_encode, inv_encode, inv_decode, to_base64,from_base64 } from './encodedecode.js';
async function run() {
await init();
}
run();
let sourceText = $state("");
let resultText = $state("");
let enctype = $state("base64");
</script>
<main class="container">
	<nav>
	<ul>
		<li><h1><strong>WebCrypt.</strong></h1></li>
	</ul>
</nav>
	<form role="group">
		<textarea class="source" placeholder="처리할 텍스트를 입력해주세요." bind:value={sourceText}></textarea>
		<button type="button" onclick={() => {
			try {
				navigator.clipboard.readText().then(text => sourceText = text);
			} catch (err) {
				sourceText = '클립보드 읽기 실패: ' + err;
			}
		}}>붙여넣기</button>
	</form>
	<select bind:value={enctype} name="처리 알고리즘">
		<option value="base64">Base64</option>
		<option value="inv">투명 인코딩</option>
		<option value="rawinv">Raw 투명 인코딩(ASCII 범위에서만 유효)</option>
		<option value="PGP">PGP(Comming Soon...)</option>
	</select>
	{#if enctype === "base64"}
		<button type="button" onclick={() => resultText = to_base64(sourceText)}>인코딩</button>
		<button type="button" onclick={() => resultText = to_base64(inv_encode(sourceText))}>투명 인코딩</button>
		<button type="button" onclick={() => {
			try{
				resultText = from_base64(sourceText)
			}catch(err){
				resultText = "디코딩 실패: 올바른 Base64 문자열이 아닙니다."
			}
			}}>디코딩</button>
	{:else if enctype === "inv"}
		<button type="button" onclick={() => resultText = inv_encode(to_base64(sourceText))}>인코딩</button>
		<button type="button" onclick={() => resultText = from_base64(inv_decode(sourceText))}>디코딩</button>
	{:else if enctype === "rawinv"}
		아스키 범위 밖의 문자열 사용 시 투명하지 않을 수 있습니다. 다만 기본 투명 인코딩에 비해 글자 수를 줄일 수 있습니다.<br>
		<button type="button" onclick={() => resultText = inv_encode(sourceText)}>인코딩</button>
		<button type="button" onclick={() => resultText = inv_decode(sourceText)}>디코딩</button>
	{:else if enctype === "PGP"}
		<p>PGP coming soon...</p>
	{:else}
		<p>이것이 보인다면 무언가 잘못된 것이니 사이트 개발자에게 알려주십시오</p>
	{/if}
	<form role="group">
			<textarea class="result" name="read-only" readonly>{resultText}</textarea>
			<button type="button" onclick={() => navigator.clipboard.writeText(resultText)}>복사</button>
	</form>
	<button type="button" onclick={() => sourceText = resultText}>처리 필드로 이동</button>
</main>
