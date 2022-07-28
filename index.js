//한 콜라당 총 개수는 4개
//재고가 0이 되면 품절이미지로 바뀜.

const colaQty = {
  Original: 4,
  Violet: 4,
  Yellow: 4,
  Cool: 4,
  Green: 4,
  Orange: 4,
};

const colaButton = document.querySelectorAll(".choice-btn");
const colaCart = document.querySelector(".selected-cola");
let payMoney = document.querySelector(".change-won");
let balance = document.querySelector(".balance-won");
let totalSpent = document.querySelector(".total-amount");

function selectCola(e) {
  console.log(e.target.value);
}

for (i = 0; i < colaButton.length; i++) {
  colaButton[i].addEventListener("click", (e) => {
    //선택한 콜라 재고 감소
    let colaID = e.target.id;
    //colaQty.colaID로 하면 undefined반환됨
    colaQty[colaID] = colaQty[colaID] - 1;

    const selectedItem = document.createElement("div");
    const selectedItemName = document.createElement("span");
    const selectedNum = document.createElement("div");
    const selectedImg = document.createElement("img");
    let selectedCola = colaCart.childNodes;
    let nameList = [];
    let matchName = `selected ${colaID}`;
    for (i = 0; i < selectedCola.length; i++) {
      nameList = [...nameList, selectedCola[i].className];
    }

    console.log(matchName);

    //획득할 콜라 목록에 추가
    if (!nameList.includes(matchName)) {
      colaCart.appendChild(selectedItem);
      selectedItem.classList.add("selected", `${colaID}`);
      selectedItemName.innerHTML = `${colaID}_Cola`;
      selectedItem.appendChild(selectedNum);
      selectedItem.appendChild(selectedImg);
      selectedItem.appendChild(selectedItemName);
      selectedNum.classList.add("quantity", `${colaID}`);
      selectedNum.textContent = 1;
      selectedImg.classList.add("selected-img", `${colaID}`);
      selectedImg.src = `src/images/${colaID}_cola.png`;
    } else if (nameList.includes(matchName)) {
      console.log("중복", colaID);
      let qtyNum = document.querySelector(`.quantity.${colaID}`);
      qtyNum.textContent = parseInt(qtyNum.textContent) + 1;
      //console.log(typeof document.querySelector(".quantity").innerHTML);
    }

    //재고 소진 시 sold-out 표시
    if (colaQty[colaID] === 0) {
      e.target.disabled = true;
      e.target.classList.add("sold-out");
    }
  });
}
