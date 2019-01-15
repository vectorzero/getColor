import { generate, presetPalettes } from '@ant-design/colors';

// dom
const $colorInput = document.getElementById('color-input');
const $colorValue = document.getElementById('color-value');
const $colorPie = document.getElementById('color-pie');
const $colorWrap = document.getElementById('color-wrap');
const $ul = document.createElement('ul'); 
$colorWrap.appendChild($ul);

// init list
let generateColor = '#1890ff';
$colorValue.innerHTML = generateColor;
generateColorList(generate(generateColor));

// init pie
$colorPie.innerHTML = '';
for(let item in presetPalettes) {
  let $pieLi = document.createElement('div');
  $pieLi.className = `slice-li`;
  $pieLi.innerHTML = `${item}<br/>${presetPalettes[item][5]}`;
  $pieLi.style.background = presetPalettes[item][5];
  $pieLi.onclick = function() {
    $colorInput.value = presetPalettes[item][5];
    generateColor = presetPalettes[item][5];
    $colorValue.innerHTML = generateColor;
    let colorList = presetPalettes[item];
    generateColorList(colorList);
  }
    $colorPie.appendChild($pieLi)
  }

// change color input
$colorInput.onchange = function() {
  generateColor = this.value;
  $colorValue.innerHTML = generateColor;
  let colorList = generate(generateColor);
  generateColorList(colorList);
}

// generate color list
function generateColorList(colorList) {
  $ul.innerHTML = '';
  for(let i = 0; i < colorList.length; i++) {
    let $li = document.createElement('li');
    $li.style.background = colorList[i];
    $li.innerHTML = colorList[i];
    $li.className = 'color-li';
    $li.onclick = function() {
      let copyText = this.innerText;
      const $tempInput = document.createElement('input');
      $tempInput.value = copyText;
      document.body.appendChild($tempInput);
      $tempInput.select();
      document.execCommand("Copy");
      $tempInput.style.display = 'none';
      alert(`您已成功将${copyText}添加至剪切板`)
    }
    $ul.appendChild($li)
  }
}
